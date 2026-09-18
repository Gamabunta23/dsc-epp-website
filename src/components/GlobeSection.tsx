"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import styles from "./GlobeSection.module.css";

export default function GlobeSection() {
  const { resolvedTheme } = useTheme();
  const frame = useRef<HTMLIFrameElement>(null);
  const section = useRef<HTMLElement>(null);
  const active = useRef(false);
  const sync = () => frame.current?.contentWindow?.postMessage({ type: "dsc-globe", light: resolvedTheme !== "dark", active: active.current }, window.location.origin);
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "dsc-globe", light: resolvedTheme !== "dark", active: active.current }, window.location.origin);
    const observer = new IntersectionObserver(([entry]) => { active.current = entry.isIntersecting; send(); }, { threshold: 0.05 });
    if (section.current) observer.observe(section.current);
    send();
    return () => observer.disconnect();
  }, [resolvedTheme]);
  return <section ref={section} className={styles.section} aria-labelledby="globe-title" id="weltweit">
    <div className={styles.copy}>
      <p className={styles.eyebrow}>ÜBERSEE. HAFEN. HINTERLAND.</p>
      <h2 id="globe-title">Aus aller Welt.<br /><span>Über unsere Seehäfen.</span><br />Bis zu Ihnen.</h2>
      <p className={styles.description}>Internationale Warenströme treffen auf verlässliche Container-Logistik. Wir verbinden Hamburg, Bremerhaven und Wilhelmshaven mit Ihrem Ziel im Inland.</p>
      <div className={styles.journey} aria-label="Vom Schiff bis zur Rampe">
        <p className={styles.routeTitle}>VOM SCHIFF BIS ZUR RAMPE</p>
        <ol>{[
          ["Tiefseehafen", "Ankunft"], ["Umschlag", "VGM & Terminal"],
          ["Multimodal", "Straße & Schiene"], ["Werksrampe", "Just in Time"],
        ].map(([title, detail], i) => <li key={title}><span className={styles.number}>0{i + 1}</span><strong>{title}</strong><small>{detail}</small></li>)}</ol>
      </div>
    </div>
    <div className={styles.visual}>
      <iframe ref={frame} src="/globe-lab/embed.html" title="Drehende Erdkugel – internationale Verbindungen nach Hamburg" loading="lazy" onLoad={sync} />
    </div>
  </section>;
}
