import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "AGB – DSC | EPP Logistik GmbH",
  description:
    "Allgemeine Geschäftsbedingungen der DSC | EPP Logistik GmbH.",
};

export default function AgbPage() {
  return (
    <LegalShell
      eyebrow="Vertragsbedingungen"
      title="Allgemeine Geschäftsbedingungen"
      intro="Wir arbeiten auf Grundlage der Allgemeinen Deutschen Spediteurbedingungen 2017 (ADSp 2017)."
    >
      <h2>Geltung der ADSp 2017</h2>
      <p>
        Die DSC | EPP Logistik GmbH erbringt ihre Leistungen ausschließlich
        auf Grundlage der Allgemeinen Deutschen Spediteurbedingungen 2017
        (ADSp 2017) in der jeweils aktuellen Fassung.
      </p>
      <p>
        Hinweis: Die ADSp 2017 weichen in Ziffer 23 hinsichtlich des
        Haftungshöchstbetrages für Güterschäden (§ 431 HGB) vom Gesetz ab,
        indem sie die Haftung bei multimodalen Transporten unter Einschluss
        einer Seebeförderung und bei unbekanntem Schadenort auf 2 SZR/kg
        und im Übrigen die Regelhaftung von 8,33 SZR/kg zusätzlich auf
        1,25 Millionen Euro je Schadenfall sowie 2,5 Millionen Euro je
        Schadenereignis, mindestens aber 2 SZR/kg, beschränken.
      </p>

      <h2>Individuelle Vereinbarungen</h2>
      <p>
        Individuell getroffene vertragliche Vereinbarungen haben Vorrang
        vor den ADSp 2017.
      </p>

      <h2>Text der ADSp 2017</h2>
      <p>
        Den vollständigen Text der ADSp 2017 stellen wir Ihnen auf Anfrage
        gerne zur Verfügung. Wenden Sie sich dazu an{" "}
        <a href="mailto:auftrag@dsc-epp.de">auftrag@dsc-epp.de</a>.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Es gelten die{" "}
        <a href="/datenschutz">Datenschutzbestimmungen</a> der DSC | EPP
        Logistik GmbH.
      </p>

      <p className="text-sm text-slate-500 mt-12">Stand: September 2026</p>
    </LegalShell>
  );
}
