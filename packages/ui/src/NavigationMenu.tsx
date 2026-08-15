"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, LayoutGrid, Zap, Box, Banknote, FileText, Replace, Binary, Calculator, HeartPulse, ArrowRight, Menu, X, Code2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { TOOL_CATEGORIES, TOTAL_TOOL_COUNT } from '@utilitiessite/config';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={16} />,
  Banknote: <Banknote size={16} />,
  FileText: <FileText size={16} />,
  Replace: <Replace size={16} />,
  Binary: <Binary size={16} />,
  Calculator: <Calculator size={16} />,
  HeartPulse: <HeartPulse size={16} />,
  GraduationCap: <GraduationCap size={16} />,
};

export function NavigationMenu() {
  const [hubOpen, setHubOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
  const isGuidesPage = pathname?.includes('/guides');

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

  const domains = useMemo(() => ({
    corporate: isStaging ? "https://hsc-platform-core-staging.web.app" : "https://hilmost.net",
    toolbox: isStaging ? "https://hilmost-toolbox-staging.web.app" : "https://hilmost-toolbox.hilmost.net",
  }), [isStaging]);

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

  const displayCount = Math.floor(TOTAL_TOOL_COUNT / 10) * 10; // e.g. 49 -> 40

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
          <span className="text-xs font-normal uppercase tracking-widest">Browse {displayCount}+ Free Tools — more added regularly</span>
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-normal tracking-tight transition-all ${
              hubOpen || (!isGuidesPage && pathname !== '/') ? 'text-brand-primary bg-brand-primary/5' : 'text-text-secondary hover:text-brand-primary'
            }`}
            title="Explore our library of free digital utilities."
          >
            Free Tools
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
                  {TOOL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onMouseEnter={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-normal transition-all ${
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
                        <h3 className="text-xs font-normal uppercase tracking-widest text-brand-primary">
                          {activeCategory} Tools
                        </h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                        {TOOL_CATEGORIES
                          .find(c => c.name === activeCategory)
                          ?.tools.map((tool) => (
                            <Link
                              key={tool.href}
                              href={resolveHref(tool.href)}
                              scroll={true}
                              onClick={() => { setHubOpen(false); setActiveCategory(null); }}
                              className="group flex flex-col px-4 py-3 rounded-xl hover:bg-canvas-muted transition-all"
                              title={tool.tooltip}
                            >
                              <span className="text-sm font-normal text-text-primary group-hover:text-brand-primary transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-caption text-text-muted leading-tight mt-0.5">
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-normal tracking-tight transition-all ${
              isGuidesPage ? 'text-brand-primary bg-brand-primary/5' : 'text-text-secondary hover:text-brand-primary'
            }`}
          >
            Guides
          </Link>
        </Tooltip>

        <Link
          href={domains.corporate + "/blog"}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-normal tracking-tight text-text-secondary hover:text-brand-primary transition-all"
        >
          Blog
        </Link>
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
              <div className="flex items-center justify-between py-2 px-6 border-b border-base">
                <span className="text-caption font-normal text-brand-primary tracking-[0.2em] uppercase">HILMOST HUB</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg bg-canvas-muted text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-6 space-y-6 custom-scrollbar scrollbar-visible">
                {TOOL_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-primary pt-4 pb-2">
                      {ICON_MAP[cat.icon]}
                      <span className="text-micro font-normal uppercase tracking-[0.2em]">{cat.name}</span>
                    </div>
                    <div className="flex flex-col">
                      {cat.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={resolveHref(tool.href)}
                          scroll={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center w-full py-4 text-sm font-normal text-text-secondary border-b border-base/40 active:bg-brand-primary/5 active:text-brand-primary transition-all"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Navigation Removed to maximize vertical space for tools */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
