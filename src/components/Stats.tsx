"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

type Stat = { value: number; suffix?: string; label: string; sub?: string };

const stats: Stat[] = [
  { value: 3, label: "Standorte", sub: "Bakum · Hamburg · OWL" },
  { value: 27, suffix: "+", label: "EU-Länder", sub: "tägliche Verkehre" },
  { value: 100, suffix: "%", label: "EURO VI D", sub: "moderne Flotte" },
  { value: 24, suffix: "/7", label: "Live Tracking", sub: "Sendungsverfolgung" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Die neue Größenordnung
          </p>
          <h2 className="headline text-4xl md:text-6xl text-slate-950">
            Zwei Spezialisten.
            <br />
            <span className="text-slate-500">Eine Logistik-Plattform.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/60 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white p-8 lg:p-10"
            >
              <div className="text-5xl lg:text-6xl headline text-slate-950">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-900">{s.label}</div>
              {s.sub && <div className="text-xs text-slate-500 mt-1">{s.sub}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
