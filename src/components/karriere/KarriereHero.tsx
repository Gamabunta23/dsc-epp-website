"use client";

import { motion } from "motion/react";

export default function KarriereHero() {
  return (
    <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-600" />
          </span>
          Wir wachsen — und suchen Verstärkung.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="headline text-[clamp(2.5rem,7vw,6rem)] text-slate-950"
        >
          Karriere
          <br />
          <span className="bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900 bg-clip-text text-transparent">
            mit Substanz.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed"
        >
          Familiengeführter Mittelstand, moderne Flotte, klare Touren. Bei DSC
          <span className="text-slate-400"> | </span> EPP Logistik werden Sie nicht
          zur Nummer — Sie werden Teil der Disposition.
        </motion.p>
      </div>
    </section>
  );
}
