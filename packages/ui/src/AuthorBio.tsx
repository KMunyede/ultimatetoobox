import React from "react";
import { ShieldCheck, Award, FileText, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

interface AuthorBioProps {
  className?: string;
  category?: "finance" | "health" | "math" | "generic";
}

/**
 * Platform Trust & Privacy Section.
 * Highlights the "browser-first" architecture and zero-data-collection policy.
 */
export function AuthorBio({
  className = "",
  category = "generic"
}: AuthorBioProps) {
  return (
    <div className={`mt-6 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-sm ${className}`}>
      {/* Brand Icon Circle */}
      <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white dark:border-slate-800">
        <Zap size={32} fill="currentColor" />
      </div>

      <div className="flex-1 text-center md:text-left space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
            Platform Trust & Privacy
          </h3>
          <div className="inline-flex items-center self-center md:self-start gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">
            <ShieldCheck size={12} />
            Secure Execution
          </div>
          {category === "math" && (
            <div className="inline-flex items-center self-center md:self-start gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800/50">
              <CheckCircle2 size={12} />
              Mathematical Rigor
            </div>
          )}
        </div>

        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
          Built to be fast, free, and secure — every Hilmost tool runs entirely in your browser. No sign-up, no data collection, no unnecessary steps. Just quick, reliable tools that get the job done.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
             <Award size={14} className="text-brand-primary" />
             Verified for 2026
           </div>
           <Link
             href="/editorial-policy"
             className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline transition-all"
           >
             <FileText size={14} />
             Platform Privacy Policy
           </Link>
        </div>
      </div>
    </div>
  );
}
