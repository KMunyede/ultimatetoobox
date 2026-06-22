import { Metadata } from "next";
import { DailyQuoteClient } from "./DailyQuoteClient";
import { RelatedTools, Breadcrumbs, WebApplicationSchema, BreadcrumbSchema, ToolHeader, ToolArticle } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

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

  const tourSteps = [
    { element: '.quote-container', popover: { title: '1. Daily Quote', description: 'Read a hand-picked philosophical insight every day.' } },
    { element: '.bg-emerald-600', popover: { title: '2. Private Journal', description: 'Reflect on the quote and record your thoughts privately.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-4xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Wisdom & Reflection"
        subtitle="The Change you want to see starts within You. Reflect on timeless stoic philosophy."
        lastUpdated={lastUpdated}
        tourId="daily_wisdom"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <DailyQuoteClient />

      <ToolArticle title="Nurturing Your Mental Sanctuary">
        <p>
          In a world of constant digital noise, taking a moment to reflect on timeless philosophy can significantly improve your focus and mental clarity. Our Daily Wisdom engine is designed to provide that essential pause.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Reflect on Wisdom</strong> - Read the daily hand-picked philosophical quote and consider its application to your life.</li>
          <li><strong>Step 2: Start Journaling</strong> - Use the private journal tool to record your thoughts, gratitude, or challenges for the day.</li>
          <li><strong>Step 3: Explore the Library</strong> - Dive deeper into our curated library of stoic and modern wisdom to expand your perspective.</li>
        </ol>
      </ToolArticle>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <a 
          href="/health/daily-wisdom/library" 
          className="flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg text-center"
        >
          Wisdom Library
        </a>
        <a 
          href="/health/daily-wisdom/journal" 
          className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg text-center"
        >
          Open Private Journal
        </a>
        <span
          className="flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 px-6 rounded-2xl cursor-not-allowed opacity-75 text-center"
          title="Coming Soon"
        >
          My Favorites (Soon)
        </span>
        <span 
          className="flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 px-6 rounded-2xl cursor-not-allowed opacity-75 text-center"
          title="Coming Soon"
        >
          My Profile (Soon)
        </span>
      </div>

      <RelatedTools category="health" currentPath="/health/daily-wisdom" />
    </div>
  );
}
