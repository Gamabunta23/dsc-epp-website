"use client";

import { motion } from "motion/react";

type Step = {
  label: string;
  detail: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    label: "Tiefseehafen",
    detail: "Terminal",
    icon: (
      // Container-Schiff
      <svg viewBox="0 0 48 48" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 32h40l-3 8H7z" />
        <path d="M10 32V20h28v12" />
        <path d="M14 20v-4h6v4M22 20v-4h6v4M30 20v-4h6v4" />
        <path d="M14 26h6M22 26h6M30 26h6" />
        <path d="M24 12V8M22 8h4" />
        <path d="M2 40h44" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Umschlag",
    detail: "VGM &amp; Terminal",
    icon: (
      // Portal-Kran
      <svg viewBox="0 0 48 48" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h32" />
        <path d="M8 8v32M40 8v32" />
        <path d="M24 8v6" />
        <path d="M18 14h12v8H18z" />
        <path d="M24 22v8" />
        <path d="M20 30h8v6h-8z" />
        <path d="M4 40h40" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Multimodal",
    detail: "Straße &amp; Schiene",
    icon: (
      // LKW + Bahn-Symbol
      <svg viewBox="0 0 48 48" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="16" width="26" height="14" rx="1" />
        <path d="M30 20h8l4 4v6h-12" />
        <circle cx="12" cy="34" r="3" />
        <circle cx="22" cy="34" r="3" />
        <circle cx="36" cy="34" r="3" />
        <path d="M8 20h6M16 20h6" />
        <path d="M2 40h44" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Werks-Rampe",
    detail: "Just-in-Time",
    icon: (
      // Warenhaus
      <svg viewBox="0 0 48 48" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20l18-10 18 10v20H6z" />
        <path d="M18 40V28h12v12" />
        <path d="M22 28v12M26 28v12" />
        <path d="M2 40h44" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    ),
  },
];

export default function Journey() {
  return (
    <section className="relative bg-white dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-14"
        >
          <p className="text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-[0.2em] mb-3">
            Vom Schiff bis zur Rampe
          </p>
          <h2 className="headline text-3xl md:text-4xl text-slate-950 dark:text-white">
            Eine Container-Kette.
            <span className="text-slate-500 dark:text-slate-400"> Vier Etappen.</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Verbindungslinie (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          {/* Animierter Glow-Dot der die Linie von Etappe 1 → 4 entlangläuft.
              `left` in % ist relativ zur Container-Breite → läuft exakt von
              12,5% (erste Etappe) bis 87,5% (letzte Etappe), nicht ins Leere. */}
          <motion.div
            aria-hidden
            className="hidden lg:block absolute top-7 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_3px_rgba(56,189,248,0.9),0_0_30px_10px_rgba(56,189,248,0.55)]"
            initial={{ left: "12.5%", opacity: 0 }}
            whileInView={{ left: ["12.5%", "87.5%"], opacity: [0, 1, 1, 0] }}
            viewport={{ once: false }}
            transition={{
              left: { duration: 4.8, ease: "linear", repeat: Infinity, repeatDelay: 0.5 },
              opacity: {
                duration: 4.8,
                ease: "linear",
                times: [0, 0.04, 0.96, 1],
                repeat: Infinity,
                repeatDelay: 0.5,
              },
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                {step.icon}
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">
                {step.label}
              </div>
              <div
                className="text-xs text-slate-500 dark:text-slate-400 mt-1"
                dangerouslySetInnerHTML={{ __html: step.detail }}
              />
              <div className="mt-3 text-[10px] font-mono text-sky-700 dark:text-sky-400 uppercase tracking-widest">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
