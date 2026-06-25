import { Metadata } from "next";
import { User, ShieldCheck, Code, Zap } from "lucide-react";
import { CategoryGrid } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "About the Lab | Hilmost Digital Labs",
  description: "Learn about Hilmost Digital Labs, our commitment to high-precision software engineering, and our mission to build secure online utilities.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase">
          Engineering the <span className="text-blue-600">Everyday</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Hilmost Digital Labs is a specialized software research unit dedicated to building high-precision online utilities.
          We bridge the gap between complex enterprise logic and simple, secure browser-based tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-blue-600" /> Our Privacy DNA
          </h2>
          <p>
            Most online tools send your data to a remote server for processing. We think differently.
            The vast majority of our tools, from the <strong>Scientific Calculator</strong> to the <strong>PDF Merger</strong>,
            perform 100% of their calculations <strong>locally in your browser</strong>.
          </p>
          <p>
            Your sensitive financial data, health metrics, and private documents never touch our servers.
            This "Client-Side First" philosophy is our commitment to data privacy in the modern era.
          </p>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Code className="text-blue-600" /> Banking-Grade Precision
          </h2>
          <p>
            Founded by a software architect with over 15 years of experience in <strong>High-Availability Banking Systems</strong>,
            Hilmost Digital Labs applies the same rigorous testing and mathematical accuracy to simple converters
            as we do to complex financial modeling tools.
          </p>
          <p>
            We don't just build links; we build software. Every tool is optimized for performance,
            accessibility (WCAG 2.1), and complete device adaptability.
          </p>
        </div>
      </div>

      {/* Founder Section - High E-E-A-T Signal */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl flex-shrink-0">
             <User size={64} className="text-slate-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">The Lab Founder</h3>
            <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Keepy Munyede</h4>
            <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              <p>
                With 15+ years of experience across the IT landscape—specializing in large-scale financial platforms—Keepy founded
                Hilmost Software Corporation to democratize access to precise, enterprise-quality digital tools.
              </p>
              <h5 className="text-slate-900 dark:text-white font-bold uppercase text-sm tracking-widest mt-6">Founder's Vision</h5>
              <p className="italic border-l-4 border-blue-500 pl-4 my-4">
                "I believe that precision tools shouldn't just be for big banks or laboratories. My goal is to build a digital sanctuary where anyone can access banking-grade accuracy and 100% privacy for their everyday digital tasks. We are building the global standard for browser-side utility engineering."
              </p>
              <p>
                His vision is to transform the "Hilmost" monorepo into a global standard for utility engineering, ensuring that data privacy is never compromised for convenience.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
               <span className="px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm">FinTech Architect</span>
               <span className="px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm">15+ Years Experience</span>
               <span className="px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm">Full-Stack Engineer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Research Frontiers */}
      <div className="mt-20">
        <h2 className="text-center text-3xl font-black text-slate-900 dark:text-white mb-12 uppercase tracking-tight">Active Research Frontiers</h2>
        <CategoryGrid limit={6} />
      </div>
    </div>
  );
}
