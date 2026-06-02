"use client";

import { motion } from "motion/react";

export default function LegalShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
              {eyebrow}
            </p>
            <h1 className="headline text-4xl md:text-6xl text-slate-950">{title}</h1>
            {intro && (
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{intro}</p>
            )}
          </motion.div>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto px-6 lg:px-10 text-slate-700 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-slate-950 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-950 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_a]:text-sky-700 [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-slate-950 [&_strong]:font-semibold [&_dl]:grid [&_dl]:grid-cols-[max-content_1fr] [&_dl]:gap-x-6 [&_dl]:gap-y-2 [&_dt]:text-slate-500 [&_dt]:text-sm [&_dd]:text-slate-900"
        >
          {children}
        </motion.div>
      </section>
    </main>
  );
}
