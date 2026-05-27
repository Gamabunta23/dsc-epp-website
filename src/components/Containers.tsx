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
