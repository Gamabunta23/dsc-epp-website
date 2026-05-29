"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type Vehicle = {
  id: string;
  label: string;
  payload: string;
  speed: number;     // km/h Mischgeschwindigkeit
  regulated: boolean; // EU-VO 561/2006 anwendbar (> 3,5 t)
};

const VEHICLES: Vehicle[] = [
  { id: "sprinter", label: "Transporter / Sprinter", payload: "bis 3,5 t", speed: 95, regulated: false },
  { id: "koffer", label: "Koffer-Transporter", payload: "bis 3,5 t", speed: 85, regulated: false },
  { id: "lkw75", label: "LKW 7,5 t", payload: "7,5 t", speed: 75, regulated: true },
  { id: "lkw12", label: "LKW 12 t", payload: "12 t", speed: 72, regulated: true },
  { id: "lkw16", label: "LKW 15 / 16 t", payload: "15–16 t", speed: 70, regulated: true },
];

function formatHm(hoursDecimal: number) {
  if (!isFinite(hoursDecimal) || hoursDecimal <= 0) return "—";
  const totalMin = Math.round(hoursDecimal * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${String(m).padStart(2, "0")} min`;
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function calc(km: number, vehicle: Vehicle, eu561: boolean, stadtZuschlag: boolean) {
  if (!km || km <= 0) {
    return { driveTime: 0, breakTime: 0, restTime: 0, total: 0, days: 0, effSpeed: vehicle.speed };
  }
  const effSpeed = vehicle.speed;
  const rawDriveTime = km / effSpeed;
  // Stadtverkehr/Stau +15 % auf Fahrzeit
  const driveTime = stadtZuschlag ? rawDriveTime * 1.15 : rawDriveTime;

  // EU-VO 561/2006 nur bei regulierten Fahrzeugen + Toggle aktiv
  const apply = eu561 && vehicle.regulated;

  if (!apply) {
    return {
      driveTime,
      breakTime: 0,
      restTime: 0,
      total: driveTime,
      days: 1,
      effSpeed,
    };
  }

  // 45 min Pflichtpause nach jeweils 4,5 h Lenkzeit
  const fullBlocks = Math.floor(driveTime / 4.5);
  // Nach dem letzten vollen Block braucht es nur eine Pause, wenn noch weitergefahren wird
  // → wenn restliche Lenkzeit > 0, mind. eine Pause weniger als floor wäre falsch.
  // Standard: ein Pause-Block alle 4,5 h Fahrt (nicht am Tour-Ende)
  // Wir setzen: floor(driveTime / 4.5) Pausen (konservative Schätzung)
  const breakTime = fullBlocks * 0.75;

  // Tagesaufteilung: max. 9 h Lenkzeit pro Tag
  const days = Math.max(1, Math.ceil(driveTime / 9));
  // Tagesruhezeit zwischen den Tagen: 11 h
  const restTime = (days - 1) * 11;

  const total = driveTime + breakTime + restTime;
  return { driveTime, breakTime, restTime, total, days, effSpeed };
}

export default function Fahrzeitrechner() {
  const [km, setKm] = useState<number>(620);
  const [vehicleId, setVehicleId] = useState<string>("lkw12");
  const [eu561, setEu561] = useState<boolean>(true);
  const [stadt, setStadt] = useState<boolean>(false);

  const vehicle = useMemo(
    () => VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[2],
    [vehicleId]
  );

  const result = useMemo(
    () => calc(km, vehicle, eu561, stadt),
    [km, vehicle, eu561, stadt]
  );

  // Start-Referenz client-seitig setzen (vermeidet Hydration-Mismatch)
  const [startRef, setStartRef] = useState<Date | null>(null);
  useEffect(() => {
    const ref = new Date();
    ref.setHours(8, 0, 0, 0);
    setStartRef(ref);
  }, []);

  const arrival = useMemo(() => {
    if (!startRef || result.total <= 0) return null;
    return addHours(startRef, result.total);
  }, [startRef, result.total]);

  const eu561Applies = vehicle.regulated && eu561;

  return (
    <section id="fahrzeitrechner" className="relative py-24 lg:py-40 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-sky-700 uppercase tracking-[0.15em] mb-4">
            Fahrzeitenrechner
          </p>
          <h2 className="headline text-4xl md:text-6xl text-slate-950">
            Wie lange dauert
            <br />
            <span className="text-slate-500">Ihre Tour wirklich?</span>
          </h2>
          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Live-Kalkulation mit realistischen Mischgeschwindigkeiten und den
            Pflichtpausen nach EU-VO 561/2006. Ideal für die Disposition vor
            der Anfrage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 rounded-3xl bg-white border border-slate-200/60 p-8 lg:p-10"
          >
            {/* Distanz */}
            <div>
              <label className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-slate-500 mb-3">
                <span>Strecke</span>
                <span className="text-slate-900 tabular-nums normal-case tracking-normal text-base font-semibold">
                  {km.toLocaleString("de-DE")} km
                </span>
              </label>
              <input
                type="range"
                min={10}
                max={2000}
                step={10}
                value={km}
                onChange={(e) => setKm(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
                aria-label="Strecke in Kilometern"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                <span>10 km</span>
                <span>500</span>
                <span>1000</span>
                <span>1500</span>
                <span>2000 km</span>
              </div>
              <input
                type="number"
                min={1}
                max={5000}
                value={km}
                onChange={(e) => setKm(Math.max(0, Number(e.target.value) || 0))}
                className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 tabular-nums focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                aria-label="Strecke exakt eingeben"
              />
            </div>

            {/* Fahrzeugtyp */}
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 mb-3">
                Fahrzeug
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VEHICLES.map((v) => {
                  const active = v.id === vehicleId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleId(v.id)}
                      className={`text-left rounded-2xl border px-4 py-3 transition-all duration-200 cursor-pointer ${
                        active
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-sm">{v.label}</span>
                        <span className={`text-[11px] tabular-nums ${active ? "text-sky-400" : "text-slate-500"}`}>
                          Ø {v.speed} km/h
                        </span>
                      </div>
                      <div className={`mt-0.5 text-[11px] ${active ? "text-slate-400" : "text-slate-500"}`}>
                        {v.payload}
                        {v.regulated && (
                          <span className={`ml-2 ${active ? "text-sky-400" : "text-sky-700"}`}>
                            · EU 561 anwendbar
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optionen */}
            <div className="mt-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 mb-3">
                Optionen
              </p>
              <Toggle
                label="EU-VO 561/2006 (Pflichtpausen 45 min nach 4,5 h, max. 9 h Lenkzeit/Tag)"
                checked={eu561}
                disabled={!vehicle.regulated}
                hint={!vehicle.regulated ? "Nicht anwendbar bis 3,5 t" : undefined}
                onChange={setEu561}
              />
              <Toggle
                label="Stadtverkehr / Stau-Zuschlag (+15 %)"
                checked={stadt}
                onChange={setStadt}
              />
            </div>
          </motion.div>

          {/* RESULT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 rounded-3xl bg-slate-950 text-white p-8 lg:p-10 relative overflow-hidden flex flex-col"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.15em] text-sky-400 mb-3">
                Gesamtdauer
              </p>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={result.total.toFixed(2)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-5xl lg:text-6xl headline tabular-nums"
                >
                  {formatHm(result.total)}
                </motion.div>
              </AnimatePresence>

              {result.days > 1 && (
                <p className="mt-3 text-sm text-slate-400">
                  {result.days} Tage inkl. {result.days - 1}× 11 h Tagesruhezeit
                </p>
              )}
              {eu561Applies && result.days === 1 && result.breakTime > 0 && (
                <p className="mt-3 text-sm text-slate-400">
                  Inkl. {Math.round(result.breakTime * 60)} min Pflichtpause
                </p>
              )}
            </div>

            <div className="relative mt-10 grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              <Cell label="Reine Fahrzeit" value={formatHm(result.driveTime)} />
              <Cell label="Pausen / Ruhezeit" value={formatHm(result.breakTime + result.restTime)} />
              <Cell label="Ø Geschwindigkeit" value={`${result.effSpeed} km/h`} />
              <Cell
                label="Stadt-Zuschlag"
                value={stadt ? "+15 %" : "—"}
                muted={!stadt}
              />
            </div>

            {arrival && (
              <div className="relative mt-6 pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-2">
                  Beispiel-Ankunft bei Start heute 08:00
                </p>
                <p className="text-lg font-medium tabular-nums">{formatDate(arrival)}</p>
              </div>
            )}

            <a
              href="#kontakt"
              className="mt-auto pt-8 group inline-flex items-center gap-2 text-sky-400 font-medium hover:text-sky-300 transition-colors cursor-pointer"
            >
              Tour bei uns anfragen
              <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>

        <p className="mt-8 max-w-3xl text-xs text-slate-500 leading-relaxed">
          Hinweis: Die berechneten Werte sind Richtwerte für die Disposition.
          Tatsächliche Fahrzeiten hängen von Verkehrslage, Beladung,
          Wartezeiten an Rampen und individueller Fahrweise ab. Pflichtpausen
          gelten ab Fahrzeugen über 3,5 t zulässigem Gesamtgewicht. Tägliche
          Lenkzeit zweimal pro Woche bis 10 h zulässig.
        </p>
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  disabled,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  hint?: string;
}) {
  const active = checked && !disabled;
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`w-full text-left flex items-start gap-4 rounded-2xl border px-4 py-3 transition-colors ${
        disabled
          ? "border-slate-200 bg-slate-100/40 cursor-not-allowed opacity-60"
          : "border-slate-200 bg-white hover:border-slate-400 cursor-pointer"
      }`}
    >
      <span
        className={`shrink-0 mt-0.5 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          active ? "bg-sky-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            active ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="flex-1">
        <span className="text-sm text-slate-900 leading-snug block">{label}</span>
        {hint && <span className="text-xs text-slate-500 mt-0.5 block">{hint}</span>}
      </span>
    </button>
  );
}

function Cell({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="bg-slate-950 p-5">
      <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{label}</div>
      <div className={`mt-1 text-lg font-semibold tabular-nums ${muted ? "text-slate-500" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
