"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, X, ArrowRight, Zap, History, Star, Settings } from "lucide-react";
import { TOOLS_MAP } from "./RelatedTools";
import { Tooltip } from "./Tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface ToolEntry {
  name: string;
  href: string;
  description: string;
  category: string;
  type?: "tool" | "action";
  icon?: React.ReactNode;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isStaging, setIsStaging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStaging(
        window.location.hostname.includes("staging") ||
        window.location.hostname.includes("localhost")
      );
    }
  }, []);

  const toolboxDomain = isStaging ? "https://hilmost-toolbox-staging.web.app" : "https://hilmost-toolbox.hilmost.net";
  const corporateDomain = isStaging ? "https://hsc-platform-core-staging.web.app" : "https://hilmost.net";

  // Quick Actions - shown when query is empty
  const quickActions: ToolEntry[] = [
    {
      name: "Open Daily Wisdom",
      href: `${toolboxDomain}/health/daily-wisdom`,
      description: "Get your daily dose of philosophy",
      category: "Quick Action",
      type: "action",
      icon: <Zap size={16} className="text-amber-500" />
    },
    {
      name: "Software Hub",
      href: `${corporateDomain}/softwarehub`,
      description: "Explore all Hilmost products",
      category: "Quick Action",
      type: "action",
      icon: <Zap size={16} className="text-emerald-500" />
    },
    {
      name: "Contact Support",
      href: `${corporateDomain}/contact`,
      description: "Get help from our team",
      category: "Quick Action",
      type: "action",
      icon: <Zap size={16} className="text-blue-500" />
    }
  ];

  // Flatten tools for searching and prefix with domain
  const allTools: ToolEntry[] = Object.entries(TOOLS_MAP).flatMap(([category, tools]) => 
    tools.map(tool => ({
      ...tool,
      category,
      type: "tool",
      href: `${toolboxDomain}${tool.href}`
    }))
  );

  const filteredResults = query.trim() === ""
    ? quickActions
    : allTools.filter(tool => {
        const searchTerm = query.toLowerCase();
        return (
          tool.name.toLowerCase().includes(searchTerm) ||
          tool.description.toLowerCase().includes(searchTerm) ||
          tool.category.toLowerCase().includes(searchTerm)
        );
      }).slice(0, 8);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter" && filteredResults.length > 0) {
      e.preventDefault();
      window.location.href = filteredResults[selectedIndex].href;
      setIsOpen(false);
    }
  };

  return (
    <>
      <Tooltip content="Search tools (Cmd+K)" position="bottom">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary bg-canvas-muted rounded-xl border border-base transition-all focus:outline-none hover:border-brand-primary group"
          aria-label="Search tools"
        >
          <Search size={16} className="group-hover:text-brand-primary transition-colors" />
          <span className="hidden sm:inline font-medium">Search tools...</span>
          <div className="hidden sm:flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border border-base bg-canvas-card font-medium opacity-60">
            <Command size={10} /> K
          </div>
        </button>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-canvas-base/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl bg-canvas-card rounded-2xl shadow-2xl border border-base overflow-hidden pointer-events-auto flex flex-col ring-1 ring-black/5"
                onClick={e => e.stopPropagation()}
              >
                {/* Header / Input */}
                <div className="relative flex items-center px-5 border-b border-base bg-canvas-muted/10">
                  <Search className="w-5 h-5 text-brand-primary shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-transparent px-4 py-5 text-lg outline-none text-text-primary placeholder-text-muted font-medium"
                    placeholder="Search tools, calculators, or actions..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex items-center gap-3">
                    <kbd className="hidden sm:block px-2 py-0.5 text-[10px] rounded-md border border-base bg-canvas-muted text-text-muted font-bold">ESC</kbd>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 text-text-muted hover:text-text-primary transition-colors rounded-full hover:bg-canvas-muted shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto p-3 custom-scrollbar">
                  {query.trim() === "" && (
                    <div className="px-3 py-2 mb-2">
                      <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Suggestions</span>
                    </div>
                  )}

                  {filteredResults.length === 0 ? (
                    <div className="py-16 text-center text-text-muted">
                      <div className="w-16 h-16 bg-canvas-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-base">
                        <Search className="w-7 h-7 opacity-20" />
                      </div>
                      <p className="text-lg font-medium text-text-primary">No results found for "{query}"</p>
                      <p className="text-sm mt-1 max-w-[280px] mx-auto opacity-70">Try searching for generic terms like "Math", "Health", or "Finance".</p>
                    </div>
                  ) : (
                    <ul className="space-y-1.5">
                      {filteredResults.map((result, idx) => (
                        <li key={result.href}>
                          <a
                            href={result.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 ${
                              idx === selectedIndex
                                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-[1.01] z-10"
                                : "hover:bg-canvas-muted text-text-secondary"
                            }`}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${idx === selectedIndex ? "bg-white/20" : "bg-canvas-muted border border-base"}`}>
                                {result.type === "action" ? result.icon : <Zap size={16} className={idx === selectedIndex ? "text-white" : "text-brand-primary"} />}
                              </div>
                              <div className="flex flex-col">
                                <span className={`font-bold ${idx === selectedIndex ? "text-white" : "text-text-primary"}`}>
                                  {result.name}
                                </span>
                                <span className={`text-xs line-clamp-1 ${idx === selectedIndex ? "text-white/80" : "text-text-muted"}`}>
                                  {result.description}
                                </span>
                              </div>
                            </div>
                            {idx === selectedIndex && (
                              <motion.div
                                initial={{ x: -5, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center gap-2"
                              >
                                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Jump to</span>
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Enhanced Footer */}
                <div className="px-5 py-4 border-t border-base text-[10px] text-text-muted flex items-center justify-between bg-canvas-muted/30">
                  <div className="flex gap-6">
                    <span className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 rounded-md border border-base bg-canvas-card font-mono text-[9px] shadow-sm">↑↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 rounded-md border border-base bg-canvas-card font-mono text-[9px] shadow-sm">Enter</kbd>
                      to select
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold tracking-tighter">
                    <Zap size={10} className="animate-pulse" />
                    OMNI-SEARCH
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
