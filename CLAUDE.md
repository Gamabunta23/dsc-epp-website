@AGENTS.md

# Project Context

This is the **DSC | EPP Logistik GmbH** corporate website — a merged logistics
company (DSC Logistik aus Hamburg + EPP Logistik aus Ostwestfalen-Lippe), new
Hauptsitz in Bakum (Essener Str. 39, 49456 Bakum).

**Design direction:** Apple-style minimalism, headline tightness (`-0.045em`),
generous whitespace, scroll-driven Framer Motion. Single accent color
(`sky-700` / `#0369A1`) on slate-950 ink. Alternating light/dark sections.

**Key facts to remember:**

- The merged company has **3 standorte**, with **Bakum as Hauptsitz** (zentrale
  Disposition + Verwaltung), Hamburg as Hafen-Hub, OWL als Inland-Hub.
- Both legacy email domains still work: `info@dsc-logistik.de` (used in Bakum +
  Hamburg) and `info@epp-logistik.de` (used in OWL).
- The Bakum card is visually featured (dark slate-950 background with
  „HAUPTSITZ" badge). The other two cards are light/white.
- Two logo variants exist in `public/`: `logo.jpg` (white-on-black, used in
  Footer + Truck SVG) and `logo-light.webp` (grey-on-white, used in Nav).

**Open items (do not invent values, ask the user):**

- Bakum phone + WhatsApp are placeholders (`+49 4446 000000` / `+49 000 0000000`)
- Kontaktformular is a UI stub — no backend yet
- 21st.dev API-Key in `.mcp.json` is a placeholder

**Architecture:**

- Next.js 16 App Router. Read the bundled docs at
  `node_modules/next/dist/docs/` before using any Next API you're unsure about.
- All animated components are `"use client"` and import from `motion/react`
  (the new package name for Framer Motion).
- Design tokens live in `src/app/globals.css` under `:root`. Never hard-code
  colors — use Tailwind tokens or the CSS variables.
- The UI UX Pro Max skill in `.claude/skills/ui-ux-pro-max/` triggers on
  design-related actions. Run `python3 .claude/skills/ui-ux-pro-max/scripts/search.py`
  before adding new sections to get palette/typography recommendations.

**Dev workflow:**

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
cd "/Users/artur/Claude Code/website-stack"
npm run dev
```

For public sharing during dev: `~/.local/bin/cloudflared tunnel --url http://localhost:3000`.
The allowed origins are already configured in `next.config.ts`.
