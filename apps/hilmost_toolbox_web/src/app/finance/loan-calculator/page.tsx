import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { LoanCalculatorClient } from "./LoanCalculatorClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Loan Calculator | Expose Hidden Bank Fees",
  description: "Stop getting ripped off by banks. Accurately calculate your monthly loan payments, total interest, and exact amortization schedule instantly.",
};

const faqs = [
  {
    question: "How is my monthly loan payment calculated?",
    answer: "Monthly payments are calculated using the standard amortization formula. It takes the total loan amount (principal), multiplies it by the monthly interest rate, and divides that by an exponential factor based on the total number of months in the loan term.",
  },
  {
    question: "Does this calculator work for mortgages?",
    answer: "Yes, this calculator works perfectly for fixed-rate mortgages. Simply enter the total amount you are borrowing (after your down payment), your fixed interest rate, and the length of the mortgage (usually 15 or 30 years). Note that it does not include property taxes or home insurance.",
  },
  {
    question: "What is an amortized loan?",
    answer: "An amortized loan is a loan where the principal balance is paid down over the life of the loan according to an amortization schedule. Early in the loan, most of your monthly payment goes toward interest. As the loan matures, more of the payment goes toward paying down the actual principal.",
  },
];

export default function LoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Loan Calculator | Hilmost Toolbox" description="Expose hidden bank fees. Calculate monthly payments, total interest, and total cost of your loan instantly." url="https://hilmost-toolbox.hilmost.net/finance/loan-calculator" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Smart <span className="text-blue-600 dark:text-blue-400">Loan Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Take control of your debt. Instantly calculate your monthly payments, expose hidden interest, and uncover the true cost of your loan.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl w-full"></div>}>
        <LoanCalculatorClient />
      </Suspense>

      <ToolArticle title="Mastering Your Debt: How Loans Work">
        <p>
          Taking out a loan—whether it&apos;s for a new house, a car, or personal expenses—is one of the most significant financial decisions you can make. Understanding exactly how your payments are structured is critical to avoiding predatory interest rates and saving money in the long run.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/loan-calculator" />
    </div>
  );
}
