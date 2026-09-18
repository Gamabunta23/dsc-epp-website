import type { Metadata } from "next";
import HomePreviewHero from "@/components/HomePreviewHero";
import CinematicPreview from "@/components/CinematicPreview";
import EquipmentPreview from "@/components/EquipmentPreview";
import GlobeSection from "@/components/GlobeSection";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Fahrzeitrechner from "@/components/Fahrzeitrechner";
import Locations from "@/components/LocationsPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import styles from "@/components/HomePreview.module.css";

export const metadata: Metadata = {
  title: "Homepage – Designvorschau",
  robots: { index: false, follow: false },
};

export default function HomePreviewPage() {
  return <main className={styles.page}>
    <CinematicPreview />
    <GlobeSection />
    <Stats />
    <Services />
    <EquipmentPreview embedded />
    <HomePreviewHero fleet />
    <Fahrzeitrechner />
    <Locations />
    <About />
    <Contact />
  </main>;
}
