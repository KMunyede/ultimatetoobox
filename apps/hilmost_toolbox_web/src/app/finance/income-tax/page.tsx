import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { IncomeTaxClient } from "./IncomeTaxClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Income Tax Calculator";
const TOOL_DESC = "Calculate your exact net take-home pay after deductions and estimated taxes instantly. Free online income tax calculator with high precision.";
const PATH = "/finance/income-tax";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Stop Guessing Your Tax Burden | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is gross vs. net income?",
    answer: "Gross income is the total amount of money you earn before any taxes or deductions are taken out. Net income (take-home pay) is the amount of money you actually receive in your paycheck after all taxes and deductions have been withheld.",
  },
  {
    question: "What is an effective tax rate?",
    answer: "An effective tax rate is the average rate at which your earned income is taxed. Because most countries use progressive tax brackets, you don&apos;t pay your highest (marginal) tax rate on all your income. The effective rate is your total tax paid divided by your total taxable income.",
  },
  {
    question: "What are tax deductions?",
    answer: "Tax deductions lower your taxable income. Common examples include the standard deduction, contributions to traditional retirement accounts (like a 401k), and health insurance premiums. By lowering your taxable income, you lower the amount of tax you owe.",
  },
];

export default function IncomeTaxPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Income Tax", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/income-tax/page.tsx");
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
          Income <span className="text-blue-600 dark:text-blue-500">Tax Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Stop guessing your tax burden. Calculate your exact take-home pay, apply deductions, and see your net monthly income instantly.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <IncomeTaxClient />

      <ToolArticle title="Mastering Your Paycheck: How Taxes Work">
        <p>
          Understanding your paycheck is the first step to financial literacy. When you negotiate a salary with an employer, you agree on a Gross Income. However, the amount that actually hits your bank account every month—your Net Income—is significantly lower. This calculator helps bridge that gap so you can budget accurately.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/income-tax" />
    </div>
  );
}
