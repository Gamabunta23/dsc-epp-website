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
 * Premium-Sattelzug nach RECHTS: moderne europäische Aerodynamik-Cab
 * (Volvo-FH-Stil) + 40' Standard-Container auf Tridem-Auflieger.
 * 5 Räder (2 SZM + 3 Trailer), Apple-Style Schatten + Gradienten.
 */
function Truck() {
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
        viewBox="0 0 480 140"
        className="h-full w-full -translate-y-[0.02em]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Container — leicht heller oben, Apple-Render-Feel */}
          <linearGradient id="bw-c" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="55%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* Cab-Hauptbody */}
          <linearGradient id="bw-cab" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* Cab-Front (heller für Tiefe) */}
          <linearGradient id="bw-cab-front" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          {/* Glas mit Brand-Sky */}
          <linearGradient id="bw-glass" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="55%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          {/* Felgen-Aluminum */}
          <radialGradient id="bw-rim" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="60%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          {/* Reifen */}
          <radialGradient id="bw-tire" cx="0.5" cy="0.5" r="0.5">
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          {/* Boden-Schatten unter dem Truck */}
          <radialGradient id="bw-shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          {/* LED-Tagfahrlicht (Strip) */}
          <linearGradient id="bw-led" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fffbeb" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Bodenschatten unter dem ganzen Gespann */}
        <ellipse cx="240" cy="125" rx="240" ry="6" fill="url(#bw-shadow)" />

        {/* Straßen-Strich */}
        <line
          x1="-60"
          y1="128"
          x2="540"
          y2="128"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="6 9"
          opacity="0.35"
        />

        {/* ──────────── AUFLIEGER (links, Trailer mit 40' Container) ──────────── */}
        {/* Container-Box mit gerundeten Ecken + Gradient */}
        <rect
          x="4"
          y="16"
          width="330"
          height="78"
          rx="3"
          fill="url(#bw-c)"
          stroke="#334155"
          strokeWidth="0.8"
        />
        {/* Top-Highlight für Plastizität */}
        <rect x="4" y="16" width="330" height="3" rx="2" fill="#1e293b" opacity="0.7" />
        {/* Korrugation: gleichmäßige vertikale Sicken */}
        <g stroke="#1e293b" strokeWidth="0.9" opacity="0.9">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={14 + i * 10.6} y1="20" x2={14 + i * 10.6} y2="90" />
          ))}
        </g>
        {/* Container-Top-Rail (oben über der Korrugation) */}
        <rect x="4" y="16" width="330" height="4" fill="#0f172a" opacity="0.6" />
        {/* Container-Bottom-Rail */}
        <rect x="4" y="90" width="330" height="4" fill="#020617" />

        {/* ISO-Eckbeschläge (4 sichtbare Ecken vorne) */}
        <rect x="2" y="14" width="12" height="10" fill="#94a3b8" />
        <rect x="3" y="15" width="10" height="8" fill="#cbd5e1" />
        <rect x="324" y="14" width="12" height="10" fill="#94a3b8" />
        <rect x="325" y="15" width="10" height="8" fill="#cbd5e1" />
        <rect x="2" y="86" width="12" height="10" fill="#94a3b8" />
        <rect x="3" y="87" width="10" height="8" fill="#cbd5e1" />
        <rect x="324" y="86" width="12" height="10" fill="#94a3b8" />
        <rect x="325" y="87" width="10" height="8" fill="#cbd5e1" />

        {/* Tür-Bereich (Heck = links) — vertikale Locking Bars */}
        <g stroke="#64748b" strokeWidth="1.2">
          <line x1="22" y1="22" x2="22" y2="88" />
          <line x1="34" y1="22" x2="34" y2="88" />
          <line x1="46" y1="22" x2="46" y2="88" />
          <line x1="58" y1="22" x2="58" y2="88" />
        </g>
        {/* Tür-Trennlinie (Mitte) */}
        <line x1="40" y1="22" x2="40" y2="88" stroke="#020617" strokeWidth="1.4" />

        {/* Brand-Decal: DSC | EPP auf der Containerseite (Mitte, prominent) */}
        <g transform="translate(160 44)">
          {/* Weißer Container-Paint-Bereich */}
          <rect x="0" y="0" width="100" height="22" rx="1.5" fill="#f8fafc" />
          {/* Subtle Schatten/Tiefe an Top-Edge */}
          <rect x="0" y="0" width="100" height="2" fill="#e2e8f0" />
          <text
            x="50"
            y="15"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="11"
            fontWeight="800"
            fill="#0f172a"
            letterSpacing="0.8"
          >
            DSC <tspan fill="#0ea5e9">|</tspan> EPP
          </text>
        </g>

        {/* Container-Nummer-Stencil (oben rechts auf Container) */}
        <text
          x="295"
          y="35"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="6"
          fill="#cbd5e1"
          opacity="0.7"
          letterSpacing="0.5"
        >
          DSEU 2026-1
        </text>

        {/* Trailer-Chassis (Längsträger) */}
        <rect x="0" y="94" width="346" height="4" fill="#020617" />
        {/* Side-Skirt (aero-Verkleidung) */}
        <rect x="14" y="98" width="316" height="14" fill="#0f172a" opacity="0.95" />
        {/* Side-Skirt-Highlight */}
        <line x1="14" y1="99" x2="330" y2="99" stroke="#1e293b" strokeWidth="0.6" />
        {/* Königszapfen-Bereich (Verbindung zum Cab) */}
        <rect x="330" y="86" width="22" height="12" fill="#1e293b" />

        {/* ──────────── SATTELZUGMASCHINE (rechts, Volvo-FH-Stil) ──────────── */}
        {/* Hauptkabine — schlanker, aerodynamischer Aufbau */}
        <path
          d="M354 96 L354 36 Q354 24 366 24 L398 24 L432 14 L455 14 Q466 14 466 26 L466 96 Z"
          fill="url(#bw-cab)"
          stroke="#334155"
          strokeWidth="0.6"
        />
        {/* Dach-Spoiler (aerodynamische Dachverkleidung) */}
        <path
          d="M386 24 L398 24 L432 14 L450 14 L450 6 Q450 2 446 2 L394 2 Q386 2 386 10 Z"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="0.4"
        />
        {/* Sky-Akzentstreifen am Dach */}
        <line x1="398" y1="10" x2="446" y2="10" stroke="#0ea5e9" strokeWidth="1.2" opacity="0.7" />

        {/* Cab-Front (vorne mit ausgeprägter Aerodynamik) */}
        <path
          d="M432 14 L455 14 Q466 14 466 26 L466 78 L450 88 L436 50 Z"
          fill="url(#bw-cab-front)"
        />

        {/* Windschutzscheibe — groß, geschwungen */}
        <path
          d="M440 30 L460 30 Q462 30 462 32 L462 58 L444 58 Z"
          fill="url(#bw-glass)"
          stroke="#0ea5e9"
          strokeWidth="0.4"
        />
        {/* Scheiben-Reflektion */}
        <path
          d="M442 32 L453 32 L450 42 L444 42 Z"
          fill="white"
          opacity="0.25"
        />
        {/* Windschutzscheiben-Wischer */}
        <path
          d="M444 55 L455 38"
          stroke="#475569"
          strokeWidth="0.7"
          opacity="0.7"
        />

        {/* Seitenfenster */}
        <path
          d="M364 38 L420 38 L420 56 L364 56 Z"
          fill="url(#bw-glass)"
          opacity="0.55"
        />
        {/* Türspalt + Griff */}
        <line x1="392" y1="34" x2="392" y2="86" stroke="#020617" strokeWidth="0.7" />
        <rect x="404" y="62" width="10" height="2" rx="0.5" fill="#94a3b8" />

        {/* Außenspiegel (groß, aerodynamisch — typisch europäisch) */}
        <g transform="translate(360 30)">
          <path d="M0 0 L-10 4 L-10 22 L0 26 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.4" />
          <rect x="-9" y="6" width="7" height="14" rx="0.5" fill="#475569" />
          <rect x="-8" y="7" width="5" height="12" fill="#0ea5e9" opacity="0.4" />
        </g>

        {/* Front-Grill (vertikale Lamellen) */}
        <rect x="442" y="60" width="22" height="20" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={442}
            y1={64 + i * 3.5}
            x2={464}
            y2={64 + i * 3.5}
            stroke="#475569"
            strokeWidth="0.5"
          />
        ))}

        {/* Marke-Logo-Plakette über dem Grill */}
        <ellipse cx="453" cy="58" rx="6" ry="2" fill="#0ea5e9" opacity="0.5" />

        {/* LED-Scheinwerfer (Strip + Hauptlicht) */}
        <rect x="438" y="48" width="26" height="2.5" rx="1.2" fill="url(#bw-led)" />
        <ellipse cx="456" cy="55" rx="6" ry="3" fill="#fef3c7" opacity="0.9" />
        <ellipse cx="456" cy="55" rx="3.5" ry="1.8" fill="#fffbeb" />
        {/* Lichtschein */}
        <ellipse cx="456" cy="55" rx="9" ry="4" fill="#fef9c3" opacity="0.25" />

        {/* Stoßstange unten */}
        <rect x="434" y="82" width="32" height="6" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.4" />
        {/* Nebellichter in der Stoßstange */}
        <circle cx="442" cy="85" r="1.2" fill="#fef3c7" opacity="0.8" />
        <circle cx="458" cy="85" r="1.2" fill="#fef3c7" opacity="0.8" />

        {/* Cab-Chassis */}
        <rect x="350" y="96" width="116" height="4" fill="#020617" />

        {/* Diesel-Tank (zylindrisch, unter dem Cab seitlich) */}
        <g>
          <rect x="358" y="100" width="48" height="12" rx="6" fill="#475569" />
          <rect x="358" y="100" width="48" height="2" rx="1" fill="#94a3b8" opacity="0.5" />
          {/* Tank-Beschriftung */}
          <rect x="378" y="104" width="8" height="4" fill="#0f172a" opacity="0.5" />
        </g>

        {/* Treppen / Einstiegshilfe */}
        <rect x="408" y="84" width="2" height="10" fill="#334155" />
        <rect x="406" y="88" width="6" height="1.5" fill="#475569" />

        {/* AdBlue-Tank dahinter (klein) */}
        <rect x="408" y="100" width="22" height="10" rx="4" fill="#334155" />

        {/* ──────────── RÄDER (5: 3 Trailer + 2 SZM) ──────────── */}
        {/* 3 Trailer (Tridem) — größer, näher zusammen */}
        <Wheel cx={75} cy={108} r={14} />
        <Wheel cx={115} cy={108} r={14} />
        <Wheel cx={155} cy={108} r={14} />
        {/* 2 SZM — leicht größer-realistisch */}
        <Wheel cx={378} cy={108} r={14} />
        <Wheel cx={440} cy={108} r={14} />

        {/* Mud-Flaps hinter den Rädern */}
        <rect x="167" y="100" width="3" height="14" fill="#020617" opacity="0.85" />
        <rect x="390" y="100" width="3" height="14" fill="#020617" opacity="0.85" />
        <rect x="452" y="100" width="3" height="14" fill="#020617" opacity="0.85" />
      </svg>
    </motion.span>
  );
}

