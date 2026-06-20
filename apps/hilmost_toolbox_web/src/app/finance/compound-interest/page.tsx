import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { CompoundInterestClient } from "./CompoundInterestClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Compound Interest Calculator";
const TOOL_DESC = "Discover the power of compounding. Free online calculator to project investment growth, monthly contributions, and long-term wealth accumulation.";
const PATH = "/finance/compound-interest";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Visualize Your Investment Growth | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is only calculated on your initial principal deposit. Compound interest is calculated on your principal AND the accumulated interest of previous periods, creating a snowball effect where your wealth grows exponentially.",
  },
  {
    question: "How often is the interest compounded in this calculator?",
    answer: "This calculator assumes your interest is compounded monthly. This is standard for most high-yield savings accounts and stock market projection averages.",
  },
  {
    question: "Why are monthly contributions so important?",
    answer: "While starting with a large initial deposit is great, consistently adding money every month ensures your baseline principal continues to grow. When compound interest acts on this continually growing principal, the final returns are drastically higher than leaving a lump sum alone.",
  },
];

export default function CompoundInterestPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Compound Interest", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/compound-interest/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Compound <span className="text-emerald-600 dark:text-emerald-500">Interest Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Unlock the eighth wonder of the world. Visualize how your investments grow exponentially over time and plan your early retirement.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <CompoundInterestClient />

      <ToolArticle title="The Magic of Compound Interest">
        <p>
          Albert Einstein supposedly called compound interest &quot;the eighth wonder of the world,&quot; stating: &quot;He who understands it, earns it; he who doesn&apos;t, pays it.&quot; Whether you&apos;re saving for retirement, a down payment, or just building wealth, understanding compound interest is the ultimate key to financial freedom.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/compound-interest" />
    </div>
  );
}
