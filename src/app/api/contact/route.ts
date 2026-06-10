import { NextResponse } from "next/server";

/**
 * Kontaktformular-Versand via Resend (resend.com).
 *
 * Konfiguration über Env-Vars (siehe .env.example):
 *   RESEND_API_KEY  — API-Key aus dem Resend-Dashboard
 *   CONTACT_TO      — Ziel-Postfach (Default: auftrag@dsc-logistik.de)
 *   CONTACT_FROM    — Absender; bis die eigene Domain bei Resend
 *                     verifiziert ist, "onboarding@resend.dev" lassen
 *
 * Ohne API-Key antwortet die Route mit 503 — das Frontend fällt dann
 * auf einen vorbefüllten mailto:-Link zurück, es geht keine Anfrage verloren.
 */

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  from?: string;
  to?: string;
  message?: string;
};

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid-input" }, { status: 400 });
  }

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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "DSC | EPP Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "auftrag@dsc-logistik.de"],
      reply_to: email,
      subject: `Anfrage über die Website: ${name}${data.company ? ` (${data.company.trim()})` : ""}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend-Fehler:", res.status, detail);
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
