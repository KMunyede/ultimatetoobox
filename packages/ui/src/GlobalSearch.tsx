"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, X, ArrowRight } from "lucide-react";
import { TOOLS_MAP } from "./RelatedTools";
import { Tooltip } from "./Tooltip";


interface ToolEntry {
  name: string;
  href: string;
  description: string;
  category: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Flatten tools
  const allTools: ToolEntry[] = Object.entries(TOOLS_MAP).flatMap(([category, tools]) => 
    tools.map(tool => ({ ...tool, category }))
  );

  const filteredTools = allTools.filter(tool => {
    const searchTerm = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.category.toLowerCase().includes(searchTerm)
    );
  }).slice(0, 8); // Show top 8

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
      setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === "Enter" && filteredTools.length > 0) {
      e.preventDefault();
      window.location.href = filteredTools[selectedIndex].href;
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Tooltip content="Search all tools (Ctrl+K)" position="bottom">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none"
          aria-label="Search tools"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search tools...</span>
          <div className="hidden sm:flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 font-medium">
            <Command size={12} /> K
          </div>
        </button>
      </Tooltip>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4 pointer-events-none">
        <div 
          className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden pointer-events-auto flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header / Input */}
          <div className="relative flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent px-4 py-4 text-lg outline-none text-slate-900 dark:text-white placeholder-slate-400"
              placeholder="Find calculators, converters, and tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredTools.length === 0 ? (
              <div className="py-14 text-center text-slate-500 dark:text-slate-400">
                <p>No tools found for "{query}"</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredTools.map((tool, idx) => (
                  <li key={tool.href}>
                    <a
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        idx === selectedIndex 
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                      }`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{tool.name}</span>
                        <span className="text-sm opacity-70">{tool.description}</span>
                      </div>
                      {idx === selectedIndex && (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↓</kbd> to navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Enter</kbd> to select</span>
            </div>
            <span>Hilmost Toolbox</span>
          </div>
        </div>
      </div>
    </>
  );
}
