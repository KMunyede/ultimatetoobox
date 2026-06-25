"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Banknote, FileText, Replace, Binary, Wrench, HeartPulse, Sparkles } from "lucide-react";
import { TOOL_CATEGORIES } from "@utilitiessite/config";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Banknote: <Banknote size={24} />,
  FileText: <FileText size={24} />,
  Replace: <Replace size={24} />,
  Binary: <Binary size={24} />,
  Wrench: <Wrench size={24} />,
  HeartPulse: <HeartPulse size={24} />,
};

interface CategoryGridProps {
  limit?: number;
  variant?: "full" | "minimalist";
}

export function CategoryGrid({ limit = 6, variant = "minimalist" }: CategoryGridProps) {
  const categories = TOOL_CATEGORIES;
  const displayCategories = categories.slice(0, limit);
  const hasMore = categories.length > limit;

  return (
    <div className="w-full">
      <div className={`grid gap-6 ${
        variant === "full"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {displayCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`https://hilmost-toolbox.hilmost.net/${cat.slug}`}
            className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className={`h-12 w-12 flex items-center justify-center rounded-xl bg-${cat.color}-500/10 text-${cat.color}-600 shrink-0 group-hover:scale-110 transition-transform`}>
              {ICON_MAP[cat.icon]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white truncate">{cat.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {cat.count} Utilities
              </p>
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1" />
          </Link>
        ))}

        {hasMore && (
          <Link
            href="https://hilmost-toolbox.hilmost.net"
            className="group flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center"
          >
            <Sparkles size={20} className="text-blue-500 mb-2 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              View All {categories.length} Categories
            </span>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">
              hilmost-toolbox.hilmost.net
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
