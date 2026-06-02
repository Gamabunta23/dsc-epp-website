import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSC | EPP Logistik GmbH – Container. Multimodal. Just in Time.",
  description:
    "Container-Logistik mit Hauptsitz Bakum (A1) und Hubs in Hamburg und Ostwestfalen-Lippe. Überseecontainer, Multimodale Verkehre, Reefer, VGM, Lagerung, Verkauf. EURO VI D Flotte. Just-in-Time-Lieferung in Deutschland und der EU.",
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
    >
      <body className="min-h-full bg-white text-slate-950 selection:bg-slate-900 selection:text-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
