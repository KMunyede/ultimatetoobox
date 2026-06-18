import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { UnixTimeClient } from "./UnixTimeClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter | Epoch Time Calculator",
  description: "Free online Unix time converter. Instantly convert Unix epochs to human-readable dates and human dates to Unix timestamps.",
};

const faqs = [
  {
    question: "What is a Unix Epoch?",
    answer: "The Unix epoch (or Unix time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds. It is a system for describing a point in time, widely used in operating systems and file formats.",
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Because many older computer systems store Unix time as a signed 32-bit integer, the maximum value they can store is 2,147,483,647. At exactly 03:14:07 UTC on January 19, 2038, these systems will overflow and 'wrap around' to a negative number, interpreting the year as 1901. Modern systems use 64-bit integers to avoid this.",
  },
  {
    question: "Are leap seconds included in Unix Time?",
    answer: "No. Unix time specifically ignores leap seconds. Every day is treated as if it contains exactly 86,400 seconds. When a leap second occurs, the Unix timestamp essentially repeats a second to stay aligned.",
  },
];

export default function UnixTimePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Unix Timestamp Converter | Hilmost" description="Free online Unix time converter. Instantly convert Unix epochs to human-readable dates and human dates to Unix timestamps." url="https://hilmost-toolbox.hilmost.net/converters/unix-time" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Unix Timestamp <span className="text-blue-500">Converter</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          The ultimate developer tool. Seamlessly convert epochs to human dates and vice versa with zero friction.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <UnixTimeClient />
        </div>
      </Suspense>

      <ToolArticle title="Mastering the Epoch">
        <p>
          If you are a software engineer, database administrator, or data scientist, you will inevitably encounter 10-digit numbers representing time. Dealing with these numbers manually is virtually impossible without an epoch converter.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/unix-time" />
    </div>
  );
}
