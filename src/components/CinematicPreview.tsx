"use client";

import { useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import styles from "./CinematicPreview.module.css";

const chapters = [
  { label: "Ankunft", time: 0 },
  { label: "Entladung", time: 4.6 },
  { label: "Verladung", time: 8.8 },
  { label: "Unterwegs", time: 13 },
];

export default function CinematicPreview() {
  const video = useRef<HTMLVideoElement>(null);
  const gradeId = useId().replace(/:/g, "");
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [outro, setOutro] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!preference.matches) void el.play().catch(() => {});
    const stop = () => { if (preference.matches) el.pause(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) el.pause();
    }, { threshold: .1 });
    observer.observe(el);
    const hide = () => { if (document.hidden) el.pause(); };
    preference.addEventListener("change", stop);
    document.addEventListener("visibilitychange", hide);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);

  function play() {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      if (el.ended) { el.currentTime = 0; setOutro(false); }
      void el.play().catch(() => {});
    }
    else el.pause();
  }

  return <section id="top" className={styles.stage} aria-label="Vom Schiff auf die Straße">
    <div className={styles.heading}>
      <h1>Über See.<span>Bis zu Ihnen.</span></h1>
      <p>Vom Terminal. Bundesweit.</p>
    </div>
    <svg width="0" height="0" aria-hidden="true" className={styles.gradeDefinition}><defs><filter id={gradeId} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncR type="gamma" amplitude="1.077" exponent=".54" offset=".038"/><feFuncG type="gamma" amplitude="1.062" exponent=".57" offset=".046"/><feFuncB type="gamma" amplitude="1.015" exponent=".66" offset=".054"/></feComponentTransfer><feColorMatrix type="saturate" values=".87"/></filter></defs></svg>
    <div className={styles.cinema} style={{ "--film-light-grade": `url(#${gradeId})` } as React.CSSProperties}>
      <video ref={video} className={styles.film} muted playsInline preload="metadata"
        poster="/media/home/transport-poster-v1.jpg"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setOutro(true); }} onError={() => setFailed(true)}
        onTimeUpdate={() => {
          const time = video.current?.currentTime ?? 0;
          const duration = video.current?.duration ?? 0;
          setOutro(Number.isFinite(duration) && duration > 0 && time >= duration - 1.25);
          setActive(chapters.reduce((index, chapter, i) => time >= chapter.time ? i : index, 0));
        }}
        aria-label="Containerschiff im Hafen, Entladung vom Schiff, Verladung auf unseren LKW und Abfahrt mit nachrückendem DAF">
        <source src="/media/home/transport-film-mobile-v3.mp4" type="video/mp4" media="(max-width: 640px)" />
        <source src="/media/home/transport-film-v3.mp4" type="video/mp4" />
        Ihr Browser unterstützt dieses Video nicht.
      </video>
      <div className={`${styles.outro} ${outro ? styles.outroVisible : ""}`} aria-hidden={!outro}>
        <svg className={styles.outroLines} viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-100 150 Q300 -40 740 180 T1540 130" />
          <path d="M-100 330 Q360 190 840 370 T1540 310" />
          <path d="M-100 520 Q420 340 950 540 T1540 490" />
        </svg>
        <div className={styles.outroBrand}>
          <Image src="/logo-light.webp" alt="DSC | EPP Logistik" width={500} height={168} className={styles.outroLogoLight} />
          <Image src="/logo.jpg" alt="DSC | EPP Logistik" width={500} height={168} className={styles.outroLogoDark} />
          <p>Über See. Bis zu Ihnen.</p>
          <span>CONTAINER. MULTIMODAL. JUST IN TIME.</span>
        </div>
      </div>
    </div>
    <div className={styles.controls}>
      <div className={styles.chapters} role="group" aria-label="Filmkapitel">
        {chapters.map((chapter, index) => <button key={chapter.label} aria-pressed={active === index} disabled={failed} onClick={() => {
          if (video.current && video.current.readyState >= 1) {
            setOutro(false);
            video.current.currentTime = chapter.time;
            setActive(index);
            void video.current.play().catch(() => {});
          }
        }}><span>0{index + 1}</span>{chapter.label}</button>)}
      </div>
      <button className={styles.play} onClick={play} disabled={failed}>{playing ? "Film pausieren" : "Film abspielen"}<span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
      {failed && <p role="status">Der Film konnte nicht geladen werden. Bitte lade die Seite erneut.</p>}
    </div>
  </section>;
}
