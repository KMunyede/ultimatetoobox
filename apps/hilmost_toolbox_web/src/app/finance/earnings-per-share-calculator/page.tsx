import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema, AuthorBio } from "@utilitiessite/ui";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EPSCalculatorClient } from "./EPSCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "EPS Analysis Engine";
const TOOL_DESC = "Professional-grade basic and diluted EPS calculations. Analyze company profitability and share dilution impact instantly.";
const PATH = "/finance/earnings-per-share-calculator";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/finance.png"],
    }
  };
}

const faqs = [
  {
    question: "What is the difference between Basic and Diluted EPS?",
    answer: "Basic EPS only considers shares currently outstanding. Diluted EPS assumes all 'convertible' securities (like stock options or convertible bonds) have been exercised, providing a conservative view of profitability.",
  },
  {
    question: "Why are preferred dividends subtracted from net income?",
    answer: "EPS measures the profit available to *common* shareholders. Since preferred shareholders have a prior claim to dividends, their portion must be removed before calculating the per-share value for common stock.",
  },
  {
    question: "Is a higher EPS always better?",
    answer: "Generally, yes, as it indicates higher profitability per share. However, it should be compared against competitors and historical performance, and analyzed alongside share buybacks which can artificially inflate EPS.",
  },
];

export default function EPSCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "EPS Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/earnings-per-share-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Financial Data', description: 'Enter your net income, dividends, and share counts here.' } },
    { element: '.text-brand-primary', popover: { title: '2. EPS Results', description: 'See your Basic and Diluted EPS results instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="EPS Analysis Engine"
        subtitle="Professional-grade profitability metrics. Calculate impact of preferred dividends and share dilution in real-time."
        lastUpdated={lastUpdated}
        tourId="eps_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <EPSCalculatorClient />

      <ToolArticle title="Understanding Earnings Per Share (EPS)">
        <p>
          Earnings Per Share (EPS) is the single most important metric for valuing a company. It tells you exactly how much profit is being generated for every share of stock you own.
        </p>

        <h3>Basic vs. Diluted: Why It Matters</h3>
        <p>
          Many companies issue stock options to employees or have convertible debt. If these are exercised, the number of shares increases, which &quot;dilutes&quot; your ownership. This is why looking at <strong>Diluted EPS</strong> is critical for long-term investors—it represents the true earning power in a &quot;worst-case&quot; share count scenario.
        </p>

        <h3>The Formula</h3>
        <div className="bg-canvas-muted p-6 rounded-2xl border border-base my-6 font-mono text-sm overflow-x-auto">
          <p className="mb-2">Basic EPS = (Net Income - Preferred Dividends) / Weighted Avg Shares</p>
          <p>Diluted EPS = (Net Income - Preferred Dividends) / (Weighted Avg Shares + Dilutive Potential Shares)</p>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl not-prose">
          <h4 className="text-lg font-normal text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-tight">Investment Insight</h4>
          <p className="text-blue-800 dark:text-blue-300 mb-4 font-medium">Ready to learn what EPS really tells you about a company&apos;s value?</p>
          <Link href="/guides/understanding-earnings-per-share-eps" className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-widest text-brand-primary hover:underline">
            Read our full EPS Guide <ArrowRight size={14} />
          </Link>
        </div>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="finance" />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}
