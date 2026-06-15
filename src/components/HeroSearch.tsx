"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { containerSearchIndex } from "./Containers";

type Result = {
  id: string;
  title: string;
  sub: string;
  group: "Container" | "Leistungen" | "Seite";
  /** Anchor (#xy), Route (/karriere) — Container öffnen zusätzlich das Modal */
  href: string;
  containerId?: string;
  keywords: string;
};

function buildIndex(): Result[] {
  const containers: Result[] = containerSearchIndex().map((c) => ({
    id: `c-${c.id}`,
    title: `${c.size} ${c.name}`,
    sub: `Container-Equipment · ${c.notes}`,
    group: "Container",
    href: "#container",
    containerId: c.id,
    keywords: `${c.size} ${c.name} ${c.notes} container fuß zoll box`.toLowerCase(),
  }));

  const services: Result[] = [
    { t: "Überseecontainer-Transport", k: "übersee transport hafen seehafen import export tiefseehafen" },
    { t: "Multimodale Verkehre", k: "multimodal schiene bahn binnenschiff kombiverkehr intermodal" },
    { t: "Reefer / Kühlcontainer", k: "reefer kühl kühlcontainer temperatur pharma lebensmittel gen-set minus grad" },
    { t: "VGM-Verwiegung", k: "vgm verwiegung solas gewicht bruttogewicht wiegen zertifikat" },
    { t: "Container-Lagerung", k: "lagerung depot lager stellplatz standzeit zwischenlagerung strom" },
    { t: "Container-Verkauf", k: "verkauf kaufen gebraucht neu erwerben preis" },
  ].map((s, i) => ({
    id: `s-${i}`,
    title: s.t,
    sub: "Leistungen → zur Section",
    group: "Leistungen" as const,
    href: "#leistungen",
    keywords: `${s.t} ${s.k}`.toLowerCase(),
  }));

  const pages: Result[] = [
    { id: "p-fahrzeit", title: "Fahrzeitrechner", sub: "Tour-Dauer kalkulieren", href: "#fahrzeitrechner", k: "fahrzeit rechner dauer tour lenkzeit pause eu 561 ankunft" },
    { id: "p-flotte", title: "Flotte & Technologie", sub: "Equipment & Live Traffic", href: "#flotte", k: "flotte lkw zugmaschine euro vi chassis sattelzug equipment" },
    { id: "p-standorte", title: "Standorte", sub: "Bakum · Hamburg · OWL", href: "#standorte", k: "standort bakum hamburg owl ostwestfalen adresse telefon kontakt whatsapp niederlassung" },
    { id: "p-karriere", title: "Karriere", sub: "Offene Stellen ansehen", href: "/karriere", k: "karriere job stelle bewerbung fahrer disponent arbeiten mitarbeiter" },
    { id: "p-kontakt", title: "Angebot anfragen", sub: "Anfrage-Formular", href: "#kontakt", k: "kontakt angebot anfrage preis offerte mail formular" },
  ].map((p) => ({
    id: p.id,
    title: p.title,
    sub: p.sub,
    group: "Seite" as const,
    href: p.href,
    keywords: `${p.title} ${p.k}`.toLowerCase(),
  }));

  return [...containers, ...services, ...pages];
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const terms = q.split(/\s+/);
    return index
      .filter((r) => terms.every((t) => r.keywords.includes(t)))
      .slice(0, 6);
  }, [query, index]);

  const open = focused && results.length > 0;

  // Klick außerhalb schließt das Panel
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => setHighlight(0), [query]);

  function select(r: Result) {
    setFocused(false);
    setQuery("");
    if (r.href.startsWith("#")) {
      document.querySelector(r.href)?.scrollIntoView({ behavior: "smooth" });
      if (r.containerId) {
        const id = r.containerId;
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("dscepp:open-container", { detail: id }));
        }, 650);
      }
    } else {
      window.location.assign(r.href);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[highlight]);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      ref={wrapRef}
      className="relative mt-8 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 focus-within:border-sky-500/60 dark:focus-within:border-sky-400/60 transition-colors">
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 stroke-slate-400 dark:stroke-slate-500" fill="none" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          placeholder="Was suchen Sie? z. B. Reefer, 40′ HC, VGM …"
          aria-label="Website durchsuchen"
          role="combobox"
          aria-expanded={open}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-1p-ignore
          data-lpignore="true"
          suppressHydrationWarning
          className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 inset-x-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/10 dark:shadow-black/40 overflow-hidden text-left"
            role="listbox"
          >
            {results.map((r, i) => (
              <li key={r.id} role="option" aria-selected={i === highlight}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => select(r)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer ${
                    i === highlight ? "bg-slate-50 dark:bg-slate-800/60" : ""
                  }`}
                >
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.12em] text-sky-700 dark:text-sky-400 w-20">
                    {r.group}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {r.title}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">
                      {r.sub}
                    </span>
                  </span>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0 stroke-slate-400" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
