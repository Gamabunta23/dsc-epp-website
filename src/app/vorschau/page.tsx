import type { Metadata } from "next";
import Link from "next/link";
import HomePreviewHero from "@/components/HomePreviewHero";
import EquipmentPreview from "@/components/EquipmentPreview";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Fahrzeitrechner from "@/components/Fahrzeitrechner";
import Locations from "@/components/Locations";
import About from "@/components/About";
import Contact from "@/components/Contact";
import styles from "@/components/HomePreview.module.css";

export const metadata: Metadata = {
  title: "Homepage – Designvorschau",
  robots: { index: false, follow: false },
};

export default function HomePreviewPage() {
  return <main className={styles.page}>
    <HomePreviewHero />
    <div className={styles.previewBar}><span>DESIGNVORSCHAU</span><span>Neuer Einstieg · DSEP Container-Serie</span><Link href="/">Bisherige Version ↗</Link></div>
    <Journey />
    <Stats />
    <Services />
    <EquipmentPreview embedded />
    <Fleet compact />
    <Fahrzeitrechner />
    <Locations />
    <About />
    <Contact />
  </main>;
}
