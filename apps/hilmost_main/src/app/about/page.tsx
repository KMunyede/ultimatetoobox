import { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Mail, MapPin } from "lucide-react";
import { CategoryGrid, AdLayout } from "@utilitiessite/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Hilmost | Practical Software for Everyday Tasks",
  description: "Hilmost Software Corporation (HSC) builds free, practical software that removes friction from everyday tasks.",
};

export default function AboutPage() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-8 uppercase">
            About <span className="text-brand-primary">Hilmost</span>
          </h1>

          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 border-l-4 border-brand-primary pl-6 font-medium">
            Hilmost Software Corporation (HSC) builds free, practical software that removes friction from everyday tasks. The idea started from a real problem: coordinating meetings across colleagues in Australia, Hong Kong, Singapore, China, India, the UK, and New York — juggling three or four time zones by hand, every time, because the tools available online were confusing or bloated. That frustration became our first tool, and the same principle now drives everything we build: solve a real, specific annoyance, make it free, and make it fast.
          </p>

          <p className="text-lg leading-relaxed mb-8">
            Our flagship product, the Hilmost Toolbox, is a growing collection of over 39 free utilities — calculators, converters, PDF tools, and productivity aids — built to be fast, accurate, and genuinely useful. No sign-ups, no unnecessary steps, just tools that work.
          </p>

          <figure className="my-12 not-prose">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900">
              <Image
                src="/about-usage.jpg"
                alt="Merging documents on Hilmost Toolbox"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400 italic">
              Real-world use: merging certification documents while applying for work.
            </figcaption>
          </figure>

          <p className="text-lg leading-relaxed mb-8">
            Beyond the Toolbox, we&apos;re expanding into mobile apps focused on personal growth and wellbeing, including Daily Stoic (a companion for practicing Stoic philosophy) and MindOS (an AI-assisted wellness tool). We believe technology should make life simpler, not add complexity — whether that&apos;s solving a quick calculation or supporting a daily habit of reflection.
          </p>

          <p className="text-lg leading-relaxed mb-8">
            Hilmost is based in Harare, Zimbabwe, and built by a small, focused team with a background in banking systems, payments infrastructure, and software engineering. Our motto: <strong>You Choose Your Destiny.</strong>
          </p>

          <p className="text-lg leading-relaxed mb-16">
            We&apos;re just getting started. More tools, more apps, and more ways to make everyday computing easier are on the way.
          </p>

          <section className="mb-16 not-prose">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Explore the Toolbox</h2>
            <CategoryGrid limit={6} />
          </section>

          <section className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 not-prose">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Connect With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Hilmost Software Corporation welcomes collaboration and feedback. Reach out to our engineering team.
                </p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:k.munyede@gmail.com" className="flex items-center gap-3 text-slate-900 dark:text-white font-bold hover:text-brand-primary transition-colors group">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                      <Mail size={18} className="text-brand-primary" />
                    </div>
                    support@hilmost.net
                  </a>
                  <Link href="https://github.com/KMunyede/ultimatetoobox" target="_blank" className="flex items-center gap-3 text-slate-900 dark:text-white font-bold hover:text-brand-primary transition-colors group">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                      <GitBranch size={18} className="text-brand-primary" />
                    </div>
                    Engineering Repository
                  </Link>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <MapPin size={10} className="text-brand-primary" />
                  Headquarters
                </h3>
                <address className="not-italic text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <strong className="text-slate-900 dark:text-white block mb-2">Hilmost Software Corporation</strong>
                  84 Broughton Drive, Sunridge<br />
                  Harare, Zimbabwe
                </address>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdLayout>
  );
}
