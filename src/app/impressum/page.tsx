import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Impressum – DSC | EPP Logistik GmbH",
  description: "Angaben gemäß § 5 TMG für die DSC | EPP Logistik GmbH.",
};

export default function ImpressumPage() {
  return (
    <LegalShell
      eyebrow="Pflichtangaben"
      title="Impressum"
      intro="Angaben gemäß § 5 TMG."
    >
      <h2>Anbieter</h2>
      <dl>
        <dt>Firma</dt>
        <dd>DSC | EPP Logistik GmbH</dd>
        <dt>Anschrift</dt>
        <dd>Essener Str. 39 · 49456 Bakum</dd>
        <dt>Telefon</dt>
        <dd>+49 4446 000000 <span className="text-slate-400 text-xs">(noch einzutragen)</span></dd>
        <dt>E-Mail</dt>
        <dd><a href="mailto:info@dsc-logistik.de">info@dsc-logistik.de</a></dd>
      </dl>

      <h2>Vertretungsberechtigt</h2>
      <p>
        Geschäftsführer: <span className="text-slate-400">[Name einzutragen]</span>
      </p>

      <h2>Registereintrag</h2>
      <dl>
        <dt>Registergericht</dt>
        <dd className="text-slate-400">[Amtsgericht einzutragen]</dd>
        <dt>Registernummer</dt>
        <dd className="text-slate-400">HRB [Nummer einzutragen]</dd>
      </dl>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:{" "}
        <span className="text-slate-400">DE [Nummer einzutragen]</span>
      </p>

      <h2>Berufshaftpflichtversicherung</h2>
      <p className="text-slate-400">
        [Name und Sitz der Versicherung, Geltungsraum einzutragen]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p className="text-slate-400">[Name und Anschrift einzutragen]</p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucher-Streitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftungsausschluss</h2>
      <h3>Inhalt</h3>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
        die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
        wir jedoch keine Gewähr übernehmen.
      </p>

      <h3>Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
        diesen Seiten unterliegen dem deutschen Urheberrecht. Downloads
        und Kopien dieser Seite sind nur für den privaten, nicht
        kommerziellen Gebrauch gestattet.
      </p>
    </LegalShell>
  );
}
