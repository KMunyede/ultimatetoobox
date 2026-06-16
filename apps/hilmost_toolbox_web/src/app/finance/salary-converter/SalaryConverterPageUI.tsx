import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { SalaryConverterClient } from "./SalaryConverterClient";

type Period = "hourly" | "daily" | "weekly" | "monthly" | "annually";

export function SalaryConverterPageUI({
  defaultPeriod = "annually",
  title = "Salary Converter | Convert Hourly to Annual Pay",
  description = "Free online salary converter. Compare your wages and instantly translate hourly rates into daily, weekly, monthly, and annual salaries.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/finance/salary-converter"
}: {
  defaultPeriod?: Period;
  title?: string;
  description?: string;
  canonicalUrl?: string;
}) {
  const faqs = [
    {
      question: "How many working hours are in a year?",
      answer: "A standard full-time work year is typically calculated as 2,080 hours. This is based on working 40 hours per week for 52 weeks in a year (40 x 52 = 2,080).",
    },
    {
      question: "How do I calculate my hourly rate from my salary?",
      answer: "To find your hourly rate, divide your annual salary by the total number of hours you work in a year. If you work a standard 40-hour week, divide your salary by 2,080. For example, a $50,000 salary divided by 2,080 equals roughly $24.04 per hour.",
    },
    {
      question: "Are taxes included in these calculations?",
      answer: "No, this calculator only computes your gross pay (the amount before taxes and deductions). Your actual take-home pay will be lower depending on your local tax laws, healthcare deductions, and retirement contributions.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 || word.toLowerCase() === 'converter' ? <span key={i} className="text-blue-500">{word} </span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-xl mx-auto w-full"></div>}>
        <div className="max-w-xl mx-auto">
          <SalaryConverterClient defaultPeriod={defaultPeriod} />
        </div>
      </Suspense>

      <ToolArticle title="Understanding Wage Conversions">
        <p>
          Whether you are negotiating a new job offer, comparing freelance contracts to full-time roles, or just trying to budget your expenses, understanding how your pay translates across different timeframes is essential.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
