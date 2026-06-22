import React from "react";
import { BookOpen } from "lucide-react";

interface SourceReferenceProps {
  sources: { name: string; url: string }[];
  title?: string;
}

/**
 * Authority & Citations component for E-E-A-T compliance.
 * Displays official sources or academic references for tool formulas/data.
 */
export function SourceReference({ sources, title = "Data Sources & References" }: SourceReferenceProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
          <BookOpen size={16} />
        </div>
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.1em]">
          {title}
        </h4>
      </div>
      <ul className="space-y-2.5">
        {sources.map((source, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-4"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[10px] text-slate-400 dark:text-slate-500 italic leading-relaxed">
        Hilmost Ultimate Toolbox prioritizes accuracy by utilizing standard scientific constants and verified financial methodologies. These tools are provided for educational and informational purposes.
      </p>
    </div>
  );
}
