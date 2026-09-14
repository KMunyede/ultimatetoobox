import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Compound Interest Feels Like a Trick | Hilmost",
  description: "Most people asked to guess how $10,000 grows at 7% over 30 years guess low, often by half. Here's why the calculator shows a curve, not just a number.",
};

export default function BlogPostCompoundInterest() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-primary transition-colors mb-8 uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-16">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">September 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            Why Compound Interest <span className="text-brand-primary">Feels Like a Trick</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Compound interest is one of the few places in finance where the math is genuinely simple and the intuition is genuinely wrong. Most people, asked to guess how much $10,000 grows to at 7% over 30 years, guess low — often by half or more. Linear thinking is the default; compounding is exponential, and our instincts aren&apos;t built for exponential curves.
          </p>

          <p>
            That&apos;s the actual reason the <Link href="https://hilmost-toolbox.hilmost.net/finance/compound-interest">Compound Interest Calculator</Link> shows a year-by-year table instead of just a final number. A single answer (&quot;$76,123&quot;) doesn&apos;t correct the intuition. Watching the curve bend upward — slow at first, then visibly steeper in the later years — does.
          </p>

          <p>
            There&apos;s a second reason we built it this way: the same curve works in reverse as a warning. Credit card debt compounds too. The tool doesn&apos;t moralize about that, but showing the mechanism plainly does more work than a warning label would.
          </p>

          <p>
            None of this needed to be complicated. It needed to stop hiding the shape of the curve behind a single output field.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Hilmost Network</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Homepage</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox (Live Tools)</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/guides/compound-interest-explained" className="text-brand-primary hover:underline font-medium">Guide: Compound Interest Explained</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/finance/compound-interest" className="text-brand-primary hover:underline font-medium">Tool: Compound Interest Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Latest Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/the-percentage-mistake-everyone-makes" className="text-brand-primary hover:underline font-medium">The Percentage Mistake Everyone Makes At Least Once</Link></li>
                  <li><Link href="/blog/binary-vs-decimal-storage-math" className="text-brand-primary hover:underline font-medium">Binary vs. Decimal: The Storage Math Nobody Explains Well</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by the engineering team at Hilmost. We focus on building privacy-first utilities for the modern web.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
