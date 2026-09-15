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
        <dt>Vertreten durch</dt>
        <dd>Dimitri Schönfeld, Artur Epp, Eduard Epp</dd>
        <dt>Telefon</dt>
        <dd>+49 40 8090356 - 0</dd>
        <dt>E-Mail</dt>
        <dd><a href="mailto:info@dsc-epp.de">info@dsc-epp.de</a></dd>
      </dl>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird auf Servern der{" "}
        <strong>Hetzner Online GmbH</strong>, Industriestr. 25, 91710
        Gunzenhausen, Deutschland, betrieben. Der Serverstandort liegt in
        Deutschland. Alle Zugriffe auf diese Website werden technisch über
        die Server dieses Anbieters verarbeitet.
      </p>
      <p>
        Mit der Hetzner Online GmbH haben wir einen Vertrag über
        Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen. Die Nutzung
        des Hosters erfolgt auf Grundlage unseres berechtigten Interesses
        an einer sicheren, schnellen und effizienten Bereitstellung unseres
        Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h3>Server-Logfiles</h3>
      <p>
        Beim Besuch unserer Website werden automatisch Informationen in
        sogenannten Server-Logfiles gespeichert: IP-Adresse, Datum und
        Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL sowie
        Browser- und Betriebssystem-Kennung (User-Agent). Diese Daten
        dienen der Sicherstellung eines störungsfreien Betriebs und der
        Abwehr von Angriffen. Sie werden nicht mit anderen Datenquellen
        zusammengeführt und automatisch gelöscht, sobald sie für diese
        Zwecke nicht mehr erforderlich sind. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h3>SSL-/TLS-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.
        Eine verschlüsselte Verbindung erkennen Sie an „https://" und dem
        Schloss-Symbol in der Adresszeile Ihres Browsers.
      </p>

      <h2>3. Kontaktformular und E-Mail-Kontakt</h2>
      <p>
        Bei Nutzung unseres Kontaktformulars verarbeiten wir die von Ihnen
        mitgeteilten Daten (Name, ggf. Firma, E-Mail-Adresse, ggf.
        Telefonnummer, Angaben zu Abholung und Ziel sowie Ihre Nachricht)
        ausschließlich zur Bearbeitung Ihrer Anfrage und für den Fall von
        Anschlussfragen. Gleiches gilt, wenn Sie uns direkt per E-Mail
        kontaktieren.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
        mit der Anbahnung oder Erfüllung eines Vertrags zusammenhängt, im
        Übrigen unser berechtigtes Interesse an der effektiven Bearbeitung
        der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
        Ihre Daten werden gelöscht, sobald sie für die Bearbeitung nicht
        mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen.
      </p>
      <p>
        Für die technische Zustellung von Formular-Anfragen kann der
        Versanddienstleister Resend (Resend, Inc., USA) als
        Auftragsverarbeiter eingesetzt werden. Die Übermittlung erfolgt in
        diesem Fall auf Grundlage der EU-Standardvertragsklauseln
        (Art. 46 Abs. 2 lit. c DSGVO).
      </p>

      <h2>4. Kontakt über WhatsApp</h2>
      <p>
        Auf unserer Website bieten wir die Möglichkeit, uns über WhatsApp
        zu kontaktieren. Wenn Sie diesen Weg wählen, gelten zusätzlich die
        Datenschutzbestimmungen der WhatsApp Ireland Limited bzw. Meta
        Platforms. Die Nutzung ist freiwillig — alle Anliegen können
        ebenso per Telefon oder E-Mail an uns gerichtet werden.
      </p>

      <h2>5. Cookies und Local Storage</h2>
      <p>
        Unsere Website verwendet <strong>keine Tracking- oder
        Analyse-Cookies</strong> und keine Werbedienste. Im lokalen
        Speicher Ihres Browsers (Local Storage) werden lediglich zwei
        technisch bedingte Einstellungen abgelegt: Ihre Auswahl im
        Cookie-Hinweis sowie Ihre bevorzugte Darstellung (helles/dunkles
        Design). Diese Angaben verbleiben auf Ihrem Gerät, werden nicht an
        uns oder Dritte übertragen und lassen keine Identifizierung Ihrer
        Person zu (§ 25 Abs. 2 TDDDG, Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>6. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten sind lokal auf
        unserem Server eingebunden. Es findet keine Verbindung zu Servern
        von Google Fonts oder anderen Drittanbietern statt.
      </p>

      <h2>7. Bewerbungen</h2>
      <p>
        Wenn Sie sich bei uns bewerben (z.&nbsp;B. per E-Mail an{" "}
        <a href="mailto:bewerbung@dsc-epp.de">bewerbung@dsc-epp.de</a>),
        verarbeiten wir Ihre Bewerbungsunterlagen ausschließlich zur
        Durchführung des Bewerbungsverfahrens (Art. 6 Abs. 1 lit. b DSGVO,
        § 26 BDSG). Kommt kein Beschäftigungsverhältnis zustande, werden
        Ihre Unterlagen spätestens sechs Monate nach Abschluss des
        Verfahrens gelöscht, sofern Sie nicht in eine längere Aufbewahrung
        eingewilligt haben.
      </p>

      <h2>8. Weitergabe von Daten</h2>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte findet nur statt, wenn:
      </p>
      <ul>
        <li>Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
        <li>die Weitergabe zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
        <li>eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
      </ul>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{" "}
        <a href="mailto:info@dsc-epp.de">info@dsc-epp.de</a>.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für
        uns zuständig ist die Landesbeauftragte für den Datenschutz
        Niedersachsen, Prinzenstraße 5, 30159 Hannover.
      </p>

      <h2>10. Automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling
        gemäß Art. 22 DSGVO findet nicht statt.
      </p>

      <h2>11. Aktualität dieser Erklärung</h2>
      <p>
        Diese Datenschutzerklärung wird bei Bedarf angepasst, etwa wenn
        sich unser Online-Angebot oder die Rechtslage ändert.
        Stand: August 2026.
      </p>
    </LegalShell>
  );
}
