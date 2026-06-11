"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BewegenAnimation from "./BewegenAnimation";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-x-clip bg-white dark:bg-slate-950"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white dark:from-slate-950/0 dark:via-slate-950/40 dark:to-slate-950 pointer-events-none" />

      <motion.div
        style={{ y, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-24 text-center"
      >
        {/* Scroll-Fade nur auf Text/CTAs — die Suche (unten) bleibt voll
            deckend, damit das offene Dropdown nie transparent wird */}
        <motion.div style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-600" />
          </span>
          Überseecontainer-Spezialist · Hamburg → Bakum → Inland
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="headline text-[clamp(2.75rem,9vw,8rem)] text-slate-950 dark:text-white"
        >
          Container
          <br />
          <BewegenAnimation />
          <br />
          <span className="bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-slate-400 dark:to-white bg-clip-text text-transparent">
            Märkte verbinden.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          DSC <span className="text-slate-400 dark:text-slate-500">|</span> EPP Logistik GmbH —
          Überseecontainer, multimodale Verkehre und Just-in-Time-Lieferung.
          Hauptsitz Bakum an der A1, Hubs am Hamburger Hafen und in Ostwestfalen-Lippe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            Transport anfragen
            <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#leistungen"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-slate-900 dark:text-slate-100 font-medium hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-200 cursor-pointer"
          >
            Leistungen entdecken
          </a>
        </motion.div>
        </motion.div>

        <HeroSearch />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sky-700 dark:text-sky-400"
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.2em]"
          style={{ textShadow: "0 0 12px rgba(56, 189, 248, 0.6)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-0.5 rounded-full bg-gradient-to-b from-sky-500 dark:from-sky-400 to-transparent"
          style={{ boxShadow: "0 0 10px rgba(56, 189, 248, 0.55)" }}
        />
      </motion.div>
    </section>
  );
}
