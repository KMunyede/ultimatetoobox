import React from "react";
import { ShieldCheck, Scale, MousePointer2, Lock } from "lucide-react";

export function EditorialPolicyContent() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-200 dark:border-emerald-800/50">
          <ShieldCheck size={14} />
          Trust & Transparency
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-6">
          Editorial & Accuracy <span className="text-brand-primary text-italic">Policy</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          How Hilmost Software Corporation ensures the mathematical integrity, professional reliability, and absolute privacy of every tool we build.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <Scale className="text-brand-primary mb-6" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Mathematical Precision</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our finance and science tools utilize industry-standard libraries (like Math.js) and 64-bit floating-point precision. Every formula is verified against NIST standards and authoritative financial models.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <ShieldCheck className="text-brand-primary mb-6" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Expert Authorship</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Content is authored and reviewed by Keepy Munyede, a Principal Engineer with 15+ years of experience in high-availability banking systems and enterprise architecture.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <Lock className="text-brand-primary mb-6" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Privacy by Design</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We employ a &quot;Zero-Upload&quot; architecture. Your sensitive data—whether it&apos;s a PDF contract or a monthly budget—is processed 100% locally in your browser. We never see your data.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <MousePointer2 className="text-brand-primary mb-6" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Independence</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The mathematical logic of our tools is never influenced by advertisers. Our primary goal is utility and accuracy, ensuring you get unbiased results every time you click.
          </p>
        </div>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none mb-16">
        <h2 className="text-2xl font-black uppercase tracking-tight">Our Commitment to Your Data</h2>
        <p className="text-lg leading-relaxed">
          At Hilmost, we recognize that our users rely on our tools for critical decision-making in their professional and personal lives. Whether you are calculating the WACC for a corporate project or managing your household budget, accuracy is non-negotiable.
        </p>
        <p className="text-lg leading-relaxed">
          Our &quot;Digital Sanctuary&quot; philosophy means we prioritize the user experience above all else. This includes minimizing intrusive advertising and maximizing site performance to ensure our tools are available exactly when you need them.
        </p>

        <h2 className="text-2xl font-black uppercase tracking-tight mt-12">Fact-Checking & Updates</h2>
        <p className="text-lg leading-relaxed">
          The digital landscape and financial regulations change rapidly. We perform quarterly audits of our calculators to ensure they remain compliant with the latest standards. Every tool page features a &quot;Last Updated&quot; signal derived directly from our development history, providing you with full transparency on the freshness of our logic.
        </p>
      </article>

      <footer className="pt-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Last Reviewed: June 2026
        </p>
      </footer>
    </div>
  );
}
