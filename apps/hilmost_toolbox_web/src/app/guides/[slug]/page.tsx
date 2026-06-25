import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, BreadcrumbSchema, RelatedTools } from "@utilitiessite/ui";
import { GUIDES, getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import { Calendar } from "lucide-react";
import path from "path";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = GUIDES.find((g) => g.slug === resolvedParams.slug);
  if (!guide) return { title: "Guide Not Found" };

  const title = generatePageTitle(guide.metaTitle);
  const canonical = `/guides/${resolvedParams.slug}`;

  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: guide.metaDesc,
    alternates: { canonical },
    openGraph: {
      title,
      description: guide.metaDesc,
      url: canonical,
      type: "article",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: guide.metaDesc,
      images: ["/og/main.png"],
    }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = GUIDES.find((g) => g.slug === resolvedParams.slug);
  if (!guide) return notFound();

  const filePath = path.join(process.cwd(), `src/app/guides/[slug]/page.tsx`);
  const lastUpdated = getFileLastUpdated(filePath);

  const breadcrumbItems = [
    { label: "Guides", href: "/guides" },
    { label: guide.title, href: `/guides/${guide.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.metaDesc,
    "image": "https://hilmost-toolbox.hilmost.net/og/main.png",
    "author": {
      "@type": "Organization",
      "name": "Hilmost Digital Labs"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hilmost Software Corporation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hilmost-toolbox.hilmost.net/favicon.ico"
      }
    },
    "datePublished": "2026-06-24",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/guides/${guide.slug}`)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <article className="mt-8">
        <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary block">
                    {guide.category.replace("-", " ")} Deep Dive
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/30 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                    <Calendar size={10} />
                    {lastUpdated}
                </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
                {guide.title}
            </h1>
        </header>

        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:mt-12 prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium prose-strong:text-brand-primary prose-li:text-lg prose-li:font-medium"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </article>

      <div className="mt-20 pt-12 border-t border-base">
        <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight mb-8">Related Utilities</h2>
        <RelatedTools category={guide.category as any} currentPath={`/guides/${guide.slug}`} />
      </div>
    </div>
  );
}
