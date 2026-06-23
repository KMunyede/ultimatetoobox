import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { InflationClient } from "./InflationClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Inflation Calculator";
const TOOL_DESC = "Free online inflation calculator. Instantly see how the rising cost of living affects your money and purchasing power.";
const PATH = "/finance/inflation";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Inflation Calculator | Purchasing Power Tracker | Hilmost`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is inflation?",
    answer: "Inflation is the rate at which the general level of prices for goods and services is rising, decreasing the purchasing power of your money.",
  },
  {
    question: "What is the difference between Future Cost and Purchasing Power?",
    answer: "Future cost is what an item today will cost later. Purchasing power is what your money today will be worth in the future.",
  },
  {
    question: "Why does inflation happen?",
    answer: "Mainly due to demand outpacing supply (demand-pull) or rising production costs (cost-push). Central bank policies also play a role.",
  },
];

export default function InflationPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Inflation", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/inflation/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Present Value', description: 'Enter the current cost of an item or your current savings.' } },
    { element: '.text-brand-primary', popover: { title: '2. Impact', description: 'See how much value your money loses over your specified timeframe.' } },
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
        title="Purchasing Power Calculator"
        subtitle="Uncover the hidden tax. Calculate exactly how inflation erodes your wealth over time."
        lastUpdated={lastUpdated}
        tourId="inflation_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-2xl mx-auto">
        <InflationClient />
      </div>

      <ToolArticle title="The Invisible Tax: Understanding Inflation">
        <p>
          If you bury $100 in your backyard and dig it up 10 years later, you will still have exactly $100. However, that money will buy significantly less than it could have a decade prior.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Historical Sum</strong> - Input the amount of money from a specific year in the past.</li>
          <li><strong>Step 2: Define Timeframe</strong> - Set the start and end years to calculate the cumulative inflation impact.</li>
          <li><strong>Step 3: Adjust Rate</strong> - Modify the average annual inflation rate to see different economic scenarios.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}
