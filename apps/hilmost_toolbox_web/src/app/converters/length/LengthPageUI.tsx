import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { Suspense } from "react";
import { LengthConverterClient } from "./LengthConverterClient";
import { Calendar } from "lucide-react";

export function LengthPageUI({
  defaultUnit1 = "meters",
  defaultUnit2 = "feet",
  title = "Length & Distance Converter",
  description = "Bridge the gap between Metric and Imperial systems. Convert any distance measurement instantly.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/length",
  lastUpdated
}: {
  defaultUnit1?: string;
  defaultUnit2?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Length", href: "/converters/length" },
  ];

  const faqs = [
    {
      question: "What is the difference between Metric and Imperial systems?",
      answer: "The Metric system (meters, kilometers) is a base-10 system used by 95% of the world, making calculations simple. The Imperial system (feet, inches, miles) is used primarily in the United States, Liberia, and Myanmar.",
    },
    {
      question: "How many feet are in a meter?",
      answer: "There are approximately 3.28084 feet in a single meter. Alternatively, one foot is exactly 0.3048 meters.",
    },
    {
      question: "How do I convert kilometers to miles?",
      answer: "To manually convert kilometers to miles, multiply the kilometers by 0.621371. To convert miles to kilometers, multiply the miles by 1.60934.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={title + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} className="text-blue-600 dark:text-blue-500">{word}</span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          {description}
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <LengthConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
        </div>
      </Suspense>

      <ToolArticle title="Mastering Measurement Conversions">
        <p>
          Whether you are an architect reading foreign blueprints, a runner tracking your 5K race pace, or just trying to buy furniture that actually fits in your room, converting length measurements is an unavoidable daily task.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
