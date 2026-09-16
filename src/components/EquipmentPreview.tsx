"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { containerTypes } from "./Containers";
import styles from "./EquipmentPreview.module.css";

type Item = (typeof containerTypes)[number];
const filters = ["Alle", "Standard", "Kühlcontainer", "Spezialcontainer"] as const;
type Filter = (typeof filters)[number];
const imageAliases: Record<string, string> = { "45": "45-hc", "20-flat": "20-fr", "40-flat": "40-fr" };
const imageFor = (item: Item) => `/container-preview/${imageAliases[item.id] ?? item.id}.png`;
const categoryFor = (item: Item): Filter => item.id.includes("reefer") ? "Kühlcontainer" : /ot|flat|tank/.test(item.id) ? "Spezialcontainer" : "Standard";

function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: back ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function EquipmentPreview() {
  const [filter, setFilter] = useState<Filter>("Alle");
  const [active, setActive] = useState<Item | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = containerTypes.filter((item) => filter === "Alle" || categoryFor(item) === filter);

  useEffect(() => {
    const element = dialog.current;
    if (!active || !element) return;
    element.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = before; };
  }, [active]);

  return (
    <main className={styles.preview}>
      <div className={styles.topline}><span>DESIGNVORSCHAU</span><span>DSC | EPP · Container-Serie</span><Link href="/">Zur bisherigen Homepage <span aria-hidden="true">↗</span></Link></div>
      <section className={styles.section} aria-labelledby="equipment-title">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>CONTAINER-EQUIPMENT</p>
          <h1 id="equipment-title">Von der Standardbox<br /><span>bis zum Spezialmaß.</span></h1>
          <p className={styles.lead}>Für jede Ladung die passende Lösung.<br className={styles.mobileBreak} /> Entdecken Sie unsere 15 Equipment-Varianten.</p>
          <div className={styles.signature}><span className={styles.dot} /> DSEP Serie <span className={styles.divider}>/</span> 20′ bis 45′ <span className={styles.divider}>/</span> Vom Terminal → Bundesweit</div>
        </header>
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Container nach Bauart filtern">{filters.map((option) => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div>
          <p className={styles.count} aria-live="polite">{String(visible.length).padStart(2,"0")} Modelle</p>
        </div>
        <div className={styles.grid}>
          {visible.map((item) => <button key={item.id} className={styles.card} type="button" onClick={() => setActive(item)} aria-label={`${item.size} ${item.name} – Details ansehen`}>
            <div className={styles.visual}><Image src={imageFor(item)} alt={`${item.size} ${item.name} mit DSEP-Kennzeichnung`} width={1536} height={1024} sizes="(max-width: 640px) 95vw, (max-width: 1000px) 46vw, 31vw" /><span className={styles.type}>{item.size}</span></div>
            <div className={styles.content}><h2>{item.size} {item.name}</h2><p className={styles.note}>{item.notes}</p><dl className={styles.specs}><div><dt>Volumen</dt><dd>{item.cbm}</dd></div><div><dt>Zuladung</dt><dd>{item.payload}</dd></div></dl><div className={styles.details}>Details ansehen <Arrow /></div></div>
          </button>)}
        </div>
        <div className={styles.bottom}><div><p className={styles.eyebrow}>DAS PASSENDE EQUIPMENT</p><h2>Ihre Ladung. Unsere Lösung.</h2><p>Alle Maße und Zuladungen finden Sie in den jeweiligen Details.</p></div><Link href="/#kontakt">Transport anfragen <Arrow /></Link></div>
        <p className={styles.previewNote}>Designvorschau · Generierte Produktvisualisierungen mit individuellen DSEP-Markierungen. Maßangaben und Zuladungen entsprechen dem bestehenden Katalog.</p>
      </section>
      {active && <dialog ref={dialog} className={styles.dialog} aria-label={`${active.size} ${active.name} – Spezifikationen`} onCancel={() => setActive(null)} onClose={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
        <div className={styles.modal}>
          <button type="button" className={styles.close} onClick={() => setActive(null)} aria-label="Details schließen" autoFocus>×</button>
          <div className={styles.modalImage}><Image src={imageFor(active)} alt={`${active.size} ${active.name}`} width={1536} height={1024} sizes="(max-width: 700px) 95vw, 540px" /></div>
          <div className={styles.modalContent}><p className={styles.eyebrow}>DSEP · {active.size}</p><h2>{active.name}</h2><p className={styles.description}>{active.description}</p><dl className={styles.table}>
            {active.specs?.exterior && <div><dt>Außenmaße (L × B × H)</dt><dd>{active.specs.exterior.l} × {active.specs.exterior.b} × {active.specs.exterior.h} m</dd></div>}
            {active.specs?.interior && <div><dt>Innenmaße (L × B × H)</dt><dd>{active.specs.interior.l} × {active.specs.interior.b} × {active.specs.interior.h} m</dd></div>}
            {active.specs?.door && <div><dt>Türöffnung (B × H)</dt><dd>{active.specs.door.b} × {active.specs.door.h} m</dd></div>}
            {active.specs?.roof && <div><dt>Dachöffnung (B × L)</dt><dd>{active.specs.roof.b} × {active.specs.roof.l} m</dd></div>}
            {active.specs?.volume && <div><dt>Volumen</dt><dd>{active.specs.volume}</dd></div>}
            {active.specs?.maxGross && <div><dt>Max. Gesamtgewicht</dt><dd>{active.specs.maxGross}</dd></div>}
            {active.specs?.tare && <div><dt>Eigengewicht</dt><dd>{active.specs.tare}</dd></div>}
            {active.specs?.maxPayload && <div className={styles.payload}><dt>Max. Zuladung</dt><dd>{active.specs.maxPayload}</dd></div>}
          </dl><p className={styles.previewNote}>Illustrative Darstellung. Maßgeblich sind die angegebenen Spezifikationen.</p></div>
        </div>
      </dialog>}
    </main>
  );
}
