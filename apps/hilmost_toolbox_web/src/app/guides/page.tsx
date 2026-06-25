import { Metadata } from "next";
import { Breadcrumbs } from "@utilitiessite/ui";
import { GUIDES } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import path from "path";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

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

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
          <BookOpen size={12} />
          Learning Center
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-6 uppercase tracking-tight">
          Utility <span className="text-brand-primary">Guides</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
          Deep dives into the logic and mathematics that power our tools. Learn how to optimize your finances, monitor your health, and manage data with precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col bg-canvas-card border border-base rounded-3xl p-8 transition-all hover:shadow-xl hover:border-brand-primary/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary block">
                {guide.category.replace("-", " ")}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                <Calendar size={10} />
                {lastUpdated}
              </span>
            </div>
            <h2 className="text-2xl font-black text-text-primary mb-4 group-hover:text-brand-primary transition-colors">
              {guide.title}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8 flex-1 font-medium">
              {guide.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all">
              Read Guide <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
