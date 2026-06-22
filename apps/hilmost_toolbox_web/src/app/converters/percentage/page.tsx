import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { PercentageClient } from "./PercentageClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Percentage Calculator";
const TOOL_DESC = "Free online percentage calculator. Instantly calculate percentages, find percentage increase/decrease, and solve ratio problems.";
const PATH = "/converters/percentage";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Find % Increase & Decrease | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "How do you calculate the percentage of a number?",
    answer: "To calculate X% of Y, you divide the percentage (X) by 100, and then multiply that number by the total value (Y). For example, to find 20% of 150: (20 / 100) * 150 = 30.",
  },
  {
    question: "How do you calculate percentage increase or decrease?",
    answer: "To find the percentage change between two numbers, subtract the Old Number from the New Number. Then divide that result by the Old Number. Multiply the final result by 100. If the answer is positive, it's a percentage increase. If it's negative, it's a decrease.",
  },
  {
    question: "Why do percentages matter in finance?",
    answer: "Percentages are the foundation of all finance. Interest rates on your bank account, the APR on your credit card, and the ROI (Return on Investment) of your stock portfolio are all expressed as percentages.",
  },
];

export default function PercentagePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Percentage", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/percentage/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.grid-cols-1', popover: { title: '1. Select Mode', description: 'Choose between standard percentage, increase/decrease, or tipping.' } },
    { element: 'input', popover: { title: '2. Instant Math', description: 'Values update in real-time as you type.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Solve any percentage problem instantly. Find discounts, markups, and calculate growth."
        lastUpdated={lastUpdated}
        tourId="percentage_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <PercentageClient />

      <ToolArticle title="The Mathematics of Everyday Life">
        <p>
          Percentages are simply fractions out of 100. While the concept is simple, manually applying percentage formulas to real-world scenarios—like retail discounts or stock market losses—can be frustrating.
        </p>
        
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Choose Scenario</strong> - Select the type of percentage problem (e.g., finding a discount or % change).</li>
          <li><strong>Step 2: Enter Numeric Data</strong> - Input your values into the labeled fields for instant calculation.</li>
          <li><strong>Step 3: Understand Logic</strong> - Read the clear explanation of how the result was derived mathematically.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}
