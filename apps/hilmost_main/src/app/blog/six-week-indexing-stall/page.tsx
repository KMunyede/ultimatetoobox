import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "What a Six-Week Indexing Stall Taught Me About Thinking Like Google | Hilmost",
  description: "How a bloated sitemap and parameterized URLs silenced our new tools in Google Search for over a month, and the unglamorous fixes that restored crawl priority.",
};

export default function BlogPostIndexingStall() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors mb-8 uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-16">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">July 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            What a Six-Week Indexing Stall Taught Me About <span className="text-brand-primary">Thinking Like Google</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            For six weeks, Google simply wasn&apos;t indexing new pages on Hilmost Toolbox. Tools were live, working, and useful — but invisible in search. No warnings, no manual penalty, just silence.
          </p>

          <p>
            The first instinct is to assume something dramatic is broken. It wasn&apos;t. The real cause was quieter: our sitemap was including parameterized URLs — the same Time Zone Converter page, but with query strings like <code>?sourceZone=</code> or <code>?team=</code> attached for shareable links. To a crawler, each of those looks like a separate page. Multiply that across a handful of tools with shareable state, and you get a sitemap bloated with near-duplicate URLs, all competing for the same crawl budget.
          </p>

          <p>
            On top of that, trailing-slash inconsistencies meant <code>/tool/</code> and <code>/tool</code> were sometimes treated as two different pages instead of one.
          </p>

          <p>
            Individually, neither issue looks severe. Together, they diluted crawl priority enough that genuinely new content kept getting deprioritized.
          </p>

          <p>
            The fix was unglamorous: enforce <code>trailingSlash: false</code> across the Next.js config and Firebase hosting rules, sanitize the sitemap to exclude parameterized variants, and make sure every parameterized pattern had an explicit <code>robots.txt</code> disallow rule with a canonical tag pointing back to the clean URL.
          </p>

          <p>
            The lesson that stuck: crawlers don&apos;t reward effort, they reward clarity. A sitemap should describe exactly what you want indexed — nothing implied, nothing left for Google to guess at. If you&apos;re building shareable or stateful URLs into a tool, decide before launch whether they&apos;re crawl-worthy, not after.
          </p>

          <p>
            If you&apos;re seeing indexing delays with no clear error, check your sitemap for URL variants first. It&apos;s a boring thing to check, and it&apos;s usually the answer.
          </p>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by the founder of Hilmost. I focus on building privacy-first utilities for the modern web.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
