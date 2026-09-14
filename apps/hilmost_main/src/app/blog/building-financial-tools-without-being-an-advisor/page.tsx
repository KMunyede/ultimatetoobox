import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Financial Tools Without Being a Financial Advisor | Hilmost",
  description: "A founder's note on the line between showing the mechanism and giving a recommendation — and why the narrower promise is the one I can actually keep.",
};

export default function BlogPostFinancialTools() {
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
            Building Financial Tools Without Being <span className="text-brand-primary">a Financial Advisor</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            There&apos;s a specific discomfort in building a loan calculator, a compound interest tool, or anything touching money: the gap between &quot;this shows you the math&quot; and &quot;this tells you what to do.&quot; I&apos;m not a financial advisor, and every tool on Hilmost that touches money says so explicitly, not as legal boilerplate but because it&apos;s true.
          </p>

          <p>
            The line I try to hold is: show the mechanism, never the recommendation. A <Link href="https://hilmost-toolbox.hilmost.net/finance/loan-calculator">mortgage calculator</Link> can show you exactly how much of your payment goes to interest in year one versus year twenty — that&apos;s just arithmetic, and arithmetic doesn&apos;t need a disclaimer to be trusted. What it shouldn&apos;t do is tell you whether a 15-year or 30-year mortgage is &quot;better&quot; for you, because that depends on things a calculator can&apos;t know: your job stability, your risk tolerance, what else you&apos;d do with the difference.
          </p>

          <p>
            This is also, honestly, the easier position to build from as a solo founder. I don&apos;t have to get financial advice right. I have to get the math right, and let people draw their own conclusions from numbers they can verify themselves. That&apos;s a narrower promise, but it&apos;s one I can actually keep.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Hilmost Network</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Homepage</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox (Live Tools)</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/finance/loan-calculator" className="text-brand-primary hover:underline font-medium">Tool: Loan Calculator</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/finance/compound-interest" className="text-brand-primary hover:underline font-medium">Tool: Compound Interest Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Latest Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/why-i-think-in-probabilities-not-certainties" className="text-brand-primary hover:underline font-medium">Why I Think in Probabilities, Not Certainties</Link></li>
                  <li><Link href="/blog/why-we-built-the-toolbox" className="text-brand-primary hover:underline font-medium">Why We Built the Hilmost Toolbox</Link></li>
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
