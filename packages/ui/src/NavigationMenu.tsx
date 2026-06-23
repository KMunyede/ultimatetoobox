"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Data Structure - Tools mapping
const TOOL_CATEGORIES = [
  {
    name: "Finance",
    href: "/finance",
    tools: [
      { name: "EPS Analysis Engine", href: "/finance/earnings-per-share-calculator" },
      { name: "WACC Calculator", href: "/finance/wacc-calculator" },
      { name: "Compound Interest", href: "/finance/compound-interest" },
      { name: "Loan Calculator", href: "/finance/loan-calculator" },
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
    name: "Converters",
    href: "/converters",
    tools: [
      { name: "Unit Converter", href: "/converters/length" },
      { name: "Currency Exchange", href: "/finance/currency" },
      { name: "Time Zone Hub", href: "/converters/time-zone" },
      { name: "Age Calculator", href: "/converters/age-calculator" },
    ]
  },
  {
    name: "Data & PDF",
    href: "/pdf-tools",
    tools: [
      { name: "Merge PDF", href: "/pdf-tools/merge-pdf" },
      { name: "Split PDF", href: "/pdf-tools/split-pdf" },
      { name: "Base64 Encode", href: "/text-data/base64-encode" },
      { name: "Word Count", href: "/text-data/word-count" },
    ]
  }
];

export function NavigationMenu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Phase 3: Hover Intent Logic
  // This prevents the menu from flashing open/closed and protects AdSense units
  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenCategory(name);
  };

  const handleMouseLeave = () => {
    // 300ms delay gives the user time to move their mouse without the menu vanishing
    timeoutRef.current = setTimeout(() => {
      setOpenCategory(null);
    }, 300);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-4 px-4 h-full">
      {TOOL_CATEGORIES.map((category) => (
        <div
          key={category.name}
          className="relative h-full flex items-center"
          onMouseEnter={() => handleMouseEnter(category.name)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Category Trigger */}
          <button
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              openCategory === category.name
                ? 'bg-brand-primary/10 text-brand-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-canvas-muted'
            }`}
          >
            {category.name}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${openCategory === category.name ? 'rotate-180' : 'opacity-40'}`}
            />
          </button>

          {/* Nested Dropdown with Framer Motion */}
          <AnimatePresence>
            {openCategory === category.name && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[calc(100%-8px)] left-0 w-72 z-[100] mt-2"
              >
                <div className="bg-canvas-card border border-base rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
                  <div className="p-2 space-y-1">
                    {/* Category Landing Page Link */}
                    <Link
                      href={category.href}
                      onClick={() => setOpenCategory(null)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-brand-primary/5 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-primary/10 transition-colors"
                    >
                      Explore {category.name} Hub
                      <ChevronRight size={14} />
                    </Link>

                    <div className="h-px bg-base mx-2 my-1" />

                    {/* Individual Tool Links */}
                    <div className="grid grid-cols-1 gap-0.5">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setOpenCategory(null)}
                          className="flex items-center px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-brand-primary hover:bg-canvas-muted rounded-xl transition-all group/item"
                        >
                          <span className="flex-1">{tool.name}</span>
                          <ChevronRight size={12} className="opacity-0 group-hover/item:opacity-40 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Subtle footer to indicate safe zone */}
                  <div className="bg-canvas-muted/50 px-4 py-2 border-t border-base">
                     <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                        Hilmost Utility Engine
                     </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
