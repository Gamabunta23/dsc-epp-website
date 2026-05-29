# DSC | EPP Logistik GmbH — Corporate Website

Apple-style Landing Page für die neue Firma DSC | EPP Logistik GmbH.

## Stack

- **Next.js 16.2** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** (`motion@12`) – Scroll-Animationen, Hero-Parallax, Counter
- **Plus Jakarta Sans** als Hausschrift
- **UI UX Pro Max Skill** (Design Intelligence) – in `.claude/skills/ui-ux-pro-max/`
- **21st.dev Magic MCP** (Komponenten on demand) – konfiguriert in `.mcp.json`

## Standorte (aktueller Datenstand)

| Standort | Rolle | Status |
|---|---|---|
| **Bakum** (Essener Str. 39, 49456 Bakum) | Hauptsitz | ✅ Adresse + Email · ⏳ Telefon/WhatsApp Platzhalter |
| **Hamburg** | Hafen-Hub | ✅ vollständig |
| **Ostwestfalen-Lippe** | Inland-Hub | ✅ vollständig |

Bakum-Kontaktdaten in [`src/components/Locations.tsx`](src/components/Locations.tsx): Telefon `+49 4446 000000` und WhatsApp `+49 000 0000000` müssen noch ersetzt werden.

## Lokal weiterarbeiten

```bash
# Node via nvm laden (nur falls "node" im Terminal nicht gefunden wird)
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"

cd "/Users/artur/Claude Code/website-stack"
npm run dev
```

Dann **http://localhost:3000** öffnen.

## Öffentlich teilbarer Link (Cloudflare Tunnel)

Solange der Mac läuft, lässt sich ein temporärer öffentlicher Link erzeugen:

```bash
~/.local/bin/cloudflared tunnel --url http://localhost:3000
```

In der Ausgabe steht eine URL der Form `https://xxx-xxx-xxx.trycloudflare.com`. Der Link bleibt aktiv solange der Befehl läuft.

Erlaubte Origins für den Dev-Server sind in [`next.config.ts`](next.config.ts) konfiguriert (`*.trycloudflare.com`, `*.ngrok.io`, WLAN-IP).

## Produktions-Build

```bash
npm run build
npm run start    # läuft auf Port 3000
```

## Projektstruktur

```
src/
├── app/
│   ├── layout.tsx        # Plus Jakarta Sans + Metadata
│   ├── globals.css       # Design Tokens (slate-950 ink, sky-700 accent)
│   ├── page.tsx          # Section-Komposition
│   └── icon.png          # Favicon
└── components/
    ├── Nav.tsx           # Sticky floating Nav mit Blur-Backdrop
    ├── Hero.tsx          # Parallax-Hero mit Scroll-Indikator
    ├── Stats.tsx         # Animierte Zahlen-Counter
    ├── Services.tsx      # 6-Karten Bento-Grid
    ├── Containers.tsx    # Horizontal-Scroll Container-Equipment (dark)
    ├── Fleet.tsx         # Truck-Illustration mit Logo + Tech-Features
    ├── Fahrzeitrechner.tsx  # Live-Tour-Kalkulator (EU 561, SZM 40t etc.)
    ├── Locations.tsx     # 3 Hub-Cards (Bakum als Featured/Dark)
    ├── About.tsx         # Merger-Story + 4 Werte
    ├── Contact.tsx       # Anfrage-Formular (Stub – kein Email-Backend)
    └── Footer.tsx        # Sitemap + Hauptsitz-Adresse
```

## Logo-Versionen

- `public/logo.jpg` – Schwarzer Hintergrund (Footer + Truck-SVG)
- `public/logo-light.webp` – Weißer Hintergrund (Nav)
- `src/app/icon.png` – Favicon (Wave-Crop)
- `public/apple-icon.png` – iOS Home-Screen Icon

## Offene Punkte

- [ ] Echtes Telefon + WhatsApp für Bakum in `src/components/Locations.tsx`
- [ ] Kontaktformular an SMTP / Resend / Service anbinden (aktuell Stub)
- [ ] 21st.dev API-Key in `.mcp.json` eintragen (von https://21st.dev/magic/console)
- [ ] Impressum, Datenschutz, AGB als eigene Routen (`/impressum`, `/datenschutz`, `/agb`)
- [ ] Karriere-Seite mit Job-Listings
- [ ] Deploy auf Vercel + eigene Domain
