import Link from "next/link";
import { Calculator, ArrowRight, Activity, FileText, Banknote, Replace, Sparkles } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Text & Data",
      description: "Word count, unscramblers, hashing, and encoding utilities.",
      icon: <FileText className="w-6 h-6 text-brand-primary" />,
      colorClass: "bg-brand-primary/10",
      links: [
        { name: "Word Unscrambler", href: "/text-data/word-unscrambler" },
        { name: "Base64 Text Encoder", href: "/text-data/base64-encode" },
        { name: "MD5 Hash", href: "/text-data/md5-hash" },
        { name: "Word Count", href: "/text-data/word-count" },
      ],
    },
    {
      title: "PDF Tools",
      description: "Merge, split, rotate, and delete pages from PDF files.",
      icon: <FileText className="w-6 h-6 text-red-500" />,
      colorClass: "bg-red-500/10",
      links: [
        { name: "Merge PDF", href: "/pdf-tools/merge-pdf" },
        { name: "Split PDF", href: "/pdf-tools/split-pdf" },
        { name: "Rotate PDF", href: "/pdf-tools/rotate-pdf" },
        { name: "Delete Pages", href: "/pdf-tools/delete-pages" },
      ],
    },
    {
      title: "Converters",
      description: "Convert units of length, weight, temperature, data, time, and more.",
      icon: <Replace className="w-6 h-6 text-blue-500" />,
      colorClass: "bg-blue-500/10",
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
      icon: <Calculator className="w-6 h-6 text-indigo-500" />,
      colorClass: "bg-indigo-500/10",
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
      icon: <Banknote className="w-6 h-6 text-amber-500" />,
      colorClass: "bg-amber-500/10",
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
      title: "Health & Wisdom",
      description: "Daily wellness, BMI tracking, and stoic philosophy.",
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      colorClass: "bg-rose-500/10",
      links: [
        { name: "Daily Wisdom", href: "/health/daily-wisdom" },
        { name: "BMI Calculator", href: "/health/bmi-calculator" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="animate-pulse" />
            The fastest, versatile toolbox
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-text-primary mb-6">
          The <span className="text-brand-primary">Ultimate</span> Toolbox
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium">
          A high-performance digital sanctuary for your daily workflow. <br className="hidden md:block" /> Fast, accurate, and optimized for the modern era.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <div key={category.title} className="group flex flex-col bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300">
            <div className="flex items-center gap-x-4 mb-4">
              <div className={`h-12 w-12 flex items-center justify-center rounded-2xl shrink-0 transition-transform group-hover:scale-110 duration-500 ${category.colorClass}`}>
                {category.icon}
              </div>
              <h2 className="text-lg font-extrabold text-text-primary tracking-tight">{category.title}</h2>
            </div>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed font-medium line-clamp-2">{category.description}</p>

            <div className="flex-1 overflow-hidden">
              <div className={`pr-1 ${category.links.length > 5 ? 'max-h-[280px] overflow-y-auto custom-scrollbar' : ''}`}>
                <ul className="space-y-0.5">
                  {category.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="group/link flex items-center justify-between py-2.5 border-b border-base/50 hover:border-brand-primary/50 transition-all">
                        <span className="text-sm font-bold text-text-secondary group-hover/link:text-brand-primary group-hover/link:translate-x-1 transition-all">{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover/link:opacity-100 group-hover/link:text-brand-primary transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-base">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
                    {category.links.length} Tools Available
                </p>
            </div>
          </div>
        ))}
      </div>


      {/* Trust Footer Section */}
      <div className="mt-24 py-12 border-t border-base text-center">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Secured by</span>
                <span className="text-lg font-bold text-text-primary mt-1">Firebase</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Optimized for</span>
                <span className="text-lg font-bold text-text-primary mt-1">Core Web Vitals</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Global Edge</span>
                <span className="text-lg font-bold text-text-primary mt-1">Cloudflare</span>
            </div>
          </div>
      </div>
    </div>
  );
}
