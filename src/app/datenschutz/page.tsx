import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutz – DSC | EPP Logistik GmbH",
  description:
    "Datenschutzerklärung der DSC | EPP Logistik GmbH gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <LegalShell
      eyebrow="DSGVO"
      title="Datenschutz"
      intro="Wir nehmen den Schutz Ihrer persönlichen Daten ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im
        Sinne der DSGVO ist:
      </p>
      <dl>
        <dt>Firma</dt>
        <dd>DSC | EPP Logistik GmbH</dd>
        <dt>Anschrift</dt>
        <dd>Essener Str. 39 · 49456 Bakum</dd>
        <dt>E-Mail</dt>
        <dd><a href="mailto:info@dsc-logistik.de">info@dsc-logistik.de</a></dd>
      </dl>

      <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
      <h3>Server-Logfiles</h3>
      <p>
        Beim Besuch unserer Website werden automatisch durch unseren Hoster
        Informationen in sogenannten Server-Logfiles gespeichert (IP-Adresse,
        Datum/Uhrzeit, aufgerufene Seite, Referrer-URL, User-Agent). Diese
        Daten werden nicht mit anderen Datenquellen zusammengeführt und
        nach 7 Tagen gelöscht.
      </p>

      <h3>Kontaktformular und E-Mail-Kontakt</h3>
      <p>
        Bei Nutzung unseres Kontaktformulars verarbeiten wir die von Ihnen
        mitgeteilten Daten (Name, E-Mail, Telefon, Anfrage) zur
        Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        und f DSGVO.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Unsere Website verwendet aktuell keine Tracking-Cookies. Technisch
        notwendige Cookies werden zur Sicherstellung der grundlegenden
        Funktionalität eingesetzt (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>4. Weitergabe von Daten</h2>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte findet nur statt, wenn:
      </p>
      <ul>
        <li>Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
        <li>die Weitergabe zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
        <li>eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
      </ul>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich an{" "}
        <a href="mailto:info@dsc-logistik.de">info@dsc-logistik.de</a>.
      </p>

      <h2>6. Hosting</h2>
      <p className="text-slate-400">
        [Name und Adresse des Hosting-Anbieters einzutragen, ggf. mit Hinweis
        auf Auftragsverarbeitungsvertrag.]
      </p>

      <h2>7. Aktualität dieser Erklärung</h2>
      <p>
        Diese Datenschutzerklärung wird bei Bedarf angepasst. Stand: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long" })}.
      </p>
    </LegalShell>
  );
}
