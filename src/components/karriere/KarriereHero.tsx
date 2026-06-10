"use client";

import { motion } from "motion/react";

export default function KarriereHero() {
  return (
    <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 bg-slate-100 dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Cinematic Atmosphere — flowing routes + ambient orbs, ÜBER dem Grid */}
      <CinematicBackdrop />

      {/* Bottom-Fade nur unten, damit Orbs frei strahlen */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-100 dark:from-slate-950 to-transparent pointer-events-none" />

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
 * Cinematic-Layer — 3 ambient Orbs + 3 fließende Routen-Kurven.
 * Komplett pure CSS — kein Framer-Tick pro Frame, GPU-Compositor-only.
 */
function CinematicBackdrop() {
  return (
    <>
      {/* Ambient gradient orbs — pure CSS keyframes auf GPU-Compositor */}
      <div className="orb orb-1 absolute top-20 -left-20 w-[480px] h-[480px] rounded-full bg-sky-300/60 dark:bg-sky-500/30 blur-3xl pointer-events-none" />
      <div className="orb orb-2 absolute top-40 -right-32 w-[560px] h-[560px] rounded-full bg-slate-400/50 dark:bg-slate-600/40 blur-3xl pointer-events-none" />
      <div className="orb orb-3 absolute bottom-20 left-1/3 w-[420px] h-[420px] rounded-full bg-sky-200/60 dark:bg-sky-400/20 blur-3xl pointer-events-none" />

      {/* Flowing route curves — pure CSS dash-flow, kein Motion-Wrapper */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          className="route route-1"
          d="M -100 280 Q 350 180 700 320 T 1500 240"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.35}
        />
        <path
          className="route route-2"
          d="M -100 540 Q 400 480 800 600 T 1500 540"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.22}
        />
        <path
          className="route route-3"
          d="M -100 400 Q 500 350 900 440 T 1500 380"
          fill="none"
          stroke="rgb(3 105 161)"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.18}
        />
      </svg>

      <style jsx global>{`
        .orb {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .orb-1 { animation: orb-a 9s ease-in-out infinite; }
        .orb-2 { animation: orb-b 11s ease-in-out infinite 1.2s; }
        .orb-3 { animation: orb-c 10s ease-in-out infinite 2.5s; }
        @keyframes orb-a {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: 0.6; }
          50%      { transform: translate3d(0,0,0) scale(1.08); opacity: 0.85; }
        }
        @keyframes orb-b {
          0%, 100% { transform: translate3d(0,0,0) scale(1.05); opacity: 0.4; }
          50%      { transform: translate3d(0,0,0) scale(1); opacity: 0.7; }
        }
        @keyframes orb-c {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: 0.5; }
          50%      { transform: translate3d(0,0,0) scale(1.1); opacity: 0.8; }
        }
        .route {
          will-change: transform;
          transform-box: view-box;
          transform-origin: center;
          stroke: rgb(14 165 233);
          filter: drop-shadow(0 0 4px rgba(14, 165, 233, 0.4))
                  drop-shadow(0 0 10px rgba(14, 165, 233, 0.18));
        }
        .dark .route {
          stroke: rgb(56 189 248);
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.55))
                  drop-shadow(0 0 14px rgba(56, 189, 248, 0.3));
        }
        .route-1 { animation: wave-a 9s ease-in-out infinite; }
        .route-2 { animation: wave-b 11s ease-in-out infinite; }
        .route-3 { animation: wave-c 10s ease-in-out infinite; }
        @keyframes wave-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(0, -14px, 0); }
        }
        @keyframes wave-b {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(0, 12px, 0); }
        }
        @keyframes wave-c {
          0%, 100% { transform: translate3d(0, -6px, 0); }
          50%      { transform: translate3d(0, 10px, 0); }
        }
      `}</style>
    </>
  );
}
