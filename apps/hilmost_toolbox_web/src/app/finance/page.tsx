import { WebApplicationSchema, Breadcrumbs, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection, BreadcrumbSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Banknote, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl, TOOL_CATEGORIES } from "@utilitiessite/config";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TITLE = "Financial Calculators";
const DESC = "A complete collection of robust financial tools. Manage your wealth, compute compounding returns, estimate taxes, and convert global currencies with ease.";
const PATH = "/finance";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TITLE);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630 }],
    }
  };
}

const CATEGORY_SLUG = "finance";
const category = TOOL_CATEGORIES.find(c => c.slug === CATEGORY_SLUG);
const links = category?.tools || [];

const faqs = [
  {
    question: "Are these free online finance tools secure for my private data?",
    answer: "Yes. Security is our top priority. Unlike other platforms that process data on remote servers, Hilmost finance tools are designed to work client-side. Your sensitive financial inputs—like income, debt amounts, and savings—never leave your browser, ensuring complete privacy."
  },
  {
    question: "How often are the currency exchange rates updated?",
    answer: "Our currency converter fetches real-time data from authoritative financial APIs. Rates are typically updated every hour to ensure you have the most accurate information for global transactions and travel planning."
  },
  {
    question: "Can I use the tax calculators for different countries?",
    answer: "Our tax tools are built with flexibility in mind. While we provide standard models for federal and local taxes, you can manually adjust rates for VAT, sales tax, and income tax brackets to match your specific jurisdiction anywhere in the world."
  },
  {
    question: "Is the compound interest calculator suitable for long-term retirement planning?",
    answer: "Absolutely. Our compound interest tool supports various contribution frequencies (monthly, quarterly, annually) and allows you to visualize growth over decades. It is an essential tool for understanding the power of time in building wealth."
  },
  {
    question: "Do I need a background in accounting or finance to use these tools?",
    answer: "No. We have designed every tool with a 'no-code/low-code' philosophy. Each calculator includes clear labels and helpful descriptions to guide you through the process, making complex financial analysis accessible to everyone."
  }
];

export default function FinanceHub() {
  const breadcrumbItems = [{ label: "Finance", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Finance Tools | Hilmost Toolbox",
    "description": "A comprehensive suite of free online financial calculators for loans, taxes, currency, and investments.",
    "url": CANONICAL_URL,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": links.map((link, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://hilmost-toolbox.hilmost.net${link.href}`,
        "name": link.name
      }))
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
          <Banknote className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-normal tracking-tight text-black dark:text-white uppercase">
          Free Online Finance Tools
        </h1>
      </div>

      <p className="text-lg text-black dark:text-white mb-10 max-w-3xl leading-relaxed font-medium">
        Master your money with professional-grade accuracy. Our free online finance tools help you manage debt, optimize taxes, and project investment growth with 100% privacy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-yellow-500/50">
            <h3 className="text-xl font-normal text-black dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-black dark:text-white mb-4 line-clamp-2">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-normal text-yellow-600 dark:text-yellow-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <CollapsibleSection title="About Money & Tax Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the Hilmost hub for <strong>free online finance tools</strong>. In today&apos;s economy, having access to reliable, accurate, and fast data is essential for making informed financial decisions. Our suite is engineered to provide high precision for your personal wealth and business operations, from daily currency checks to multi-year retirement projections.
          </p>

          <h2 className="text-2xl font-normal mt-8 mb-4 uppercase tracking-tight">Comprehensive Debt and Loan Management</h2>
          <p>
            Managing debt is the first step toward financial freedom. Our <strong>Loan Calculator</strong> and <strong>Amortization Solver</strong> help you break down monthly payments and visualize exactly how much interest you will pay over the life of a loan. Whether you are looking at a 30-year mortgage or a short-term personal credit line, our tools expose the &quot;hidden costs&quot; of borrowing, allowing you to plan payoff strategies that save you thousands.
          </p>

          <h2 className="text-2xl font-normal mt-8 mb-4 uppercase tracking-tight">Tax Optimization and Earnings Analysis</h2>
          <p>
            Taxes are often the largest expense for any individual or business. We offer specialized tools like the <strong>VAT & Tax Calculator</strong> and <strong>Income Tax Estimator</strong> to help you understand your net take-home pay. For entrepreneurs and employees alike, our <strong>Salary Converter</strong> translates annual earnings into hourly or monthly rates, providing a realistic view of your earning power and helping you negotiate better compensation.
          </p>

          <h2 className="text-2xl font-normal mt-8 mb-4 uppercase tracking-tight">Investment Growth and Inflation Realities</h2>
          <p>
            Building wealth is about understanding compounding and the purchasing power of money. Our <strong>Compound Interest Calculator</strong> demonstrates the exponential growth of reinvested returns, while our <strong>Inflation Calculator</strong> reveals how the value of your currency shifts over time. For corporate analysis, we even include advanced metrics like <strong>WACC (Weighted Average Cost of Capital)</strong> and <strong>EPS (Earnings Per Share)</strong> to help you evaluate company performance like a seasoned Wall Street analyst.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Why Precision and Privacy Matter">
        <p>
          In finance, a small rounding error can lead to a large discrepancy over time. At Hilmost, we apply rigorous mathematical standards to our free tools, ensuring that your results are accurate down to the last cent.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
