import React from "react";
import { ShieldCheck, Award, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface AuthorBioProps {
  name?: string;
  role?: string;
  experience?: string;
  className?: string;
  category?: "finance" | "health" | "math" | "generic";
}

/**
 * Author & Expertise component for E-E-A-T compliance.
 * Attributes the content to Hilmost founder Keepy to build user and crawler trust.
 */
export function AuthorBio({
  name = "Keepy Munyede",
  role = "Founder & Principal Engineer",
  experience = "15+ years in Banking Systems & Software Architecture",
  className = "",
  category = "generic"
}: AuthorBioProps) {
  return (
    <div className={`mt-16 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-sm ${className}`}>
      {/* Avatar / Initials Circle */}
      <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center text-white text-3xl font-black shrink-0 shadow-lg border-4 border-white dark:border-slate-800">
        KM
      </div>

      <div className="flex-1 text-center md:text-left space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
            {name}
          </h3>
          <div className="inline-flex items-center self-center md:self-start gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">
            <ShieldCheck size={12} />
            Verified Expert
          </div>
          {category === "math" && (
            <div className="inline-flex items-center self-center md:self-start gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800/50">
              <CheckCircle2 size={12} />
              Scientific Accuracy
            </div>
          )}
        </div>

        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {role}
        </p>

        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          With {experience}, Keepy leads the Hilmost Software Corporation with a mission to build a &quot;digital sanctuary&quot; of high-performance tools. This tool has been mathematically verified and architected for extreme precision and professional reliability.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
             <Award size={14} className="text-brand-primary" />
             Fact-Checked for 2026
           </div>
           <Link
             href="/editorial-policy"
             className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline transition-all"
           >
             <FileText size={14} />
             View Editorial Policy
           </Link>
        </div>
      </div>
    </div>
  );
}
