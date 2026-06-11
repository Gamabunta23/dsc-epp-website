"use client";

import { motion } from "motion/react";

export default function KarriereInitiativ() {
  return (
    <section className="relative py-24 lg:py-40 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-950 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium text-sky-400 uppercase tracking-[0.15em] mb-4">
            Initiativbewerbung
          </p>
          <h2 className="headline text-4xl md:text-6xl">
            Keine passende Stelle?
            <br />
            <span className="text-slate-400">Bewerben Sie sich trotzdem.</span>
          </h2>
          <p className="mt-8 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Gute Leute finden bei uns immer einen Platz. Schicken Sie uns Ihre
            Unterlagen mit ein paar Sätzen zu Ihrer Erfahrung und dem
            Wunschstandort — wir melden uns innerhalb einer Woche.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:bewerbung@dsc-logistik.de?subject=Initiativbewerbung"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-950 font-medium hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
            >
              bewerbung@dsc-logistik.de
              <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="tel:+494080903560"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              Lieber telefonieren?
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
            Persönlicher Kontakt: Personalabteilung in Bakum (Essener Str. 39, 49456 Bakum)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
