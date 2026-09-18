"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import styles from "./LocationsPreview.module.css";
type Location = {
  name: string;
  role: string;
  desc: string;
  address?: string;
  phone: string;
  whatsapp: string;
  email: string;
  legacy: string;
  featured?: boolean;
};

const locations: Location[] = [
  {
    name: "Bakum",
    role: "Hauptsitz",
    desc: "Verwaltung, Disposition und Verteil-Hub direkt an der Hansalinie A1 im Landkreis Vechta. Kurze Wege in alle Richtungen.",
    address: "Essener Str. 39 · 49456 Bakum",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 151 72822291",
    email: "auftrag@dsc-epp.de",
    legacy: "Sitz der DSC | EPP Logistik GmbH",
    featured: true,
  },
  {
    name: "Hamburg",
    role: "Hafen-Hub",
    desc: "Direkter Zugang zu den Terminals des Hamburger Hafens. Multimodale Anbindung an Bahn und Binnenschiff.",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 1520 8657623",
    email: "auftrag@dsc-epp.de",
    legacy: "Standort der DSC | EPP Logistik GmbH",
  },
  {
    name: "Ostwestfalen-Lippe",
    role: "Inland-Hub",
    desc: "Zentral im westfälischen Wirtschaftsraum. Just-in-Time-Anlieferung an Industrie und Handel.",
    phone: "+49 40 8090356 - 0",
    whatsapp: "+49 171 10 01 119",
    email: "auftrag@dsc-epp.de",
    legacy: "Standort der DSC | EPP Logistik GmbH",
  },
];


const stories = [
  { title: "Hier laufen die Fäden zusammen.", image: "/fleet-truck-v16.jpeg", darkImage: "/fleet-truck-v16.jpeg", caption: "Unsere Flotte · gemeinsam unterwegs", x: 111, y: 166 },
  { title: "Unser Tor zur Welt.", image: "/media/home/port-day-v1.png", darkImage: "/media/home/port.png", caption: "Containerlogistik · Hafenillustration", x: 180, y: 111 },
  { title: "Nah an Industrie und Handel.", image: "/hero-preview/procabin-light-v3.png", darkImage: "/hero-preview/procabin-dark-v3.png", caption: "Vom Terminal bis zum Empfänger · Illustration", x: 131, y: 224 },
];
function HeadlightSequence() {
 const ref = useRef<SVGSVGElement>(null);
 const [lit, setLit] = useState(false);
 useEffect(() => { const observer = new IntersectionObserver(([entry]) => setLit(entry.isIntersecting), {threshold:.35}); if(ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []);
 const segments = ["M50 198L116 196", "M155 196L251 199", "M290 200L374 205", "M386 207C465 215 494 253 500 310C504 350 507 423 498 440C491 462 462 464 328 464"];
 return <svg ref={ref} data-lit={lit} className={styles.headlights} viewBox="0 0 953 643" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
 {segments.map((d,i)=><g key={d} style={{"--led-delay":`${.2+i*.35}s`,"--led-duration":i===3?'1.3s':'.35s'} as CSSProperties}>
 <path d={d} className={styles.ledOff}/><path d={d} pathLength="1" className={styles.ledSweep}/>
 </g>)}
 {[[427,252],[395,286],[435,288],[470,292],[447,343]].map(([cx,cy],i)=><g key={i} style={{"--led-delay":`${2.6+i*.22}s`} as CSSProperties}><ellipse cx={cx} cy={cy} rx={i===0?19:13} ry={i===0?6:10} className={styles.bulbOff}/><ellipse cx={cx} cy={cy} rx={i===0?19:13} ry={i===0?6:10} className={styles.bulbOn}/></g>)}
 </svg>;
}

export default function LocationsPreview() {
 const [selected,setSelected]=useState(0);
 const loc=locations[selected], story=stories[selected];
 return <section id="standorte" className={styles.section}>
  <div className={styles.inner}>
   <p className={styles.eyebrow}>DREI STANDORTE. KURZE WEGE.</p>
   <h2>Drei Standorte.<br/><span>Ein eingespieltes Netzwerk.</span></h2>
   <div className={styles.layout}>
    <div className={styles.map}>
     <svg viewBox="0 0 400 520" aria-hidden="true">
      <image href="/hero-preview/germany.svg" x="15" y="10" width="370" height="500" opacity=".2"/>
      <path className={styles.route} d="M180 111 Q125 113 111 166 Q111 196 131 224"/>
      <path className={styles.pulse} d="M180 111 Q125 113 111 166 Q111 196 131 224"/>
     </svg>
     {locations.map((l,i)=><button key={l.name} className={`${styles.pin} ${selected===i?styles.active:''}`} style={{left:`${stories[i].x/4}%`,top:`${stories[i].y/5.2}%`}} onClick={()=>setSelected(i)} aria-pressed={selected===i} aria-label={`${l.name} auswählen`}><i/><span>{l.name}<small>{l.role}</small></span></button>)}
     <p className={styles.mapNote}>IN DEUTSCHLAND ZU HAUSE.<br/>MIT DER WELT VERBUNDEN.</p>
    </div>
    <div className={styles.details}>
     <div className={styles.tabs} aria-label="Standort auswählen">{locations.map((l,i)=><button key={l.name} onClick={()=>setSelected(i)} aria-pressed={selected===i}>{i===2?'OWL':l.name}</button>)}</div>
     <article key={selected} className={styles.story}>
      <div className={styles.photo} data-location={selected} style={{"--location-day":`url("${story.image}")`,"--location-night":`url("${story.darkImage}")`} as CSSProperties} role="img" aria-label={story.caption}>{selected===0&&<HeadlightSequence/>}</div>
      <div className={styles.text}>
       <p className={styles.eyebrow}>{loc.name} · {loc.role}</p><h3>{story.title}</h3><p>{loc.desc}</p>
       {loc.address&&<p className={styles.address}>{loc.address}</p>}
       <div className={styles.links}>
        <a className={styles.contactIcon} href={`tel:${loc.phone.replace(/[^+0-9]/g,'')}`} aria-label={`Anrufen: ${loc.phone}`} title={`Anrufen: ${loc.phone}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/></svg></a>
        <a className={styles.contactIcon} href={`mailto:${loc.email}`} aria-label={`E-Mail: ${loc.email}`} title={`E-Mail: ${loc.email}`}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a>
        <a className={styles.contactIcon} href={`https://wa.me/${loc.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp: ${loc.whatsapp}`} title={`WhatsApp: ${loc.whatsapp}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.4-4.7A9 9 0 1 1 21 11.5Z"/><path d="m8.5 7 2 3-1 1a8 8 0 0 0 3.5 3.5l1-1 3 2c-1 3-4.5 1-6.5-1S6 8 8.5 7Z"/></svg></a>
        {loc.address&&<a className={styles.contactIcon} href="https://www.google.com/maps/dir/?api=1&destination=Essener+Str.+39+49456+Bakum" target="_blank" rel="noopener noreferrer" aria-label="Route zum Hauptsitz Bakum planen" title="Route nach Bakum planen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></a>}
       </div>
      </div>
     </article>
    </div>
   </div>
  </div>
 </section>;
}
