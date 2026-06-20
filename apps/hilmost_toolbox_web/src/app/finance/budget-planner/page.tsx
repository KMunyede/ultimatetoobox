import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { BudgetClient } from "./BudgetClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Metadata } from "next";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Budget Planner";
const TOOL_DESC = "Free online budget planner using the 50/30/20 rule. Track your income, needs, wants, and savings. Private and secure.";
const PATH = "/finance/budget-planner";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — 50/30/20 Rule Calculator | Hilmost Toolbox`,
    description: "Track your income, needs, wants, and savings with our free online budget planner. Uses the 50/30/20 rule to help you manage your finances securely and privately.",
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

export default function BudgetPlannerPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Budget Planner", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/budget-planner/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const faqs = [
    {
      question: "What is the 50/30/20 Budgeting Rule?",
      answer: "The 50/30/20 rule is a simple budgeting framework that recommends allocating your after-tax income into three categories: 50% for Needs (housing, groceries, utilities), 30% for Wants (dining out, entertainment, hobbies), and 20% for Savings and Debt repayment.",
    },
    {
      question: "What is Zero-Based Budgeting?",
      answer: "Zero-based budgeting is a method where your income minus your expenses equals exactly zero. This doesn't mean you spend all your money; it means every single dollar is assigned a specific 'job' before the month begins, whether that job is buying groceries or going into an investment account.",
    },
    {
      question: "Is my financial data safe?",
      answer: "Yes, 100%. This budget planner runs entirely in your web browser using client-side processing. Your financial numbers are never uploaded to our servers, saved in a database, or shared with third parties. Once you close the tab, the data is gone unless you choose to export it to a CSV or PDF.",
    },
  ];

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

      <div className="text-center max-w-3xl mx-auto mb-8 print:hidden">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Budget Planner <span className="text-blue-600 dark:text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          {TOOL_DESC}
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>

      <div className="hidden print:block text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Personal Budget Planner</h1>
        <p className="text-slate-500">Generated via hilmost-toolbox.hilmost.net</p>
      </div>
      
      <BudgetClient />

      <div className="print:hidden">
        <ToolArticle title="Mastering Your Money with the 50/30/20 Rule">
        <p>
          Budgeting doesn&apos;t have to mean complicated spreadsheets or restrictive spending. The 50/30/20 rule offers a simple, flexible framework to manage your finances while still enjoying your money.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Add Income</strong> - Enter your total after-tax monthly income sources.</li>
          <li><strong>Step 2: Track Expenses</strong> - Log your needs, wants, and savings contributions.</li>
          <li><strong>Step 3: Review Breakdown</strong> - Monitor the visual 50/30/20 progress bar to see if your spending aligns with recommended targets.</li>
        </ol>
      </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="finance" currentPath={PATH} />
      </div>
    </div>
  );
}
