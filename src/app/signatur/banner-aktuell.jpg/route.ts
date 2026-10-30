import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This stable URL is embedded in email signatures. Never remove it.
// Outside approved campaigns serve a transparent 1120x1 strip. The email's
// width=560 / height=auto collapses it to half a pixel without a broken image.
const campaigns = [
  { from: "2026-10-30", until: "2026-11-02", file: "banner-halloween-2026.jpg" },
];

export async function GET() {
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Berlin",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  const campaign = campaigns.find(({ from, until }) => today >= from && today < until);
  const root = path.join(process.cwd(), "public", "signatur", "v2");
  let bytes: Buffer;
  let contentType = campaign ? "image/jpeg" : "image/png";
  try {
    bytes = await readFile(path.join(root, campaign?.file ?? "banner-leer.png"));
  } catch (error) {
    if (!campaign) throw error;
    bytes = await readFile(path.join(root, "banner-leer.png"));
    contentType = "image/png";
  }
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `inline; filename="dsc-epp-banner.${contentType === "image/png" ? "png" : "jpg"}"`,
    },
  });
}
