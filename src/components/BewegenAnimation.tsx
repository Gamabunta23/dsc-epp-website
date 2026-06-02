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
 * Sattelzug fährt nach RECHTS: Cab (SZM) vorne rechts, Auflieger mit Container links.
 * 5 Räder gesamt = 2 SZM (Vorderachse + Antriebsachse) + 3 Trailer (Tridem-Achse).
 */
function Truck() {
  return (
    <motion.span
      className="inline-block w-full"
      style={{ height: "1.0em" }}
      initial={{ x: "-15%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "180vw", opacity: 1 }}
      transition={{
        x: { duration: 2.4, ease: [0.65, 0.05, 0.36, 1], delay: 0.05 },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <svg
        viewBox="0 0 320 100"
        className="h-full w-full -translate-y-[0.04em]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Container-Verlauf für Tiefe */}
          <linearGradient id="bw-container" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* Cab-Verlauf */}
          <linearGradient id="bw-cab" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* Windschutzscheibe */}
          <linearGradient id="bw-glass" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Tour-Strich (Straße) */}
        <line
          x1="-40"
          y1="92"
          x2="360"
          y2="92"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.35"
        />

        {/* ───── AUFLIEGER (links) ───── */}
        {/* Container-Box auf dem Trailer */}
        <rect
          x="4"
          y="14"
          width="220"
          height="58"
          rx="2"
          fill="url(#bw-container)"
          stroke="#1e293b"
          strokeWidth="0.5"
        />
        {/* Vertikale Wellung */}
        <g stroke="#1e293b" strokeWidth="1">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={14 + i * 10.5} y1="18" x2={14 + i * 10.5} y2="68" />
          ))}
        </g>
        {/* Container-Tür-Beschläge (am Heck = links) */}
        <rect x="4" y="14" width="3" height="58" fill="#475569" opacity="0.8" />
        <rect x="8" y="18" width="1.5" height="50" fill="#334155" />
        <rect x="11" y="18" width="1.5" height="50" fill="#334155" />

        {/* Brand-Decal: DSC | EPP auf der Containerseite */}
        <g transform="translate(95 35)">
          <rect x="0" y="0" width="58" height="14" rx="1.5" fill="#ffffff" opacity="0.92" />
          <text
            x="29"
            y="10"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="8"
            fontWeight="700"
            fill="#020617"
            letterSpacing="0.5"
          >
            DSC <tspan fill="#94a3b8">|</tspan> EPP
          </text>
        </g>

        {/* Trailer-Chassis (Längsträger) */}
        <rect x="0" y="72" width="232" height="3" fill="#020617" />
        {/* Königszapfen-Bereich (Verbindung zum Cab) */}
        <rect x="220" y="64" width="20" height="11" fill="#1e293b" />

        {/* ───── SATTELZUGMASCHINE (rechts) ───── */}
        {/* Hinterer Cab-Teil (Aufbau + Aerodyne) */}
        <path
          d="M240 72 L240 40 Q240 30 250 30 L270 30 L296 22 L308 22 Q316 22 316 30 L316 72 Z"
          fill="url(#bw-cab)"
          stroke="#1e293b"
          strokeWidth="0.5"
        />
        {/* Front-Cab-Block (mit nach vorn geneigter Front) */}
        <path
          d="M296 22 L308 22 Q316 22 316 30 L316 60 L298 60 L294 38 Z"
          fill="#0f172a"
        />
        {/* Windschutzscheibe (vorne) */}
        <path
          d="M298 30 L313 30 L313 50 L300 50 Z"
          fill="url(#bw-glass)"
          opacity="0.9"
        />
        {/* Glanzlicht auf Scheibe */}
        <line x1="302" y1="32" x2="310" y2="32" stroke="white" strokeWidth="0.6" opacity="0.6" />
        {/* Seiten-Fenster */}
        <rect x="246" y="36" width="40" height="14" rx="1" fill="url(#bw-glass)" opacity="0.6" />
        {/* Türspalt */}
        <line x1="266" y1="34" x2="266" y2="62" stroke="#020617" strokeWidth="0.6" />
        {/* Türgriff */}
        <rect x="274" y="50" width="6" height="1.5" fill="#475569" />

        {/* Front-Grill */}
        <rect x="298" y="52" width="14" height="8" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
        <line x1="298" y1="55" x2="312" y2="55" stroke="#475569" strokeWidth="0.4" />
        <line x1="298" y1="57" x2="312" y2="57" stroke="#475569" strokeWidth="0.4" />

        {/* Scheinwerfer */}
        <ellipse cx="310" cy="48" rx="3" ry="2" fill="#fbbf24" opacity="0.9" />
        <ellipse cx="310" cy="48" rx="1.5" ry="1" fill="#fffbeb" />

        {/* Stoßstange */}
        <rect x="294" y="64" width="22" height="4" rx="1" fill="#1e293b" />

        {/* Cab-Chassis */}
        <rect x="232" y="72" width="84" height="3" fill="#020617" />

        {/* Tank unter dem Cab */}
        <ellipse cx="262" cy="78" rx="14" ry="3" fill="#334155" />

        {/* ───── RÄDER ───── */}
        {/* 3 Trailer-Räder (Tridem-Achse hinten) */}
        <Wheel cx={50} cy={82} r={9} />
        <Wheel cx={78} cy={82} r={9} />
        <Wheel cx={106} cy={82} r={9} />
        {/* 2 SZM-Räder (Vorderachse + Antriebsachse) */}
        <Wheel cx={252} cy={82} r={9} />
        <Wheel cx={302} cy={82} r={9} />

        {/* Schmutzfänger hinter den SZM-Rädern */}
        <rect x="260" y="78" width="1.5" height="10" fill="#020617" opacity="0.7" />
        <rect x="310" y="78" width="1.5" height="10" fill="#020617" opacity="0.7" />
      </svg>
    </motion.span>
  );
}

/**
 * Rad mit klar sichtbarer Speichen-Rotation.
 * Geschwindigkeit so gewählt, dass das Auge die Drehung gut wahrnimmt
 * (0.5 s pro Umdrehung).
 */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // Speichen als Mehrfachstrahlen — bei Rotation gut sichtbar
  const spokes = 5;
  const lines = Array.from({ length: spokes }).map((_, i) => {
    const angle = (i * 360) / spokes;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: -r * 0.62 * Math.cos(rad),
      y1: -r * 0.62 * Math.sin(rad),
      x2: r * 0.62 * Math.cos(rad),
      y2: r * 0.62 * Math.sin(rad),
    };
  });

  return (
    <g>
      {/* Reifen (außen, statisch) */}
      <circle cx={cx} cy={cy} r={r} fill="#020617" />
      {/* Reifenprofil-Andeutung */}
      <circle cx={cx} cy={cy} r={r - 1.5} fill="none" stroke="#1e293b" strokeWidth="0.6" />
      {/* Felge mit rotierenden Speichen */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        style={{
          originX: `${cx}px`,
          originY: `${cy}px`,
        }}
      >
        {/* Felgen-Hintergrund */}
        <circle cx={cx} cy={cy} r={r * 0.7} fill="#64748b" />
        <circle cx={cx} cy={cy} r={r * 0.7} fill="none" stroke="#334155" strokeWidth="0.5" />
        {/* Speichen */}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={cx + l.x1}
            y1={cy + l.y1}
            x2={cx + l.x2}
            y2={cy + l.y2}
            stroke="#1e293b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
        {/* Radmutter / Nabe */}
        <circle cx={cx} cy={cy} r={r * 0.18} fill="#020617" />
      </motion.g>
    </g>
  );
}
