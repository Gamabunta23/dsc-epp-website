"use client";

import { motion } from "motion/react";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
};

const services: Service[] = [
  {
    title: "Überseecontainer-Transport",
    description:
      "Vom Tiefseehafen bis zur Werkrampe. Routenoptimiert, getrackt, pünktlich.",
    highlights: ["20′ Heckbündig", "2×20′ DC", "40′ DC/HC", "45′ Multi-Gooseneck"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <rect x="4" y="10" width="24" height="12" rx="1" />
        <path d="M8 10v12M12 10v12M16 10v12M20 10v12M24 10v12" />
      </svg>
    ),
  },
  {
    title: "Multimodale Verkehre",
    description:
      "Straße, Schiene, Wasser intelligent verknüpft — wirtschaftlich und CO₂-effizient.",
    highlights: ["Hafenanbindung", "Bahn-Hub OWL", "Kombiverkehr", "Door-to-door"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <path d="M4 22h24M6 22V10h12v12M18 14h8v8M9 22v3M23 22v3" />
        <circle cx="11" cy="22" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="22" cy="22" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Reefer / Kühlcontainer",
    description:
      "Temperaturkontrollierte Transporte mit Gen-Set. Lückenlose Kühlkette in 20′ und 40′.",
    highlights: ["−25 °C bis +25 °C", "Gen-Set Trailer", "Pharma-tauglich", "Live-Temp"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <path d="M16 4v24M5 10l22 12M5 22l22-12" />
        <path d="M16 8l-3 3M16 8l3 3M16 24l-3-3M16 24l3-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "VGM-Verwiegung",
    description:
      "Zertifizierte Bruttogewichtsermittlung nach SOLAS — direkt beim Umschlag.",
    highlights: ["Method 1 & 2", "SOLAS-konform", "Zertifikat digital", "Hafen-Schnittstellen"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <path d="M16 4v6M9 10h14M7 28h18M16 10v18" />
        <path d="M11 14l-3 8h6l-3-8zM21 14l-3 8h6l-3-8z" />
      </svg>
    ),
  },
  {
    title: "Container-Lagerung",
    description:
      "Zwischenlagerung an beiden Hubs. Flexible Standzeiten, sichere Plätze.",
    highlights: ["Hamburg-Hafen-nah", "OWL-Depot", "Reefer-Stromplätze", "24/7 Zugang"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <rect x="4" y="16" width="10" height="6" />
        <rect x="14" y="16" width="10" height="6" />
        <rect x="9" y="10" width="10" height="6" />
        <rect x="4" y="22" width="24" height="6" />
      </svg>
    ),
  },
  {
    title: "Container-Verkauf",
    description:
      "Neu und gebraucht. Standard, High-Cube, Reefer, Spezialmaße — direkt ab Depot.",
    highlights: ["Sofort verfügbar", "Geprüfter Zustand", "Bundesweite Lieferung", "Beratung"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4">
        <rect x="6" y="8" width="20" height="16" rx="1" />
        <path d="M6 14h20M16 8v16" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="relative py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Leistungen
          </p>
          <h2 className="headline text-4xl md:text-6xl text-slate-950">
            Ein Portfolio, das den Hafen,
            <br />
            <span className="text-slate-500">die Schiene und die Rampe versteht.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200/60 rounded-3xl overflow-hidden">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative bg-white p-8 lg:p-10 hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950 text-white mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-950 tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{s.description}</p>
              <ul className="mt-6 space-y-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-sky-600 shrink-0" fill="none" strokeWidth="2" stroke="currentColor">
                      <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
