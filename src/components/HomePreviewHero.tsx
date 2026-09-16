"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="preview-headline">
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 650" fill="none" aria-hidden="true">
        {/* Both city markers use the same geographic projection as the map.
            Scale 0.6: Hamburg 167.185/97.138, Augsburg 203.712/429.475. */}
        <image className={styles.germanyMap} href="/hero-preview/germany.svg" x="1100" y="20" width="222.108" height="300" />
        <path d="M-40 470C140 470 170 345 340 365S820 430 1070 340Q1150 315 1222.227 277.685C1260 225 1170 160 1200.311 78.283" />
        <circle cx="340" cy="365" r="7" />
        <circle cx="1222.227" cy="277.685" r="7" data-location="augsburg" />
        <circle cx="1200.311" cy="78.283" r="9" data-location="hamburg" />
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
