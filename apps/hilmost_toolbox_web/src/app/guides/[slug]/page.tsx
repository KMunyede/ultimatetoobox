import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, BreadcrumbSchema, RelatedTools } from "@utilitiessite/ui";
import { GUIDES, getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
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
      url: getCanonicalUrl(canonical),
      type: "article",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/main.png", width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      title,
      description: guide.metaDesc,
      images: ["https://hilmost-toolbox.hilmost.net/og/main.png"],
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
      "name": "Hilmost"
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
                <span className="text-xs font-normal uppercase tracking-[0.3em] text-brand-primary block">
                    {guide.category.replace("-", " ")} Deep Dive
                </span>
                <span className="inline-flex items-center gap-1.5 text-caption font-normal text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/30 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                    <Calendar size={10} />
                    {lastUpdated}
                </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-normal text-text-primary tracking-tight leading-tight">
                {guide.title}
            </h1>
        </header>

        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-normal prose-h2:uppercase prose-h2:tracking-tight prose-h2:mt-12 prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium prose-strong:text-brand-primary prose-li:text-lg prose-li:font-medium"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </article>

      <div className="mt-12 pt-12 border-t border-base">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-base">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Network Priority</h3>
                <ul className="space-y-3 text-sm">
                    <li><Link href="https://hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Corporate Homepage</Link></li>
                    <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox Home</Link></li>
                    <li><Link href="/guides" className="text-brand-primary hover:underline font-medium">Full Knowledge Base Index</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Latest Founder Insights</h3>
                <ul className="space-y-3 text-sm">
                    <li><Link href="https://hilmost.net/blog/why-our-currency-converter-has-50-currencies" className="text-brand-primary hover:underline font-medium">Why Our Currency Converter Has 50 Currencies</Link></li>
                    <li><Link href="https://hilmost.net/blog/the-real-cost-of-a-bad-password" className="text-brand-primary hover:underline font-medium">The Real Cost of a Bad Password</Link></li>
                </ul>
            </div>
        </div>

        <h2 className="text-2xl font-normal text-text-primary uppercase tracking-tight mb-8">Related Utilities</h2>
        <RelatedTools
          category={guide.category as "converters" | "calculators" | "finance" | "text-data" | "health" | "pdf-tools"}
          currentPath={`/guides/${guide.slug}`}
        />
      </div>
    </div>
  );
}
