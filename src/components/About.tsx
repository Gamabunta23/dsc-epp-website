"use client";

import { motion } from "motion/react";

const values = [
  { label: "Termin­treue", body: "Just-in-Time bedeutet bei uns nicht Marketing, sondern Disposition." },
  { label: "Qualität", body: "Geprüftes Equipment, geschultes Personal, dokumentierte Prozesse." },
  { label: "Verant­wortung", body: "EURO VI D, Kombi­verkehr, kürzere Wege — Logistik mit weniger Spuren." },
  { label: "Mit­einander", body: "Sympathisches Miteinander für Sie und für uns — das war, ist und bleibt." },
];

export default function About() {
  return (
    <section id="unternehmen" className="relative py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
              Unternehmen
            </p>
            <h2 className="headline text-4xl md:text-5xl text-slate-950">
              Aus zwei wird eins.
              <br />
              <span className="text-slate-500">Aus Erfahrung wird Reichweite.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-4 space-y-6 text-lg text-slate-700 leading-relaxed"
          >
            <p>
              Die DSC <span className="text-slate-400">|</span> EPP Logistik GmbH
              bündelt zwei spezialisierte Mittelständler unter einem Dach: die
              Hafen-Expertise der DSC Logistik aus Hamburg und das Inland-Netzwerk
              der EPP Logistik aus Ostwestfalen-Lippe. Gesteuert vom neuen
              Hauptsitz in Bakum — direkt an der Hansalinie A1.
            </p>
            <p>
              Das Ergebnis ist eine durchgängige Container-Kette vom Tiefseehafen bis
              zur Werks­rampe — mit eigenem Equipment, eigener Disposition und einer
              Tonnage, die wir nicht nur transportieren, sondern verantworten.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/60 rounded-2xl overflow-hidden">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white p-8"
            >
              <div className="text-xs text-sky-700 font-mono uppercase tracking-[0.2em] mb-3">
                0{i + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-950 mb-2">{v.label}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
