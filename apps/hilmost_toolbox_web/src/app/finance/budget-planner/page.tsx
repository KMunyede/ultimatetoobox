import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { BudgetClient } from "./BudgetClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Metadata } from "next";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Budget Planner";
const TOOL_DESC = "Free online budget planner using the 50/30/20 rule. Track your income, needs, wants, and savings. Private and secure.";
const PATH = "/finance/budget-planner";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — 50/30/20 Rule Calculator | Hilmost Toolbox`,
    description: "Track your income, needs, wants, and savings with our free online budget planner. Uses the 50/30/20 rule to help you manage your finances.",
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
      answer: "A simple framework: 50% for Needs (housing, groceries), 30% for Wants (entertainment, dining), and 20% for Savings and Debt repayment.",
    },
    {
      question: "What is Zero-Based Budgeting?",
      answer: "A method where income minus expenses equals zero. Every dollar is assigned a job (spending, saving, or investing) before the month begins.",
    },
    {
      question: "Is my financial data safe?",
      answer: "Yes. This planner runs entirely in your browser. Data is never uploaded to our servers and is cleared when you close the tab.",
    },
  ];

  const tourSteps = [
    { element: '.bg-emerald-50', popover: { title: '1. Income', description: 'Enter your total after-tax monthly income.' } },
    { element: '.grid-cols-1', popover: { title: '2. Allocation', description: 'Assign your income to Needs, Wants, and Savings categories.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
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
        title="Personal Budget Engine"
        subtitle="Master your cash flow. Track your income, needs, wants, and savings using the proven 50/30/20 rule."
        lastUpdated={lastUpdated}
        tourId="budget_planner"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="hidden print:block text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Personal Budget Planner</h1>
        <p className="text-slate-500">Generated via hilmost-toolbox.hilmost.net</p>
      </div>
      
      <BudgetClient />

      <div className="print:hidden">
        <ToolArticle title="Mastering Your Money with the 50/30/20 Rule">
        <p>
          Budgeting doesn&apos;t have to mean complicated spreadsheets. The 50/30/20 rule offers a simple, flexible framework to manage your finances while still enjoying life.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Add Income</strong> - Enter your total after-tax monthly income sources.</li>
          <li><strong>Step 2: Track Expenses</strong> - Log your needs, wants, and savings contributions.</li>
          <li><strong>Step 3: Review Breakdown</strong> - Monitor the visual progress bar to see if your spending aligns with targets.</li>
        </ol>
      </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="finance" currentPath={PATH} />
      </div>
    </div>
  );
}
