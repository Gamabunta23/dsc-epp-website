"use client";

import { motion } from "motion/react";
import { useState } from "react";
import ContainerIllustration from "./ContainerIllustration";
import ContainerDetailModal, {
  type ContainerSpecs,
  type ContainerVariant,
} from "./ContainerDetailModal";

type ContainerType = {
  id: string;
  size: string;
  name: string;
  cbm: string;
  payload: string;
  notes: string;
  illustration: ContainerVariant;
  /** Optionaler Foto-Pfad (relativ zu /public). Wenn vorhanden, ersetzt das Foto die SVG-Illustration. */
  photo?: string;
  description?: string;
  specs?: ContainerSpecs;
};

const types: ContainerType[] = [
  {
    id: "20-std",
    size: "20′",
    name: "Standard DC",
    cbm: "33,2 m³",
    payload: "~28 t",
    notes: "Heckbündig fahrbar",
    illustration: "20-standard",
    photo: "/containers/20-standard.jpg",
    description:
      "Der Klassiker für Stückgut, Schwer­ladungen und Stauraum-Anwendungen. Heckbündig auf Chassis fahrbar.",
    specs: {
      exterior: { l: "6,06", b: "2,43", h: "2,59" },
      interior: { l: "5,89", b: "2,35", h: "2,39" },
      door: { b: "2,34", h: "2,29" },
      maxGross: "30.480 kg",
      tare: "2.250 kg",
      maxPayload: "28.230 kg",
      volume: "33,2 m³",
    },
  },
  {
    id: "20-hc",
    size: "20′ HC",
    name: "High Cube",
    cbm: "37,3 m³",
    payload: "~28 t",
    notes: "30 cm mehr Innenhöhe",
    illustration: "20-highcube",
    description:
      "Wie der Standard 20′, aber 30 cm höher — mehr Volumen bei gleicher Stellfläche.",
    specs: {
      exterior: { l: "6,06", b: "2,43", h: "2,89" },
      interior: { l: "5,89", b: "2,35", h: "2,69" },
      door: { b: "2,34", h: "2,59" },
      maxGross: "30.480 kg",
      tare: "2.250 kg",
      maxPayload: "28.130 kg",
      volume: "37,3 m³",
    },
  },
  {
    id: "2x20",
    size: "2 × 20′",
    name: "DC kombiniert",
    cbm: "2 × 33,2 m³",
    payload: "2 × 10 t",
    notes: "Ein Chassis, zwei Boxen",
    illustration: "20-standard",
    description:
      "Zwei 20′ Container auf einem Chassis — wirtschaftlich für Doppelumläufe ab Hafen. Maße entsprechen dem 20′ Standard DC; Zuladung pro Container auf 10 t begrenzt (Chassis-Limit für die kombinierte Fahrt).",
    specs: {
      exterior: { l: "6,06", b: "2,43", h: "2,59" },
      interior: { l: "5,89", b: "2,35", h: "2,39" },
      door: { b: "2,34", h: "2,29" },
      maxGross: "30.480 kg pro Container",
      tare: "2.250 kg pro Container",
      maxPayload: "10.000 kg pro Container",
      volume: "33,2 m³ pro Container",
    },
  },
  {
    id: "40-dc",
    size: "40′",
    name: "Standard DC",
    cbm: "67,7 m³",
    payload: "~26,7 t",
    notes: "Standard-Volumen-Transport",
    illustration: "40-standard",
    description:
      "Standardvolumen für Massengut, Mischladungen und Hafenabholungen.",
    specs: {
      exterior: { l: "12,19", b: "2,43", h: "2,59" },
      interior: { l: "12,03", b: "2,35", h: "2,39" },
      door: { b: "2,34", h: "2,29" },
      maxGross: "30.480 kg",
      tare: "3.780 kg",
      maxPayload: "26.700 kg",
      volume: "67,7 m³",
    },
  },
  {
    id: "40-hc",
    size: "40′ HC",
    name: "High Cube",
    cbm: "76,3 m³",
    payload: "~26,5 t",
    notes: "30 cm mehr Innenhöhe",
    illustration: "40-highcube",
    description:
      "40′ High Cube — 30 cm mehr Innenhöhe für voluminöse Ladungen.",
    specs: {
      exterior: { l: "12,19", b: "2,43", h: "2,89" },
      interior: { l: "12,02", b: "2,35", h: "2,69" },
      door: { b: "2,34", h: "2,59" },
      maxGross: "30.480 kg",
      tare: "4.020 kg",
      maxPayload: "26.460 kg",
      volume: "76,3 m³",
    },
  },
  {
    id: "45",
    size: "45′ HC",
    name: "High Cube",
    cbm: "86,0 m³",
    payload: "~27,7 t",
    notes: "Multi-Gooseneck-Chassis",
    illustration: "45",
    description:
      "Der Volumen-König. Auf Multi-Gooseneck-Chassis für maximalen Innenraum bei zulässiger Gesamtlänge.",
    specs: {
      exterior: { l: "13,72", b: "2,43", h: "2,89" },
      interior: { l: "13,55", b: "2,35", h: "2,70" },
      door: { b: "2,34", h: "2,59" },
      maxGross: "32.500 kg",
      tare: "4.800 kg",
      maxPayload: "27.700 kg",
      volume: "86,0 m³",
    },
  },
  {
    id: "20-reefer",
    size: "20′",
    name: "Reefer",
    cbm: "28,3 m³",
    payload: "~27,3 t",
    notes: "−25 bis +25 °C",
    illustration: "20-reefer",
    description:
      "Temperaturgeführter 20′ Container mit Gen-Set-Aggregat. Lückenlose Kühlkette von −25 bis +25 °C — Pharma- und Lebensmittel-tauglich.",
    specs: {
      exterior: { l: "6,05", b: "2,44", h: "2,59" },
      interior: { l: "5,47", b: "2,28", h: "2,25" },
      door: { b: "2,28", h: "2,22" },
      maxGross: "30.480 kg",
      tare: "3.160 kg",
      maxPayload: "27.320 kg",
      volume: "28,3 m³",
    },
  },
  {
    id: "40-reefer",
    size: "40′ HC",
    name: "Reefer",
    cbm: "60,0 m³",
    payload: "~29,4 t",
    notes: "−25 bis +25 °C",
    illustration: "40-reefer",
    description:
      "Temperaturgeführter 40′ High Cube Reefer mit Gen-Set-Aggregat. Maximales Kühlvolumen für Langstrecken und Großmengen — Pharma- und Lebensmittel-tauglich.",
    specs: {
      exterior: { l: "12,19", b: "2,43", h: "2,89" },
      interior: { l: "11,64", b: "2,28", h: "2,49" },
      door: { b: "2,28", h: "2,18" },
      maxGross: "34.000 kg",
      tare: "4.600 kg",
      maxPayload: "29.400 kg",
      volume: "60,0 m³",
    },
  },
  {
    id: "20-ot",
    size: "20′ OT",
    name: "Open Top",
    cbm: "32,0 m³",
    payload: "~28,1 t",
    notes: "Dach abnehmbar (Plane)",
    illustration: "20-opentop",
    description:
      "20′ Container mit abnehmbarem Dach (Plane). Be- und Entladung von oben — ideal für Maschinen, Stückgut mit Überhöhe und Schwergut.",
    specs: {
      exterior: { l: "6,06", b: "2,44", h: "2,59" },
      interior: { l: "5,89", b: "2,35", h: "2,34" },
      door: { b: "2,34", h: "2,28" },
      roof: { b: "2,23", l: "5,33" },
      maxGross: "30.050 kg",
      tare: "2.450 kg",
      maxPayload: "28.130 kg",
      volume: "32,0 m³",
    },
  },
  {
    id: "20-ot-hc",
    size: "20′ OT HC",
    name: "Open Top High Cube",
    cbm: "32,0 m³",
    payload: "~28,0 t",
    notes: "30 cm mehr Innenhöhe",
    illustration: "20-opentop-hc",
    description:
      "20′ Open Top in High-Cube-Ausführung. Mehr Innenhöhe für sperrige Maschinen und Ladungen mit Überhöhe.",
    specs: {
      exterior: { l: "6,06", b: "2,44", h: "2,89" },
      interior: { l: "5,89", b: "2,35", h: "2,64" },
      door: { b: "2,34", h: "2,58" },
      roof: { b: "2,23", l: "5,39" },
      maxGross: "30.480 kg",
      tare: "2.510 kg",
      maxPayload: "27.970 kg",
      volume: "32,0 m³",
    },
  },
  {
    id: "40-ot",
    size: "40′ OT",
    name: "Open Top",
    cbm: "66,8 m³",
    payload: "~28,5 t",
    notes: "Dach abnehmbar (Plane)",
    illustration: "40-opentop",
    description:
      "40′ Open Top mit abnehmbarem Dach für Maschinen, Stückgut mit Überhöhe und Schwergut. Volle Be- und Entladung von oben über fast die gesamte Länge.",
    specs: {
      exterior: { l: "12,19", b: "2,44", h: "2,59" },
      interior: { l: "12,03", b: "2,35", h: "2,38" },
      door: { b: "2,34", h: "2,27" },
      roof: { b: "2,23", l: "11,55" },
      maxGross: "32.500 kg",
      tare: "4.050 kg",
      maxPayload: "28.450 kg",
      volume: "66,8 m³",
    },
  },
  {
    id: "40-ot-hc",
    size: "40′ OT HC",
    name: "Open Top High Cube",
    cbm: "74,9 m³",
    payload: "~28,3 t",
    notes: "30 cm mehr Innenhöhe",
    illustration: "40-opentop-hc",
    description:
      "40′ Open Top in High-Cube-Ausführung. Maximales Volumen mit Überladung von oben — ideal für überhohe Maschinen und Anlagen.",
    specs: {
      exterior: { l: "12,19", b: "2,44", h: "2,89" },
      interior: { l: "12,03", b: "2,35", h: "2,65" },
      door: { b: "2,35", h: "2,68" },
      roof: { b: "2,19", l: "11,55" },
      maxGross: "32.500 kg",
      tare: "4.250 kg",
      maxPayload: "28.250 kg",
      volume: "74,9 m³",
    },
  },
  {
    id: "20-flat",
    size: "20′ FR",
    name: "Flat Rack",
    cbm: "—",
    payload: "~37 t",
    notes: "Schwerlast-Plattform",
    illustration: "20-flatrack",
    description:
      "20′ Flat Rack mit klappbaren Stirnwänden für Maschinen, Boote, überbreite oder über­hohe Ladungen. Beladung von oben und seitlich möglich, hohe Zuladung bis 37 t.",
    specs: {
      exterior: { l: "6,06", b: "2,44", h: "2,59" },
      interior: { l: "6,03", b: "2,23", h: "2,20" },
      maxGross: "40.000 kg",
      tare: "2.940 kg",
      maxPayload: "37.060 kg",
    },
  },
  {
    id: "40-flat",
    size: "40′ FR",
    name: "Flat Rack",
    cbm: "—",
    payload: "~39 t",
    notes: "Schwerlast-Plattform",
    illustration: "40-flatrack",
    description:
      "40′ Flat Rack — die XL-Schwerlast-Plattform für Großmaschinen, Anlagen, Baufahrzeuge und Projektladungen. Zuladung bis 39 t, Be- und Entladung von oben und seitlich.",
    specs: {
      exterior: { l: "12,19", b: "2,44", h: "2,59" },
      interior: { l: "12,06", b: "2,36", h: "2,20" },
      maxGross: "45.000 kg",
      tare: "5.700 kg",
      maxPayload: "39.300 kg",
    },
  },
  {
    id: "tank",
    size: "20′",
    name: "Tankcontainer",
    cbm: "14.500 L",
    payload: "~26 t",
    notes: "Flüssigkeits-Tank im 20′ Rahmen",
    illustration: "tank",
    description:
      "Tank-Container im 20′ Rahmen für Flüssigkeiten, Chemikalien und Lebensmittel. Bauseitig druck- und temperaturfest, mit Manhole oben und Auslassventil unten.",
    specs: {
      interior: { l: "5,89", b: "2,35", h: "2,39" },
      maxGross: "30.480 kg",
      tare: "4.190 kg",
      maxPayload: "14.500 Liter",
    },
  },
];

