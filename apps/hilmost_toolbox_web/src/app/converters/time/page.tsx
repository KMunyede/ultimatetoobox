import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { TimeConverterClient } from "./TimeConverterClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Time Converter | Convert Hours, Days, Weeks Instantly",
  description: "Free online time converter. Instantly convert between seconds, minutes, hours, days, weeks, months, and years.",
};

const faqs = [
  {
    question: "How long is a year in hours?",
    answer: "A standard calendar year (365 days) contains 8,760 hours. A leap year (366 days) contains 8,784 hours.",
  },
  {
    question: "How are months calculated in this tool?",
    answer: "Because months have varying lengths (28 to 31 days), this tool calculates a 'Month' as an exact mathematical average of 30.44 days (730.5 hours).",
  },
  {
    question: "How many seconds are in a day?",
    answer: "There are exactly 86,400 seconds in a standard 24-hour day.",
  },
];

export default function TimeConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Time Converter | Hilmost" description="Free online time converter. Instantly convert between seconds, minutes, hours, days, weeks, months, and years." url="https://hilmost-toolbox.hilmost.net/converters/time" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Time <span className="text-indigo-500">Converter</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Take control of your timeline. Instantly transform hours into days, weeks into minutes, and years into seconds.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <TimeConverterClient />
        </div>
      </Suspense>

      <ToolArticle title="Understanding Time Units">
        <p>
          We rely on time measurements every day, but converting between them manually can be surprisingly tedious due to the non-decimal nature of hours and minutes.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/time" />
    </div>
  );
}
