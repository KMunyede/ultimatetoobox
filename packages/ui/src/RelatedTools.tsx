import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Category = "converters" | "calculators" | "finance" | "text-data" | "health";

interface RelatedToolsProps {
  category: Category;
  currentPath: string;
}

export const TOOLS_MAP: Record<Category, { name: string; href: string; description: string }[]> = {
  converters: [
    { name: "Length Converter", href: "/converters/length", description: "Convert meters, feet, inches & more." },
    { name: "Area Converter", href: "/converters/area", description: "Convert square feet, meters, acres." },
    { name: "Weight/Mass Converter", href: "/converters/weight-mass", description: "Convert kilograms, pounds, ounces." },
    { name: "Temperature Converter", href: "/converters/temperature", description: "Convert Celsius, Fahrenheit, Kelvin." },
    { name: "Time Converter", href: "/converters/time", description: "Convert hours, minutes, seconds." },
    { name: "Time Zone Converter", href: "/converters/time-zone", description: "Compare global time zones instantly." },
    { name: "Data Storage", href: "/converters/data-storage", description: "Convert bytes, KB, MB, GB, TB." },
    { name: "Age Calculator", href: "/converters/age-calculator", description: "Calculate exact age in years, months, days." },
    { name: "Percentage Calculator", href: "/converters/percentage", description: "Calculate percentages easily." },
    { name: "Unix Time", href: "/converters/unix-time", description: "Convert timestamps to human dates." },
  ],
  calculators: [
    { name: "Standard Calculator", href: "/calculators/standard", description: "Basic arithmetic operations." },
    { name: "Scientific Calculator", href: "/calculators/scientific", description: "Advanced math functions." },
    { name: "Astrophysics Calculator", href: "/calculators/astrophysics", description: "Space and physics formulas." },
    { name: "Equation Solver", href: "/calculators/equation-solver", description: "Solve algebraic equations." },
  ],
  finance: [
    { name: "Currency Converter", href: "/finance/currency", description: "Live foreign exchange rates." },
    { name: "Income Tax", href: "/finance/income-tax", description: "Estimate net take-home pay." },
    { name: "Loan Calculator", href: "/finance/loan-calculator", description: "Calculate monthly payments." },
    { name: "Compound Interest", href: "/finance/compound-interest", description: "Calculate investment growth." },
    { name: "VAT & Tax Calculator", href: "/finance/vat-tax", description: "Add or remove VAT/GST." },
    { name: "Salary Converter", href: "/finance/salary-converter", description: "Hourly to annual pay conversion." },
    { name: "Tip Calculator", href: "/finance/tip-calculator", description: "Calculate tips and split bills." },
    { name: "Retirement Planner", href: "/finance/retirement-planner", description: "Plan your financial future." },
    { name: "Inflation Calculator", href: "/finance/inflation", description: "Calculate historical money value." },
    { name: "Budget Planner", href: "/finance/budget-planner", description: "50/30/20 rule and zero-based budget." },
  ],
  "text-data": [
    { name: "Word Unscrambler", href: "/text-data/word-unscrambler", description: "Find hidden anagrams." },
    { name: "Base64 Text Encoder", href: "/text-data/base64-encode", description: "Encode and decode Base64." },
    { name: "MD5 Hash", href: "/text-data/md5-hash", description: "Generate MD5 checksums." },
    { name: "Word Count", href: "/text-data/word-count", description: "Count words, characters, sentences." },
  ],
  health: [
    { name: "BMI Calculator", href: "/health/bmi-calculator", description: "Check your Body Mass Index." },
    { name: "Daily Wisdom", href: "/health/daily-wisdom", description: "Inspirational quotes & journaling." },
  ],
};

export function RelatedTools({ category, currentPath }: RelatedToolsProps) {
  const tools = TOOLS_MAP[category];
  if (!tools) return null;

  // Filter out the current tool and randomly pick 3 or 4 tools
  const otherTools = tools.filter(tool => tool.href !== currentPath);
  const shuffled = [...otherTools].sort(() => 0.5 - Math.random());
  const selectedTools = shuffled.slice(0, 4); // Display up to 4 related tools

  if (selectedTools.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-base">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col p-5 bg-canvas-card border border-base rounded-2xl hover:border-brand-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                {tool.name}
              </h3>
              <ArrowRight size={18} className="text-text-muted group-hover:text-brand-primary transition-colors group-hover:translate-x-1" />
            </div>
            <p className="text-sm text-text-secondary">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
