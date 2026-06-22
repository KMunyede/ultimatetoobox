import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { SalaryConverterClient } from "./SalaryConverterClient";
import { ShareButton } from "@/components/ShareButton";

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
      answer: "A standard full-time work year is typically calculated as 2,080 hours (40 hours/week x 52 weeks).",
    },
    {
      question: "How do I calculate my hourly rate from my salary?",
      answer: "Divide your annual salary by 2,080. For example, $50,000 / 2,080 ≈ $24.04 per hour.",
    },
    {
      question: "Are taxes included in these calculations?",
      answer: "No, this tool computes gross pay. Your net take-home pay will be lower depending on tax laws and deductions.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Enter Wage', description: 'Type in your salary or hourly rate.' } },
    { element: '.grid-cols-2', popover: { title: '2. View Comparison', description: 'See how your pay translates across all timeframes at once.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={title.split(" | ")[0]}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' — ')[0]}
        subtitle="Compare your wages and instantly translate rates across daily, weekly, monthly, and annual intervals."
        lastUpdated={lastUpdated}
        tourId="salary_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-xl mx-auto">
        <SalaryConverterClient defaultPeriod={defaultPeriod} />
      </div>

      <ToolArticle title="Understanding Wage Conversions">
        <p>
          Whether you are negotiating a new job offer or comparing contracts, understanding how your pay translates across different timeframes is essential.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Current Wage</strong> - Type in your salary and select how often you are paid (e.g., Hourly or Monthly).</li>
          <li><strong>Step 2: Define Work Week</strong> - Adjust your average working hours per week for a precise conversion.</li>
          <li><strong>Step 3: Compare Timeframes</strong> - See how your pay translates across daily, weekly, monthly, and annual intervals.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
