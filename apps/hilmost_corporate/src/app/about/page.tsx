import { Metadata } from "next";
import { ShieldCheck, Code, Globe, User } from "lucide-react";
import { CategoryGrid, AdLayout } from "@utilitiessite/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About the Corporation | Hilmost Software Corporation",
  description: "Hilmost Software Corporation (HSC) builds free, practical software that removes friction from everyday tasks.",
};

export default function AboutPage() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase">
            Solving the <span className="text-blue-600">Annoying</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Hilmost Software Corporation (HSC) builds free, practical software that removes friction from everyday tasks.
            We believe technology should make life simpler, not add complexity.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
          <p className="text-lg leading-relaxed">
            The idea started from a real problem: coordinating meetings across colleagues in Australia, Hong Kong, Singapore, China, India, the UK, and New York — juggling three or four time zones by hand, every time, because the tools available online were confusing or bloated. That frustration became our first tool, and the same principle now drives everything we build: solve a real, specific annoyance, make it free, and make it fast.
          </p>
          <p className="text-lg leading-relaxed">
            Our flagship product, the Hilmost Toolbox, is a growing collection of over 39 free utilities — calculators, converters, PDF tools, and productivity aids — built to be fast, accurate, and genuinely useful. No sign-ups, no unnecessary steps, just tools that work.
          </p>
        </div>

        <figure className="my-16 not-prose">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900">
            <Image
              src="/about-usage.jpg"
              alt="Real-world document merging on Hilmost Toolbox"
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="mt-6 text-center text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Real-world use: merging certification documents while applying for work.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Globe className="text-blue-600" /> Expanding Horizons
            </h2>
            <p>
              Beyond the Toolbox, we&apos;re expanding into mobile apps focused on personal growth and wellbeing, including <strong>Daily Stoic</strong> (a companion for practicing Stoic philosophy) and <strong>MindOS</strong> (an AI-assisted wellness tool).
            </p>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Code className="text-blue-600" /> Professional Roots
            </h2>
            <p>
              Hilmost is based in Harare, Zimbabwe, and built by a small, focused team with a background in banking systems, payments infrastructure, and software engineering. Our motto: <strong>You Choose Your Destiny.</strong>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-12 text-center mb-20 italic font-medium text-slate-700 dark:text-slate-300">
          &quot;We&apos;re just getting started. More tools, more apps, and more ways to make everyday computing easier are on the way.&quot;
        </div>

        {/* Portfolio Section */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-black text-slate-900 dark:text-white mb-12 uppercase tracking-tight">The Hilmost Ecosystem</h2>
          <CategoryGrid limit={6} />
        </div>
      </div>
    </AdLayout>
  );
}
