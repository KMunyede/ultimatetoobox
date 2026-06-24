import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, BreadcrumbSchema, RelatedTools } from "@utilitiessite/ui";
import { GUIDES } from "@utilitiessite/config";
import { getCanonicalUrl } from "@utilitiessite/config";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = GUIDES.find((g) => g.slug === resolvedParams.slug);
  if (!guide) return { title: "Guide Not Found" };

  const canonical = getCanonicalUrl(`/guides/${resolvedParams.slug}`);

  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: { canonical },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDesc,
      url: canonical,
      type: "article",
    },
    twitter: {
      title: guide.metaTitle,
      description: guide.metaDesc,
    }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = GUIDES.find((g) => g.slug === resolvedParams.slug);
  if (!guide) return notFound();

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
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-4 block">
                {guide.category.replace("-", " ")} Deep Dive
            </span>
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
