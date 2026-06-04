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
      // Truck-Phase: ~5 s (Video ist 6 s lang, läuft ein paar Frames vor Cycle-Ende aus)
      const t = window.setTimeout(() => setPhase("word"), 5000);
      return () => window.clearTimeout(t);
    } else {
      // Wort-Phase: nach ~4 s wieder Truck
      const t = window.setTimeout(() => setPhase("truck"), 4000);
      return () => window.clearTimeout(t);
    }
  }, [phase, reduced]);

  if (reduced) {
    return <span className="inline-block">{" bewegen."}</span>;
  }

  return (
    <span
      className="relative inline-block align-baseline"
      style={{ minWidth: "0.5em" }}
    >
      {/* unsichtbare Layout-Stütze damit Zeilenumbruch + Höhe stabil bleiben.
          Leading non-breaking space gleicht den optischen Punkt am Ende aus,
          damit "bewegen" visuell zentriert wirkt. */}
      <span aria-hidden className="invisible">{" bewegen."}</span>

      <span className="absolute inset-0 flex items-baseline justify-center">
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
              {" bewegen."}
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
/**
 * Hero-Truck: lizenziertes LKW-Video (Lizenz vom Kunden gekauft).
 * Fade-in, läuft via Loop, Fade-out wenn das Wort zurückkommt.
 */
function Truck() {
  // Trailer-Eckpunkte im Video-Frame (854×320) — Lines genau innerhalb der
  // Trailer-Decken-/Boden-Kanten (mit Compensation für round-cap-Extension)
  const TL = { x: 12, y: 62 };
  const TR = { x: 525, y: 54 };
  const BL = { x: 12, y: 190 };
  const BR = { x: 525, y: 182 };

  // Sicken über die GANZE Trailer-Länge, etwas nach rechts geschoben,
  // 3 zusätzliche Linien auf der rechten Seite
  const T_START = 0.12;
  const T_END = 0.98;
  const N_LINES = 12;
  const lines = Array.from({ length: N_LINES }, (_, i) => {
    const t = T_START + (T_END - T_START) * (i / (N_LINES - 1));
    return {
      x1: TL.x + (TR.x - TL.x) * t,
      y1: TL.y + (TR.y - TL.y) * t,
      x2: BL.x + (BR.x - BL.x) * t,
      y2: BL.y + (BR.y - BL.y) * t,
    };
  });

  return (
    <motion.span
      className="inline-block w-full overflow-hidden relative"
      style={{ height: "1em" }}
      initial={{ opacity: 0, x: "-3%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "30%" }}
      transition={{
        opacity: { duration: 0.6, ease: "easeOut" },
        x: { duration: 1.2, ease: [0.65, 0.05, 0.36, 1] },
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-contain -translate-y-[0.02em]"
        aria-hidden
      >
        <source src="/video/truck-clean.mp4" type="video/mp4" />
      </video>

      {/* Sicken-Overlay: fallen sequentiell von RECHTS nach LINKS */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -translate-y-[0.02em]"
        viewBox="0 0 854 320"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {lines.map((line, i) => {
          // i = 0 ist links, i = N-2 ist rechts.
          // Stagger so dass RECHTS zuerst startet (kürzeste delay) → LINKS zuletzt
          const reverseIndex = lines.length - 1 - i;
          const delay = 0.9 + reverseIndex * 0.07;
          return (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#000000"
              strokeWidth={3}
              strokeLinecap="butt"
              strokeOpacity={1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.45, delay, ease: [0.6, 0, 0.4, 1] },
                opacity: { duration: 0.15, delay },
              }}
            />
          );
        })}
      </svg>
    </motion.span>
  );
}

