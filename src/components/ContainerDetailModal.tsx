"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import ContainerIllustration from "./ContainerIllustration";

export type ContainerSpecs = {
  exterior?: { l: string; b: string; h: string };
  interior?: { l: string; b: string; h: string };
  door?: { b: string; h: string };
  maxGross?: string;     // Max. Ladegewicht (= Bruttogewicht inkl. Container)
  tare?: string;         // Leergewicht
  maxPayload?: string;   // Max. Zuladung
  volume?: string;
};

export type ContainerVariant =
  | "20-standard"
  | "20-highcube"
  | "40-standard"
  | "40-highcube"
  | "45"
  | "reefer";

type Props = {
  open: boolean;
  onClose: () => void;
  size: string;
  name: string;
  illustration: ContainerVariant;
  specs?: ContainerSpecs;
  description?: string;
};

export default function ContainerDetailModal({
  open,
  onClose,
  size,
  name,
  illustration,
  specs,
  description,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Body-Scroll deaktivieren
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const hasSpecs = specs && (specs.exterior || specs.interior || specs.door || specs.maxGross);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${size} ${name} – Spezifikationen`}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:text-slate-950 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="grid sm:grid-cols-2 overflow-y-auto">
              {/* Illustration */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 px-8 py-10 sm:px-10 sm:py-14 flex items-center justify-center min-h-[240px]">
                <ContainerIllustration variant={illustration} className="w-full max-w-md" />
              </div>

              {/* Specs */}
              <div className="p-8 sm:p-10">
                <p className="text-xs font-mono text-sky-700 uppercase tracking-[0.2em] mb-2">
                  {size}
                </p>
                <h3 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {name}
                </h3>
                {description && (
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                )}

                {hasSpecs ? (
                  <dl className="mt-8 space-y-5 text-sm">
                    {specs?.exterior && (
                      <SpecRow
                        label="Außenmaße (L × B × H)"
                        value={`${specs.exterior.l} × ${specs.exterior.b} × ${specs.exterior.h} m`}
                      />
                    )}
                    {specs?.interior && (
                      <SpecRow
                        label="Innenmaße (L × B × H)"
                        value={`${specs.interior.l} × ${specs.interior.b} × ${specs.interior.h} m`}
                      />
                    )}
                    {specs?.door && (
                      <SpecRow
                        label="Türöffnung (B × H)"
                        value={`${specs.door.b} × ${specs.door.h} m`}
                      />
                    )}
                    {specs?.maxGross && <SpecRow label="Max. Ladegewicht" value={specs.maxGross} />}
                    {specs?.tare && <SpecRow label="Leergewicht" value={specs.tare} />}
                    {specs?.maxPayload && <SpecRow label="Max. Zuladung" value={specs.maxPayload} />}
                    {specs?.volume && <SpecRow label="Volumen" value={specs.volume} />}
                  </dl>
                ) : (
                  <p className="mt-8 text-sm text-slate-500 italic">
                    Detaillierte Spezifikationen folgen — kommen Sie gerne auf
                    uns zu.
                  </p>
                )}

                <a
                  href="#kontakt"
                  onClick={onClose}
                  className="group mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Diesen Container anfragen
                  <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-slate-100 pb-3 last:border-0">
      <dt className="text-xs uppercase tracking-[0.1em] text-slate-500">{label}</dt>
      <dd className="text-base font-semibold text-slate-950 tabular-nums">{value}</dd>
    </div>
  );
}
