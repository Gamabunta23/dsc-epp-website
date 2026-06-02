"use client";

type Variant = "20-standard" | "20-highcube" | "40-standard" | "40-highcube" | "45" | "reefer";

type Props = {
  variant?: Variant;
  className?: string;
  /** Wenn true: dunkler Theme (für dunklen Hintergrund); sonst hell für Karten */
  dark?: boolean;
};

/**
 * Apple-Style 3/4-Iso-Illustration eines See-Containers.
 * Vorne die Türseite (mit Locking-Bars + Griffen),
 * rechts die korrugierte Seitenwand, oben dezente Aufsicht.
 */
export default function ContainerIllustration({
  variant = "20-standard",
  className = "",
  dark = false,
}: Props) {
  // Geometrie pro Variante (relativ zum viewBox 480 × 280)
  // - "frontW" = Breite der Tür-Seite (sichtbare Containerbreite)
  // - "frontH" = Höhe (Standard vs HC unterscheiden sich um ~10 %)
  // - "depth"  = visuelle Länge nach hinten (20' kürzer, 40' länger, 45' längste)
  const cfg = {
    "20-standard":  { frontH: 150, depth: 200 },
    "20-highcube":  { frontH: 168, depth: 200 },
    "40-standard":  { frontH: 150, depth: 320 },
    "40-highcube":  { frontH: 168, depth: 320 },
    "45":           { frontH: 168, depth: 350 },
    "reefer":       { frontH: 150, depth: 200 },
  }[variant];

  const frontW = 120;
  const fx = 50;                                   // front face x
  const fyBottom = 240;                            // bottom-y aller Boden-Punkte
  const fyTop = fyBottom - cfg.frontH;
  const depthDx = cfg.depth * 0.85;
  const depthDy = -cfg.depth * 0.18;               // leichte Perspektive nach oben

  // Eckpunkte
  const FLT = [fx, fyTop];                          // Front Left Top
  const FRT = [fx + frontW, fyTop];                 // Front Right Top
  const FRB = [fx + frontW, fyBottom];              // Front Right Bottom
  const FLB = [fx, fyBottom];                       // Front Left Bottom
  const BRT = [FRT[0] + depthDx, FRT[1] + depthDy]; // Back Right Top
  const BRB = [FRB[0] + depthDx, FRB[1] + depthDy]; // Back Right Bottom
  const BLT = [FLT[0] + depthDx, FLT[1] + depthDy]; // Back Left Top (für Top-Face)

  // Farben — heller Modus (auf weißen Karten)
  const palette = dark
    ? { top: "#1e293b", front: "#0f172a", side: "#020617", edge: "#334155", line: "#475569", accent: "#0ea5e9", door: "#0b1220" }
    : { top: "#f8fafc", front: "#e2e8f0", side: "#cbd5e1", edge: "#94a3b8", line: "#64748b", accent: "#0284c7", door: "#cbd5e1" };

  // Korrugation-Linien auf der Seitenwand
  const corrugations = [];
  const corrCount = variant.startsWith("20") ? 10 : variant.startsWith("40") ? 18 : 20;
  for (let i = 1; i < corrCount; i++) {
    const t = i / corrCount;
    const x1 = FRT[0] + depthDx * t;
    const y1 = FRT[1] + depthDy * t;
    const x2 = FRB[0] + depthDx * t;
    const y2 = FRB[1] + depthDy * t;
    corrugations.push({ x1, y1, x2, y2 });
  }

  // Tür-Vertikal-Stäbe (Locking Bars)
  const barXs = [fx + 16, fx + 46, fx + 74, fx + 104];

  // Reefer hat Aggregat hinten (vorne in unserer Ansicht) und Power-Anschluss
  const isReefer = variant === "reefer";

  return (
    <svg
      viewBox="0 0 480 280"
      className={className}
      role="img"
      aria-label="Container Illustration"
    >
      <defs>
        <linearGradient id={`shadow-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={dark ? "#0ea5e9" : "#0284c7"} stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`top-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={palette.top} stopOpacity="1" />
          <stop offset="100%" stopColor={palette.top} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`front-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={palette.front} stopOpacity="1" />
          <stop offset="100%" stopColor={palette.front} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Boden-Schatten */}
      <ellipse
        cx={fx + frontW / 2 + depthDx / 2}
        cy={fyBottom + 14}
        rx={(frontW + depthDx) / 2 + 12}
        ry={6}
        fill={`url(#shadow-${variant})`}
      />

      {/* Top-Face */}
      <polygon
        points={`${FLT.join(",")} ${FRT.join(",")} ${BRT.join(",")} ${BLT.join(",")}`}
        fill={`url(#top-${variant})`}
        stroke={palette.edge}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Top-Riffel-Andeutung */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={`top-${t}`}
          x1={FLT[0] + (FRT[0] - FLT[0]) * t}
          y1={FLT[1] + (FRT[1] - FLT[1]) * t}
          x2={BLT[0] + (BRT[0] - BLT[0]) * t}
          y2={BLT[1] + (BRT[1] - BLT[1]) * t}
          stroke={palette.edge}
          strokeWidth="0.4"
          opacity="0.5"
        />
      ))}

      {/* Side-Face mit Korrugation */}
      <polygon
        points={`${FRT.join(",")} ${BRT.join(",")} ${BRB.join(",")} ${FRB.join(",")}`}
        fill={palette.side}
        stroke={palette.edge}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {corrugations.map((c, i) => (
        <line
          key={`corr-${i}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke={palette.line}
          strokeWidth="0.7"
          opacity="0.65"
        />
      ))}

      {/* Eckbeschläge oben-rechts (Casting) am Side */}
      <rect
        x={BRT[0] - 14}
        y={BRT[1] - 6}
        width="14"
        height="10"
        fill={palette.edge}
        opacity="0.7"
      />

      {/* Front (Türseite) */}
      <polygon
        points={`${FLT.join(",")} ${FRT.join(",")} ${FRB.join(",")} ${FLB.join(",")}`}
        fill={`url(#front-${variant})`}
        stroke={palette.edge}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Tür-Mittellinie (zwei Türen) */}
      <line
        x1={fx + frontW / 2}
        y1={fyTop + 6}
        x2={fx + frontW / 2}
        y2={fyBottom - 6}
        stroke={palette.line}
        strokeWidth="0.9"
        opacity="0.7"
      />
      {/* Vertikale Locking Bars */}
      {barXs.map((bx, i) => (
        <g key={`bar-${i}`}>
          <line
            x1={bx}
            y1={fyTop + 10}
            x2={bx}
            y2={fyBottom - 10}
            stroke={palette.line}
            strokeWidth="1.2"
            opacity="0.85"
          />
          {/* Bar-Halter */}
          <rect x={bx - 2} y={fyTop + 8} width="4" height="5" fill={palette.line} opacity="0.75" />
          <rect x={bx - 2} y={fyBottom - 13} width="4" height="5" fill={palette.line} opacity="0.75" />
          {/* Griff (mittig) */}
          <rect x={bx - 3} y={fyTop + cfg.frontH * 0.45} width="6" height="14" rx="1" fill={palette.line} opacity="0.6" />
        </g>
      ))}

      {/* Eckbeschläge Ecken (visuelle Akzente) */}
      {[
        { x: FLT[0] - 1, y: FLT[1] - 1 },
        { x: FRT[0] - 13, y: FRT[1] - 1 },
        { x: FLB[0] - 1, y: FLB[1] - 9 },
        { x: FRB[0] - 13, y: FRB[1] - 9 },
      ].map((c, i) => (
        <rect key={`corner-${i}`} x={c.x} y={c.y} width="14" height="10" fill={palette.edge} opacity="0.7" />
      ))}

      {/* Reefer-Aggregat (nur bei Reefer) */}
      {isReefer && (
        <g>
          <rect
            x={fx + 18}
            y={fyTop + 8}
            width={frontW - 36}
            height={cfg.frontH * 0.4}
            fill={palette.door}
            stroke={palette.line}
            strokeWidth="0.8"
            opacity="0.9"
          />
          {/* Lüftungs-Schlitze */}
          {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
            <line
              key={`vent-${i}`}
              x1={fx + 26}
              y1={fyTop + 14 + cfg.frontH * 0.4 * t}
              x2={fx + frontW - 26}
              y2={fyTop + 14 + cfg.frontH * 0.4 * t}
              stroke={palette.line}
              strokeWidth="0.6"
              opacity="0.7"
            />
          ))}
          {/* Display-Punkt */}
          <circle cx={fx + frontW - 26} cy={fyTop + 14} r="2" fill={palette.accent} opacity="0.9" />
        </g>
      )}

      {/* Sky-Accent: kleine Status-LED auf Eckbeschlag */}
      <circle cx={BRT[0] - 7} cy={BRT[1] - 1} r="1.4" fill={palette.accent} opacity="0.9" />
    </svg>
  );
}
