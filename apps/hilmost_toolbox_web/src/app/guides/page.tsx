import { Metadata } from "next";
import { Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { GUIDES, getFileLastUpdated } from "@utilitiessite/config";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import path from "path";

export const metadata: Metadata = {
  title: "Tool Guides & Learning Center | Hilmost",
  description: "Master our free online tools with in-depth guides on financial planning, health metrics, and data management. Real-world examples and precision math.",
  alternates: {
    canonical: "https://hilmost-toolbox.hilmost.net/guides",
  },
  openGraph: {
    title: "Tool Guides & Learning Center | Hilmost",
    description: "Master our free online tools with in-depth guides on financial planning, health metrics, and data management.",
    url: "/guides",
    type: "website",
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
      <BreadcrumbSchema items={breadcrumbItems} />
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
