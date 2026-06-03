"use client";

type Variant =
  | "20-standard"
  | "20-highcube"
  | "40-standard"
  | "40-highcube"
  | "45"
  | "20-reefer"
  | "40-reefer"
  | "20-opentop"
  | "20-opentop-hc"
  | "40-opentop"
  | "40-opentop-hc"
  | "20-flatrack"
  | "40-flatrack"
  | "tank";

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
    "20-standard":    { frontH: 150, depth: 200 },
    "20-highcube":    { frontH: 168, depth: 200 },
    "40-standard":    { frontH: 150, depth: 320 },
    "40-highcube":    { frontH: 168, depth: 320 },
    "45":             { frontH: 168, depth: 350 },
    "20-reefer":      { frontH: 150, depth: 200 },
    "40-reefer":      { frontH: 168, depth: 320 },
    "20-opentop":     { frontH: 150, depth: 200 },
    "20-opentop-hc":  { frontH: 168, depth: 200 },
    "40-opentop":     { frontH: 150, depth: 320 },
    "40-opentop-hc":  { frontH: 168, depth: 320 },
    "20-flatrack":    { frontH: 150, depth: 200 },
    "40-flatrack":    { frontH: 150, depth: 320 },
    "tank":           { frontH: 150, depth: 200 },
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
    : { top: "#e2e8f0", front: "#94a3b8", side: "#64748b", edge: "#334155", line: "#1e293b", accent: "#0284c7", door: "#475569" };

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

  // Reefer hat Aggregat vorne in unserer Ansicht
  const isReefer = variant === "20-reefer" || variant === "40-reefer";
  // Open Top hat Tarp/Plane statt fester Decke
  const isOpenTop =
    variant === "20-opentop" ||
    variant === "20-opentop-hc" ||
    variant === "40-opentop" ||
    variant === "40-opentop-hc";
  // Flat Rack: offene Konstruktion, nur Boden + zwei Stirnwände
  const isFlatRack = variant === "20-flatrack" || variant === "40-flatrack";
  // Tankcontainer: Rahmen außen, Zylinder innen
  const isTank = variant === "tank";

  // ─── TANK: Rahmen-Wireframe + Zylinder innen ───
  if (isTank) {
    // Tank-Geometrie innerhalb des Frame
    const tankRx = 38;  // horizontale halb-Achse der Front-Ellipse
    const tankRy = 50;  // vertikale halb-Achse
    const tankCx = fx + frontW / 2;            // Mittelpunkt-Front-X
    const tankCy = fyBottom - cfg.frontH / 2;  // Mittelpunkt-Front-Y
    const tankBackOffsetX = depthDx * 0.82;
    const tankBackOffsetY = depthDy * 0.82;
    const tankFrontShift = depthDx * 0.06;     // Tank etwas zurück versetzt
    const tankFrontShiftY = depthDy * 0.06;
    const front = { cx: tankCx + tankFrontShift, cy: tankCy + tankFrontShiftY };
    const back = { cx: front.cx + tankBackOffsetX, cy: front.cy + tankBackOffsetY };

    return (
      <svg viewBox="0 0 480 280" className={className} role="img" aria-label="Tankcontainer">
        <defs>
          <linearGradient id={`shadow-${variant}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={dark ? "#0ea5e9" : "#0284c7"} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`tank-${variant}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.top} stopOpacity="1" />
            <stop offset="55%" stopColor={palette.front} stopOpacity="1" />
            <stop offset="100%" stopColor={palette.side} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Boden-Schatten */}
        <ellipse
          cx={fx + frontW / 2 + depthDx / 2}
          cy={fyBottom + 12}
          rx={(frontW + depthDx) / 2 + 12}
          ry={6}
          fill={`url(#shadow-${variant})`}
        />

        {/* Rahmen — Hintere Kanten (zuerst, damit sie hinter dem Tank sind) */}
        <g stroke={palette.edge} strokeWidth="1.1" fill="none" strokeLinejoin="round">
          {/* Hintere Stirn (Rahmen-Rechteck) */}
          <polyline points={`${BLT.join(",")} ${BRT.join(",")} ${BRB.join(",")} ${[BLT[0], BRB[1]].join(",")} ${BLT.join(",")}`} opacity="0.7" />
          {/* Hintere Diagonalen oben */}
          <line x1={BLT[0]} y1={BLT[1]} x2={BRT[0]} y2={BRT[1]} opacity="0.6" />
        </g>

        {/* Tank — Hintere Ellipse (nur Außenkante, gedimmt) */}
        <ellipse
          cx={back.cx}
          cy={back.cy}
          rx={tankRx}
          ry={tankRy}
          fill="none"
          stroke={palette.edge}
          strokeWidth="0.8"
          opacity="0.5"
          strokeDasharray="2 3"
        />

        {/* Tank — Zylinder-Seitenfläche (Polygon zwischen Front- und Back-Ellipse) */}
        <path
          d={`
            M ${front.cx} ${front.cy - tankRy}
            L ${back.cx} ${back.cy - tankRy}
            A ${tankRx} ${tankRy} 0 0 0 ${back.cx} ${back.cy + tankRy}
            L ${front.cx} ${front.cy + tankRy}
            A ${tankRx} ${tankRy} 0 0 1 ${front.cx} ${front.cy - tankRy}
            Z
          `}
          fill={`url(#tank-${variant})`}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Tank — Front-Ellipse (Stirnseite mit Auslassventil-Andeutung) */}
        <ellipse
          cx={front.cx}
          cy={front.cy}
          rx={tankRx}
          ry={tankRy}
          fill={palette.front}
          stroke={palette.edge}
          strokeWidth="1"
        />
        {/* Tank-Front-Ring (Manhole / Inspection) */}
        <ellipse
          cx={front.cx}
          cy={front.cy}
          rx={tankRx * 0.5}
          ry={tankRy * 0.5}
          fill="none"
          stroke={palette.line}
          strokeWidth="0.6"
          opacity="0.65"
        />
        {/* Auslassventil unten an der Front */}
        <rect
          x={front.cx - 8}
          y={front.cy + tankRy - 4}
          width="16"
          height="10"
          fill={palette.side}
          stroke={palette.edge}
          strokeWidth="0.7"
          rx="1"
        />

        {/* Manhole oben mittig auf dem Tank */}
        <ellipse
          cx={front.cx + tankBackOffsetX * 0.35}
          cy={front.cy - tankRy + tankBackOffsetY * 0.35 - 2}
          rx="7"
          ry="3"
          fill={palette.side}
          stroke={palette.edge}
          strokeWidth="0.7"
        />

        {/* Rahmen — Vordere Kanten (zuletzt = vorne) */}
        <g stroke={palette.line} strokeWidth="1.2" fill="none" strokeLinejoin="round">
          {/* Vordere Stirn-Rahmen */}
          <polyline points={`${FLT.join(",")} ${FRT.join(",")} ${FRB.join(",")} ${FLB.join(",")} ${FLT.join(",")}`} />
          {/* Längs-Kanten oben */}
          <line x1={FLT[0]} y1={FLT[1]} x2={BLT[0]} y2={BLT[1]} />
          <line x1={FRT[0]} y1={FRT[1]} x2={BRT[0]} y2={BRT[1]} />
          {/* Längs-Kanten unten */}
          <line x1={FLB[0]} y1={FLB[1]} x2={BLT[0]} y2={BLT[1] + cfg.frontH} opacity="0" />
          <line x1={FRB[0]} y1={FRB[1]} x2={BRB[0]} y2={BRB[1]} />
        </g>

        {/* Eckbeschläge */}
        {[
          { x: FLT[0] - 1, y: FLT[1] - 1 },
          { x: FRT[0] - 13, y: FRT[1] - 1 },
          { x: FLB[0] - 1, y: FLB[1] - 9 },
          { x: FRB[0] - 13, y: FRB[1] - 9 },
          { x: BRT[0] - 13, y: BRT[1] - 1 },
        ].map((c, i) => (
          <rect key={`corner-${i}`} x={c.x} y={c.y} width="14" height="10" fill={palette.edge} opacity="0.7" />
        ))}

        {/* Sky-Akzent oben rechts */}
        <circle cx={BRT[0] - 7} cy={BRT[1] - 1} r="1.4" fill={palette.accent} opacity="0.9" />
      </svg>
    );
  }

  // ─── FLAT RACK: eigener Render-Pfad (offen, nur Boden + 2 Stirnwände) ───
  if (isFlatRack) {
    const wallH = 70; // Höhe der Stirnwände
    const deckH = 16; // Dicke der Bodenplatte
    const deckTopY = fyBottom - deckH;
    // Deck-Punkte
    const dFL = [fx, deckTopY];
    const dFR = [fx + frontW, deckTopY];
    const dBR = [dFR[0] + depthDx, dFR[1] + depthDy];
    const dBL = [dFL[0] + depthDx, dFL[1] + depthDy];
    // Stirnwand vorne
    const wFLT = [fx + 4, deckTopY - wallH];
    const wFRT = [fx + frontW - 4, deckTopY - wallH];
    // Stirnwand hinten (in Perspektive)
    const wBLT = [dBL[0] + 4, dBL[1] - wallH];
    const wBRT = [dBR[0] - 4, dBR[1] - wallH];

    return (
      <svg viewBox="0 0 480 280" className={className} role="img" aria-label="Flat Rack Container">
        <defs>
          <linearGradient id={`shadow-${variant}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={dark ? "#0ea5e9" : "#0284c7"} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Boden-Schatten */}
        <ellipse
          cx={fx + frontW / 2 + depthDx / 2}
          cy={fyBottom + 12}
          rx={(frontW + depthDx) / 2 + 12}
          ry={6}
          fill={`url(#shadow-${variant})`}
        />

        {/* Hintere Stirnwand (zuerst zeichnen, damit sie hinten ist) */}
        <polygon
          points={`${wBLT.join(",")} ${wBRT.join(",")} ${[dBR[0] - 4, dBR[1]].join(",")} ${[dBL[0] + 4, dBL[1]].join(",")}`}
          fill={palette.front}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Vertikale Linien hintere Stirnwand */}
        {[0.33, 0.66].map((t) => {
          const x1 = wBLT[0] + (wBRT[0] - wBLT[0]) * t;
          const y1 = wBLT[1] + (wBRT[1] - wBLT[1]) * t;
          const x2 = dBL[0] + 4 + (dBR[0] - 4 - dBL[0] - 4) * t;
          const y2 = dBL[1] + (dBR[1] - dBL[1]) * t;
          return <line key={`back-${t}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.line} strokeWidth="0.7" opacity="0.7" />;
        })}

        {/* Bodenplatte — Top */}
        <polygon
          points={`${dFL.join(",")} ${dFR.join(",")} ${dBR.join(",")} ${dBL.join(",")}`}
          fill={palette.top}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Holz-Planken-Andeutung auf dem Deck */}
        {Array.from({ length: variant === "40-flatrack" ? 12 : 8 }).map((_, i, arr) => {
          const t = (i + 1) / (arr.length + 1);
          const x1 = dFL[0] + (dFR[0] - dFL[0]) * t;
          const y1 = dFL[1] + (dFR[1] - dFL[1]) * t;
          const x2 = dBL[0] + (dBR[0] - dBL[0]) * t;
          const y2 = dBL[1] + (dBR[1] - dBL[1]) * t;
          return <line key={`plank-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.line} strokeWidth="0.5" opacity="0.4" />;
        })}

        {/* Bodenplatte — Vorderkante (Dicke) */}
        <polygon
          points={`${dFL.join(",")} ${dFR.join(",")} ${[dFR[0], dFR[1] + deckH].join(",")} ${[dFL[0], dFL[1] + deckH].join(",")}`}
          fill={palette.side}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Bodenplatte — Seitenkante rechts (Dicke) */}
        <polygon
          points={`${dFR.join(",")} ${dBR.join(",")} ${[dBR[0], dBR[1] + deckH].join(",")} ${[dFR[0], dFR[1] + deckH].join(",")}`}
          fill={palette.side}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Vordere Stirnwand */}
        <polygon
          points={`${wFLT.join(",")} ${wFRT.join(",")} ${[fx + frontW - 4, deckTopY].join(",")} ${[fx + 4, deckTopY].join(",")}`}
          fill={palette.front}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Vertikale Stäbe Vorderwand */}
        {[0.25, 0.5, 0.75].map((t) => {
          const x = fx + 4 + (frontW - 8) * t;
          return <line key={`front-${t}`} x1={x} y1={wFLT[1] + 4} x2={x} y2={deckTopY - 4} stroke={palette.line} strokeWidth="0.9" opacity="0.7" />;
        })}
        {/* Horizontale Verstärkung */}
        <line
          x1={fx + 4}
          y1={wFLT[1] + (deckTopY - wFLT[1]) * 0.5}
          x2={fx + frontW - 4}
          y2={wFRT[1] + (deckTopY - wFRT[1]) * 0.5}
          stroke={palette.line}
          strokeWidth="0.7"
          opacity="0.6"
        />

        {/* Eckbeschläge oben an den Stirnwänden */}
        <rect x={wFLT[0] - 2} y={wFLT[1] - 4} width="10" height="8" fill={palette.edge} opacity="0.75" />
        <rect x={wFRT[0] - 8} y={wFRT[1] - 4} width="10" height="8" fill={palette.edge} opacity="0.75" />
        <rect x={wBLT[0] - 2} y={wBLT[1] - 4} width="10" height="8" fill={palette.edge} opacity="0.6" />
        <rect x={wBRT[0] - 8} y={wBRT[1] - 4} width="10" height="8" fill={palette.edge} opacity="0.6" />

        {/* Sky-Akzent */}
        <circle cx={wBRT[0] - 3} cy={wBRT[1] - 1} r="1.4" fill={palette.accent} opacity="0.9" />
      </svg>
    );
  }

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
        fill={isOpenTop ? palette.side : `url(#top-${variant})`}
        stroke={palette.edge}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Top-Detail */}
      {isOpenTop ? (
        // Tarp/Plane: gewellte Linien quer über das Dach
        Array.from({ length: 6 }).map((_, i) => {
          const t = (i + 1) / 7;
          const x1 = FLT[0] + (FRT[0] - FLT[0]) * t;
          const y1 = FLT[1] + (FRT[1] - FLT[1]) * t;
          const x2 = BLT[0] + (BRT[0] - BLT[0]) * t;
          const y2 = BLT[1] + (BRT[1] - BLT[1]) * t;
          // leichte Wölbung in der Mitte
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - 4;
          return (
            <path
              key={`tarp-${i}`}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              stroke={palette.line}
              strokeWidth="0.9"
              fill="none"
              opacity="0.75"
            />
          );
        })
      ) : (
        // Standard: Riffel-Andeutung
        [0.25, 0.5, 0.75].map((t) => (
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
        ))
      )}

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
