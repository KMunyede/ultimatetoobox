import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Software for Self-Improvement | Hilmost Blog",
  description: "How we build technology that helps people focus, reflect, and actually improve their lives. Discover our philosophy on creating digital tools for a more focused and intentional life.",
};

export default function BlogPost2() {
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
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">July 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            Building Software for Self-Improvement in a <span className="text-brand-primary">Distracted World</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            A lot of modern software is designed to capture your attention and keep you scrolling. At Hilmost, we&apos;re interested in the opposite problem: how do you build technology that helps people focus, reflect, and actually improve their lives — then gets out of the way?
          </p>

          <p>
            This question shapes two of our current projects. <strong>Daily Stoic</strong> is built around a 2,000-year-old idea: that clarity of thought and resilience come from daily practice, not occasional inspiration. The app pairs Stoic philosophy with simple habit tracking and journaling, aimed at people who want a structured way to build mental discipline without needing to read a philosophy degree&apos;s worth of material first.
          </p>

          <p>
            <strong>MindOS</strong> takes a different angle — using AI to provide a wellness companion that remembers context across conversations and offers support grounded in safety, not just engagement metrics. We built it with mandatory safeguards around crisis situations from day one, because tools in this space carry real responsibility.
          </p>

          <p>
            Neither app is trying to replace human connection or professional mental health support. They&apos;re tools — meant to sit alongside a person&apos;s life and make small, positive habits easier to sustain. That&apos;s the same philosophy behind everything we build: useful, honest, and designed to respect the person using it.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Hilmost Network</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Homepage</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox (Live Tools)</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/guides/sleep-cycles-and-wake-times-explained" className="text-brand-primary hover:underline font-medium">Guide: Sleep Cycles and Wake Times Explained</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Latest Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/why-our-currency-converter-has-50-currencies" className="text-brand-primary hover:underline font-medium">Why Our Currency Converter Has 50 Currencies</Link></li>
                  <li><Link href="/blog/the-real-cost-of-a-bad-password" className="text-brand-primary hover:underline font-medium">The Real Cost of a Bad Password</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by the engineering team at Hilmost Software Corporation. We focus on building tools that empower individual growth.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
