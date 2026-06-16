import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { AgeCalculatorClient } from "./AgeCalculatorClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Age & Date Calculator | Discover Your Exact Age",
  description: "Free online date and age calculator. Instantly calculate the exact time passed between two dates in hours, days, seconds, or a full chronological string.",
};

const faqs = [
  {
    question: "Does this calculator account for leap years?",
    answer: "Yes! The system utilizes the built-in JavaScript Date engine, meaning leap years (the extra day in February every 4 years) are mathematically accounted for and flawlessly integrated into the final calculation.",
  },
  {
    question: "Can I calculate time in the future?",
    answer: "Absolutely. If you set the End Date into the future, the calculator acts as a countdown timer. This is perfect for determining exactly how many days or hours are left until your retirement, vacation, or anniversary.",
  },
  {
    question: "What does the Full Chronological String output mean?",
    answer: "Instead of just converting a duration into one massive number (e.g., 20,000 days), the full string breaks it down exactly like a clock, showing the duration in Centuries, Years, Months, Days, Hours, Minutes, and Seconds.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Age & Date Calculator | Hilmost" description="Calculate the exact time that has passed between two dates in hours, days, seconds, or a full chronological string." url="https://hilmost-toolbox.hilmost.net/converters/age-calculator" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Age & Date <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Uncover the exact time. Calculate the precise duration between any two moments in history with zero effort.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <AgeCalculatorClient />
        </div>
      </Suspense>

      <ToolArticle title="The Complexity of Time Calculation">
        <p>
          Calculating the exact time between two dates sounds simple until you attempt to do it manually. Because the Gregorian Calendar is highly irregular, manual chronological subtraction is notoriously prone to errors.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
          <RelatedTools category="converters" currentPath="/converters/age-calculator" />
    </div>
  );
}
