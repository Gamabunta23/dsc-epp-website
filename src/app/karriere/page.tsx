import type { Metadata } from "next";
import KarriereHero from "@/components/karriere/KarriereHero";
import KarriereValues from "@/components/karriere/KarriereValues";
import KarriereJobs from "@/components/karriere/KarriereJobs";
import KarriereInitiativ from "@/components/karriere/KarriereInitiativ";

export const metadata: Metadata = {
  title: "Karriere – DSC | EPP Logistik GmbH",
  description:
    "Werden Sie Teil von DSC | EPP Logistik. Offene Stellen für Berufskraftfahrer, Disposition, Spedition und Werkstatt an unseren Standorten Bakum, Hamburg und Ostwestfalen-Lippe.",
};

export default function KarrierePage() {
  return (
    <main>
      <KarriereHero />
      <KarriereValues />
      <KarriereJobs />
      <KarriereInitiativ />
    </main>
  );
}
