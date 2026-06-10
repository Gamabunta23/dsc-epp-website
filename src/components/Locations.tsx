"use client";

import { motion } from "motion/react";
import LocationsMap from "./LocationsMap";

type Location = {
  name: string;
  role: string;
  desc: string;
  address?: string;
  phone: string;
  whatsapp: string;
  email: string;
  legacy: string;
  featured?: boolean;
};

const locations: Location[] = [
  {
    name: "Bakum",
    role: "Hauptsitz",
    desc: "Verwaltung, Disposition und Verteil-Hub direkt an der Hansalinie A1 im Landkreis Vechta. Kurze Wege in alle Richtungen.",
    address: "Essener Str. 39 · 49456 Bakum",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 151 72822291",
    email: "auftrag@dsc-logistik.de",
    legacy: "Sitz der DSC | EPP Logistik GmbH",
    featured: true,
  },
  {
    name: "Hamburg",
    role: "Hafen-Hub",
    desc: "Direkter Zugang zu den Terminals des Hamburger Hafens. Multimodale Anbindung an Bahn und Binnenschiff.",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 1520 8657623",
    email: "auftrag@dsc-logistik.de",
    legacy: "Standort der DSC | EPP Logistik GmbH",
  },
  {
    name: "Ostwestfalen-Lippe",
    role: "Inland-Hub",
    desc: "Zentral im westfälischen Wirtschaftsraum. Just-in-Time-Anlieferung an Industrie und Handel.",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 171 10 01 119",
    email: "auftrag@dsc-logistik.de",
    legacy: "Standort der DSC | EPP Logistik GmbH",
  },
];

export default function Locations() {
  return (
    <section id="standorte" className="relative py-24 lg:py-40 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Standorte
          </p>
          <h2 className="headline text-4xl md:text-6xl text-slate-950 dark:text-white">
            Hauptsitz Bakum.
            <br />
            <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Hafen Hamburg. Inland OWL.</span>
          </h2>
        </motion.div>

        <LocationsMap />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.article
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative rounded-3xl p-8 lg:p-10 overflow-hidden ${
                loc.featured
                  ? "bg-slate-950 dark:bg-slate-800 text-white border border-slate-900 dark:border-slate-700"
                  : "bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60"
              }`}
            >
              <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-700 ${
                loc.featured
                  ? "bg-gradient-to-br from-sky-500/30 to-transparent"
                  : "bg-gradient-to-br from-sky-100 to-transparent"
              }`} />

              <div className="relative">
                {loc.featured && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] uppercase tracking-[0.15em] font-medium mb-4">
                    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><circle cx="8" cy="8" r="3" /></svg>
                    Hauptsitz
                  </span>
                )}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className={`text-3xl font-semibold tracking-tight ${loc.featured ? "text-white" : "text-slate-950 dark:text-white"}`}>
                    {loc.name}
                  </h3>
                  <span className={`text-sm font-medium ${loc.featured ? "text-sky-400" : "text-sky-700"}`}>
                    {loc.role}
                  </span>
                </div>
                <p className={`mt-4 leading-relaxed ${loc.featured ? "text-slate-300" : "text-slate-600 dark:text-slate-400 dark:text-slate-500"}`}>
                  {loc.desc}
                </p>
                {loc.address && (
                  <p className={`mt-4 text-sm font-medium ${loc.featured ? "text-white" : "text-slate-900 dark:text-slate-100"}`}>
                    {loc.address}
                  </p>
                )}
                <p className={`mt-2 text-xs ${loc.featured ? "text-slate-500 dark:text-slate-400 dark:text-slate-500" : "text-slate-400 dark:text-slate-500"}`}>
                  {loc.legacy}
                </p>

                <dl className="mt-8 space-y-3 text-sm">
                  {[
                    { label: "Telefon", value: loc.phone, href: `tel:${loc.phone.replace(/\s/g, "")}` },
                    { label: "WhatsApp", value: loc.whatsapp, href: `https://wa.me/${loc.whatsapp.replace(/\D/g, "")}`, external: true },
                    { label: "E-Mail", value: loc.email, href: `mailto:${loc.email}` },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between border-t pt-3 ${
                        loc.featured ? "border-white/10" : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <dt className={loc.featured ? "text-slate-400 dark:text-slate-500" : "text-slate-500 dark:text-slate-400 dark:text-slate-500"}>
                        {row.label}
                      </dt>
                      <dd>
                        <a
                          href={row.href}
                          target={row.external ? "_blank" : undefined}
                          rel={row.external ? "noopener noreferrer" : undefined}
                          className={`font-medium transition-colors tabular-nums ${
                            loc.featured
                              ? "text-white hover:text-sky-400"
                              : "text-slate-950 hover:text-sky-700"
                          }`}
                        >
                          {row.value}
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
