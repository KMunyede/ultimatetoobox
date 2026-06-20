import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { InflationClient } from "./InflationClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Inflation Calculator";
const TOOL_DESC = "Free online inflation calculator. Instantly see how the rising cost of living affects your money and purchasing power over time.";
const PATH = "/finance/inflation";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — See Your True Purchasing Power | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is inflation?",
    answer: "Inflation is the rate at which the general level of prices for goods and services is rising. Consequently, as inflation rises, every dollar you own buys a smaller percentage of a good or service.",
  },
  {
    question: "What is the difference between Future Cost and Purchasing Power?",
    answer: "Future cost tells you how much money you will need in the future to buy something that costs a certain amount today. Purchasing power tells you what your current money will actually be worth in the future compared to today&apos;s standards.",
  },
  {
    question: "Why does inflation happen?",
    answer: "Inflation is generally caused by two factors: &apos;Demand-pull&apos; (when demand for goods outpaces supply) and &apos;Cost-push&apos; (when the cost to produce goods increases, so companies raise prices to maintain profit margins). Central banks also influence inflation by printing more money, which devalues the currency.",
  },
];

export default function InflationPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Inflation", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/inflation/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Inflation <span className="text-amber-600 dark:text-amber-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Uncover the hidden tax. Calculate exactly how inflation erodes your wealth and increases the future cost of living.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <div className="max-w-2xl mx-auto">
        <InflationClient />
      </div>

      <ToolArticle title="The Invisible Tax: Understanding Inflation">
        <p>
          If you bury The Invisible Tax: Understanding Inflation00,000 in your backyard and dig it up 10 years later, you will still have exactly The Invisible Tax: Understanding Inflation00,000 in cash. However, that money will buy significantly less than it could have a decade prior. This phenomenon is known as inflation, and it acts as an invisible tax on...
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/inflation" />
    </div>
  );
}
