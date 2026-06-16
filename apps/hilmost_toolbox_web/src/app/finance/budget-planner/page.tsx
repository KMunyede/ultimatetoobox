import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { BudgetClient } from "./BudgetClient";

export const metadata = {
  title: "Budget Planner | 50/30/20 Rule Calculator",
  description: "Free online budget planner using the 50/30/20 rule. Track your income, needs, wants, and savings. Download as CSV or print to PDF. Private and secure.",
};

export default function BudgetPlannerPage() {
  const title = metadata.title;
  const description = metadata.description;
  const canonicalUrl = "https://hilmost-toolbox.hilmost.net/finance/budget-planner";

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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6 print:hidden">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0]} <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>
      </div>

      <div className="hidden print:block text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Personal Budget Planner</h1>
        <p className="text-slate-500">Generated via hilmost-toolbox.hilmost.net</p>
      </div>
      
      <BudgetClient />

      <div className="print:hidden">
        <ToolArticle title="Mastering Your Money with the 50/30/20 Rule">
        <p>
          Budgeting doesn't have to mean complicated spreadsheets or restrictive spending. The 50/30/20 rule offers a simple, flexible framework to manage your finances while still enjoying your money.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Add Income</strong> - Enter your total after-tax monthly income sources.</li>
          <li><strong>Step 2: Track Expenses</strong> - Log your needs, wants, and savings contributions.</li>
          <li><strong>Step 3: Review Breakdown</strong> - Monitor the visual 50/30/20 progress bar to see if your spending aligns with recommended targets.</li>
        </ol>
      </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="finance" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
      </div>
    </div>
  );
}
