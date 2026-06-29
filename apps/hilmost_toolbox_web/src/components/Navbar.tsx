"use client";

import Link from "next/link";
import { GraduationCap, Activity } from "lucide-react";

/**
 * Navbar Component (Reserved for category-specific navigation)
 */
export function Navbar() {
  return (
    <nav className="flex items-center gap-6 py-4 px-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <Link
        href="/education"
        className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary flex items-center gap-2 transition-colors"
      >
        <GraduationCap size={18} className="text-brand-primary" />
        Education
      </Link>
      <Link
        href="/health"
        className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary flex items-center gap-2 transition-colors"
      >
        <Activity size={18} className="text-rose-500" />
        Health & Wellness
      </Link>
      {/* Add more category links here as needed */}
    </nav>
  );
}
