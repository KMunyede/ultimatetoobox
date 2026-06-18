import { WebApplicationSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Health & Fitness | Hilmost Ultimate Toolbox",
  description: "Free online health and fitness tools including BMI calculators and metric trackers.",
};

const links = [
  { name: "BMI Calculator", href: "/health/bmi-calculator" },
];

export default function HealthHub() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-5xl">
      <WebApplicationSchema name="Health & Fitness | Hilmost Ultimate Toolbox" description="Free online health and fitness tools including BMI calculators and metric trackers." url="https://hilmost-toolbox.hilmost.net/health" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
          <Activity className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Health & Fitness
        </h1>
      </div>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
        Monitor your health metrics and maintain your well-being with our simple and accurate fitness calculators.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-rose-500/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-rose-600 dark:text-rose-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
