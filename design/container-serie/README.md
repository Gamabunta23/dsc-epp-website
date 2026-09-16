# DSEP Container-Serie – lokale Vorschau, 16.09.2026

Vorschau: http://127.0.0.1:3210/vorschau/container
Start: npm run dev -- --hostname 127.0.0.1 --port 3210

## Freigegebene Gestaltung
- Einheitliches kühles Studio, Graphit/Silber, gleiche Blickrichtung.
- Individueller Prefix DSEP; Kühlaggregat mit THERMO EPP.
- Gelb-schwarze Markierungen NUR bei HC, inklusive HC Reefer und OT HC.
- 2 × 20 DC: zwei Boxen hintereinander, KEINE Tür in einer Längsseitenwand.
- Die erste Stilreferenz v1 zeigt noch überholte gelbe Markierungen; maßgeblich sind die Einzelbilder in public/container-preview/.

## Implementierung
- 15 separate generierte PNG-Visualisierungen unter public/container-preview/.
- EquipmentPreview.tsx + CSS-Modul: Filter (6 Standard, 2 Reefer, 7 Spezial), vollständige Galerie, native modale Details, responsive Layout.
- Vorhandene Container-Daten werden unverändert aus Containers.tsx genutzt. Keine Änderungen an Maßen, Zuladungen oder Reihenfolge.
- Gelbe Markierungen: 20-hc, 40-hc, 45-hc, 40-reefer, 20-ot-hc, 40-ot-hc.
- Bilder sind illustrative Produktdarstellungen, keine maßstabsgetreuen technischen Zeichnungen. DSEP-Kennzeichnungen sind Gestaltungsmerkmale.
- Original-Homepage und Signaturbilder unverändert. Kein Push/Deployment in dieser Arbeit.
- Vorschau hat noindex/nofollow; nicht im Sitemap oder Navigationsmenü verlinkt.

## Prüfung
- TypeScript und ESLint für neue Komponenten erfolgreich.
- Filterzählung und Detailfenster im Desktop-Browser geprüft.
- Mobile Ansicht und Dialog bei 390px geprüft, kein horizontaler Überlauf.
- 2x20-Seitentür korrigiert; Standard-Bilder ohne gelbe Markierungen.

## Vollständige Homepage-Vorschau
- Route http://127.0.0.1:3210/vorschau (ebenfalls noindex).
- Kompakter neuer Einstieg mit bisheriger Bewegen-/LKW-Animation, direkt sichtbaren Anfrage-Buttons und Suche.
- EquipmentPreview lässt sich eingebettet als horizontales Karussell nutzen; Filter, Pfeile, Mausziehen, natives Touch-Scrolling und Suchereignisse unterstützt.
- Einzelgalerie /vorschau/container bleibt als Übersicht bestehen.
- Vorhandene übrige Bereiche übernommen, Abstände und Kontakt-Kontrast nur innerhalb der Vorschau angepasst. Fleet compact verkleinert nur den Bildrahmen.
- Nav/Footer behandeln /vorschau als eigene Startseite für lokale Abschnittslinks; ursprüngliche Homepage unverändert.
- Desktop-/390px-Ansicht, Abschnittsnavigation, Pfeile, Filter, Mausziehen und Details geprüft. Produktionsbuild erfolgreich.
- Kein Push/Live-Deployment.