/**
 * Premium Aluminum-Alloy-Rad mit 10 Speichen, Brake-Disc-Andeutung
 * dahinter und sichtbarer Reifen-Profil-Tiefe. Rotation 0.5s/Umdrehung.
 */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // 10 Speichen für premium-Look (typisch moderner Aluminium-LKW-Felgen)
  const spokes = 10;
  const innerR = r * 0.34;   // Nabe
  const spokeR = r * 0.7;    // Speichen-Ende

  return (
    <g>
      {/* Brems-Schatten dahinter (rötlich verglühte Andeutung) */}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="#1e293b" opacity="0.6" />

      {/* Reifen außen */}
      <circle cx={cx} cy={cy} r={r} fill="url(#bw-tire)" stroke="#020617" strokeWidth="0.5" />

      {/* Reifenflanke (gum) — leichte Plastizität */}
      <circle cx={cx} cy={cy} r={r * 0.9} fill="none" stroke="#1e293b" strokeWidth="0.4" />
      <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke="#0f172a" strokeWidth="0.4" />

      {/* Felge — Aluminum-Verlauf, rotiert */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      >
        {/* Felgen-Basis */}
        <circle cx={cx} cy={cy} r={spokeR} fill="url(#bw-rim)" />
        {/* Outer Lip */}
        <circle cx={cx} cy={cy} r={spokeR} fill="none" stroke="#334155" strokeWidth="0.6" />

        {/* Speichen-Aussparungen (dunkle Trapezformen zwischen den Speichen) */}
        {Array.from({ length: spokes }).map((_, i) => {
          const a1 = (i * 360 + 12) / spokes;
          const a2 = ((i + 1) * 360 - 12) / spokes;
          const r1 = (a1 * Math.PI) / 180;
          const r2 = (a2 * Math.PI) / 180;
          const x1Outer = cx + spokeR * 0.92 * Math.cos(r1);
          const y1Outer = cy + spokeR * 0.92 * Math.sin(r1);
          const x2Outer = cx + spokeR * 0.92 * Math.cos(r2);
          const y2Outer = cy + spokeR * 0.92 * Math.sin(r2);
          const x1Inner = cx + innerR * 1.2 * Math.cos(r1);
          const y1Inner = cy + innerR * 1.2 * Math.sin(r1);
          const x2Inner = cx + innerR * 1.2 * Math.cos(r2);
          const y2Inner = cy + innerR * 1.2 * Math.sin(r2);
          return (
            <path
              key={i}
              d={`M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${spokeR * 0.92} ${spokeR * 0.92} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerR * 1.2} ${innerR * 1.2} 0 0 0 ${x1Inner} ${y1Inner} Z`}
              fill="#020617"
              opacity="0.85"
            />
          );
        })}

        {/* Nabe + Mittelpunkt */}
        <circle cx={cx} cy={cy} r={innerR} fill="#475569" />
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#94a3b8" strokeWidth="0.4" />
        {/* 6 Radmuttern um die Nabe */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 60 * Math.PI) / 180;
          const px = cx + innerR * 0.62 * Math.cos(a);
          const py = cy + innerR * 0.62 * Math.sin(a);
          return <circle key={`n-${i}`} cx={px} cy={py} r={innerR * 0.16} fill="#1e293b" />;
        })}
        {/* Mittel-Cap (DSC|EPP-Akzent) */}
        <circle cx={cx} cy={cy} r={innerR * 0.4} fill="#020617" />
        <circle cx={cx} cy={cy} r={innerR * 0.4} fill="none" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.7" />
      </motion.g>
    </g>
  );
}
