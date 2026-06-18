import { WebApplicationSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Calculators | Hilmost Ultimate Toolbox",
  description: "Master your daily tasks with quiet confidence. Everything you need, exactly when you need it: standard, scientific, and specialized math calculators.",
};

const links = [
  { name: "Standard Calculator", href: "/calculators/standard" },
  { name: "Scientific Calculator", href: "/calculators/scientific" },
  { name: "Astrophysics Calculator", href: "/calculators/astrophysics" },
  { name: "Science Equation Solver", href: "/calculators/equation-solver" },
];

export default function CalculatorsHub() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-5xl">
      <WebApplicationSchema name="Calculators | Hilmost Ultimate Toolbox" description="Master your daily tasks with quiet confidence. Everything you need, exactly when you need it: standard, scientific, and specialized math calculators." url="https://hilmost-toolbox.hilmost.net/calculators" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Calculator className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Calculators
        </h1>
      </div>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
        Whether you need a simple standard calculator or complex scientific computing, these tools provide robust processing power directly in your browser.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-blue-500/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
