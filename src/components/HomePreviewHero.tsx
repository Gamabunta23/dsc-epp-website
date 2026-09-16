"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="preview-headline">
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 650" fill="none" aria-hidden="true">
        {/* Map and route share a coordinate system. Hamburg (9.9937°E,
            53.5511°N) projects to 167.185,97.138 in germany.svg. */}
        <image className={styles.germanyMap} href="/hero-preview/germany.svg" x="1040" y="50" width="370.18" height="500" />
        <path d="M-40 560C140 560 150 390 340 410S710 500 940 340 1170 285 1207.185 147.138" />
        <circle cx="340" cy="410" r="7" /><circle cx="940" cy="340" r="7" />
        <circle cx="1207.185" cy="147.138" r="9" data-location="hamburg" />
      </svg>
      <div className={styles.heroContent}>
        <p className={styles.badge}><span /> Vom Terminal → Bundesweit</p>
        <h1 id="preview-headline"><span className={styles.firstLine}>Container bewegen.</span><span className={styles.secondLine}>Märkte verbinden.</span></h1>
        <p className={styles.subtitle}>Überseecontainer. Multimodal. Just in Time.</p>
        <p className={styles.company}>DSC | EPP Logistik GmbH</p>
        <div className={styles.actions}><a href="#kontakt">Transport anfragen <span aria-hidden="true">→</span></a><a href="#leistungen">Leistungen entdecken</a></div>
      </div>
      <div className={styles.harborStage}>
        <p className={styles.sideNoteLeft}>Container<br />Logistics<br />for a connected<br />tomorrow</p>
        <p className={styles.sideNoteRight}><span />Zuverlässig.<br />Flexibel.<br />Bundesweit.</p>
        <div className={styles.truckScene}>
        <Image className={styles.lightTruck} src="/hero-preview/procabin-light-v3.png" width={2164} height={727} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
        <Image className={styles.darkTruck} src="/hero-preview/procabin-dark-v3.png" width={2164} height={727} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
      </div>
      </div>
      <div className={styles.heroTools}>
        <div className={styles.search}><HeroSearch /></div>
        <a className={styles.scrollHint} href="#leistungen">Entdecken <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