export default function Containers() {
  const [active, setActive] = useState<ContainerType | null>(null);

  return (
    <section
      id="container"
      className="relative pt-24 lg:pt-40 pb-0 bg-slate-950 text-white overflow-hidden"
    >
      <div
        className="absolute top-0 inset-x-0 h-[80%] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-400 uppercase tracking-[0.15em] mb-4">
            Container-Equipment
          </p>
          <h2 className="headline text-4xl md:text-6xl">
            Vom Standard-Box
            <br />
            <span className="text-slate-500">bis zum Spezialmaß.</span>
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-3xl">
            <p className="text-slate-400 max-w-xl">
              Fünfzehn Equipment-Varianten — von 20′ bis 45′, Reefer, Open Top, Flat Rack und Tank.
              Klick auf eine Karte für alle Spezifikationen.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-medium shrink-0"
            >
              <span className="tracking-wide">Horizontal scrollen</span>
              <motion.svg
                viewBox="0 0 16 16"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto snap-x-mandatory px-6 lg:px-10 pb-4 no-scrollbar">
          {types.map((t, i) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => setActive(t)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group snap-start-x shrink-0 w-[280px] sm:w-[320px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-6 text-left hover:border-sky-500/40 transition-colors duration-300 cursor-pointer"
            >
              {/* Illustration oder Foto — heller Visual-Bereich für einheitliches Design */}
              <div className="aspect-[16/9] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.photo}
                    alt={`${t.size} ${t.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ContainerIllustration
                    variant={t.illustration}
                    className="w-full h-full"
                  />
                )}
              </div>

              <div className="mt-5 text-sky-400 text-xs font-mono uppercase tracking-widest">
                {t.size}
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                {t.name}
              </h3>
              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Volumen</span>
                  <span className="font-medium tabular-nums">{t.cbm}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Zuladung</span>
                  <span className="font-medium tabular-nums">{t.payload}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hinweis</span>
                  <span className="font-medium text-right">{t.notes}</span>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-sky-400 font-medium">
                Details ansehen
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
          <div className="shrink-0 w-6" />
        </div>

        {/* Edge-Fade rechts */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-20 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent" />

        {/* Mobile-Scroll-Hint */}
        <div className="sm:hidden flex items-center justify-center gap-2 mt-4 text-xs text-sky-300">
          <motion.svg
            viewBox="0 0 16 16"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M3 8h10M9 4l4 4-4 4M7 4l-4 4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <span>Wischen für mehr Container</span>
        </div>
      </div>

      {/* Containerschiff-Silhouette als atmosphärische Abrundung */}
      <div className="relative mt-16 lg:mt-24 h-[180px] sm:h-[220px] overflow-hidden">
        <svg
          aria-hidden
          viewBox="0 0 1200 240"
          className="absolute bottom-0 inset-x-0 w-full text-white/[0.05]"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="ship-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="60%" stopColor="currentColor" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Wasserlinie */}
          <path
            d="M0 220 L1200 220"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
          />
          {/* Schiff-Rumpf */}
          <path
            d="M120 220 L1080 220 L1040 200 L160 200 Z"
            fill="url(#ship-fade)"
          />
          {/* Container-Stacks */}
          <g fill="currentColor">
            <rect x="210" y="170" width="60" height="30" />
            <rect x="275" y="170" width="60" height="30" />
            <rect x="340" y="170" width="60" height="30" />
            <rect x="405" y="170" width="60" height="30" />
            <rect x="470" y="170" width="60" height="30" />
            <rect x="535" y="170" width="60" height="30" />
            <rect x="600" y="170" width="60" height="30" />
            <rect x="665" y="170" width="60" height="30" />
            <rect x="730" y="170" width="60" height="30" />
            <rect x="795" y="170" width="60" height="30" />
            <rect x="860" y="170" width="60" height="30" />
            <rect x="925" y="170" width="60" height="30" />
            <rect x="275" y="140" width="60" height="30" />
            <rect x="340" y="140" width="60" height="30" />
            <rect x="470" y="140" width="60" height="30" />
            <rect x="535" y="140" width="60" height="30" />
            <rect x="600" y="140" width="60" height="30" />
            <rect x="665" y="140" width="60" height="30" />
            <rect x="730" y="140" width="60" height="30" />
            <rect x="860" y="140" width="60" height="30" />
            <rect x="535" y="110" width="60" height="30" />
            <rect x="600" y="110" width="60" height="30" />
            <rect x="665" y="110" width="60" height="30" />
          </g>
          {/* Brücke */}
          <path d="M170 200 L170 150 L210 150 L210 200" fill="currentColor" />
          <rect x="178" y="158" width="6" height="6" fill="currentColor" opacity="0.5" />
          <rect x="188" y="158" width="6" height="6" fill="currentColor" opacity="0.5" />
          {/* Schornstein */}
          <rect x="190" y="120" width="14" height="30" fill="currentColor" />
        </svg>
      </div>

      {/* Detail-Modal */}
      <ContainerDetailModal
        open={active !== null}
        onClose={() => setActive(null)}
        size={active?.size ?? ""}
        name={active?.name ?? ""}
        illustration={active?.illustration ?? "20-standard"}
        photo={active?.photo}
        specs={active?.specs}
        description={active?.description}
      />
    </section>
  );
}
