import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Software for Self-Improvement | Hilmost Blog",
  description: "How we build technology that helps people focus, reflect, and actually improve their lives.",
};

export default function BlogPost2() {
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
