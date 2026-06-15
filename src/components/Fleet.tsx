"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "EURO VI D Zugmaschinen",
    body: "Aktuelle Abgasnorm, sparsamer Verbrauch, leiseres Fahrwerk — neuste Generation in beiden Hubs.",
  },
  {
    title: "Live Traffic System",
    body: "Echtzeit-Routenoptimierung und Sendungsverfolgung. Sie wissen jederzeit, wo Ihre Box steht.",
  },
  {
    title: "Vollausgestattete Chassis",
    body: "20′, 40′, 45′ Multi-Gooseneck, Gen-Set für Reefer, Box- und Kühlauflieger.",
  },
  {
    title: "Just-in-Time-Disposition",
    body: "Tonnagen und Termine — beides nicht-verhandelbar. Unsere Dispo plant beides parallel.",
  },
];

export default function Fleet() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // "Welcome Light": eigener IntersectionObserver (zuverlässig auf jedem Gerät).
  // lit togglet mit der Sichtbarkeit — bei 50 % im Bild gehen die LEDs an
  // (Sweep-Animation spielt), beim Wegscrollen wieder aus. So ist der Effekt
  // beliebig wiederholbar und löst erst aus, wenn der LKW richtig zu sehen ist.
  const ledRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ledRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setLit(entries[0].isIntersecting),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="flotte" className="relative py-24 lg:py-40 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          style={{ y }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div ref={ledRef} className="relative w-full">
              <Image
                src="/fleet-truck-v16.jpeg"
                alt="LKW der Flotte"
                width={953}
                height={643}
                className="w-full h-auto object-contain"
                priority={false}
              />

              {/* "Licht an"-Overlay: LED-Band zieht sich leuchtend entlang,
                  danach zünden die 4 LED-Punkte nacheinander */}
              <svg
                viewBox="0 0 953 643"
                className="absolute inset-0 w-full h-full pointer-events-none"
                data-lit={lit ? "true" : "false"}
                aria-hidden
              >
                <g className="fleet-leds">
                {/* Band in 4 Segmenten — exakt auf den weißen Strichen des
                    Bildes (pixel-getraced), Panel-Trennungen bleiben dunkel.
                    Cover (grau, dRev) weicht synchron mit dem Licht zurück:
                    pathLength 1→0 auf dem UMGEKEHRTEN Pfad = Cover verschwindet
                    genau dort, wo das Licht gerade ankommt. */}
                {[
                  {
                    d: "M 50 198 L 56 197 L 62 197 L 68 197 L 74 197 L 80 197 L 86 197 L 92 197 L 98 196 L 104 196 L 110 196 L 116 196",
                    dRev: "M 116 196 L 110 196 L 104 196 L 98 196 L 92 197 L 86 197 L 80 197 L 74 197 L 68 197 L 62 197 L 56 197 L 50 198",
                    delay: 0.3,
                    dur: 0.16,
                  },
                  {
                    d: "M 155 196 L 161 196 L 167 196 L 173 196 L 179 197 L 185 197 L 191 197 L 197 197 L 203 198 L 209 198 L 215 198 L 221 198 L 227 198 L 233 198 L 239 198 L 245 199 L 251 199",
                    dRev: "M 251 199 L 245 199 L 239 198 L 233 198 L 227 198 L 221 198 L 215 198 L 209 198 L 203 198 L 197 197 L 191 197 L 185 197 L 179 197 L 173 196 L 167 196 L 161 196 L 155 196",
                    delay: 0.48,
                    dur: 0.2,
                  },
                  {
                    d: "M 290 200 L 296 200 L 302 200 L 308 201 L 314 201 L 320 201 L 326 202 L 332 202 L 338 202 L 344 203 L 350 203 L 356 204 L 362 204 L 368 205 L 374 205",
                    dRev: "M 374 205 L 368 205 L 362 204 L 356 204 L 350 203 L 344 203 L 338 202 L 332 202 L 326 202 L 320 201 L 314 201 L 308 201 L 302 200 L 296 200 L 290 200",
                    delay: 0.7,
                    dur: 0.18,
                  },
                  {
                    // Dichte Pixel-Mittellinie (64 Punkte) — liegt exakt auf dem Band
                    d: "M 386 207 L 392 208 L 398 208 L 404 209 L 410 210 L 416 212 L 422 214 L 428 216 L 434 218 L 440 220 L 446 223 L 452 226 L 458 230 L 476 244 L 481 251 L 486 258 L 490 265 L 493 272 L 495 279 L 496 286 L 498 293 L 498 300 L 500 307 L 500 314 L 502 321 L 502 328 L 502 335 L 502 342 L 503 349 L 504 356 L 504 363 L 504 370 L 504 377 L 504 384 L 504 391 L 504 398 L 503 405 L 503 412 L 503 419 L 502 426 L 502 433 L 499 440 L 496 447 L 484 454 L 478 456 L 472 458 L 466 460 L 460 460 L 454 460 L 448 461 L 442 462 L 436 462 L 430 462 L 424 462 L 418 462 L 412 463 L 406 464 L 400 464 L 394 464 L 388 464 L 382 464 L 376 464 L 370 464 L 364 464 L 358 464 L 352 464 L 346 464",
                    dRev: "M 346 464 L 352 464 L 358 464 L 364 464 L 370 464 L 376 464 L 382 464 L 388 464 L 394 464 L 400 464 L 406 464 L 412 463 L 418 462 L 424 462 L 430 462 L 436 462 L 442 462 L 448 461 L 454 460 L 460 460 L 466 460 L 472 458 L 478 456 L 484 454 L 496 447 L 499 440 L 502 433 L 502 426 L 503 419 L 503 412 L 503 405 L 504 398 L 504 391 L 504 384 L 504 377 L 504 370 L 504 363 L 504 356 L 503 349 L 502 342 L 502 335 L 502 328 L 502 321 L 500 314 L 500 307 L 498 300 L 498 293 L 496 286 L 495 279 L 493 272 L 490 265 L 486 258 L 481 251 L 476 244 L 458 230 L 452 226 L 446 223 L 440 220 L 434 218 L 428 216 L 422 214 L 416 212 L 410 210 L 404 209 L 398 208 L 392 208 L 386 207",
                    delay: 0.92,
                    dur: 1.0,
                  },
                ].map((seg, i) => (
                  <path
                    key={i}
                    className="led-seg"
                    style={{ animationDelay: `${i * 0.2}s` }}
                    d={seg.d}
                    fill="none"
                    stroke="#f4fbff"
                    strokeWidth={9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
                {[
                  [427, 252],
                  [395, 286],
                  [435, 288],
                  [470, 292],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    className="led-bulb"
                    style={{ animationDelay: `${0.9 + i * 0.14}s`, transformBox: "fill-box", transformOrigin: "center" }}
                    cx={cx}
                    cy={cy}
                    r={13}
                    fill="#ffffff"
                  />
                ))}
                {/* Untere Leuchte (Nebel-/Tagfahrlicht) — zündet als letztes */}
                <ellipse
                  className="led-bulb"
                  style={{ animationDelay: "1.5s", transformBox: "fill-box", transformOrigin: "center" }}
                  cx={447}
                  cy={343}
                  rx={17}
                  ry={11}
                  fill="#ffffff"
                />
                </g>
              </svg>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium text-sky-700 dark:text-sky-400 uppercase tracking-[0.15em] mb-4">
              Flotte &amp; Technologie
            </p>
            <h2 className="headline text-4xl md:text-5xl text-slate-950 dark:text-white">
              Modernes Equipment.
              <br />
              <span className="text-slate-500 dark:text-slate-400">Maximale Verfügbarkeit.</span>
            </h2>
          </motion.div>

          <ul className="mt-12 space-y-8">
            {features.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-slate-200 dark:border-slate-800 pt-6"
              >
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{f.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
