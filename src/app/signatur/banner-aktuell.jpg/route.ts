import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This stable URL is embedded in email signatures. Never remove it.
// Add future approved seasonal artwork here; outside its window use the evergreen banner.
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
  try {
    bytes = await readFile(path.join(root, campaign?.file ?? "banner-standard.jpg"));
  } catch (error) {
    if (!campaign) throw error;
    bytes = await readFile(path.join(root, "banner-standard.jpg"));
  }
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": 'inline; filename="dsc-epp-banner.jpg"',
    },
  });
}
