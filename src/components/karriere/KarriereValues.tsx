"use client";

import { motion } from "motion/react";

const values = [
  {
    title: "Moderne Flotte",
    body: "EURO VI D Zugmaschinen, Live Traffic, beheizte Kabinen. Wer Premium fährt, fährt entspannter — und kommt sauberer an.",
  },
  {
    title: "Planbare Touren",
    body: "Disposition mit System: Tour-Aufteilung nach EU-VO 561, planbare Heimfahrten, Wochenend-Regelungen die funktionieren.",
  },
  {
    title: "Faires Gehalt",
    body: "Tarif-orientierte Bezahlung, Spesen nach Tabelle, Sonn- und Feiertagszuschläge. Klar, transparent, pünktlich auf dem Konto.",
  },
  {
    title: "Drei Standorte",
    body: "Bakum (Hauptsitz), Hamburg-Hafen, Ostwestfalen-Lippe. Heimat-nah arbeiten — egal wo Sie wohnen.",
  },
  {
    title: "Weiterbildung",
    body: "BKF-Module §5 inhouse, ADR-Lehrgänge, Stapler-Scheine. Wir investieren in Qualifikationen, die Sie behalten.",
  },
  {
    title: "Mittelständisch",
    body: "Inhabergeführt, kurze Wege, Geschäftsführung mit Vornamen. Hier kennt jeder jeden — und das hat Vorteile.",
  },
];

export default function KarriereValues() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Warum bei uns
          </p>
          <h2 className="headline text-4xl md:text-5xl text-slate-950">
            Sechs gute Gründe.
            <br />
            <span className="text-slate-500">Nicht sechs Marketing-Sprüche.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200/60 rounded-3xl overflow-hidden">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="bg-white p-8 lg:p-10"
            >
              <div className="text-xs font-mono text-sky-700 uppercase tracking-[0.2em] mb-3">
                0{i + 1}
              </div>
              <h3 className="text-xl font-semibold text-slate-950 mb-3">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
