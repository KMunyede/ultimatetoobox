import React from "react";
import { FileText } from "lucide-react";
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
    <div className={`mt-6 p-5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 ${className}`}>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
        Every tool runs entirely in your browser. No sign-up, no data collection, no unnecessary steps.
      </p>

      <Link
        href="/editorial-policy"
        className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline transition-all shrink-0"
      >
        <FileText size={14} />
        Platform Privacy Policy
      </Link>
    </div>
  );
}
