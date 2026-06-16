import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { RetirementPlannerClient } from "./RetirementPlannerClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Retirement Planner | Track Your Financial Future",
  description: "Free online retirement planner with visual charts. Calculate exactly how much you need to save to retire comfortably.",
};

const faqs = [
  {
    question: "What is a good expected return rate?",
    answer: "Historically, the S&P 500 (the top 500 companies in the US) has returned an average of about 10% per year before inflation. Accounting for average inflation, a &apos;safe&apos; conservative expected return to plug into calculators is typically 7%.",
  },
  {
    question: "What is the 4% rule?",
    answer: "The 4% rule is a rule of thumb used to determine how much you can withdraw from your retirement savings each year without running out of money. If you need $40,000 a year to live comfortably, you would need $1,000,000 saved up ($1,000,000 * 4% = $40,000).",
  },
  {
    question: "Is it ever too late to start saving for retirement?",
    answer: "No. While starting earlier leverages the power of compound interest to a massive degree, starting late is always better than never starting. Many governments offer &apos;catch-up contributions&apos; allowing older workers to invest more pre-tax money into retirement accounts.",
  },
];

export default function RetirementPlannerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <WebApplicationSchema name="Retirement Planner | Hilmost" description="Free online retirement planner with visual charts. Calculate exactly how much you need to save to retire comfortably." url="https://hilmost-toolbox.hilmost.net/finance/retirement-planner" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Retirement <span className="text-indigo-500">Planner</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Take absolute control of your timeline. Visualize your exact retirement trajectory and guarantee your savings are on track to freedom.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <RetirementPlannerClient />
      </Suspense>

      <ToolArticle title="The Blueprint for a Comfortable Retirement">
        <p>
          Planning for retirement is one of the most critical financial tasks you will ever undertake. Unlike a short-term savings goal, retirement planning requires estimating decades into the future, accounting for market fluctuations, and understanding your lifestyle needs.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/retirement-planner" />
    </div>
  );
}
