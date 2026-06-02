"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Animiert das Wort "bewegen" zu einem davonfahrenden Container-Truck:
 *   "bewegen" → fadet aus mit Blur
 *   Container-Truck rollt herein, dann mit drehenden Rädern aus dem Bild
 *   nach ~2 s wieder zurück zum Wort
 *
 * Loop alle ~7,5 s. Respektiert prefers-reduced-motion.
 */
export default function BewegenAnimation() {
  // "word" zeigt das geschriebene Wort, "truck" zeigt den Container
  const [phase, setPhase] = useState<"word" | "truck">("word");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    // Initiale Wartezeit, damit der Nutzer das Wort zuerst sieht
    const initial = window.setTimeout(() => setPhase("truck"), 2800);
    return () => window.clearTimeout(initial);
  }, [reduced]);

  // Zyklus weiterführen: nach Truck-Exit zurück zu word, dann wieder zu truck
  useEffect(() => {
    if (reduced) return;
    if (phase === "truck") {
      // Truck-Phase: nach ~3 s zurück zum Wort
      const t = window.setTimeout(() => setPhase("word"), 3000);
      return () => window.clearTimeout(t);
    } else {
      // Wort-Phase: nach ~4,5 s wieder Truck
      const t = window.setTimeout(() => setPhase("truck"), 4500);
      return () => window.clearTimeout(t);
    }
  }, [phase, reduced]);

  if (reduced) {
    return <span className="inline-block">bewegen.</span>;
  }

  return (
    <span
      className="relative inline-block align-baseline"
      style={{ minWidth: "0.5em" }}
    >
      {/* unsichtbare Layout-Stütze damit Zeilenumbruch + Höhe stabil bleiben */}
      <span aria-hidden className="invisible">bewegen.</span>

      <span className="absolute inset-0 flex items-baseline">
        <AnimatePresence mode="wait">
          {phase === "word" ? (
            <motion.span
              key="word"
              initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              bewegen.
            </motion.span>
          ) : (
            <Truck key="truck" />
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}

/**
 * Container-Truck als SVG, skaliert mit der umgebenden Schriftgröße (1em ≈ Höhe).
 * Räder rotieren während der Bewegung. Truck fährt von links nach rechts
 * komplett aus dem Bild raus.
 */
function Truck() {
  return (
    <motion.span
      className="inline-block w-full"
      style={{
        height: "0.85em",
      }}
      initial={{ x: "-15%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "160vw", opacity: 1 }}
      transition={{
        x: { duration: 2.2, ease: [0.65, 0.05, 0.36, 1], delay: 0.05 },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <motion.svg
        viewBox="0 0 240 100"
        className="h-full w-full -translate-y-[0.05em]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Trailer + Container-Box */}
        <rect x="60" y="18" width="150" height="58" rx="2" fill="#020617" />
        {/* vertikale Wellung-Linien */}
        <g stroke="#1e293b" strokeWidth="1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={70 + i * 10} y1="22" x2={70 + i * 10} y2="72" />
          ))}
        </g>
        {/* Container-Tür-Beschläge ganz hinten links */}
        <rect x="62" y="20" width="2" height="54" fill="#475569" />
        {/* Cab */}
        <path
          d="M10 76 L10 50 Q10 42 18 42 L40 42 L52 60 L52 76 Z"
          fill="#0f172a"
        />
        {/* Cab-Fenster */}
        <rect x="16" y="46" width="20" height="12" rx="1" fill="#38bdf8" opacity="0.85" />
        {/* Plattform / Chassis */}
        <rect x="6" y="76" width="206" height="4" fill="#020617" />

        {/* Räder mit Eigenrotation */}
        <Wheel cx={28} cy={84} r={8} />
        <Wheel cx={90} cy={84} r={9} />
        <Wheel cx={130} cy={84} r={9} />
        <Wheel cx={188} cy={84} r={9} />

        {/* dezenter Tour-Strich unter dem Truck */}
        <line
          x1="-40"
          y1="95"
          x2="280"
          y2="95"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.4"
        />
      </motion.svg>
    </motion.span>
  );
}

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      {/* Reifen */}
      <circle cx={cx} cy={cy} r={r} fill="#020617" />
      {/* rotierende Felge */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        style={{ originX: `${cx}px`, originY: `${cy}px`, transformBox: "fill-box" }}
      >
        <circle cx={cx} cy={cy} r={r * 0.55} fill="#475569" />
        <line x1={cx - r * 0.55} y1={cy} x2={cx + r * 0.55} y2={cy} stroke="#020617" strokeWidth="1.2" />
        <line x1={cx} y1={cy - r * 0.55} x2={cx} y2={cy + r * 0.55} stroke="#020617" strokeWidth="1.2" />
      </motion.g>
    </g>
  );
}
