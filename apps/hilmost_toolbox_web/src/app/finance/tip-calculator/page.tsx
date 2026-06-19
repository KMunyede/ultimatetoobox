import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { Metadata } from "next";
import { TipCalculatorClient } from "./TipCalculatorClient";
import { Suspense } from "react";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tip & Split Calculator — Easy Bill Splitting | Hilmost Toolbox",
    description: "Calculate the perfect tip amount and split the restaurant bill evenly among friends instantly. Free online tip calculator for stress-free dining.",
    alternates: {
      canonical: getCanonicalUrl("/finance/tip-calculator"),
    },
  };
}

const faqs = [
  {
    question: "What is the standard tipping percentage?",
    answer: "In the United States, 15% is typically the minimum standard for average service. 18% is considered standard for good service, and 20% or higher is customary for exceptional service.",
  },
  {
    question: "Should I tip before or after tax?",
    answer: "Etiquette experts generally agree that you should tip based on the pre-tax subtotal of the bill, not the grand total. However, many people simply tip on the grand total for convenience.",
  },
  {
    question: "Do I need to tip if a gratuity fee is already included?",
    answer: "No. Large parties (usually 6 or more) often have an automatic gratuity of 18% to 20% added to the bill. You are not obligated to leave an additional tip on top of this fee, though you may if the service was outstanding.",
  },
];

export default function TipCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Tip Calculator", href: "/finance/tip-calculator" },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/tip-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name="Tip Calculator | Hilmost" description="Free online tip calculator. Calculate gratuity and split the bill among friends." url="https://hilmost-toolbox.hilmost.net/finance/tip-calculator" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Tip & Split <span className="text-emerald-600 dark:text-emerald-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Drop the heavy math. Instantly calculate the perfect gratuity and split the check evenly without the dinner table drama.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-xl mx-auto w-full"></div>}>
        <div className="max-w-xl mx-auto">
          <TipCalculatorClient />
        </div>
      </Suspense>

      <ToolArticle title="The Etiquette of Tipping">
        <p>
          Calculating the tip at the end of a meal shouldn&apos;t ruin a great night out. Whether you are dining solo or splitting the check with a massive group of friends, this tool removes the friction of mental math.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/tip-calculator" />
    </div>
  );
}
