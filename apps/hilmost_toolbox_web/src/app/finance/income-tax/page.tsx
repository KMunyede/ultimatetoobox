import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { IncomeTaxClient } from "./IncomeTaxClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Income Tax Calculator | Stop Guessing Your Tax Burden",
  description: "Stop guessing. Free online income tax calculator. Calculate your exact net take-home pay after deductions and estimated taxes instantly.",
};

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
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Income Tax Calculator | Hilmost" description="Stop guessing your tax burden. Estimate your net income after deductions and taxes instantly." url="https://hilmost-toolbox.hilmost.net/finance/income-tax" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Income <span className="text-blue-500">Tax Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Stop guessing your tax burden. Calculate your exact take-home pay, apply deductions, and see your net monthly income instantly.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <IncomeTaxClient />
      </Suspense>

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
