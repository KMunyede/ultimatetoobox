"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, LayoutGrid, Zap, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Corrected Data Structure - Optimized for "Ultimate Toolbox" as the root
const TOOLBOX_DATA = {
  name: "Ultimate Toolbox",
  href: "/", // Toolbox root
  categories: [
    {
      name: "Text & Data",
      href: "/text-data",
      tools: [
        { name: "Word Unscrambler", href: "/text-data/word-unscrambler" },
        { name: "Base64 Text Encoder", href: "/text-data/base64-encode" },
        { name: "MD5 Hash", href: "/text-data/md5-hash" },
        { name: "Word Count", href: "/text-data/word-count" },
      ]
    },
    {
      name: "PDF Tools",
      href: "/pdf-tools",
      tools: [
        { name: "Merge PDF", href: "/pdf-tools/merge-pdf" },
        { name: "Split PDF", href: "/pdf-tools/split-pdf" },
        { name: "Rotate PDF", href: "/pdf-tools/rotate-pdf" },
        { name: "Delete Pages", href: "/pdf-tools/delete-pages" },
      ]
    },
    {
      name: "Converters",
      href: "/converters",
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
      name: "Calculators",
      href: "/calculators",
      tools: [
        { name: "Standard Calculator", href: "/calculators/standard" },
        { name: "Scientific Calculator", href: "/calculators/scientific" },
        { name: "Astrophysics", href: "/calculators/astrophysics" },
        { name: "Equation Solver", href: "/calculators/equation-solver" },
      ]
    },
    {
      name: "Finance",
      href: "/finance",
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
      name: "Health & Wisdom",
      href: "/health",
      tools: [
        { name: "Daily Wisdom", href: "/health/daily-wisdom" },
        { name: "BMI Calculator", href: "/health/bmi-calculator" },
      ]
    }
  ]
};

export function NavigationMenu() {
  const [isStaging, setIsStaging] = useState(false);
  const [hubOpen, setHubHubOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
      setActiveCategory(null);
    }, 300);
  };

  const resolveHref = (path: string) => {
    if (path === "/softwarehub") return `${domains.corporate}${path}`;
    return `${domains.toolbox}${path}`;
  };

  return (
    <nav
      className="hidden lg:flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full flex items-center">
        {/* Level 1: Ultimate Toolbox Trigger (Clickable to go Home) */}
        <Link
          href={resolveHref(TOOLBOX_DATA.href)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black tracking-tight uppercase transition-all ${
            hubOpen ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105' : 'text-text-secondary hover:text-brand-primary'
          }`}
        >
          <Box size={16} />
          {TOOLBOX_DATA.name}
          <ChevronDown size={14} className={`transition-transform duration-300 ${hubOpen ? 'rotate-180' : 'opacity-40'}`} />
        </Link>

        {/* Level 2: Nested Category Container */}
        <AnimatePresence>
          {hubOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-[calc(100%-4px)] left-0 flex z-[100] mt-2"
            >
              {/* Main Category Sidebar */}
              <div className="w-64 bg-canvas-card border border-base rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
                <div className="p-2 space-y-1">
                  <div className="px-3 py-2 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <Zap size={10} className="text-brand-primary" />
                    Categories
                  </div>

                  <div className="space-y-0.5">
                    {TOOLBOX_DATA.categories.map((cat) => (
                      <button
                        key={cat.name}
                        onMouseEnter={() => setActiveCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                          activeCategory === cat.name
                            ? 'bg-canvas-muted text-brand-primary translate-x-1'
                            : 'text-text-secondary hover:bg-canvas-muted/50'
                        }`}
                      >
                        {cat.name}
                        <ChevronRight size={14} className={activeCategory === cat.name ? 'opacity-100' : 'opacity-20'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto bg-canvas-muted/50 p-4 border-t border-base">
                  <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.15em] leading-relaxed">
                    Hilmost Software Corp<br/>Utility Ecosystem
                  </p>
                </div>
              </div>

              {/* Tool List (Fly-out) */}
              <AnimatePresence>
                {activeCategory && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-2 w-80 bg-canvas-card border border-base rounded-2xl shadow-[20px_20px_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
                  >
                    <div className="p-4 bg-brand-primary/5 border-b border-base">
                       <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary">
                          {activeCategory} Tools
                       </h3>
                    </div>

                    <div className="p-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: '420px' }}>
                      <div className="grid grid-cols-1 gap-1">
                        {TOOLBOX_DATA.categories
                          .find(c => c.name === activeCategory)
                          ?.tools.map((tool) => (
                            <Link
                              key={tool.href}
                              href={resolveHref(tool.href)}
                              onClick={() => {
                                setHubHubOpen(false);
                                setActiveCategory(null);
                              }}
                              className="group flex flex-col px-4 py-3 rounded-xl hover:bg-canvas-muted transition-all border border-transparent hover:border-base"
                            >
                              <span className="text-sm font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-[10px] text-text-muted font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Launch Utility →
                              </span>
                            </Link>
                          ))
                        }
                      </div>
                    </div>

                    <div className="mt-auto p-4 bg-canvas-muted/30 border-t border-base text-center">
                       <Link
                        href={resolveHref(TOOLBOX_DATA.categories.find(c => c.name === activeCategory)?.href || "#")}
                        onClick={() => {
                          setHubHubOpen(false);
                          setActiveCategory(null);
                        }}
                        className="text-[10px] font-bold text-brand-primary uppercase tracking-tighter hover:underline"
                       >
                          View Full {activeCategory} Category
                       </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
