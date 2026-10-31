import { Metadata } from "next";
import { DailyQuoteClient } from "./DailyQuoteClient";
import { RelatedTools, Breadcrumbs, WebApplicationSchema, ToolHeader, ToolArticle, AuthorBio, FAQAccordion, FAQSchema } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import {
  META_TITLE,
  META_DESCRIPTION,
  TOOL_HEADER_TITLE,
  TOOL_HEADER_SUBTITLE,
  BREADCRUMB_LABEL,
  ARTICLE_SECTIONS,
  FAQS,
} from "./daily-virtue-content";

const PATH = "/health/daily-wisdom";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: META_TITLE,
    description: META_DESCRIPTION,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: META_TITLE,
      description: META_DESCRIPTION,
      url: CANONICAL_URL,
      siteName: "Hilmost Toolbox",
      type: "article",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/health.png", width: 1200, height: 630, alt: "Hilmost Daily Virtue" }],
    },
    twitter: {
      title: META_TITLE,
      description: META_DESCRIPTION,
      images: ["https://hilmost-toolbox.hilmost.net/og/health.png"],
    }
  };
}

export default function Home() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: BREADCRUMB_LABEL, href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/daily-wisdom/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.quote-container', popover: { title: '1. Daily Quote', description: 'Read a hand-picked timeless insight every day.' } },
    { element: '.bg-emerald-600', popover: { title: '2. Reflection Journal', description: 'Reflect on the quotes and record your thoughts privately.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-4xl">
      <WebApplicationSchema
        name={`${TOOL_HEADER_TITLE} | Hilmost Toolbox`}
        description={META_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <FAQSchema items={FAQS} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_HEADER_TITLE}
        subtitle={TOOL_HEADER_SUBTITLE}
        lastUpdated={lastUpdated}
        tourId="daily_wisdom"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <DailyQuoteClient />

      <ToolArticle>
        <h2>{ARTICLE_SECTIONS.whatItDoes.heading}</h2>
        <p>{ARTICLE_SECTIONS.whatItDoes.paragraph}</p>

        <h2>{ARTICLE_SECTIONS.whyStoicIdeasHelp.heading}</h2>
        <p>{ARTICLE_SECTIONS.whyStoicIdeasHelp.paragraph}</p>

        <h2>{ARTICLE_SECTIONS.howToUse.heading}</h2>
        <ol>
          {ARTICLE_SECTIONS.howToUse.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>

        <h2>{ARTICLE_SECTIONS.aboutJournal.heading}</h2>
        <p>{ARTICLE_SECTIONS.aboutJournal.paragraph}</p>

        <h2>{ARTICLE_SECTIONS.noteOnWellbeing.heading}</h2>
        <p>{ARTICLE_SECTIONS.noteOnWellbeing.paragraph}</p>
      </ToolArticle>

      <FAQAccordion items={FAQS} title="Frequently asked questions" />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <a 
          href="/health/daily-wisdom/library" 
          className="flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-white hover:bg-slate-800 dark:hover:bg-slate-100 font-normal py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg text-center"
        >
          Wisdom Library
        </a>
        <a 
          href="/health/daily-wisdom/journal" 
          className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-normal py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg text-center"
        >
          Open Reflection Journal
        </a>
        <span
          className="flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-black dark:text-white font-normal py-4 px-6 rounded-2xl cursor-not-allowed opacity-75 text-center"
          title="Coming Soon"
        >
          My Favorites (Soon)
        </span>
        <span 
          className="flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-black dark:text-white font-normal py-4 px-6 rounded-2xl cursor-not-allowed opacity-75 text-center"
          title="Coming Soon"
        >
          My Profile (Soon)
        </span>
      </div>

      <AuthorBio category="health" />

      <RelatedTools category="health" currentPath="/health/daily-wisdom" />
    </div>
  );
}