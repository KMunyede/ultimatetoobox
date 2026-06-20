import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { SalaryConverterClient } from "./SalaryConverterClient";
import { Calendar } from "lucide-react";

type Period = "hourly" | "daily" | "weekly" | "monthly" | "annually";

export function SalaryConverterPageUI({
  defaultPeriod = "annually",
  title = "Salary Converter",
  description = "Free online salary converter. Compare your wages and instantly translate hourly rates into daily, weekly, monthly, and annual salaries.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/finance/salary-converter",
  lastUpdated
}: {
  defaultPeriod?: Period;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Salary Converter", href: "/finance/salary-converter" },
  ];

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
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={title.split(" | ")[0]}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 || word.toLowerCase() === 'converter' ? <span key={i} className="text-blue-600 dark:text-blue-500">{word} </span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <div className="max-w-xl mx-auto">
        <SalaryConverterClient defaultPeriod={defaultPeriod} />
      </div>

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
