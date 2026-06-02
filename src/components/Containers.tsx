"use client";

import { motion } from "motion/react";

type ContainerType = {
  size: string;
  name: string;
  cbm: string;
  payload: string;
  notes: string;
};

const types: ContainerType[] = [
  { size: "20′", name: "Standard DC", cbm: "33 m³", payload: "~28 t", notes: "Heckbündig fahrbar" },
  { size: "2 × 20′", name: "DC kombiniert", cbm: "66 m³", payload: "~50 t", notes: "Ein Chassis, zwei Boxen" },
  { size: "40′", name: "DC", cbm: "67 m³", payload: "~26 t", notes: "Standard-Volumen-Transport" },
  { size: "40′ HC", name: "High Cube", cbm: "76 m³", payload: "~26 t", notes: "30 cm mehr Innenhöhe" },
  { size: "45′", name: "Multi-Gooseneck", cbm: "86 m³", payload: "~28 t", notes: "Maximum-Kapazität" },
  { size: "20/40′", name: "Reefer Gen-Set", cbm: "28–67 m³", payload: "~25 t", notes: "−25 bis +25 °C" },
  { size: "OT/FR", name: "Spezial", cbm: "n. Maß", payload: "n. Vorgabe", notes: "Über­breite / Über­höhe" },
];

export default function Containers() {
  return (
    <section id="container" className="relative py-24 lg:py-40 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* Containerschiff-Silhouette */}
      <div className="absolute -bottom-4 inset-x-0 pointer-events-none">
        {/* Soft glow unter dem Schiff für Tiefe */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-sky-500/10 blur-3xl" />

        <svg
          aria-hidden
          viewBox="0 0 1200 240"
          className="relative w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="hull" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Wasser-Verlauf */}
          <rect x="0" y="220" width="1200" height="20" fill="url(#water)" />
          {/* Wasserlinie + Wellen */}
          <path d="M0 220 L1200 220" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="6 8" fill="none" />
          <path d="M0 232 Q30 228 60 232 T120 232 T180 232 T240 232 T300 232 T360 232 T420 232 T480 232 T540 232 T600 232 T660 232 T720 232 T780 232 T840 232 T900 232 T960 232 T1020 232 T1080 232 T1140 232 T1200 232" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1" fill="none" />

          {/* Schiff-Rumpf */}
          <path d="M120 220 L1080 220 L1040 195 L160 195 Z" fill="url(#hull)" stroke="#cbd5e1" strokeOpacity="0.35" strokeWidth="1" />
          {/* Bullaugen-Reihe entlang des Rumpfs */}
          <g fill="#0ea5e9" opacity="0.4">
            <circle cx="220" cy="208" r="2" />
            <circle cx="280" cy="208" r="2" />
            <circle cx="340" cy="208" r="2" />
            <circle cx="400" cy="208" r="2" />
            <circle cx="460" cy="208" r="2" />
            <circle cx="520" cy="208" r="2" />
            <circle cx="580" cy="208" r="2" />
            <circle cx="640" cy="208" r="2" />
            <circle cx="700" cy="208" r="2" />
            <circle cx="760" cy="208" r="2" />
            <circle cx="820" cy="208" r="2" />
            <circle cx="880" cy="208" r="2" />
            <circle cx="940" cy="208" r="2" />
            <circle cx="1000" cy="208" r="2" />
          </g>

          {/* Container-Stacks */}
          {(() => {
            const cells = [];
            // Reihe 1 (unten) — 12 Container
            for (let i = 0; i < 12; i++) cells.push({ x: 210 + i * 65, y: 165, row: 1 });
            // Reihe 2 — gestaffelt
            const row2 = [275, 340, 470, 535, 600, 665, 730, 860];
            row2.forEach((x) => cells.push({ x, y: 132, row: 2 }));
            // Reihe 3 — Spitze
            [535, 600, 665].forEach((x) => cells.push({ x, y: 99, row: 3 }));

            // Akzent-Container in Brand-Sky-Blue (markante Streuung)
            const accentIdx = new Set([2, 5, 9, 13, 16, 20]);
            const reeferIdx = new Set([7, 18]); // Reefer-Andeutung in Cyan

            return cells.map((c, idx) => {
              let fill = "#cbd5e1";
              let fillOpacity = 0.55;
              if (accentIdx.has(idx)) { fill = "#0284c7"; fillOpacity = 0.85; }
              else if (reeferIdx.has(idx)) { fill = "#06b6d4"; fillOpacity = 0.8; }
              return (
                <g key={idx}>
                  <rect x={c.x} y={c.y} width="60" height="30" fill={fill} fillOpacity={fillOpacity} />
                  <rect x={c.x} y={c.y} width="60" height="30" fill="none" stroke="#0f172a" strokeOpacity="0.4" strokeWidth="0.5" />
                  {/* Container-Türschlitz */}
                  <line x1={c.x + 56} y1={c.y + 4} x2={c.x + 56} y2={c.y + 26} stroke="#0f172a" strokeOpacity="0.5" strokeWidth="0.5" />
                </g>
              );
            });
          })()}

          {/* Brücke */}
          <rect x="170" y="150" width="42" height="50" fill="url(#hull)" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" />
          {/* Brücken-Fenster (leuchten leicht) */}
          <g fill="#38bdf8" opacity="0.55">
            <rect x="178" y="158" width="6" height="5" />
            <rect x="188" y="158" width="6" height="5" />
            <rect x="198" y="158" width="6" height="5" />
            <rect x="178" y="167" width="6" height="5" />
            <rect x="188" y="167" width="6" height="5" />
            <rect x="198" y="167" width="6" height="5" />
          </g>
          {/* Schornstein */}
          <rect x="188" y="115" width="18" height="35" fill="#475569" fillOpacity="0.7" stroke="#cbd5e1" strokeOpacity="0.3" strokeWidth="1" />
          {/* Schornstein-Akzent */}
          <rect x="190" y="118" width="14" height="6" fill="#0284c7" fillOpacity="0.7" />
          {/* Mast */}
          <line x1="196" y1="115" x2="196" y2="95" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="196" cy="93" r="2" fill="#38bdf8" opacity="0.8" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-400 uppercase tracking-[0.15em] mb-4">
            Container-Equipment
          </p>
          <h2 className="headline text-4xl md:text-6xl">
            Vom Standard-Box
            <br />
            <span className="text-slate-500">bis zum Spezialmaß.</span>
          </h2>
          <p className="mt-6 text-slate-400 max-w-xl">
            Sieben Equipment-Varianten — von 20′ bis 45′, Reefer und Open-Top.
            Horizontal scrollen für alle Spezifikationen.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto snap-x-mandatory px-6 lg:px-10 pb-6 [scrollbar-width:thin]">
          {types.map((t, i) => (
            <motion.div
              key={t.size + t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="snap-start-x shrink-0 w-[280px] sm:w-[320px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-8 hover:border-sky-500/40 transition-colors duration-300"
            >
              <div className="text-sky-400 text-xs font-mono uppercase tracking-widest">
                {t.size}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t.name}</h3>
              <div className="mt-8 space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Volumen</span>
                  <span className="font-medium tabular-nums">{t.cbm}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Zuladung</span>
                  <span className="font-medium tabular-nums">{t.payload}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hinweis</span>
                  <span className="font-medium text-right">{t.notes}</span>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="shrink-0 w-6" />
        </div>
      </div>
    </section>
  );
}
