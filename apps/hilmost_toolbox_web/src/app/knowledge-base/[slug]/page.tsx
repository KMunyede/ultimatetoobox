import { Metadata } from "next";
import { notFound } from "next/navigation";
import { KNOWLEDGE_BASE } from "@utilitiessite/config";
import { Breadcrumbs, RelatedTools, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";
import { getCanonicalUrl } from "@utilitiessite/config";

export async function generateStaticParams() {
  return KNOWLEDGE_BASE.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = KNOWLEDGE_BASE.find((a) => a.slug === resolvedParams.slug);
  if (!article) return { title: "Article Not Found" };

  const title = generatePageTitle(`${article.title} | Knowledge Base`);
  const canonical = `/knowledge-base/${article.slug}`;

  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      title,
      description: article.excerpt,
      url: getCanonicalUrl(canonical),
      type: "article",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/main.png", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      title,
      description: article.excerpt,
      images: ["https://hilmost-toolbox.hilmost.net/og/main.png"],
    }
  };
}

export default async function KBArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = KNOWLEDGE_BASE.find((a) => a.slug === resolvedParams.slug);

  if (!article) return notFound();

  const breadcrumbItems = [
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: article.title, href: `/knowledge-base/${article.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-2 max-w-4xl">
      <Breadcrumbs items={breadcrumbItems} />

      <Link
        href="/knowledge-base"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Knowledge Base
      </Link>

      <header className="mb-12">
        <div className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">
          Research Vertical: {article.category.replace("-", " ")}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none mb-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
        {article.content}
      </div>

      {article.relatedTools.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase flex items-center gap-3">
             <Wrench className="text-blue-600" /> Experiment With This Logic
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {article.relatedTools.map((toolPath) => (
               <Link
                 key={toolPath}
                 href={toolPath}
                 className="p-6 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-between group hover:scale-[1.02] transition-all"
               >
                 <span>Launch {toolPath.split("/").pop()?.replace("-", " ").toUpperCase()}</span>
                 <Wrench size={20} className="opacity-50 group-hover:rotate-12 transition-transform" />
               </Link>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
