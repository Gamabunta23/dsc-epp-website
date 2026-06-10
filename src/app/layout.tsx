import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

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
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 selection:bg-slate-900 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
