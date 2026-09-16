"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

const heroRoute = "M-40 470C140 470 170 345 340 365S820 430 1070 340Q1160 325 1228.725 288.072C1280 225 1170 155 1193.748 77.710";

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="preview-headline">
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 650" fill="none" aria-hidden="true">
        {/* Cities and map share a projection and scale (0.8). */}
        <image className={styles.germanyMap} href="/hero-preview/germany.svg" x="1060" y="0" width="296.144" height="400" />
        <path d={heroRoute} />
        <path className={styles.routePulse} d={heroRoute} pathLength="1" />
        <circle cx="340" cy="365" r="7" />
        <circle cx="1228.725" cy="288.072" r="7" data-location="nuernberg" />
        <circle cx="1193.748" cy="77.710" r="9" data-location="hamburg" />
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
