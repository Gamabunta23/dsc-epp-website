import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Kontaktformular-Versand via Resend (resend.com).
 *
 * Konfiguration über Env-Vars (siehe .env.example):
 *   RESEND_API_KEY  — API-Key aus dem Resend-Dashboard
 *   CONTACT_TO      — Ziel-Postfach (Default: auftrag@dsc-epp.de)
 *   CONTACT_FROM    — Absender; bis die eigene Domain bei Resend
 *                     verifiziert ist, "onboarding@resend.dev" lassen
 *
 * Ohne API-Key antwortet die Route mit 503 — das Frontend fällt dann
 * auf einen vorbefüllten mailto:-Link zurück, es geht keine Anfrage verloren.
 */

// Single-container safeguards; counters reset on restart and are not a distributed limiter.
const recent = new Map<string, { count: number; until: number }>();
let globalWindow = { count: 0, until: 0 };
const limits = { name: 120, company: 200, email: 254, phone: 80, from: 300, to: 300, message: 5000, website: 200 };
type ContactPayload = Record<keyof typeof limits, string>;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = process.env.NODE_ENV === "production"
    ? ["https://dsc-epp.de", "https://www.dsc-epp.de"]
    : ["http://localhost:3210", "http://127.0.0.1:3210"];
  if ((origin && !allowed.includes(origin)) || request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "unsupported-media-type" }, { status: 415 });
  }
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: "invalid-input" }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32768) {
        await reader.cancel();
        return NextResponse.json({ error: "too-large" }, { status: 413 });
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid-input" }, { status: 400 });
  }
  const input = raw as Record<string, unknown>;
  const data = {} as ContactPayload;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const value = input[key] ?? "";
    if (typeof value !== "string" || value.length > limits[key] ||
        (key !== "message" && /[\r\n\x00-\x1f\x7f]/.test(value))) {
      return NextResponse.json({ error: "invalid-input" }, { status: 400 });
    }
    data[key] = value.trim();
  }
  const { name, email } = data;
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid-input" }, { status: 400 });
  }
  // Honeypot: silently discard automated submissions without sending mail.
  if (data.website) return NextResponse.json({ ok: true });
  const now = Date.now();
  for (const [key, entry] of recent) if (entry.until <= now) recent.delete(key);
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const bucket = recent.get(key) ?? { count: 0, until: now + 15 * 60_000 };
  if (globalWindow.until <= now) globalWindow = { count: 0, until: now + 60_000 };
  if (bucket.count >= 3 || globalWindow.count >= 20 || recent.size >= 5000) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429, headers: { "Retry-After": "900" } });
  }
  bucket.count++;
  globalWindow.count++;
  recent.set(key, bucket);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  const lines = [
    `Name:     ${name}`,
    `Firma:    ${data.company?.trim() || "—"}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${data.phone?.trim() || "—"}`,
    `Abholung: ${data.from?.trim() || "—"}`,
    `Ziel:     ${data.to?.trim() || "—"}`,
    ``,
    `Anforderung:`,
    data.message?.trim() || "—",
  ];

  try {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "DSC | EPP Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "auftrag@dsc-epp.de"],
      reply_to: email,
      subject: `Anfrage über die Website: ${name}${data.company ? ` (${data.company.trim()})` : ""}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend-Fehler:", res.status);
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }
}
