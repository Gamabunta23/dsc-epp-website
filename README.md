# DSC | EPP Logistik GmbH — Corporate Website

Apple-style Landing Page für die neue Firma DSC | EPP Logistik GmbH.

## Stack

- **Next.js 16.2** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** (`motion@12`) – Scroll-Animationen, Hero-Parallax, Counter, Wortspiel-Animation
- **Plus Jakarta Sans** als Hausschrift
- **UI UX Pro Max Skill** (Design Intelligence) – in `.claude/skills/ui-ux-pro-max/`
- **21st.dev Magic MCP** (Komponenten on demand) – konfiguriert in `.mcp.json`

## Routes

- `/` — Landing Page mit allen Sections
- `/karriere` — Karriere-Seite mit Job-Listings + Initiativbewerbung
- `/impressum` — TMG-Pflichtangaben (Stub)
- `/datenschutz` — DSGVO-Erklärung (Stub)
- `/agb` — Allgemeine Geschäftsbedingungen (Stub mit ADSp-Hinweis)

## Standorte

| Standort | Rolle | Status |
|---|---|---|
| **Bakum** (Essener Str. 39, 49456 Bakum) | Hauptsitz | ✅ Adresse + Email · ⏳ Telefon/WhatsApp Platzhalter |
| **Hamburg** | Hafen-Hub | ✅ vollständig |
| **Ostwestfalen-Lippe** | Inland-Hub | ✅ vollständig |

Bakum-Kontaktdaten in [`src/components/Locations.tsx`](src/components/Locations.tsx): Telefon `+49 4446 000000` und WhatsApp `+49 000 0000000` müssen noch ersetzt werden.

## Container-Equipment (15 Varianten, alle mit vollen Specs)

| # | Container | Specs |
|---|---|---|
| 1 | 20′ Standard DC | ✅ |
| 2 | 20′ HC | ✅ |
| 3 | 2 × 20′ DC kombiniert | ✅ |
| 4 | 40′ Standard DC | ✅ |
| 5 | 40′ HC | ✅ |
| 6 | 45′ HC | ✅ |
| 7 | 20′ Reefer | ✅ |
| 8 | 40′ HC Reefer | ✅ |
| 9 | 20′ Open Top | ✅ |
| 10 | 20′ Open Top HC | ✅ |
| 11 | 40′ Open Top | ✅ |
| 12 | 40′ Open Top HC | ✅ |
| 13 | 20′ Flat Rack | ✅ |
| 14 | 40′ Flat Rack | ✅ |
| 15 | Tankcontainer | ✅ |

Click-to-Detail-Modal mit Apple-Style 3/4-Iso-Illustrationen pro Variante.

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
│   ├── layout.tsx              # Plus Jakarta Sans + Nav + Footer (Root-Layout)
│   ├── globals.css             # Design Tokens (slate-950 ink, sky-700 accent)
│   ├── page.tsx                # Landing-Page Section-Komposition
│   ├── icon.png                # Favicon (Wave-Crop des Logos)
│   ├── karriere/page.tsx       # Karriere-Route
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   └── agb/page.tsx
└── components/
    ├── Nav.tsx                 # Sticky Floating Nav mit Blur-Backdrop
    ├── Hero.tsx                # Parallax-Hero mit Scroll-Indikator
    ├── BewegenAnimation.tsx    # Wortspiel: "bewegen" → Container-Truck fährt weg
    ├── Journey.tsx             # 4-Etappen Vom Schiff bis zur Rampe
    ├── Stats.tsx               # Animierte Zahlen-Counter
    ├── Services.tsx            # 6-Karten Bento-Grid
    ├── Containers.tsx          # Horizontal-Scroll mit Container-Equipment + Modal
    ├── ContainerIllustration.tsx # SVG-Render pro Variant (Std/HC/Reefer/OT/FR/Tank)
    ├── ContainerDetailModal.tsx  # Apple-Style Modal mit Specs
    ├── Fleet.tsx               # Truck-Illustration mit Logo + Tech-Features
    ├── Fahrzeitrechner.tsx     # Live-Tour-Kalkulator (EU 561, SZM 40t, Stadt-Zuschlag)
    ├── Locations.tsx           # 3 Hub-Cards (Bakum als Featured/Dark)
    ├── About.tsx               # Merger-Story + 4 Werte
    ├── Contact.tsx             # Anfrage-Formular (Stub – kein Email-Backend)
    ├── Footer.tsx              # Sitemap + Hauptsitz-Adresse
    ├── karriere/
    │   ├── KarriereHero.tsx
    │   ├── KarriereValues.tsx  # 6 Werte (Moderne Flotte, klimatisierte Kabinen etc.)
    │   ├── KarriereJobs.tsx    # 3 Stellenangebote + mailto Bewerbung
    │   └── KarriereInitiativ.tsx
    └── legal/
        └── LegalShell.tsx      # Wiederverwendbares Layout für Impressum/Datenschutz/AGB
```

## Logo-Versionen

- `public/logo.jpg` – Schwarzer Hintergrund (Footer + Truck-SVG in Fleet)
- `public/logo-light.webp` – Weißer Hintergrund (Nav)
- `src/app/icon.png` – Favicon (Wave-Crop)
- `public/apple-icon.png` – iOS Home-Screen Icon

## Highlights

- **Hero**: "Container bewegen." mit animiertem Premium-Sattelzug (Volvo-FH-Stil) der nach jedem Loop wegfährt, 5 Räder mit Alu-Felgen
- **Journey-Section**: 4 Etappen vom Tiefseehafen Hamburg über VGM → Multimodal → Werks-Rampe, mit animiertem Container-Dot
- **Fahrzeitrechner**: 3 Fahrzeugtypen (Transporter 95 km/h · LKW 7,5t 75 km/h · SZM 40t 75 km/h), EU-VO 561/2006 Pflichtpausen, Stadt-Zuschlag, Ankunftszeit-Picker
- **Container-Equipment**: 15 Varianten als horizontal-scrollbare Karten, Click öffnet Detail-Modal mit Apple-Style 3/4-Iso-SVG + voller Spec-Tabelle
- **Containers-Section**: Mit dezenter Containerschiff-Silhouette im Hintergrund

## Offene Punkte

- [ ] Echtes Telefon + WhatsApp für Bakum in `src/components/Locations.tsx`
- [ ] Kontaktformular an SMTP / Resend / Service anbinden (aktuell Stub)
- [ ] 21st.dev API-Key in `.mcp.json` eintragen (von https://21st.dev/magic/console)
- [ ] Impressum: Geschäftsführer-Name, HRB, USt-IdNr, Versicherung eintragen
- [ ] Datenschutz: Hosting-Anbieter eintragen
- [ ] AGB: Rechtsprüfung durch Anwalt vor Going-Live
- [ ] Deploy auf Vercel + eigene Domain
- [ ] Optional: hochwertige Container-Fotos für die Karten (aktuell SVG-Skizzen)
