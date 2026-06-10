"use client";

import { motion } from "motion/react";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

/** Baut aus den Formulardaten einen vorbefüllten mailto:-Link (Fallback ohne Backend) */
function buildMailto(fields: Record<string, string>): string {
  const subject = `Anfrage über die Website: ${fields.name}${fields.company ? ` (${fields.company})` : ""}`;
  const body = [
    `Name: ${fields.name}`,
    `Firma: ${fields.company || "—"}`,
    `E-Mail: ${fields.email}`,
    `Telefon: ${fields.phone || "—"}`,
    `Abholung: ${fields.from || "—"}`,
    `Ziel: ${fields.to || "—"}`,
    "",
    fields.message || "",
  ].join("\n");
  return `mailto:auftrag@dsc-logistik.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const fields = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
    ) as Record<string, string>;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        // Backend noch nicht konfiguriert → Mail-Programm mit Inhalt öffnen
        window.location.href = buildMailto(fields);
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      window.location.href = buildMailto(fields);
      setStatus("fallback");
    }
  }

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
          onSubmit={handleSubmit}
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
            <div className="flex flex-col items-center sm:items-end gap-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-950 font-medium hover:bg-slate-200 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-default disabled:hover:scale-100"
              >
                {status === "sending" && "Wird gesendet …"}
                {status === "sent" && "Danke — wir melden uns."}
                {(status === "idle" || status === "fallback" || status === "error") && "Anfrage senden"}
                {(status === "idle" || status === "fallback" || status === "error") && (
                  <svg viewBox="0 0 16 16" className="w-4 h-4">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {status === "fallback" && (
                <p className="text-xs text-slate-400">
                  Ihr E-Mail-Programm wurde geöffnet — alternativ direkt an{" "}
                  <a href="mailto:auftrag@dsc-logistik.de" className="text-sky-400 hover:underline">
                    auftrag@dsc-logistik.de
                  </a>
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-400">
                  Senden fehlgeschlagen — bitte direkt an{" "}
                  <a href="mailto:auftrag@dsc-logistik.de" className="text-sky-400 hover:underline">
                    auftrag@dsc-logistik.de
                  </a>
                </p>
              )}
            </div>
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
