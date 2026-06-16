import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { CompoundInterestClient } from "./CompoundInterestClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Unlock The 8th Wonder",
  description: "Free, beautifully visual compound interest calculator. Unlock the 8th wonder of the world and discover how your money grows exponentially over time.",
};

const faqs = [
  {
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is only calculated on your initial principal deposit. Compound interest is calculated on your principal AND the accumulated interest of previous periods, creating a snowball effect where your wealth grows exponentially.",
  },
  {
    question: "How often is the interest compounded in this calculator?",
    answer: "This calculator assumes your interest is compounded monthly. This is standard for most high-yield savings accounts and stock market projection averages.",
  },
  {
    question: "Why are monthly contributions so important?",
    answer: "While starting with a large initial deposit is great, consistently adding money every month ensures your baseline principal continues to grow. When compound interest acts on this continually growing principal, the final returns are drastically higher than leaving a lump sum alone.",
  },
];

export default function CompoundInterestPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <WebApplicationSchema name="Compound Interest Calculator" description="Unlock the 8th wonder of the world. Free online compound interest calculator to see how your money grows exponentially." url="https://hilmost-toolbox.hilmost.net/finance/compound-interest" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Compound <span className="text-emerald-500">Interest Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Unlock the eighth wonder of the world. Visualize how your investments grow exponentially over time and plan your early retirement.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <CompoundInterestClient />
      </Suspense>

      <ToolArticle title="The Magic of Compound Interest">
        <p>
          Albert Einstein supposedly called compound interest &quot;the eighth wonder of the world,&quot; stating: &quot;He who understands it, earns it; he who doesn&apos;t, pays it.&quot; Whether you&apos;re saving for retirement, a down payment, or just building wealth, understanding compound interest is the ultimate key to financial freedom.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/compound-interest" />
    </div>
  );
}
