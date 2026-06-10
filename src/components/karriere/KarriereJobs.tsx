"use client";

import { motion } from "motion/react";

type Job = {
  title: string;
  location: string;
  type: string;
  category: string;
  description: string;
  highlights: string[];
};

const jobs: Job[] = [
  {
    title: "Berufskraftfahrer C/CE (m/w/d)",
    location: "Bundesweit",
    type: "Vollzeit",
    category: "Fahrpersonal",
    description:
      "Container-Transporte ab Hamburger Hafen und im nationalen Verkehr. Tagestouren, planbare Wochenenden, moderne Sattelzüge EURO VI D.",
    highlights: ["Führerschein CE", "Modul 95 (BKF)", "ADR von Vorteil", "Heimfahrten planbar"],
  },
  {
    title: "Disponent Container-Verkehre (m/w/d)",
    location: "Hamburg · Bremerhaven",
    type: "Vollzeit",
    category: "Disposition",
    description:
      "Tour-Planung für unsere Sattelzüge und Subunternehmer. Steuerung der Hafenabholungen, multimodale Verkehre, Schnittstelle zu Kunden und Fahrern.",
    highlights: ["Speditionserfahrung", "Container-Know-how", "Englisch B1+", "Hands-on Mentalität"],
  },
  {
    title: "Disponent im Intermodalverkehr (m/w/d)",
    location: "Hamburg",
    type: "Vollzeit",
    category: "Disposition",
    description:
      "Disposition von Containertransporten auf der Schiene. Tour-Planung im kombinierten Verkehr Schiene-Straße, Kommunikation mit Terminals, Operateuren und Reedereien.",
    highlights: ["Erfahrung im Intermodalverkehr", "Schiene-Straße-Know-how", "Englisch sicher", "Strukturierte Arbeitsweise"],
  },
];

export default function KarriereJobs() {
  return (
    <section id="stellen" className="relative py-24 lg:py-40 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Offene Stellen
          </p>
          <h2 className="headline text-4xl md:text-6xl text-slate-950 dark:text-white">
            Was wir suchen,
            <br />
            <span className="text-slate-500 dark:text-slate-400">und wo.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.article
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 lg:p-10 grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-sky-700 uppercase tracking-[0.15em]">
                      {job.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{job.type}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{job.location}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
                    {job.title}
                  </h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {job.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <svg viewBox="0 0 16 16" className="w-3 h-3 text-sky-600" fill="none" strokeWidth="2" stroke="currentColor">
                          <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:text-right">
                  <a
                    href={`mailto:bewerbung@dsc-logistik.de?subject=${encodeURIComponent("Bewerbung: " + job.title)}`}
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-medium hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
                  >
                    Jetzt bewerben
                    <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
