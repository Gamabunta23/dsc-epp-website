"use client";

import { motion } from "motion/react";

export default function KarriereHero() {
  return (
    <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Cinematic Atmosphere — flowing routes + ambient orbs */}
      <CinematicBackdrop />

      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white dark:from-slate-950/0 dark:via-slate-950/40 dark:to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center">
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
          Wir wachsen — und suchen Verstärkung.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="headline text-[clamp(2.5rem,7vw,6rem)] text-slate-950 dark:text-white"
        >
          Karriere
          <br />
          <span className="bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-slate-400 dark:to-white bg-clip-text text-transparent">
            mit Substanz.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Familiengeführter Mittelstand, moderne Flotte, klare Touren. Bei{" "}
          <span className="whitespace-nowrap">
            DSC<span className="text-slate-400 dark:text-slate-500"> | </span>EPP Logistik
          </span>{" "}
          werden Sie nicht zur Nummer — Sie werden Teil der Disposition.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Cinematic-Layer — fließende Routen-Kurven + 3 ambient Orbs.
 * Komplett dezent, respektiert prefers-reduced-motion via globals.css.
 */
function CinematicBackdrop() {
  return (
    <>
      {/* Ambient gradient orbs — sehr soft, blur, langsam pulsierend */}
      <motion.div
        className="absolute top-20 -left-20 w-[480px] h-[480px] rounded-full bg-sky-200/30 dark:bg-sky-500/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-32 w-[560px] h-[560px] rounded-full bg-slate-300/40 dark:bg-slate-700/20 blur-3xl pointer-events-none"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full bg-sky-100/40 dark:bg-sky-400/8 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      {/* Flowing route curves — SVG mit animated dashes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <motion.path
          d="M -100 280 Q 350 180 700 320 T 1500 240"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1.2}
          strokeDasharray="4 12"
          opacity={0.35}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
          style={{ animation: "route-flow-slow 6s linear infinite" }}
        />
        <motion.path
          d="M -100 540 Q 400 480 800 600 T 1500 540"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1.2}
          strokeDasharray="4 12"
          opacity={0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2.5, delay: 0.9, ease: "easeInOut" }}
          style={{ animation: "route-flow-slow 7s linear infinite", animationDelay: "-2s" }}
        />
        <motion.path
          d="M -100 400 Q 500 350 900 440 T 1500 380"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1}
          strokeDasharray="3 14"
          opacity={0.18}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{ duration: 2.5, delay: 1.2, ease: "easeInOut" }}
          style={{ animation: "route-flow-slow 8s linear infinite", animationDelay: "-4s" }}
        />
      </svg>

      <style jsx>{`
        @keyframes route-flow-slow {
          to {
            stroke-dashoffset: -64;
          }
        }
      `}</style>
    </>
  );
}
