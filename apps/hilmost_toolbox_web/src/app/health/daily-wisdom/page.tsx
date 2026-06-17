import { Metadata } from "next";
import { DailyQuoteClient } from "./DailyQuoteClient";
import { RelatedTools } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Daily Wisdom & Wellness | Inspirational Quotes & Philosophy",
  description: "Reflect on timeless stoic philosophy and nurture your mental wellness with our daily wisdom tool. Find peace and focus in the modern era.",
  openGraph: {
    title: "Daily Wisdom & Wellness",
    description: "Reflect on timeless philosophy and let ancient wisdom guide your modern life.",
    url: "https://hilmost-toolbox.hilmost.net/health/daily-wisdom",
    siteName: "Hilmost Toolbox",
    type: "article",
    images: ["/og/health.png"],
  },
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-2">
          Daily Wisdom and Wellness
        </h1>
        <p className="text-lg md:text-xl font-medium text-brand-primary mb-6">
          The Change you want to see starts within You
        </p>
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

      <RelatedTools category="health" currentPath="/health/daily-wisdom" />
    </div>
  );
}

