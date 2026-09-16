"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

const seaRoute = "M-40 360C140 340 200 310 340 330S760 370 940 175S1090 15 1193.748 77.710";
const destinations = [{"name": "Bremen", "x": 1155.25, "y": 101.924}, {"name": "Hannover", "x": 1185.296, "y": 138.022}, {"name": "Berlin", "x": 1303.922, "y": 130.627}, {"name": "Leipzig", "x": 1270.595, "y": 191.2}, {"name": "Dresden", "x": 1314.654, "y": 206.047}, {"name": "Dortmund", "x": 1112.089, "y": 182.275}, {"name": "Düsseldorf", "x": 1089.746, "y": 196.948}, {"name": "Köln", "x": 1095.779, "y": 211.841}, {"name": "Frankfurt", "x": 1151.387, "y": 254.262}, {"name": "Nürnberg", "x": 1228.725, "y": 288.072}, {"name": "Stuttgart", "x": 1167.562, "y": 322.78}, {"name": "München", "x": 1245.045, "y": 355.66}];

export default function HomePreviewHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="preview-headline">
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 650" fill="none" aria-hidden="true">
        {/* Cities and map share a projection and scale (0.8). */}
        <image className={styles.germanyMap} href="/hero-preview/germany.svg" x="1060" y="0" width="296.144" height="400" />
        <path className={styles.seaLane} d={seaRoute} />
        {destinations.map((city, i) => {
          const route = `M1193.748 77.710 Q${(1193.748 + city.x) / 2 - 12} ${(77.710 + city.y) / 2} ${city.x} ${city.y}`;
          return <g key={city.name}>
            <path className={styles.inlandLane} d={route} />
            <path className={styles.inlandPulse} d={route} pathLength="1" style={{ animationDelay: `${i * .1}s` }} />
            <circle className={styles.cityDot} cx={city.x} cy={city.y} r="3" data-location={city.name}><title>{city.name}</title></circle>
          </g>;
        })}
        <circle className={styles.hamburgHub} cx="1193.748" cy="77.710" r="8" data-location="hamburg" />
        <g className={styles.ship}>
          <animateMotion path={seaRoute} dur="12s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.4;1" calcMode="linear" />
          <g transform="translate(-22,-12)">
            <path className={styles.shipHull} d="M0 15H44L37 25H7Z" />
            <path className={styles.shipCargo} d="M9 15V5H18V15M19 15V5H28V15M29 15V9H37V15M3 15V1H9V15" />
          </g>
        </g>
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
