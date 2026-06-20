import { Metadata } from "next";
import { DailyQuoteClient } from "./DailyQuoteClient";
import { RelatedTools, Breadcrumbs, WebApplicationSchema, BreadcrumbSchema } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TITLE = "Daily Wisdom & Wellness";
const DESC = "Reflect on timeless stoic philosophy and nurture your mental wellness with our daily wisdom tool. Find peace and focus in the modern era.";
const PATH = "/health/daily-wisdom";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} — Inspirational Quotes & Philosophy | Hilmost Toolbox`,
    description: DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: TITLE,
      description: DESC,
      url: CANONICAL_URL,
      siteName: "Hilmost Toolbox",
      type: "article",
      images: ["/og/health.png"],
    },
  };
}

export default function Home() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "Daily Wisdom", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/daily-wisdom/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-2">
          Daily Wisdom and Wellness
        </h1>
        <p className="text-sm font-bold text-brand-primary mb-4 uppercase tracking-widest">
          The Change you want to see starts within You
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
          Take a moment to center yourself. Reflect on timeless philosophy and let ancient wisdom guide your modern life.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
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

