import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Banknote, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "Financial Calculators";
const DESC = "A complete collection of robust financial tools. Manage your wealth, compute compounding returns, estimate taxes, and convert global currencies with ease.";
const PATH = "/finance";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} — Free Online Finance Tools | Hilmost Toolbox`,
    description: "Manage your money with precision. Free online calculators for loans, compound interest, income tax, salary conversion, and retirement planning.",
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
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
];

export default function FinanceHub() {
  const breadcrumbItems = [{ label: "Finance", href: PATH }];

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
          <Banknote className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Financial Tools
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        Professional-grade calculators for your personal and business finances. Plan for the future, optimize your taxes, and understand your investment growth with our suite of high-precision utilities.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
