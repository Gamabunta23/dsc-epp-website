import type { MetadataRoute } from "next";

// WICHTIG: Muss der finalen Live-Domain entsprechen
const BASE = "https://dsc-epp.de";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/karriere`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/agb`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
