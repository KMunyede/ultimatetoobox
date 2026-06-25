import { WebApplicationSchema, Breadcrumbs, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { Banknote, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";
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
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    }
  };
}

const links = [
  {
    name: "Currency Converter",
    href: "/finance/currency",
    description: "Real-time exchange rates for global currencies. Convert USD, EUR, GBP, and more instantly."
  },
  {
    name: "Loan Calculator",
    href: "/finance/loan-calculator",
    description: "Estimate monthly payments, total interest, and payoff schedules for mortgages or personal loans."
  },
  {
    name: "Income Tax",
    href: "/finance/income-tax",
    description: "Calculate your take-home pay after federal and local taxes. Supports multiple jurisdictions."
  },
  {
    name: "Compound Interest",
    href: "/finance/compound-interest",
    description: "Visualize how your investments grow exponentially over time with reinvested earnings."
  },
  {
    name: "VAT & Tax Calculator",
    href: "/finance/vat-tax",
    description: "Quickly add or remove Value Added Tax (VAT) from prices with custom percentage rates."
  },
  {
    name: "Salary Converter",
    href: "/finance/salary-converter",
    description: "Convert annual salary to hourly, weekly, or monthly rates to better understand your earnings."
  },
  {
    name: "Tip Calculator",
    href: "/finance/tip-calculator",
    description: "Calculate the perfect tip and split the bill easily between friends or colleagues."
  },
  {
    name: "Retirement Planner",
    href: "/finance/retirement-planner",
    description: "Estimate how much you need to save today to maintain your lifestyle in the future."
  },
  {
    name: "Inflation Calculator",
    href: "/finance/inflation",
    description: "See how the purchasing power of your money has changed over time due to inflation."
  },
  {
    name: "Budget Planner",
    href: "/finance/budget-planner",
    description: "Track income and expenses to create a balanced financial plan for your household."
  },
  {
    name: "EPS Calculator",
    href: "/finance/earnings-per-share-calculator",
    description: "Analyze company profitability by calculating Basic and Diluted Earnings Per Share (EPS)."
  },
  {
    name: "WACC Calculator",
    href: "/finance/wacc-calculator",
    description: "Determine your company's hurdle rate and capital structure efficiency with integrated CAPM logic."
  },
];

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
            <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
          <Banknote className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Free Online Finance Tools
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Master your money with professional-grade accuracy. Our free online finance tools help you manage debt, optimize taxes, and project investment growth with 100% privacy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-yellow-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <CollapsibleSection title="About Money & Tax Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the Hilmost hub for <strong>free online finance tools</strong>. In today&apos;s economy, having access to reliable, accurate, and fast data is essential for making informed financial decisions. Our suite is engineered to provide banking-grade precision for your personal wealth and business operations, from daily currency checks to multi-year retirement projections.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Comprehensive Debt and Loan Management</h2>
          <p>
            Managing debt is the first step toward financial freedom. Our <strong>Loan Calculator</strong> and <strong>Amortization Solver</strong> help you break down monthly payments and visualize exactly how much interest you will pay over the life of a loan. Whether you are looking at a 30-year mortgage or a short-term personal credit line, our tools expose the &quot;hidden costs&quot; of borrowing, allowing you to plan payoff strategies that save you thousands.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Tax Optimization and Earnings Analysis</h2>
          <p>
            Taxes are often the largest expense for any individual or business. We offer specialized tools like the <strong>VAT & Tax Calculator</strong> and <strong>Income Tax Estimator</strong> to help you understand your net take-home pay. For entrepreneurs and employees alike, our <strong>Salary Converter</strong> translates annual earnings into hourly or monthly rates, providing a realistic view of your earning power and helping you negotiate better compensation.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Investment Growth and Inflation Realities</h2>
          <p>
            Building wealth is about understanding compounding and the purchasing power of money. Our <strong>Compound Interest Calculator</strong> demonstrates the exponential growth of reinvested returns, while our <strong>Inflation Calculator</strong> reveals how the value of your currency shifts over time. For corporate analysis, we even include advanced metrics like <strong>WACC (Weighted Average Cost of Capital)</strong> and <strong>EPS (Earnings Per Share)</strong> to help you evaluate company performance like a seasoned Wall Street analyst.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Why Banking-Grade Precision Matters">
        <p>
          In finance, a small rounding error can lead to a large discrepancy over time. Hilmost Digital Labs was founded by a software architect with 15+ years of experience in high-availability banking systems. We apply the same rigorous mathematical standards to our free tools as are used in enterprise financial platforms, ensuring that your results are accurate down to the last cent.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
