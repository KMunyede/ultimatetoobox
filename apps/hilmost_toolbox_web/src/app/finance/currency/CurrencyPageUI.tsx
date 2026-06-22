import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { CurrencyClient } from "./CurrencyClient";
import { ShareButton } from "@/components/ShareButton";

export function CurrencyPageUI({
  defaultFrom = "USD",
  defaultTo = "EUR",
  title = "Live Currency Converter",
  description = "Free, real-time currency converter. Stop overpaying banks and instantly convert global currencies using live FX market rates.",
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
      answer: "Rates are typically refreshed every few hours or daily depending on the market provider. We use a high-availability dual-API system for redundancy.",
    },
    {
      question: "Are these rates the same as what my bank offers?",
      answer: "No. These are 'mid-market' exchange rates. Consumer banks typically add a markup (spread) of 2% to 5% when you convert cash or use a credit card abroad.",
    },
    {
      question: "Can I convert currencies in reverse?",
      answer: "Yes! Our converter is fully bidirectional. Typing into either input field will update the other instantly.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Enter Amount', description: 'Type the value in your base currency.' } },
    { element: 'select', popover: { title: '2. Pick Currencies', description: 'Choose from over 150 global currencies to compare values.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={title}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' | ')[0]}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="currency_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <CurrencyClient defaultFrom={defaultFrom} defaultTo={defaultTo} />

      <ToolArticle title="Understanding Global Exchange Rates">
        <p>
          Whether you are traveling internationally, purchasing goods from overseas, or investing in the foreign exchange (Forex) market, understanding how currency conversion works is crucial.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Pick Currencies</strong> - Select the base currency and the target currency from over 150 global options.</li>
          <li><strong>Step 2: Enter Amount</strong> - Type the value in either field; the other updates automatically using live FX rates.</li>
          <li><strong>Step 3: Check Source</strong> - Monitor the status bar to see if you are using live market data or cached fallbacks.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
