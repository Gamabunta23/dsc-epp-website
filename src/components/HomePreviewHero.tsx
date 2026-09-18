"use client";

import Image from "next/image";
import HeroSearch from "./HeroSearch";
import styles from "./HomePreview.module.css";

const seaRoute = "M-40 360C140 340 200 310 340 330S760 370 940 175S1090 15 1193.748 77.710";
const destinations = [{"name": "Baden-Württemberg", "x": 1167.559, "y": 324.4}, {"name": "Bayern", "x": 1245.05, "y": 355.66}, {"name": "Berlin", "x": 1303.933, "y": 133.198}, {"name": "Brandenburg", "x": 1292.935, "y": 140.069}, {"name": "Bremen", "x": 1155.246, "y": 103.264}, {"name": "Hamburg", "x": 1193.748, "y": 77.71}, {"name": "Hessen", "x": 1137.097, "y": 259.602}, {"name": "Mecklenburg-Vorpommern", "x": 1239.414, "y": 73.109}, {"name": "Niedersachsen", "x": 1185.295, "y": 140.848}, {"name": "Nordrhein-Westfalen", "x": 1089.736, "y": 200.933}, {"name": "Rheinland-Pfalz", "x": 1137.339, "y": 263.899}, {"name": "Saarland", "x": 1096.951, "y": 301.491}, {"name": "Sachsen", "x": 1314.666, "y": 210.076}, {"name": "Sachsen-Anhalt", "x": 1246.523, "y": 154.346}, {"name": "Schleswig-Holstein", "x": 1197.918, "y": 35.263}, {"name": "Thüringen", "x": 1227.217, "y": 213.45}];

export default function HomePreviewHero({ fleet = false }: { fleet?: boolean }) {
  return (
    <section id={fleet ? "flotte" : "top"} className={`${styles.hero} ${fleet ? styles.fleetHero : ""}`} aria-labelledby={fleet ? "preview-fleet-headline" : "preview-headline"}>
      <div className={`bg-grid ${styles.heroGrid}`} aria-hidden="true" />
      <svg className={styles.route} viewBox="0 0 1440 650" fill="none" aria-hidden="true">
        {/* Cities and map share a projection and scale (0.8). */}
        <image className={styles.germanyMap} href="/hero-preview/germany.svg" x="1060" y="0" width="296.144" height="400" />
        <path className={styles.seaLane} d={seaRoute} />
        {destinations.map((city, i) => {
          const route = `M1193.748 77.710 Q${(1193.748 + city.x) / 2 - 12} ${(77.710 + city.y) / 2} ${city.x} ${city.y}`;
          return <g key={city.name}>
            <path className={styles.inlandLane} d={route} />
            {city.name !== "Hamburg" && <g className={styles.inlandComet}>
              <animateMotion path={route} dur="12s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes={`0;${.4+i*.007};${.72+i*.007};1`} calcMode="linear"/><circle className={styles.cometHalo} r="7"/><circle className={styles.cometHead} r="2.8"/>
            </g>}
            <circle className={styles.cityDot} cx={city.x} cy={city.y} r="3" data-location={city.name}><title>{city.name}</title></circle>
          </g>;
        })}
        <circle className={styles.hamburgHub} cx="1193.748" cy="77.710" r="8" data-location="hamburg" />
        <g className={styles.seaComet}>
          <animateMotion path={seaRoute} dur="12s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;.4;1" calcMode="linear" />
          <circle className={styles.cometHalo} r="13"/><circle className={styles.cometHead} r="5"/>
        </g>
      </svg>
      <div className={styles.heroContent}>
        {fleet ? <>
          <p className={styles.badge}><span /> Flotte &amp; Technologie</p>
          <h2 id="preview-fleet-headline" className={styles.fleetTitle}>Modernes Equipment.<span>Bereit für Ihren Container.</span></h2>
        </> : <>
          <p className={styles.badge}><span /> Vom Terminal → Bundesweit</p>
          <h1 id="preview-headline"><span className={styles.firstLine}>Container bewegen.</span><span className={styles.secondLine}>Märkte verbinden.</span></h1>
          <p className={styles.subtitle}>Überseecontainer. Multimodal. Just in Time.</p>
          <p className={styles.company}>DSC | EPP Logistik GmbH</p>
          <div className={styles.actions}><a href="#kontakt">Transport anfragen <span aria-hidden="true">→</span></a><a href="#leistungen">Leistungen entdecken</a></div>
        </>}
      </div>
      <div className={styles.harborStage}>
        <p className={styles.sideNoteLeft}>Containerlogistik<br />für eine<br />vernetzte<br />Zukunft</p>
        <p className={styles.sideNoteRight}><span />Zuverlässig.<br />Flexibel.<br />Bundesweit.</p>
        <div className={styles.truckScene}>
        <Image unoptimized className={styles.lightTruck} src="/hero-preview/procabin-light-v3.png" width={2164} height={727} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
        <Image unoptimized className={styles.darkTruck} src="/hero-preview/procabin-dark-v3.png" width={2164} height={727} sizes="100vw" loading="eager" alt="Silberner DSC | EPP Actros ProCabin mit dunkelgrauem Container und Firmenlogo am Terminal" />
      </div>
      </div>
      {fleet ? <div className={styles.fleetFeatures}>
        <article><span>01</span><h3>Moderne Zugmaschinen</h3><p>EURO VI D und komfortabel ausgestattete Kabinen.</p></article>
        <article><span>02</span><h3>Flexible Chassis</h3><p>Für 20′, 40′ und 45′ Container. Gen-Set für Reefer.</p></article>
        <article><span>03</span><h3>Digital verbunden</h3><p>Live Traffic und Sendungsverfolgung für Ihre Transporte.</p></article>
        <article><span>04</span><h3>Just in Time</h3><p>Disposition, die Tonnagen und Termine zusammen plant.</p></article>
      </div> : <div className={styles.heroTools}>
        <div className={styles.search}><HeroSearch /></div>
        <a className={styles.scrollHint} href="#leistungen">Entdecken <span aria-hidden="true">↓</span></a>
      </div>}
    </section>
  );
}
