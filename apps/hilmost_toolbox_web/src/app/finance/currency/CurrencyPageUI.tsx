import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { Suspense } from "react";
import { CurrencyClient } from "./CurrencyClient";
import { Calendar } from "lucide-react";

export function CurrencyPageUI({
  defaultFrom = "USD",
  defaultTo = "EUR",
  title = "Live Currency Converter | Stop Overpaying Banks",
  description = "Free, real-time currency converter. Stop overpaying banks and instantly convert between global currencies using live foreign exchange market rates.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/finance/currency",
  lastUpdated
}: {
  defaultFrom?: string;
  defaultTo?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Currency Converter", href: "/finance/currency" },
  ];

  const faqs = [
    {
      question: "How often are the exchange rates updated?",
      answer: "Our currency converter uses a high-availability dual-API system. We fetch real-time data from ExchangeRate-API and use the European Central Bank (ECB) via Frankfurter as a redundant backup. Rates are typically refreshed every few hours or daily depending on the market provider.",
    },
    {
      question: "Are these rates the same as what my bank offers?",
      answer: "No. The rates shown here are the 'mid-market' exchange rates, which are the true, wholesale rates used between banks. Consumer banks and exchange kiosks typically add a markup (spread) of 2% to 5% when you convert cash or use your credit card abroad.",
    },
    {
      question: "Can I convert currencies in reverse?",
      answer: "Yes! Our converter is fully bidirectional. If you type a value into the top input, the bottom input calculates automatically. If you type into the bottom input, the top input reverses the calculation instantly.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
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
      
      <Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <CurrencyClient defaultFrom={defaultFrom} defaultTo={defaultTo} />
      </Suspense>

      <ToolArticle title="Understanding Global Exchange Rates">
        <p>
          Whether you are traveling internationally, purchasing goods from overseas, or investing in the foreign exchange (Forex) market, understanding how currency conversion works is crucial to ensuring you don't overpay.
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
