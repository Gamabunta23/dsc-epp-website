"use client";

import Image from "next/image";

const year = new Date().getFullYear();

export default function Footer() {
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
            <li><a href="#leistungen" className="hover:text-white transition-colors">Container-Transport</a></li>
            <li><a href="#leistungen" className="hover:text-white transition-colors">Multimodal</a></li>
            <li><a href="#leistungen" className="hover:text-white transition-colors">Reefer</a></li>
            <li><a href="#leistungen" className="hover:text-white transition-colors">VGM-Verwiegung</a></li>
            <li><a href="#leistungen" className="hover:text-white transition-colors">Lagerung &amp; Verkauf</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Unternehmen</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#unternehmen" className="hover:text-white transition-colors">Über uns</a></li>
            <li><a href="#standorte" className="hover:text-white transition-colors">Standorte</a></li>
            <li><a href="#kontakt" className="hover:text-white transition-colors">Karriere</a></li>
            <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} DSC | EPP Logistik GmbH. Alle Rechte vorbehalten.</p>
          <ul className="flex items-center gap-6">
            <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
