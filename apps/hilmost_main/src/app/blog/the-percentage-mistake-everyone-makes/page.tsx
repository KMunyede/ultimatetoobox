import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The Percentage Mistake Everyone Makes | Hilmost",
  description: "A shirt goes up 20%, then goes on sale for 20% off. Is it back to the original price? No — and the reason is the whole idea behind our Percentage Calculator's design.",
};

export default function BlogPostPercentageMistake() {
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
            The Percentage Mistake <span className="text-brand-primary">Everyone Makes</span> At Least Once
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Here&apos;s a question that trips up almost everyone the first time: a shirt goes up 20% in price, then goes on sale for 20% off. Is it back to the original price?
          </p>

          <p>
            No. And the reason why is the entire idea behind why the <Link href="https://hilmost-toolbox.hilmost.net/converters/percentage">Percentage Calculator</Link> treats &quot;increase&quot; and &quot;decrease&quot; as genuinely different operations, not mirror images of each other.
          </p>

          <p>
            If a $100 shirt goes up 20%, it&apos;s $120. Take 20% off $120, and you get $96 — not $100. The second 20% is calculated on a bigger number than the first one was, so it removes more in absolute terms than the first increase added... except it doesn&apos;t, because percentages of different base numbers aren&apos;t comparable the way flat amounts are. This asymmetry is the single most common source of percentage-math errors we see reflected in how people use the tool — repeatedly checking &quot;did I get this right?&quot; on decrease-then-increase or increase-then-decrease sequences.
          </p>

          <p>
            The fix wasn&apos;t a better explanation. It was separating &quot;percentage of,&quot; &quot;percentage change,&quot; and &quot;what percent is X of Y&quot; into three distinct, clearly labeled calculator modes, so the tool never lets you accidentally use the wrong formula for the question you&apos;re actually asking.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Hilmost Network</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Homepage</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox (Live Tools)</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/guides/percentage-calculations-explained" className="text-brand-primary hover:underline font-medium">Guide: Percentage Calculations Explained</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/converters/percentage" className="text-brand-primary hover:underline font-medium">Tool: Percentage Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Latest Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/why-compound-interest-feels-like-a-trick" className="text-brand-primary hover:underline font-medium">Why Compound Interest Feels Like a Trick</Link></li>
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
