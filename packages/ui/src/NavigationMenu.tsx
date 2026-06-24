"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, LayoutGrid, Zap, Box, Banknote, FileText, Replace, Binary, Calculator, HeartPulse, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Corrected Data Structure - Optimized for "Ultimate Toolbox" as the root
const TOOLBOX_DATA = {
  name: "Free Tools",
  href: "/", // Toolbox root
  categories: [
    {
      name: "Money & Tax",
      description: "Currency, loans, interest, and tax calculators.",
      href: "/finance",
      icon: "Banknote",
      tools: [
        { name: "WACC Calculator", href: "/finance/wacc-calculator" },
        { name: "EPS Calculator", href: "/finance/earnings-per-share-calculator" },
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
      ]
    },
    {
      name: "PDF Tools",
      description: "Merge, split, rotate, and manage PDF files.",
      href: "/pdf-tools",
      icon: "FileText",
      tools: [
        { name: "Merge PDF", href: "/pdf-tools/merge-pdf" },
        { name: "Split PDF", href: "/pdf-tools/split-pdf" },
        { name: "Rotate PDF", href: "/pdf-tools/rotate-pdf" },
        { name: "Delete Pages", href: "/pdf-tools/delete-pages" },
      ]
    },
    {
      name: "Unit Converters",
      description: "Convert length, weight, time, and data units.",
      href: "/converters",
      icon: "Replace",
      tools: [
        { name: "Age Calculator", href: "/converters/age-calculator" },
        { name: "Percentage Calculator", href: "/converters/percentage" },
        { name: "Unix Time", href: "/converters/unix-time" },
        { name: "Length Converter", href: "/converters/length" },
        { name: "Weight/Mass Converter", href: "/converters/weight-mass" },
        { name: "Temperature Converter", href: "/converters/temperature" },
        { name: "Time Converter", href: "/converters/time" },
        { name: "Time Zone Hub", href: "/converters/time-zone" },
        { name: "Data Storage", href: "/converters/data-storage" },
        { name: "Area Converter", href: "/converters/area" },
      ]
    },
    {
      name: "Text & Formatting",
      description: "Word count, unscramblers, and data hashing.",
      href: "/text-data",
      icon: "Binary",
      tools: [
        { name: "Word Unscrambler", href: "/text-data/word-unscrambler" },
        { name: "Base64 Text Encoder", href: "/text-data/base64-encode" },
        { name: "MD5 Hash", href: "/text-data/md5-hash" },
        { name: "Word Count", href: "/text-data/word-count" },
      ]
    },
    {
      name: "Math & Science",
      description: "Standard, scientific, and specialized calculators.",
      href: "/calculators",
      icon: "Calculator",
      tools: [
        { name: "Standard Calculator", href: "/calculators/standard" },
        { name: "Scientific Calculator", href: "/calculators/scientific" },
        { name: "Astrophysics", href: "/calculators/astrophysics" },
        { name: "Equation Solver", href: "/calculators/equation-solver" },
      ]
    },
    {
      name: "Health & Wellness",
      description: "BMI tracking and daily wisdom utilities.",
      href: "/health",
      icon: "HeartPulse",
      tools: [
        { name: "Daily Wisdom", href: "/health/daily-wisdom" },
        { name: "BMI Calculator", href: "/health/bmi-calculator" },
      ]
    }
  ]
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Banknote: <Banknote size={16} />,
  FileText: <FileText size={16} />,
  Replace: <Replace size={16} />,
  Binary: <Binary size={16} />,
  Calculator: <Calculator size={16} />,
  HeartPulse: <HeartPulse size={16} />,
};

export function NavigationMenu() {
  const [isStaging, setIsStaging] = useState(false);
  const [hubOpen, setHubHubOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStaging(
        window.location.hostname.includes("staging") ||
        window.location.hostname.includes("localhost")
      );
    }
  }, []);

  const domains = {
    corporate: isStaging ? "https://hsc-platform-core-staging.web.app" : "https://hilmost.net",
    toolbox: isStaging ? "https://hilmost-toolbox-staging.web.app" : "https://hilmost-toolbox.hilmost.net",
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHubHubOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHubHubOpen(false);
    }, 300);
  };

  const resolveHref = (path: string) => {
    return `${domains.toolbox}${path}`;
  };

  return (
    <nav
      className="hidden lg:flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full flex items-center">
        {/* Level 1: Free Tools Trigger */}
        <button
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all ${
            hubOpen ? 'text-brand-primary' : 'text-text-secondary hover:text-brand-primary'
          }`}
        >
          {TOOLBOX_DATA.name}
          <ChevronDown size={14} className={`transition-transform duration-300 ${hubOpen ? 'rotate-180' : 'opacity-40'}`} />
        </button>

        {/* Mega Menu Container */}
        <AnimatePresence>
          {hubOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-[calc(100%-4px)] left-0 z-[100] mt-2"
            >
              <div className="w-[800px] bg-canvas-card border border-base rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden p-6">
                <div className="grid grid-cols-3 gap-8">
                  {TOOLBOX_DATA.categories.map((cat) => (
                    <div key={cat.name} className="flex flex-col gap-3">
                      <Link
                        href={resolveHref(cat.href)}
                        onClick={() => setHubHubOpen(false)}
                        className="group flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity">
                            {ICON_MAP[cat.icon]}
                          </div>
                          <h3 className="text-sm font-black text-text-primary group-hover:text-brand-primary transition-colors">
                            {cat.name}
                          </h3>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium leading-tight ml-6">
                          {cat.description}
                        </p>
                      </Link>

                      <div className="flex flex-col gap-1.5">
                        {cat.tools.slice(0, 4).map((tool) => (
                          <Link
                            key={tool.href}
                            href={resolveHref(tool.href)}
                            onClick={() => setHubHubOpen(false)}
                            className="text-[11px] font-semibold text-text-secondary hover:text-brand-primary transition-colors"
                          >
                            {tool.name}
                          </Link>
                        ))}
                        {cat.tools.length > 4 && (
                          <Link
                            href={resolveHref(cat.href)}
                            onClick={() => setHubHubOpen(false)}
                            className="text-[10px] font-bold text-brand-primary uppercase tracking-tighter hover:underline"
                          >
                            + {cat.tools.length - 4} more tools
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-base flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Utility Ecosystem</span>
                    <span className="text-xs font-bold text-text-primary">Hilmost Software Corp</span>
                  </div>
                  <Link
                    href={resolveHref("/")}
                    onClick={() => setHubHubOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary/20 transition-all"
                  >
                    View All Tools <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
