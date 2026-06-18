import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { StandardCalculatorClient } from "./StandardCalculatorClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Standard Calculator | Everyday Math Solved Instantly",
  description: "Free online standard calculator. Drop the heavy math and get instant, reliable answers with our beautiful everyday calculator.",
};

const faqs = [
  {
    question: "Can I share my calculation result?",
    answer: "Yes! As you type, the URL updates automatically to reflect your current equation. You can click the share icon at any time to copy the exact state of your calculator and send it to a friend.",
  },
  {
    question: "Is there a history of my calculations?",
    answer: "Currently, this standard calculator is designed for quick, ephemeral calculations. However, because the state is synced to the URL, you can use your browser's back button to undo your recent inputs.",
  },
  {
    question: "Does it support keyboard shortcuts?",
    answer: "Our interface is optimized for both touch devices and point-and-click. Native keyboard support is currently being enhanced for a seamless desktop experience.",
  },
];

export default function StandardCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Standard Calculator | Hilmost" description="Drop the heavy math and get instant, reliable answers with our beautiful everyday calculator." url="https://hilmost-toolbox.hilmost.net/calculators/standard" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Standard <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Drop the heavy math. Get instant, reliable answers with our beautiful everyday calculator.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-sm mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <StandardCalculatorClient />
        </div>
      </Suspense>

      <ToolArticle title="The Perfect Everyday Calculator">
        <p>
          You don&apos;t always need a complex graphing calculator or an advanced scientific tool. Sometimes, you just need a reliable, beautiful, and instantly accessible interface to solve your everyday arithmetic.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Data</strong> - Click or type to enter your mathematical sequence.</li>
          <li><strong>Step 2: Apply Operations</strong> - Select standard or advanced mathematical operators.</li>
          <li><strong>Step 3: Calculate</strong> - Hit equals to instantly evaluate your expression.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/standard" />
    </div>
  );
}
