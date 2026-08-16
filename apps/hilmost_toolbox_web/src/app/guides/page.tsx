import { Metadata } from "next";
import { Breadcrumbs } from "@utilitiessite/ui";
import { GUIDES } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import { BookOpen } from "lucide-react";
import path from "path";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";
import { GuidesIndexClient } from "./GuidesIndexClient";

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_BASE_URL),
  title: generatePageTitle("Utility Guides"),
  description: "In-depth guides on finance, health, and unit conversion tools. Master our free online utilities with real-world examples and precision math.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: generatePageTitle("Utility Guides"),
    description: "In-depth guides on finance, health, and unit conversion tools.",
    url: "/guides",
    type: "website",
    images: [{ url: "/og/main.png", width: 1200, height: 630 }],
  }
};

export default function GuidesIndex() {
  const breadcrumbItems = [{ label: "Guides", href: "/guides" }];

  const filePath = path.join(process.cwd(), "src/app/guides/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Ecosystem Guides | Hilmost Toolbox",
    "description": "Educational articles and guides for using Hilmost free online calculators and converters.",
    "url": "https://hilmost-toolbox.hilmost.net/guides",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": GUIDES.map((guide, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://hilmost-toolbox.hilmost.net/guides/${guide.slug}`,
        "name": guide.title
      }))
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-caption font-normal uppercase tracking-widest mb-6">
          <BookOpen size={12} />
          Learning Center
        </div>
        <h1 className="text-4xl md:text-5xl font-normal text-text-primary mb-6 uppercase tracking-tight">
          Utility <span className="text-brand-primary">Guides</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
          Deep dives into the logic and mathematics that power our tools. Learn how to optimize your finances, monitor your health, and manage data with precision.
        </p>
      </div>

      <GuidesIndexClient guides={GUIDES} lastUpdated={lastUpdated} />
    </div>
  );
}
