import { Metadata } from "next";
import { DailyQuoteClient } from "./DailyQuoteClient";

export const metadata: Metadata = {
  title: "Daily Wisdom & Wellness",
  description: "Find peace, reflect on stoic philosophy, and nurture your mental wellness.",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Daily Wisdom and Wellness <span className="text-emerald-600 dark:text-emerald-500">Change you want to see starts within You</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Take a moment to center yourself. Reflect on timeless philosophy and let ancient wisdom guide your modern life.
        </p>
      </div>
      
      <DailyQuoteClient />
      
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        <a 
          href="/health/daily-wisdom/library" 
          className="inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg"
        >
          Wisdom Library
        </a>
        <a 
          href="/health/daily-wisdom/journal" 
          className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg"
        >
          Open Private Journal
        </a>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-4 opacity-75">
        <span 
          className="inline-flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold py-4 px-8 rounded-2xl cursor-not-allowed"
          title="Coming Soon"
        >
          My Favorites (Coming Soon)
        </span>
        <span 
          className="inline-flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold py-4 px-8 rounded-2xl cursor-not-allowed"
          title="Coming Soon"
        >
          My Profile (Coming Soon)
        </span>
      </div>
      
    </div>
  );
}

