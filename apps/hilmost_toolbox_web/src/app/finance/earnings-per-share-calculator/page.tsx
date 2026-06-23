import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { EPSCalculatorClient } from "./EPSCalculatorClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Earnings Per Share (EPS) Calculator";
const TOOL_DESC = "Calculate Basic and Diluted EPS to measure company profitability. Understand how dividends and share dilution impact your investment returns.";
const PATH = "/finance/earnings-per-share-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `EPS Calculator | Basic & Diluted Profit Analysis | Hilmost`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
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
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}
