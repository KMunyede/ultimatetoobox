"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, LayoutGrid, Zap, Box, Banknote, FileText, Replace, Binary, Calculator, HeartPulse, ArrowRight, Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';

const TOOLBOX_DATA = {
  name: "Free Tools",
  href: "/", // Toolbox root
  categories: [
    {
      name: "Developer Experience",
      description: "JSON, Regex, JWT, and developer utilities.",
      href: "/dx",
      icon: "Code2",
      tools: [
        { name: "JSON Formatter", href: "/dx/json-formatter", tooltip: "Pretty-print and validate JSON data." },
        { name: "QR Code Generator", href: "/dx/qr-code-generator", tooltip: "Create QR codes for URLs, Wi-Fi, and more." },
        { name: "Password Generator", href: "/dx/password-generator", tooltip: "Generate secure random passwords with custom rules." },
        { name: "Regex Tester", href: "/dx/regex-tester", tooltip: "Real-time regular expression testing." },
        { name: "JWT Decoder", href: "/dx/jwt-decoder", tooltip: "Decode JSON Web Tokens instantly." },
      ]
    },
    {
      name: "Money & Tax",
      description: "Currency, loans, interest, and tax calculators.",
      href: "/finance",
      icon: "Banknote",
      tools: [
        { name: "WACC Calculator", href: "/finance/wacc-calculator", tooltip: "Professional Weighted Average Cost of Capital solver." },
        { name: "EPS Calculator", href: "/finance/earnings-per-share-calculator", tooltip: "Calculate Earnings Per Share metrics." },
        { name: "Currency Converter", href: "/finance/currency", tooltip: "Real-time global currency exchange." },
        { name: "Loan Calculator", href: "/finance/loan-calculator", tooltip: "Analyze monthly payments and interest." },
        { name: "Income Tax", href: "/finance/income-tax", tooltip: "Estimate your personal tax burden." },
        { name: "Compound Interest", href: "/finance/compound-interest", tooltip: "Project long-term savings growth." },
        { name: "VAT & Tax Calculator", href: "/finance/vat-tax", tooltip: "Quick sales tax and VAT calculations." },
        { name: "Salary Converter", href: "/finance/salary-converter", tooltip: "Convert hourly pay to annual salary." },
        { name: "Tip Calculator", href: "/finance/tip-calculator", tooltip: "Calculate gratuity and split bills." },
        { name: "Retirement Planner", href: "/finance/retirement-planner", tooltip: "Plan your financial independence." },
        { name: "Inflation Calculator", href: "/finance/inflation", tooltip: "Check the buying power of your money." },
        { name: "Budget Planner", href: "/finance/budget-planner", tooltip: "Organize your monthly spending." },
      ]
    },
    {
      name: "PDF Tools",
      description: "Merge, split, rotate, and manage PDF files.",
      href: "/pdf-tools",
      icon: "FileText",
      tools: [
        { name: "Merge PDF", href: "/pdf-tools/merge-pdf", tooltip: "Combine multiple PDFs into one." },
        { name: "Split PDF", href: "/pdf-tools/split-pdf", tooltip: "Extract pages into new files." },
        { name: "Rotate PDF", href: "/pdf-tools/rotate-pdf", tooltip: "Correct document orientation." },
        { name: "Delete Pages", href: "/pdf-tools/delete-pages", tooltip: "Remove unwanted pages instantly." },
      ]
    },
    {
      name: "Unit Converters",
      description: "Convert length, weight, time, and data units.",
      href: "/converters",
      icon: "Replace",
      tools: [
        { name: "Age Calculator", href: "/converters/age-calculator", tooltip: "Calculate precise age and milestones." },
        { name: "Percentage Calculator", href: "/converters/percentage", tooltip: "Solve all percentage-based problems." },
        { name: "Unix Time", href: "/converters/unix-time", tooltip: "Convert timestamps to readable dates." },
        { name: "Length Converter", href: "/converters/length", tooltip: "Switch between metric and imperial." },
        { name: "Weight/Mass Converter", href: "/converters/weight-mass", tooltip: "Convert grams, pounds, and tons." },
        { name: "Temperature Converter", href: "/converters/temperature", tooltip: "Celsius, Fahrenheit, and Kelvin." },
        { name: "Time Converter", href: "/converters/time", tooltip: "Convert hours, days, and seconds." },
        { name: "Time Zone Hub", href: "/converters/time-zone", tooltip: "Global time zone synchronization." },
        { name: "Data Storage", href: "/converters/data-storage", tooltip: "MB, GB, TB, and Bit conversions." },
        { name: "Area Converter", href: "/converters/area", tooltip: "Convert acres, meters, and miles." },
      ]
    },
    {
      name: "Text & Formatting",
      description: "Word count, unscramblers, and data hashing.",
      href: "/text-data",
      icon: "Binary",
      tools: [
        { name: "Word Unscrambler", href: "/text-data/word-unscrambler", tooltip: "Find words from scrambled letters." },
        { name: "Base64 Text Encoder", href: "/text-data/base64-encode", tooltip: "Securely encode text for data transfer." },
        { name: "MD5 Hash", href: "/text-data/md5-hash", tooltip: "Generate secure cryptographic hashes." },
        { name: "Word Count", href: "/text-data/word-count", tooltip: "Analyze text length and statistics." },
      ]
    },
    {
      name: "Math & Science",
      description: "Standard, scientific, and specialized calculators.",
      href: "/calculators",
      icon: "Calculator",
      tools: [
        { name: "Standard Calculator", href: "/calculators/standard", tooltip: "Quick everyday arithmetic." },
        { name: "Scientific Calculator", href: "/calculators/scientific", tooltip: "Advanced engineering functions." },
        { name: "Astrophysics", href: "/calculators/astrophysics", tooltip: "Celestial mechanics and physics." },
        { name: "Equation Solver", href: "/calculators/equation-solver", tooltip: "Solve linear and complex equations." },
      ]
    },
    {
      name: "Health & Wellness",
      description: "BMI tracking and daily wisdom utilities.",
      href: "/health",
      icon: "HeartPulse",
      tools: [
        { name: "Daily Wisdom", href: "/health/daily-wisdom", tooltip: "Stoic quotes and daily guidance." },
        { name: "BMI Calculator", href: "/health/bmi-calculator", tooltip: "Calculate Body Mass Index safely." },
      ]
    }
  ]
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={16} />,
  Banknote: <Banknote size={16} />,
  FileText: <FileText size={16} />,
  Replace: <Replace size={16} />,
  Binary: <Binary size={16} />,
  Calculator: <Calculator size={16} />,
  HeartPulse: <HeartPulse size={16} />,
};

