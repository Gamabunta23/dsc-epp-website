"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#container", label: "Container" },
  { href: "#flotte", label: "Flotte" },
  { href: "#fahrzeitrechner", label: "Fahrzeitrechner" },
  { href: "#standorte", label: "Standorte" },
  { href: "#unternehmen", label: "Unternehmen" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.72)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(15,23,42,0)", "rgba(15,23,42,0.08)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ background: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center group" aria-label="DSC | EPP Logistik – Startseite">
          <Image
            src="/logo-light.webp"
            alt="DSC | EPP Logistik"
            width={500}
            height={168}
            priority
            className="h-9 w-auto"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-700 hover:text-slate-950 transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#kontakt"
            className="text-sm font-medium text-white bg-slate-950 hover:bg-slate-800 transition-colors duration-200 rounded-full px-4 py-2 cursor-pointer"
          >
            Angebot anfragen
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
          className="lg:hidden p-2 -mr-2 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-950" fill="none" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-slate-200/60 bg-white/90 backdrop-blur-xl"
        >
          <ul className="px-6 py-4 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-slate-800 hover:text-slate-950"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="block text-center font-medium text-white bg-slate-950 rounded-full px-4 py-3 cursor-pointer"
              >
                Angebot anfragen
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
