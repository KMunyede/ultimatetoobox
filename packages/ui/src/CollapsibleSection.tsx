"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-12 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900/50 transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
        aria-expanded={isOpen}
      >
        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'text-slate-400 bg-slate-50 dark:bg-slate-800/50'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-10 border-t border-slate-50 dark:border-slate-800/50 pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
