"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="preview-headline">
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 800" fill="none" aria-hidden="true">
        <path d="M-40 720C140 720 150 510 340 530S710 620 940 460 1200 400 1300 190" />
        <circle cx="340" cy="530" r="7" /><circle cx="940" cy="460" r="7" /><circle cx="1300" cy="190" r="9" />
      </svg>
      <div className={styles.heroContent}>
        <p className={styles.badge}><span /> Vom Terminal → Bundesweit</p>
        <h1 id="preview-headline"><span className={styles.firstLine}>Container bewegen.</span><span className={styles.secondLine}>Märkte verbinden.</span></h1>
        <p className={styles.subtitle}>Überseecontainer. Multimodal. Just in Time.</p>
        <p className={styles.company}>DSC | EPP Logistik GmbH</p>
        <div className={styles.actions}><a href="#kontakt">Transport anfragen <span aria-hidden="true">→</span></a><a href="#leistungen">Leistungen entdecken</a></div>
      </div>
      <div className={styles.truckScene}>
        <Image className={styles.lightTruck} src="/hero-preview/procabin-light.png" width={2172} height={724} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
        <Image className={styles.darkTruck} src="/hero-preview/procabin-dark.png" width={2172} height={724} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
      </div>
      <div className={styles.heroTools}>
        <div className={styles.search}><HeroSearch /></div>
        <a className={styles.scrollHint} href="#leistungen">Entdecken <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
