import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { PercentageClient } from "./PercentageClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

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
    answer: "Percentages are the foundation of all finance. Interest rates on your bank account, the APR on your credit card, and the ROI (Return on Investment) of your stock portfolio are all expressed as percentages. Understanding how percentages compound is the key to building wealth.",
  },
];

export default function PercentagePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Percentage", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/percentage/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Percentage <span className="text-blue-600 dark:text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Solve any percentage problem instantly. Find discounts, markups, and calculate percentage growth without the mental gymnastics.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <PercentageClient />
      </div>

      <ToolArticle title="The Mathematics of Everyday Life">
        <p>
          Percentages are simply fractions out of 100. The word itself comes from the Latin &quot;per centum,&quot; meaning &quot;by the hundred.&quot; While the concept is simple, manually applying percentage formulas to real-world scenarios—like retail discounts or stock market losses—can be frustrating.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/percentage" />
    </div>
  );
}
