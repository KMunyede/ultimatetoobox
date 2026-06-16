"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items, title = "Frequently Asked Questions" }: { items: FAQItem[], title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      {title && <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{title}</h2>}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-all">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-slate-900 dark:text-slate-100">{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-500 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 ml-4" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-400">
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
