import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Solange die Seite NICHT unter der echten Domain dsc-epp.de läuft (also auf der
 * Hetzner-Test-URL / sslip.io), schicken wir Suchmaschinen einen
 * `X-Robots-Tag: noindex`-Header — die Vorschau landet so nicht bei Google.
 *
 * Sobald dsc-epp.de angebunden ist, greift die Sperre automatisch nicht mehr,
 * und die Seite wird normal indexiert. Keine weitere Anpassung nötig.
 *
 * (Next.js 16: `proxy` ersetzt das frühere `middleware`.)
 */
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (!host.includes("dsc-epp.de")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  // alle Seitenpfade, statische Assets/Bilder ausgenommen
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
