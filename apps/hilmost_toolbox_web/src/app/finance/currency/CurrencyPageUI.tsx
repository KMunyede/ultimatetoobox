import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, SourceReference } from "@utilitiessite/ui";
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
          Whether you are traveling internationally, purchasing goods from overseas, or investing in the foreign exchange (Forex) market, understanding how currency conversion works is crucial. In the digital economy, money moves across borders in milliseconds, but the value of that money changes constantly based on market demand, geopolitical stability, and central bank policies.
        </p>
        
        <h3>The Mid-Market Exchange Rate</h3>
        <p>
          Our converter utilizes &quot;mid-market&quot; rates. This is the midpoint between the buy and sell prices of two currencies on the global markets. It is the &quot;fairest&quot; rate possible. When you visit a retail bank or an airport currency kiosk, they typically provide a different rate that includes a markup or spread, which is how they make their profit. By using our tool, you can see the true value of your money before those fees are applied.
        </p>

        <h3>How to Use This Tool</h3>
        <p>
          We designed our currency engine to be the fastest way to compare global values. Follow these steps for the best results:
        </p>
        <ol>
          <li><strong>Step 1: Pick Currencies</strong> - Select the base currency (what you have) and the target currency (what you want) from our comprehensive list of over 150 global options, including USD, EUR, GBP, JPY, and more.</li>
          <li><strong>Step 2: Enter Amount</strong> - Type the value in either field. Our bidirectional engine ensures that if you change the &quot;To&quot; field, the &quot;From&quot; field updates instantly.</li>
          <li><strong>Step 3: Check Source</strong> - Monitor the status bar above the converter. We prioritize high-availability data from the European Central Bank and global FX market providers.</li>
        </ol>

        <h3>Why Exchange Rates Fluctuate</h3>
        <p>
          Exchange rates are determined by a complex interplay of factors, including:
        </p>
        <ul>
          <li><strong>Interest Rates:</strong> Higher interest rates in a country typically attract more foreign investment, increasing demand for that currency.</li>
          <li><strong>Economic Data:</strong> Reports on GDP, employment, and manufacturing performance can cause immediate shifts in currency value.</li>
          <li><strong>Geopolitics:</strong> Political stability or unrest can lead investors to move their money to &quot;Safe Haven&quot; currencies like the Swiss Franc or the US Dollar.</li>
        </ul>

        <SourceReference
          sources={[
            { name: "European Central Bank (ECB) - Foreign Exchange Rates", url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" },
            { name: "International Monetary Fund (IMF) - Representative Rates", url: "https://www.imf.org/external/np/fin/data/param_rms_mth.aspx" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
