"use client";

import BewegenAnimation from "./BewegenAnimation";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.badge}><span /> Vom Terminal → Bundesweit</p>
        <h1 aria-label="Container bewegen. Märkte verbinden."><span aria-hidden="true" className={styles.firstLine}>Container<BewegenAnimation /></span><span className={styles.secondLine}>Märkte verbinden.</span></h1>
        <p className={styles.subtitle}>Überseecontainer. Multimodal. Just in Time.</p>
        <p className={styles.company}>DSC | EPP Logistik GmbH</p>
        <div className={styles.actions}><a href="#kontakt">Transport anfragen <span aria-hidden="true">→</span></a><a href="#leistungen">Leistungen entdecken</a></div>
        <div className={styles.search}><HeroSearch /></div>
        <a className={styles.scrollHint} href="#leistungen">Entdecken <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
