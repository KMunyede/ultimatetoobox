"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Enterprise-Calm FAQ Accordion.
 * Enhanced for SEO with semantic button attributes and smooth height transitions.
 */
export function FAQAccordion({ items, title = "Frequently Asked Questions" }: { items: FAQItem[], title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      {title && (
        <h2 className="text-[20px] md:text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-[1.25rem] overflow-hidden bg-white dark:bg-slate-900 transition-all shadow-sm hover:shadow-md">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.question}
                </span>
                <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'text-slate-400 bg-slate-50 dark:bg-slate-800/50'}`}>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
