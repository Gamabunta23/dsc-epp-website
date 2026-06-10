import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // WICHTIG: metadataBase muss der finalen Live-Domain entsprechen
  metadataBase: new URL("https://dsc-epp.de"),
  title: {
    default: "DSC | EPP Logistik GmbH – Container. Multimodal. Just in Time.",
    template: "%s – DSC | EPP Logistik GmbH",
  },
  description:
    "Container-Logistik mit Hauptsitz Bakum (A1) und Hubs in Hamburg und Ostwestfalen-Lippe. Überseecontainer, Multimodale Verkehre, Reefer, VGM, Lagerung, Verkauf. EURO VI D Flotte. Just-in-Time-Lieferung in Deutschland und der EU.",
  keywords: [
    "Containertransport",
    "Überseecontainer",
    "Containerlogistik Hamburg",
    "Spedition Bakum",
    "Multimodale Verkehre",
    "Reefer Transport",
    "VGM Verwiegung",
    "Container Lagerung",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://dsc-epp.de",
    siteName: "DSC | EPP Logistik GmbH",
    title: "DSC | EPP Logistik GmbH – Container. Multimodal. Just in Time.",
    description:
      "Container-Logistik vom Tiefseehafen bis zur Werksrampe. Hauptsitz Bakum, Hubs in Hamburg und OWL.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSC | EPP Logistik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSC | EPP Logistik GmbH",
    description: "Container bewegen. Märkte verbinden.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// Strukturierte Daten für Google (LocalBusiness)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DSC | EPP Logistik GmbH",
  description:
    "Container-Logistik: Überseecontainer, multimodale Verkehre und Just-in-Time-Lieferung vom Terminal bundesweit.",
  url: "https://dsc-epp.de",
  telephone: "+49 40 8090356-0",
  email: "info@dsc-logistik.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Essener Str. 39",
    postalCode: "49456",
    addressLocality: "Bakum",
    addressCountry: "DE",
  },
  areaServed: "DE",
  knowsAbout: [
    "Containertransport",
    "Überseecontainer",
    "Multimodale Verkehre",
    "Reefer-Transporte",
    "VGM-Verwiegung",
    "Container-Lagerung",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${jakarta.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 selection:bg-slate-900 selection:text-white transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
