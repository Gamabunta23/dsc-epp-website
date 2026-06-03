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
/**
 * Sattelzug im Line-Art-Stil (inspiriert von der User-Referenz):
 * reine Outline, keine Füllung, slate-950 Striche.
 * Cab rechts (vorne), Container links (Heck).
 * 5 Räder = 2 SZM (Vorder- + Antriebsachse) + 3 Trailer (Tridem).
 */
function Truck() {
  // strokeWidth einheitlich für alle Linien
  const sw = 2.2;
  return (
    <motion.span
      className="inline-block w-full"
      style={{ height: "1.05em" }}
      initial={{ x: "-15%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "180vw", opacity: 1 }}
      transition={{
        x: { duration: 2.4, ease: [0.65, 0.05, 0.36, 1], delay: 0.05 },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <svg
        viewBox="0 0 540 160"
        className="h-full w-full -translate-y-[0.02em] text-slate-950"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Straßenlinie (dezent) */}
        <line
          x1="-20"
          y1="148"
          x2="560"
          y2="148"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          opacity="0.35"
        />

        {/* ──────────── AUFLIEGER MIT CONTAINER (links) ──────────── */}
        {/* Container-Box */}
        <rect x="6" y="20" width="370" height="92" rx="3" />

        {/* Tür-Trennlinie (Mitte) am Heck (=ganz links) */}
        <line x1="20" y1="26" x2="20" y2="106" />
        {/* Locking-Bars am Heck (vertikale Stäbe) */}
        <line x1="14" y1="26" x2="14" y2="106" />
        <line x1="26" y1="26" x2="26" y2="106" />
        <line x1="32" y1="26" x2="32" y2="106" />
        {/* Türgriff-Markierungen */}
        <rect x="12" y="60" width="4" height="6" />
        <rect x="24" y="60" width="4" height="6" />
        <rect x="30" y="60" width="4" height="6" />

        {/* Container-Korrugation: gleichmäßige vertikale Sicken */}
        <g strokeWidth={sw * 0.5}>
          {Array.from({ length: 36 }).map((_, i) => (
            <line key={i} x1={48 + i * 9} y1="26" x2={48 + i * 9} y2="106" />
          ))}
        </g>

        {/* Container Top-Rail (etwas dickere Linie oben) */}
        <line x1="6" y1="24" x2="376" y2="24" strokeWidth={sw * 1.1} />
        {/* Bottom-Rail */}
        <line x1="6" y1="108" x2="376" y2="108" strokeWidth={sw * 1.1} />

        {/* Trailer-Chassis (Längsträger unter dem Container) */}
        <line x1="6" y1="118" x2="392" y2="118" />
        {/* Aufstützen / Landing Legs in der Mitte des Trailers */}
        <line x1="270" y1="118" x2="270" y2="132" />
        <line x1="265" y1="132" x2="275" y2="132" />

        {/* Königszapfen-Bereich → Verbindung zur SZM */}
        <line x1="392" y1="118" x2="404" y2="118" />
        <line x1="392" y1="112" x2="404" y2="112" />

        {/* ──────────── SATTELZUGMASCHINE (rechts, Volvo-FH-Stil) ──────────── */}
        {/* Cab Hauptkörper — modern aerodynamisch */}
        <path d="
          M 404 118
          L 404 80
          L 408 60
          L 412 50
          Q 414 32 432 30
          L 452 30
          L 470 26
          L 502 26
          Q 524 26 524 48
          L 524 118
          Z
        " />

        {/* Cab-Dachspoiler */}
        <path d="
          M 470 26
          L 470 14
          Q 470 10 474 10
          L 510 10
          Q 514 10 514 14
          L 514 26
        " />

        {/* Cab-Front-Schräge (Stoßfänger schräg nach unten) */}
        <line x1="524" y1="100" x2="528" y2="120" />
        <line x1="528" y1="120" x2="476" y2="120" />

        {/* Windschutzscheibe — geschwungen */}
        <path d="
          M 478 36
          L 514 36
          Q 519 36 519 41
          L 519 58
          L 480 58
          Z
        " />

        {/* Seitenfenster */}
        <path d="
          M 422 40
          L 466 40
          L 466 60
          L 422 60
          Z
        " />

        {/* Tür-Trennlinie + Griff */}
        <line x1="458" y1="36" x2="458" y2="100" />
        <line x1="464" y1="78" x2="472" y2="78" />

        {/* Außenspiegel (klein, aero) */}
        <path d="
          M 416 36
          L 408 39
          L 408 52
          L 416 55
          Z
        " />

        {/* Front-Grill */}
        <rect x="503" y="64" width="20" height="22" rx="1.5" />
        {/* Lamellen */}
        <line x1="503" y1="70" x2="523" y2="70" strokeWidth={sw * 0.5} />
        <line x1="503" y1="75" x2="523" y2="75" strokeWidth={sw * 0.5} />
        <line x1="503" y1="80" x2="523" y2="80" strokeWidth={sw * 0.5} />

        {/* Scheinwerfer */}
        <ellipse cx="520" cy="56" rx="5" ry="3" />

        {/* Frontstoßstange */}
        <rect x="500" y="90" width="26" height="10" rx="2" />

        {/* Tank unter der Cab */}
        <rect x="410" y="118" width="44" height="14" rx="6" />

        {/* Tritt / Einstiegshilfe */}
        <line x1="470" y1="100" x2="470" y2="118" />
        <line x1="468" y1="108" x2="476" y2="108" />

        {/* ──────────── RÄDER (5: 3 Trailer + 2 SZM) ──────────── */}
        {/* Trailer Tridem */}
        <Wheel cx={100} cy={132} r={20} />
        <Wheel cx={160} cy={132} r={20} />
        <Wheel cx={220} cy={132} r={20} />
        {/* SZM Antriebsachse (hinten unter Cab) */}
        <Wheel cx={430} cy={132} r={20} />
        {/* SZM Vorderachse (vorne unter Cab-Front) */}
        <Wheel cx={510} cy={132} r={20} />

        {/* Mud-Flaps hinter den Rädern */}
        <line x1="238" y1="120" x2="238" y2="140" />
        <line x1="448" y1="120" x2="448" y2="140" />
        <line x1="528" y1="120" x2="528" y2="140" />
      </svg>
    </motion.span>
  );
}

/**
 * Line-Art Rad: leerer Kreis (Reifen-Outline) + leerer Kreis (Felgen-Outline)
 * + drehende Speichen. Passt zum minimalistischen Truck-Stil.
 */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const innerR = r * 0.55;

  return (
    <g>
      {/* Reifen außen (Outline) */}
      <circle cx={cx} cy={cy} r={r} fill="white" />
      <circle cx={cx} cy={cy} r={r} />
      {/* Felgen-Innenring */}
      <circle cx={cx} cy={cy} r={innerR} />

      {/* Drehende Speichen (3 Linien durch die Felgen-Mitte) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      >
        <line
          x1={cx - innerR}
          y1={cy}
          x2={cx + innerR}
          y2={cy}
          strokeWidth="1.8"
        />
        <line
          x1={cx - innerR * 0.5}
          y1={cy - innerR * 0.87}
          x2={cx + innerR * 0.5}
          y2={cy + innerR * 0.87}
          strokeWidth="1.8"
        />
        <line
          x1={cx + innerR * 0.5}
          y1={cy - innerR * 0.87}
          x2={cx - innerR * 0.5}
          y2={cy + innerR * 0.87}
          strokeWidth="1.8"
        />
        {/* Mittel-Nabe */}
        <circle cx={cx} cy={cy} r={r * 0.13} fill="currentColor" />
      </motion.g>
    </g>
  );
}
