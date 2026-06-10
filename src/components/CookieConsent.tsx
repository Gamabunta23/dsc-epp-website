"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dscepp-consent";

/**
 * Cookie-/Consent-Banner.
 *
 * Aktuell setzt die Site keine Tracking-Cookies — der Banner speichert die
 * Wahl in localStorage als Grundlage für spätere Analytics-Einbindung:
 *   localStorage["dscepp-consent"] = "all" | "necessary"
 * Vor dem Laden eines Tracking-Scripts immer auf "all" prüfen.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  function choose(value: "all" | "necessary") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie-Einstellungen"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[60] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/15 dark:shadow-black/50 p-6"
        >
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
            Cookies & Datenschutz
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Wir verwenden ausschließlich technisch notwendige Funktionen. Optionale
            Dienste (z. B. Statistik) werden nur mit Ihrer Zustimmung aktiviert.
            Details in der{" "}
            <Link href="/datenschutz" className="text-sky-700 dark:text-sky-400 hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => choose("all")}
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Alle akzeptieren
            </button>
            <button
              type="button"
              onClick={() => choose("necessary")}
              className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Nur notwendige
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
