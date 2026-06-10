"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { hash: "#leistungen", label: "Leistungen" },
  { hash: "#container", label: "Container" },
  { hash: "#flotte", label: "Flotte" },
  { hash: "#fahrzeitrechner", label: "Fahrzeitrechner" },
  { hash: "#standorte", label: "Standorte" },
  { hash: "#unternehmen", label: "Unternehmen" },
];

const routes = [
  { href: "/karriere", label: "Karriere" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Anchor-Links: auf Home als reines "#xy" lassen (smooth scroll bleibt),
  // auf Sub-Routes als "/#xy" damit zurück zur Home navigiert wird.
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);
  const contactHref = onHome ? "#kontakt" : "/#kontakt";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Background-Layer — Opacity per Scroll, Farbe wechselt mit Theme */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-white/72 dark:bg-slate-950/72 backdrop-blur-xl border-b border-slate-900/8 dark:border-slate-100/8"
        aria-hidden
      />
      <nav className="relative max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group" aria-label="DSC | EPP Logistik – Startseite">
          <Image
            src="/logo-light.webp"
            alt="DSC | EPP Logistik"
            width={500}
            height={168}
            priority
            className="h-12 w-auto dark:invert dark:brightness-200"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                href={anchor(l.hash)}
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
          {routes.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === r.href ? "text-slate-950 dark:text-white font-medium" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={contactHref}
            className="text-sm font-medium text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-200 rounded-full px-4 py-2 cursor-pointer"
          >
            Angebot anfragen
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            className="p-2 -mr-2 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-950 dark:stroke-slate-100" fill="none" strokeWidth="1.5">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative lg:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl"
        >
          <ul className="px-6 py-4 space-y-3">
            {links.map((l) => (
              <li key={l.hash}>
                <Link
                  href={anchor(l.hash)}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                >
                  {r.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={contactHref}
                onClick={() => setOpen(false)}
                className="block text-center font-medium text-white dark:text-slate-950 bg-slate-950 dark:bg-white rounded-full px-4 py-3 cursor-pointer"
              >
                Angebot anfragen
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
