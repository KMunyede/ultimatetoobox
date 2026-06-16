import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { ScientificCalculatorClient } from "./ScientificCalculatorClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Scientific Calculator | Advanced Math Solved Instantly",
  description: "Free online scientific calculator. Advanced mathematics without the learning curve. Solve complex equations instantly in your browser.",
};

const faqs = [
  {
    question: "Does this calculator support Radians and Degrees?",
    answer: "Yes, you can toggle between Radians (RAD) and Degrees (DEG) with a single click. The current mode is clearly displayed in the upper-left corner of the calculation screen, ensuring you never accidentally compute trigonometric functions in the wrong unit.",
  },
  {
    question: "Can I share a complex formula with someone else?",
    answer: "Absolutely. As you type, your entire equation and the final result are synced to the URL. Simply click the share button, copy the link, and send it to your colleague or classmate. They will see the exact same calculation state.",
  },
  {
    question: "How accurate are the scientific calculations?",
    answer: "We utilize the native JavaScript Math library, which provides double-precision 64-bit floating-point formatting. This is the industry standard for web applications and is more than accurate enough for most engineering, physics, and academic applications.",
  },
];

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Scientific Calculator | Hilmost" description="Advanced mathematics without the learning curve. Solve complex equations instantly in your browser." url="https://hilmost-toolbox.hilmost.net/calculators/scientific" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Scientific <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Advanced mathematics without the learning curve. Solve complex equations instantly in your browser.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-2xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <ScientificCalculatorClient />
        </div>
      </Suspense>

      <ToolArticle title="Mastering the Scientific Calculator">
        <p>
          Whether you are a university student tackling calculus, an engineer verifying structural loads, or a developer running quick logic checks, a reliable scientific calculator is an indispensable tool. We&apos;ve designed ours to provide maximum functionality without the cluttered, intimidating interface of traditional hardware calculators.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Data</strong> - Click or type to enter your mathematical sequence.</li>
          <li><strong>Step 2: Apply Operations</strong> - Select standard or advanced mathematical operators.</li>
          <li><strong>Step 3: Calculate</strong> - Hit equals to instantly evaluate your expression.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/scientific" />
    </div>
  );
}
