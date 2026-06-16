import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { PercentageClient } from "./PercentageClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Percentage Calculator | Find % Increase & Decrease",
  description: "Free online percentage calculator. Instantly calculate percentages, find percentage increase/decrease, and solve ratio problems.",
};

const faqs = [
  {
    question: "How do you calculate the percentage of a number?",
    answer: "To calculate X% of Y, you divide the percentage (X) by 100, and then multiply that number by the total value (Y). For example, to find 20% of 150: (20 / 100) * 150 = 30.",
  },
  {
    question: "How do you calculate percentage increase or decrease?",
    answer: "To find the percentage change between two numbers, subtract the Old Number from the New Number. Then divide that result by the Old Number. Multiply the final result by 100. If the answer is positive, it's a percentage increase. If it's negative, it's a decrease.",
  },
  {
    question: "Why do percentages matter in finance?",
    answer: "Percentages are the foundation of all finance. Interest rates on your bank account, the APR on your credit card, and the ROI (Return on Investment) of your stock portfolio are all expressed as percentages. Understanding how percentages compound is the key to building wealth.",
  },
];

export default function PercentagePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Percentage Calculator | Hilmost" description="Free online percentage calculator. Instantly calculate percentages, find percentage increase/decrease, and solve ratio problems." url="https://hilmost-toolbox.hilmost.net/converters/percentage" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Percentage <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Solve any percentage problem instantly. Find discounts, markups, and calculate percentage growth without the mental gymnastics.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <PercentageClient />
        </div>
      </Suspense>

      <ToolArticle title="The Mathematics of Everyday Life">
        <p>
          Percentages are simply fractions out of 100. The word itself comes from the Latin &quot;per centum,&quot; meaning &quot;by the hundred.&quot; While the concept is simple, manually applying percentage formulas to real-world scenarios—like retail discounts or stock market losses—can be frustrating.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/percentage" />
    </div>
  );
}
