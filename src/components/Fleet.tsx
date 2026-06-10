"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const features = [
  {
    title: "EURO VI D Zugmaschinen",
    body: "Aktuelle Abgasnorm, sparsamer Verbrauch, leiseres Fahrwerk — neuste Generation in beiden Hubs.",
  },
  {
    title: "Live Traffic System",
    body: "Echtzeit-Routenoptimierung und Sendungsverfolgung. Sie wissen jederzeit, wo Ihre Box steht.",
  },
  {
    title: "Vollausgestattete Chassis",
    body: "20′, 40′, 45′ Multi-Gooseneck, Gen-Set für Reefer, Box- und Kühlauflieger.",
  },
  {
    title: "Just-in-Time-Disposition",
    body: "Tonnagen und Termine — beides nicht-verhandelbar. Unsere Dispo plant beides parallel.",
  },
];

export default function Fleet() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="flotte" className="relative py-24 lg:py-40 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          style={{ y }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 border border-slate-200/60"
        >
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image
              src="/fleet-truck-v16.jpeg"
              alt="LKW der Flotte"
              width={953}
              height={643}
              className="w-full h-auto object-contain"
              priority={false}
            />
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
              Flotte &amp; Technologie
            </p>
            <h2 className="headline text-4xl md:text-5xl text-slate-950 dark:text-white">
              Modernes Equipment.
              <br />
              <span className="text-slate-500">Maximale Verfügbarkeit.</span>
            </h2>
          </motion.div>

          <ul className="mt-12 space-y-8">
            {features.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-slate-200 pt-6"
              >
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
