import Link from "next/link";
import { Calculator, ArrowRight, Activity, FileText, Banknote, Replace } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Text, Data & Files",
      description: "Word count, unscramblers, hashing, and encoding utilities.",
      icon: <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      colorClass: "bg-indigo-100 dark:bg-indigo-900/30",
      links: [
        { name: "Word Unscrambler", href: "/text-data/word-unscrambler" },
        { name: "Base64 Text Encoder", href: "/text-data/base64-encode" },
        { name: "MD5 Hash", href: "/text-data/md5-hash" },
        { name: "Word Count", href: "/text-data/word-count" },
      ],
    },
    {
      title: "Converters",
      description: "Convert units of length, weight, temperature, data, time, and more.",
      icon: <Replace className="w-6 h-6 text-green-600 dark:text-green-400" />,
      colorClass: "bg-green-100 dark:bg-green-900/30",
      links: [
        { name: "Age Calculator", href: "/converters/age-calculator" },
        { name: "Percentage Calculator", href: "/converters/percentage" },
        { name: "Unix Time", href: "/converters/unix-time" },
        { name: "Length Converter", href: "/converters/length" },
        { name: "Weight/Mass Converter", href: "/converters/weight-mass" },
        { name: "Temperature Converter", href: "/converters/temperature" },
        { name: "Time Converter", href: "/converters/time" },
        { name: "Time Zone Converter", href: "/converters/time-zone" },
        { name: "Data Storage", href: "/converters/data-storage" },
        { name: "Area Converter", href: "/converters/area" },
      ],
    },
    {
      title: "Calculators",
      description: "Standard, scientific, and specialized math calculators.",
      icon: <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      colorClass: "bg-blue-100 dark:bg-blue-900/30",
      links: [
        { name: "Standard Calculator", href: "/calculators/standard" },
        { name: "Scientific Calculator", href: "/calculators/scientific" },
        { name: "Astrophysics Calculator", href: "/calculators/astrophysics" },
        { name: "Science Equation Solver", href: "/calculators/equation-solver" },
      ],
    },
    {
      title: "Finance",
      description: "Currency exchange, loans, compound interest, taxes, and inflation.",
      icon: <Banknote className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      colorClass: "bg-yellow-100 dark:bg-yellow-900/30",
      links: [
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
      ],
    },
    {
      title: "Health & Fitness",
      description: "Tools to track your body metrics and daily fitness goals.",
      icon: <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      colorClass: "bg-rose-100 dark:bg-rose-900/30",
      links: [
        { name: "BMI Calculator", href: "/health/bmi-calculator" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          The <span className="text-blue-600 dark:text-blue-500">Ultimate Toolbox</span>
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          A comprehensive suite of fast, reliable, and completely free online utilities. No sign up required.
        </p>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800/50 flex items-center gap-2 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>We are continuously improving this toolbox with new features and updates!</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md">
            <div className="flex items-center gap-x-4 mb-6">
              <div className={`h-12 w-12 flex items-center justify-center rounded-xl shrink-0 ${category.colorClass}`}>
                {category.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{category.description}</p>
            <div className="flex-1 relative">
              <ul className="space-y-1 overflow-y-auto pr-2 max-h-[260px] custom-scrollbar">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