export function NavigationMenu() {
  const [isStaging, setIsStaging] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isGuidesPage = pathname?.includes('/guides');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStaging(
        window.location.hostname.includes("staging") ||
        window.location.hostname.includes("localhost")
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const domains = {
    corporate: isStaging ? "https://hsc-platform-core-staging.web.app" : "https://hilmost.net",
    toolbox: isStaging ? "https://hilmost-toolbox-staging.web.app" : "https://hilmost-toolbox.hilmost.net",
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHubOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHubOpen(false);
      setActiveCategory(null);
    }, 300);
  };

  const resolveHref = (path: string) => {
    return `${domains.toolbox}${path}`;
  };

  return (
    <>
      {/* Mobile Toggle Button - Full Width "Browse" Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-hover transition-all"
        aria-label="Open Navigation Menu"
      >
        <div className="flex items-center gap-3">
          <Menu size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Browse 370+ Free Tools</span>
        </div>
        <ChevronRight size={18} className="opacity-60" />
      </button>

      {/* Desktop Navigation (Fly-out) */}
      <nav className="hidden lg:flex items-center h-full">
        <div
          className="relative h-full flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all ${
              hubOpen || (!isGuidesPage && pathname !== '/') ? 'text-brand-primary bg-brand-primary/5' : 'text-text-secondary hover:text-brand-primary'
            }`}
            title="Explore our library of free digital utilities."
          >
            {TOOLBOX_DATA.name}
            <ChevronDown size={14} className={`transition-transform duration-300 ${hubOpen ? 'rotate-180' : 'opacity-40'}`} />
          </button>

          <AnimatePresence>
            {hubOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%-4px)] left-0 z-[100] mt-2 flex"
              >
                {/* Category Sidebar */}
                <div className="w-64 bg-canvas-card border border-base rounded-2xl shadow-xl overflow-hidden py-2">
                  {TOOLBOX_DATA.categories.map((cat) => (
                    <button
                      key={cat.name}
                      onMouseEnter={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-all ${
                        activeCategory === cat.name ? 'text-brand-primary bg-brand-primary/5' : 'text-text-secondary hover:bg-canvas-muted/50'
                      }`}
                      title={cat.description}
                    >
                      <div className="flex items-center gap-3">
                        {ICON_MAP[cat.icon]}
                        {cat.name}
                      </div>
                      <ChevronRight size={14} className={activeCategory === cat.name ? 'opacity-100' : 'opacity-20'} />
                    </button>
                  ))}
                </div>

                {/* Fly-out Tools List (Scrollable) */}
                <AnimatePresence>
                  {activeCategory && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-1 w-72 bg-canvas-card border border-base rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 bg-brand-primary/5 border-b border-base">
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary">
                          {activeCategory} Tools
                        </h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                        {TOOLBOX_DATA.categories
                          .find(c => c.name === activeCategory)
                          ?.tools.map((tool) => (
                            <Link
                              key={tool.href}
                              href={resolveHref(tool.href)}
                              onClick={() => { setHubOpen(false); setActiveCategory(null); }}
                              className="group flex flex-col px-4 py-3 rounded-xl hover:bg-canvas-muted transition-all"
                              title={tool.tooltip}
                            >
                              <span className="text-sm font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-[10px] text-text-muted leading-tight mt-0.5">
                                {tool.tooltip}
                              </span>
                            </Link>
                          ))
                        }
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Tooltip content="Master our tools with expert guides and precision math." position="bottom">
          <Link
            href={resolveHref("/guides")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all ${
              isGuidesPage ? 'text-brand-primary bg-brand-primary/5' : 'text-text-secondary hover:text-brand-primary'
            }`}
          >
            Guides
          </Link>
        </Tooltip>
      </nav>

      {/* Ad-Safe Mobile Drawer (Slides from Right) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden touch-none"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-canvas-card border-l border-base shadow-2xl z-[110] lg:hidden flex flex-col overflow-x-hidden"
            >
              <div className="flex items-center justify-between py-3 px-6 border-b border-base">
                <span className="text-sm font-black text-brand-primary tracking-widest uppercase">HILMOST HUB</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-canvas-muted text-text-primary"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {TOOLBOX_DATA.categories.map((cat) => (
                  <div key={cat.name} className="space-y-3">
                    <div className="flex items-center gap-2 text-brand-primary">
                      {ICON_MAP[cat.icon]}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cat.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {cat.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={resolveHref(tool.href)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center text-center text-[11px] font-bold text-text-secondary bg-canvas-muted/50 rounded-xl py-3 px-2 border border-base/30 active:bg-brand-primary/10 active:text-brand-primary transition-all"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-canvas-muted border-t border-base">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mb-3">Quick Navigation</p>
                <div className="grid grid-cols-3 gap-2">
                  <Link href={resolveHref("/guides")} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center py-2 bg-canvas-card rounded-lg text-[10px] font-bold text-text-primary border border-base/50">Guides</Link>
                  <Link href={`${domains.corporate}/about`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center py-2 bg-canvas-card rounded-lg text-[10px] font-bold text-text-primary border border-base/50">About</Link>
                  <Link href={`${domains.corporate}/contact`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center py-2 bg-canvas-card rounded-lg text-[10px] font-bold text-text-primary border border-base/50">Contact</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
