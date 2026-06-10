"use client";

import { motion } from "motion/react";

const PINS = [
  { id: "bakum", label: "Bakum", sub: "Hauptsitz · A1", x: 200, y: 140, featured: true },
  { id: "hamburg", label: "Hamburg", sub: "Hafen-Hub", x: 330, y: 90 },
  { id: "owl", label: "Ostwestfalen-Lippe", sub: "Inland-Hub", x: 240, y: 220 },
];

const ROUTES = [
  { from: "bakum", to: "hamburg" },
  { from: "bakum", to: "owl" },
  { from: "hamburg", to: "owl" },
];

function pinById(id: string) {
  return PINS.find((p) => p.id === id)!;
}

// Subtile Dot-Grid als Geo-Atmosphäre (kein echtes Outline)
function DotGrid() {
  const dots: { x: number; y: number; opacity: number }[] = [];
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 22; col++) {
      const x = 30 + col * 24;
      const y = 30 + row * 22;
      // Sanfter Falloff vom Zentrum, damit Ränder ausfaden
      const dx = (x - 280) / 280;
      const dy = (y - 160) / 160;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const opacity = Math.max(0, 0.35 - dist * 0.32);
      if (opacity > 0.03) dots.push({ x, y, opacity });
    }
  }
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={1} fill="rgb(148 163 184)" opacity={d.opacity} />
      ))}
    </g>
  );
}

export default function LocationsMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-4xl mx-auto mb-20"
    >
      <svg
        viewBox="0 0 560 340"
        className="w-full h-auto"
        role="img"
        aria-label="Drei Standorte — Bakum, Hamburg, Ostwestfalen-Lippe"
      >
        <DotGrid />

        {/* Routen zwischen Standorten */}
        {ROUTES.map((route, i) => {
          const from = pinById(route.from);
          const to = pinById(route.to);
          return (
            <motion.line
              key={`${route.from}-${route.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgb(3 105 161)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="6 6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              style={{ animation: `route-flow 1.8s linear infinite`, animationDelay: `${i * -0.6}s` }}
            />
          );
        })}

        {/* Pins — äußeres g positioniert (SVG-Transform), inneres motion.g animiert (CSS-Transform) */}
        {PINS.map((pin, i) => (
          <g key={pin.id} transform={`translate(${pin.x},${pin.y})`}>
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            >
              <circle
                r={22}
                fill="rgb(3 105 161)"
                opacity={0.14}
                style={{
                  animation: `pin-pulse 2.4s ease-in-out infinite`,
                  animationDelay: `${i * -0.8}s`,
                  transformOrigin: "center",
                }}
              />
              <circle r={pin.featured ? 11 : 8} fill="rgb(3 105 161)" />
              {pin.featured && <circle r={4} fill="white" />}
              <text
                y={-30}
                textAnchor="middle"
                fontSize={18}
                fontWeight={600}
                fill="rgb(2 6 23)"
                style={{ letterSpacing: "-0.015em" }}
              >
                {pin.label}
              </text>
              <text
                y={-12}
                textAnchor="middle"
                fontSize={11}
                fontWeight={500}
                fill={pin.featured ? "rgb(3 105 161)" : "rgb(100 116 139)"}
                style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {pin.sub}
              </text>
            </motion.g>
          </g>
        ))}
      </svg>

      <style jsx>{`
        @keyframes route-flow {
          to {
            stroke-dashoffset: -24;
          }
        }
        @keyframes pin-pulse {
          0%,
          100% {
            r: 22;
            opacity: 0.14;
          }
          50% {
            r: 34;
            opacity: 0.04;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          svg :global(line),
          svg :global(circle) {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
