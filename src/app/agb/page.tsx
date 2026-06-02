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
      intro="Es gelten die nachstehenden Allgemeinen Geschäftsbedingungen (AGB) der DSC | EPP Logistik GmbH für alle Geschäftsbeziehungen mit unseren Auftraggebern."
    >
      <p className="text-slate-400 italic border-l-2 border-amber-400 pl-4">
        Hinweis: Dieser Text ist eine inhaltliche Vorlage und ersetzt
        keine rechtliche Prüfung. Vor Veröffentlichung bitte durch
        Rechtsbeistand finalisieren lassen (z.B. Übernahme der ADSp 2017
        Allgemeine Deutsche Spediteurbedingungen, falls anwendbar).
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Für alle Geschäfte und Leistungen der DSC | EPP Logistik GmbH
        (nachfolgend „Spediteur") gelten ausschließlich diese AGB sowie
        ergänzend — soweit anwendbar — die Allgemeinen Deutschen
        Spediteurbedingungen (ADSp 2017) in der jeweils gültigen Fassung.
      </p>

      <h2>§ 2 Angebot und Vertragsschluss</h2>
      <p className="text-slate-400">
        [Anfertigung von Angeboten, Bindefristen, Vertragsschluss durch
        Auftragsbestätigung. Vom Rechtsbeistand zu finalisieren.]
      </p>

      <h2>§ 3 Leistungsumfang</h2>
      <p className="text-slate-400">
        [Beschreibung der Speditions-, Fracht- und Lagerleistungen, ggf.
        mit Verweis auf einzelne Leistungsscheine.]
      </p>

      <h2>§ 4 Preise und Zahlungsbedingungen</h2>
      <p className="text-slate-400">
        [Preisbasis netto/brutto, Zahlungsziele, Verzugsregelungen,
        Stundungs- und Aufrechnungsregelungen.]
      </p>

      <h2>§ 5 Mitwirkungspflichten des Auftraggebers</h2>
      <p className="text-slate-400">
        [Angaben zur Ladung, gefährliche Güter, Verpackung, Be- und
        Entladezeiten, Zollunterlagen.]
      </p>

      <h2>§ 6 Haftung</h2>
      <p className="text-slate-400">
        [Haftungsregelungen gemäß HGB / CMR / ADSp 2017. Höchstbeträge,
        Haftungsausschlüsse, Versicherungspflichten.]
      </p>

      <h2>§ 7 Datenschutz</h2>
      <p>
        Es gelten die{" "}
        <a href="/datenschutz">Datenschutzbestimmungen</a> der DSC | EPP
        Logistik GmbH.
      </p>

      <h2>§ 8 Gerichtsstand und anwendbares Recht</h2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
        Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder
        im Zusammenhang mit dem Vertragsverhältnis ist — soweit gesetzlich
        zulässig — der Sitz des Spediteurs (Bakum).
      </p>

      <h2>§ 9 Salvatorische Klausel</h2>
      <p>
        Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
        unwirksam sein oder werden, so wird die Wirksamkeit der übrigen
        Bestimmungen hiervon nicht berührt.
      </p>

      <p className="text-sm text-slate-500 mt-12">
        Stand: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long" })}
      </p>
    </LegalShell>
  );
}
