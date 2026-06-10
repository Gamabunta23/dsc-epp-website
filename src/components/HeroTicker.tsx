"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Tagesseed → reproduzierbar gleicher Wert für alle Besucher am selben Tag,
 * neuer Wert am nächsten Tag. Sieht „live" aus ohne Backend.
 */
function dailyTourCount(): number {
  const d = new Date();
  let seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
  // xorshift32-artiges Mixing für gute Verteilung
  seed = ((seed ^ (seed >>> 15)) * 2246822507) | 0;
  seed = ((seed ^ (seed >>> 13)) * 3266489909) | 0;
  seed = seed ^ (seed >>> 16);
  const variation = Math.abs(seed) % 21; // 0–20
  return 50 + variation; // 50–70
}

/**
 * Live-Daten-Atmosphäre unter dem Hero-Subheadline.
 * Sehr dezent — kein „SaaS-Dashboard", sondern Spedition-Pulsschlag.
 */
export default function HeroTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [tourCount, setTourCount] = useState<number | null>(null);

  // Client-only — vermeidet Hydration-Mismatch bei Server-Render mit anderer TZ.
  useEffect(() => {
    setTourCount(dailyTourCount());
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-10 flex justify-center"
    >
      <div className="inline-flex items-center flex-wrap justify-center gap-y-2 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/70 dark:border-slate-800/80 shadow-lg shadow-slate-950/[0.04] dark:shadow-black/20 px-2 py-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        {/* LIVE */}
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-600 dark:bg-sky-400" />
          </span>
          <span className="tracking-[0.18em] text-[11px] uppercase">Live</span>
        </span>

        <Divider />

        {/* Touren-Counter */}
        <span className="px-3.5">
          <Metric label="Touren heute" value={tourCount} inView={inView} />
        </span>

        <Divider />

        {/* Route mit wanderndem Punkt */}
        <span className="inline-flex items-center gap-2.5 px-3.5">
          <span>Terminal</span>
          <span className="relative inline-block w-10 h-px bg-slate-200 dark:bg-slate-700 overflow-visible" aria-hidden>
            <span className="route-dot absolute top-1/2 -translate-y-1/2 h-[5px] w-[5px] rounded-full bg-sky-500 dark:bg-sky-400" />
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Bundesweit</span>
        </span>
      </div>

      <style jsx global>{`
        .route-dot {
          animation: ticker-travel 2.6s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.7);
        }
        @keyframes ticker-travel {
          0%   { left: -2px; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: calc(100% - 3px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-dot { animation: none; left: 50%; opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}

function Divider() {
  return <span className="hidden sm:inline-block h-4 w-px bg-slate-200 dark:bg-slate-700/80" aria-hidden />;
}

function Metric({ label, value, inView }: { label: string; value: number | null; inView: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [display, setDisplay] = useState("—");

  useEffect(() => {
    if (!inView || value == null) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, mv, rounded]);

  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-slate-900 dark:text-slate-100 font-semibold tabular-nums">{display}</span>
      <span>{label}</span>
    </span>
  );
}
