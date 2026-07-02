@AGENTS.md

# Project Context

This is the **DSC | EPP Logistik GmbH** corporate website — a merged logistics
company (DSC Logistik aus Hamburg + EPP Logistik aus Ostwestfalen-Lippe), new
Hauptsitz in Bakum (Essener Str. 39, 49456 Bakum).

**Design direction:** Apple-style minimalism, headline tightness (`-0.045em`),
generous whitespace, scroll-driven Framer Motion. Single accent color
(`sky-700` / `#0369A1`) on slate-950 ink. Alternating light/dark sections.

## Routes (Stand)

- `/` — Landing Page (Hero, Journey, Stats, Services, Containers, Fleet,
  Fahrzeitrechner, Locations, About, Contact)
- `/karriere` — Hero, 6 Werte, 3 Job-Listings, Initiativ-CTA
- `/impressum` `/datenschutz` `/agb` — Legal-Stubs mit LegalShell-Layout

## Key facts

- 3 Standorte: **Bakum** (Hauptsitz, A1-Verteil-Hub), **Hamburg** (Hafen-Hub),
  **OWL** (Inland-Hub). Bakum-Karte ist dunkel-themed mit "HAUPTSITZ"-Badge.
- Logo-Varianten: `logo.jpg` (white-on-black für Footer/Truck), `logo-light.webp`
  (grey-on-white für Nav).
- Email: `info@dsc-logistik.de` (Bakum + Hamburg), `info@epp-logistik.de` (OWL),
  `bewerbung@dsc-logistik.de` für Karriere-Apply-Buttons.

## 15 Container-Varianten

Alle haben Detail-Modal mit voller Spec-Tabelle:
20' Std, 20' HC, 2×20' Kombi, 40' Std, 40' HC, 45' HC, 20' Reefer,
40' HC Reefer, 20' OT, 20' OT HC, 40' OT, 40' OT HC, 20' Flat Rack,
40' Flat Rack, Tankcontainer.

Spec-Type unterstützt: `exterior`, `interior`, `door`, `roof`, `maxGross`,
`tare`, `maxPayload`, `volume` (alle optional, Modal lässt fehlende Felder weg).

`ContainerIllustration.tsx` rendert pro Variante ein 3/4-Iso-SVG mit
brand-konsistenten Farben. Spezielle Render-Pfade für Flat-Rack (offen,
2 Stirnwände + Plattform) und Tank (Wireframe-Frame + Zylinder).

`photo?` Type-Feld bleibt als Infrastruktur — falls später eine
professionelle Bilderserie kommt, ist die Anbindung 1 Zeile pro Container.

## Hero-Animation "bewegen"

Wort "bewegen." wird zyklisch (~10s Cycle) durch einen Premium-Sattelzug
ersetzt, der nach rechts aus dem Bild fährt. Truck-Komponente in
`BewegenAnimation.tsx`:
- 5 Räder (3 Tridem-Trailer + 2 SZM), Alu-Felgen mit 10 Speichen
- Volvo-FH-Stil Cab mit aero-Dachspoiler, LED-Lichtleiste, geschwungene
  Windschutzscheibe, Außenspiegel
- Container mit ISO-Eckbeschlägen, Korrugation, DSC|EPP Brand-Decal
- `prefers-reduced-motion` greift statisch

## Fahrzeitrechner

3 Fahrzeuge: Transporter (95), LKW 7,5t (75), SZM 40t (75 km/h, Default).
EU-VO 561/2006 Pausen (45 min nach 4,5 h, max 9 h Tag, 11 h Ruhezeit).
Stadt-Zuschlag +15 %. Startzeit-Picker → Ankunftszeit live berechnet.
Hydration-mismatch vermieden via useEffect-Init der Startzeit.

## public/signatur/ — NIEMALS löschen

Die Bilder in `public/signatur/` werden von den Outlook-E-Mail-Signaturen
aller Mitarbeiter per URL referenziert (`https://www.dsc-epp.de/signatur/...`).
Die Website nutzt sie nicht — sie sind trotzdem KEIN Dead-Asset. Nie löschen,
nie umbenennen; Austausch nur unter gleichem Dateinamen. Details:
`public/signatur/README.md`.

## Open items (do not invent values, ask the user)

- Bakum Telefon + WhatsApp: Platzhalter `+49 4446 000000` / `+49 000 0000000`
- Kontaktformular: API-Route fertig (/api/contact, Resend) — RESEND_API_KEY
  in .env setzen, bis dahin mailto:-Fallback
- 21st.dev API-Key: Platzhalter in `.mcp.json`
- Impressum: Geschäftsführer, HRB, USt-IdNr, Versicherung
- Datenschutz: Hosting-Anbieter
- Domain dsc-epp.de: metadataBase in layout.tsx, sitemap.ts + robots.ts
  müssen bei anderer Domain angepasst werden
- AGB: braucht Rechtsprüfung

## Architecture conventions

- Next.js 16 App Router. Read bundled docs at
  `node_modules/next/dist/docs/` before using unfamiliar Next APIs.
- All animated components are `"use client"`, import from `motion/react`.
- Design tokens in `src/app/globals.css` under `:root`. Never hard-code
  colors — use Tailwind tokens or CSS variables.
- Nav + Footer leben in `app/layout.tsx` (RootLayout) — alle Sub-Routes
  erben sie automatisch. Anchor-Links in Nav/Footer nutzen
  `usePathname()` um `#xy` (auf Home) vs `/#xy` (auf Sub-Route) zu wählen.
- Container-Section: Scrollbar ausgeblendet via `.no-scrollbar` utility,
  Scroll-Hint via animierter Sky-Pill + Edge-Fade.
- UI UX Pro Max skill in `.claude/skills/ui-ux-pro-max/` triggers on
  design-related actions. Run
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py` before adding
  new sections to get palette/typography recommendations.

## Dev workflow

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
cd "/Users/artur/Claude Code/website-stack"
npm run dev
```

Cloudflare-Tunnel für öffentliche Demo:
`~/.local/bin/cloudflared tunnel --url http://localhost:3000`.
Allowed origins in `next.config.ts` (`*.trycloudflare.com`, `*.ngrok.io`).

## Foto-Pipeline (deaktiviert, Infrastruktur liegt aber bereit)

`scripts/process-containers.py` enthält eine PIL-Pipeline zum Vereinheitlichen
von Container-Fotos (BG entfernen, Slate-Color-Grade, weicher Schatten,
optional DSC|EPP-Decal-Composite). Aktuell ungenutzt — siehe Commit
`0115ba2` warum (Quellbild-Qualität + Fremd-Branding-Probleme).
Bei einer professionellen Bilderserie reaktivieren: Bilder in
`/Container-Bilder/` ablegen, Pipeline laufen lassen, `photo?`-Field
in `Containers.tsx` setzen.
