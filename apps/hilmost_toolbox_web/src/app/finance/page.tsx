import { WebApplicationSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Banknote, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Financial Calculators | Hilmost Ultimate Toolbox",
  description: "Turn complexity into clarity. Experience the joy of getting things done beautifully with our financial tools for loans, interest, and taxes.",
};

const links = [
  { name: "Currency Converter", href: "/finance/currency" },
  { name: "Loan Calculator", href: "/finance/loan-calculator" },
  { name: "Income Tax", href: "/finance/income-tax" },
  { name: "Compound Interest", href: "/finance/compound-interest" },
  { name: "VAT & Tax Calculator", href: "/finance/vat-tax" },
  { name: "Salary Converter", href: "/finance/salary-converter" },
  { name: "Tip Calculator", href: "/finance/tip-calculator" },
  { name: "Retirement Planner", href: "/finance/retirement-planner" },
  { name: "Inflation Calculator", href: "/finance/inflation" },
  { name: "Budget Planner", href: "/finance/budget-planner" },
];

export default function FinanceHub() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-5xl">
      <WebApplicationSchema name="Financial Calculators | Hilmost Ultimate Toolbox" description="Turn complexity into clarity. Experience the joy of getting things done beautifully with our financial tools for loans, interest, and taxes." url="https://hilmost-toolbox.hilmost.net/finance" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
          <Banknote className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Finance
        </h1>
      </div>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
        Manage your wealth, compute compounding returns, estimate taxes, and convert global currencies using our robust financial toolbox.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-yellow-500/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
