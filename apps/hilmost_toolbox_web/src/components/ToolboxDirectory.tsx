"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ToolCategory } from "@utilitiessite/config";

interface ToolboxDirectoryProps {
  categories: ToolCategory[];
}

export function ToolboxDirectory({ categories }: ToolboxDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* MOBILE VIEW: Slide-out Drill-down */}
      <div className="md:hidden relative min-h-[500px] overflow-hidden">
        {/* Screen 1: Category List */}
        <motion.div
          animate={{ x: activeCategory ? "-100%" : "0%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full space-y-3"
          aria-hidden={!!activeCategory}
        >
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className="w-full flex items-center justify-between p-5 rounded-2xl border border-base bg-canvas-card hover:border-brand-primary transition-all text-left focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none group"
            >
              <div className="flex flex-col">
                <span className="text-lg font-normal text-text-primary group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-text-muted mt-0.5">{cat.tools.length} Tools</span>
              </div>
              <ChevronRight size={20} className="text-text-muted group-hover:text-brand-primary transition-colors" />
            </button>
          ))}
        </motion.div>

        {/* Screen 2: Tool Lists (All rendered for SEO/Crawlability) */}
        {categories.map((cat) => (
          <motion.div
            key={`detail-${cat.slug}`}
            initial={{ x: "100%" }}
            animate={{ x: activeCategory === cat.slug ? "0%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-canvas-base flex flex-col"
            style={{
              pointerEvents: activeCategory === cat.slug ? "auto" : "none",
              visibility: activeCategory === cat.slug ? "visible" : "hidden" // Keeps in DOM but helps browser rendering/a11y
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className="p-2 rounded-xl border border-base bg-canvas-card text-text-primary hover:text-brand-primary hover:border-brand-primary transition-all focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
                aria-label="Back to categories"
              >
                <ChevronLeft size={24} />
              </button>
              <Link href={`/${cat.slug}`} className="hover:underline decoration-brand-primary/30">
                <h2 className="text-2xl font-normal text-text-primary tracking-tight">{cat.name}</h2>
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
              <div className="grid grid-cols-1 gap-2">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center justify-between p-4 rounded-xl border border-base bg-canvas-card hover:border-brand-primary transition-all focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none"
                  >
                    <div className="flex flex-col">
                       <span className="font-normal text-text-primary group-hover:text-brand-primary transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-caption text-text-muted line-clamp-1 mt-0.5">
                        {tool.tooltip}
                      </span>
                    </div>
                    <ArrowRight size={18} className="text-text-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP VIEW: Existing 3-Column Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="group flex flex-col border border-base rounded-xl p-4 md:p-5 hover:border-brand-primary transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 outline-none"
          >
            <div className="mb-3">
              <Link href={`/${category.slug}`} className="hover:underline decoration-brand-primary/30">
                <h2 className="text-lg font-normal text-text-primary tracking-tight">{category.name}</h2>
              </Link>
            </div>
            <p className="text-text-secondary mb-5 text-sm leading-relaxed font-medium line-clamp-2">
              {category.description}
            </p>

            <div className="flex-1 overflow-hidden">
              <div className={`pr-1 ${category.tools.length > 5 ? "max-h-[280px] overflow-y-auto custom-scrollbar" : ""}`}>
                <ul className="space-y-0.5">
                  {category.tools.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link flex items-center justify-between py-1.5 border-b border-base/50 hover:border-brand-primary/50 transition-all"
                      >
                        <span className="text-sm font-normal text-text-secondary group-hover/link:text-brand-primary group-hover/link:translate-x-1 transition-all">
                          {link.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover/link:opacity-100 group-hover/link:text-brand-primary transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-base">
              <p className="text-caption font-normal uppercase tracking-widest text-text-muted opacity-60">
                {category.tools.length} Tools Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
