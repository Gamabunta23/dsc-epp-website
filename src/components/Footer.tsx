"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const year = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <Image
            src="/logo.jpg"
            alt="DSC | EPP Logistik GmbH"
            width={420}
            height={141}
            className="h-12 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Container-Logistik aus Bakum, Hamburg &amp; Ostwestfalen-Lippe.
            Multimodal, just in time, EURO VI D.
          </p>
          <address className="mt-6 text-xs text-slate-500 not-italic leading-relaxed">
            <span className="block text-slate-300 font-medium">DSC | EPP Logistik GmbH</span>
            Essener Str. 39
            <br />
            49456 Bakum
          </address>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Leistungen</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={anchor("#leistungen")} className="hover:text-white transition-colors">Container-Transport</Link></li>
            <li><Link href={anchor("#leistungen")} className="hover:text-white transition-colors">Multimodal</Link></li>
            <li><Link href={anchor("#leistungen")} className="hover:text-white transition-colors">Reefer</Link></li>
            <li><Link href={anchor("#leistungen")} className="hover:text-white transition-colors">VGM-Verwiegung</Link></li>
            <li><Link href={anchor("#fahrzeitrechner")} className="hover:text-white transition-colors">Fahrzeitrechner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Unternehmen</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={anchor("#unternehmen")} className="hover:text-white transition-colors">Über uns</Link></li>
            <li><Link href={anchor("#standorte")} className="hover:text-white transition-colors">Standorte</Link></li>
            <li><Link href="/karriere" className="hover:text-white transition-colors">Karriere</Link></li>
            <li><Link href={anchor("#kontakt")} className="hover:text-white transition-colors">Kontakt</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} DSC | EPP Logistik GmbH. Alle Rechte vorbehalten.</p>
          <ul className="flex items-center gap-6">
            <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
            <li><Link href="/agb" className="hover:text-white transition-colors">AGB</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
