import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Software as a Quiet Practice | Hilmost Blog",
  description: "What Stoicism and Hermeticism actually teach about disciplined work, and how they shape the daily operating rhythm behind Hilmost.",
};

export default function BlogPostQuietPractice() {
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
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">August 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            Building Software as a <span className="text-brand-primary">Quiet Practice</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Stoicism and Hermeticism don&apos;t usually show up in a founder&apos;s technical blog. They probably should more often.
          </p>

          <h2>Sustained Attention</h2>

          <p>
            The Stoics had a concept — prosoche — sustained attention to the present task, done well, without narrating your own effort to yourself. Not &quot;I am being productive,&quot; just: doing the thing. Most of my best working sessions have nothing to do with willpower and everything to do with removing the noise that competes with that attention. A clean terminal. One task queued at a time. No context-switching between five half-finished threads. That&apos;s not a productivity hack — it&apos;s a discipline borrowed from twenty-three-hundred-year-old philosophy.
          </p>

          <h2>As Above, So Below</h2>

          <p>
            Hermeticism adds something Stoicism doesn&apos;t dwell on as much: correspondence — as above, so below, the idea that patterns repeat at every scale. I see that constantly in software architecture. The discipline it takes to keep one function clean is structurally the same discipline it takes to keep an entire monorepo clean. The same principle that keeps a single React component honest — single responsibility, no hidden side effects — is the same principle that keeps a whole company&apos;s roadmap honest. Different scale, same law.
          </p>

          <h2>The Actual Practice</h2>

          <p>
            None of this is a marketing angle. It&apos;s the actual operating system behind how Hilmost gets built: quiet, deliberate, undramatic work, repeated daily, with attention paid to the present task rather than the imagined future one. Building a company is mostly just showing up and doing the unglamorous next right thing, over and over, without needing anyone to see you do it.
          </p>

          <p>That&apos;s not a tagline. It&apos;s just the practice.</p>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by Keepy Munyede, Technical Founder of Hilmost Software Corporation.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
