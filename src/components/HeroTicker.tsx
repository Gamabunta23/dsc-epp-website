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
      className="mt-10 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-[13px] font-medium text-slate-500 dark:text-slate-400"
    >
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/30 text-sky-700 dark:text-sky-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-600" />
        </span>
        <span className="tracking-[0.18em] text-[11px] uppercase">Live</span>
      </span>

      <Metric label="Touren heute" value={tourCount} inView={inView} />
      <Separator />
      <span>
        vom Terminal <span className="text-slate-300">→</span>{" "}
        <span className="text-slate-900 dark:text-slate-100 font-semibold">Bundesweit</span>
      </span>
    </motion.div>
  );
}

function Separator() {
  return <span className="text-slate-300 hidden sm:inline" aria-hidden>·</span>;
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
