"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="relative py-24 lg:py-40 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-950 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-medium text-sky-400 uppercase tracking-[0.15em] mb-4">
            Anfrage
          </p>
          <h2 className="headline text-4xl md:text-6xl">
            Welche Box bewegen
            <br />
            <span className="text-slate-400 dark:text-slate-500">wir für Sie?</span>
          </h2>
          <p className="mt-6 text-slate-400 dark:text-slate-500">
            Beschreiben Sie kurz Ihre Tour — wir melden uns innerhalb eines Werktages
            mit einem konkreten Angebot.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 lg:p-12 grid sm:grid-cols-2 gap-6"
        >
          <Field label="Name" name="name" required />
          <Field label="Firma" name="company" />
          <Field label="E-Mail" name="email" type="email" required />
          <Field label="Telefon" name="phone" type="tel" />
          <Field label="Abholung" name="from" placeholder="Hamburg Terminal Burchardkai" />
          <Field label="Ziel" name="to" placeholder="Salzkotten / Bielefeld / ..." />
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-2">
              Container / Anforderung
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="z.B. 1×40′ HC, Reefer −18 °C, Abholung Mo 06:00"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 dark:text-slate-400 dark:text-slate-500 focus:outline-none focus:border-sky-500/60 focus:bg-white/[0.06] transition-colors"
            />
          </div>
          <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
              Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß
              Datenschutzerklärung zu.
            </p>
            <button
              type="submit"
              disabled={sent}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-950 font-medium hover:bg-slate-200 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-default"
            >
              {sent ? "Danke — wir melden uns." : "Anfrage senden"}
              {!sent && (
                <svg viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-2">
        {label}
        {required && <span className="text-sky-400"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 dark:text-slate-400 dark:text-slate-500 focus:outline-none focus:border-sky-500/60 focus:bg-white/[0.06] transition-colors"
      />
    </div>
  );
}
