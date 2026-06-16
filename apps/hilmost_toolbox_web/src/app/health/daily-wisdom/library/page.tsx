"use client";

import React, { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { QuoteCard } from "@utilitiessite/ui";

const ALL_QUOTES = [
  { id: "1", text: "You have power over your mind - not outside events. Realize this, and you will find strength.", philosopher: "Marcus Aurelius" },
  { id: "2", text: "Wealth consists not in having great possessions, but in having few wants.", philosopher: "Epictetus" },
  { id: "3", text: "The happiness of your life depends upon the quality of your thoughts.", philosopher: "Marcus Aurelius" },
  { id: "4", text: "He who fears death will never do anything worth of a man who is alive.", philosopher: "Seneca" },
  { id: "5", text: "No man is free who is not master of himself.", philosopher: "Epictetus" },
  { id: "6", text: "We suffer more often in imagination than in reality.", philosopher: "Seneca" },
  { id: "7", text: "If it is not right do not do it; if it is not true do not say it.", philosopher: "Marcus Aurelius" },
  { id: "8", text: "It is not the man who has too little, but the man who craves more, that is poor.", philosopher: "Seneca" },
  { id: "9", text: "First say to yourself what you would be; and then do what you have to do.", philosopher: "Epictetus" },
  { id: "10", text: "Waste no more time arguing about what a good man should be. Be one.", philosopher: "Marcus Aurelius" }
];

export default function LibraryPage() {
  const [quotes, setQuotes] = useState<typeof ALL_QUOTES>([]);

  useEffect(() => {
    // Pick 6 random quotes on client-side to avoid hydration mismatches
    const shuffled = [...ALL_QUOTES].sort(() => 0.5 - Math.random());
    setTimeout(() => setQuotes(shuffled.slice(0, 5)), 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          The Wisdom <span className="text-emerald-600 dark:text-emerald-500">Library</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore a glimpse of our timeless philosophical archives.
        </p>
      </div>

      <div className="bg-slate-900 text-white dark:bg-slate-800 rounded-2xl p-4 text-center max-w-xl mx-auto shadow-lg relative overflow-hidden mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="absolute inset-0 bg-emerald-500/10" />
        <div className="relative z-10 flex items-center gap-3 text-left">
          <Crown className="w-8 h-8 text-yellow-400 shrink-0" />
          <div>
            <h2 className="text-lg font-bold">Premium is Coming Soon</h2>
            <p className="text-slate-300 text-sm hidden sm:block">
              Unlock thousands of categorized quotes and historical context.
            </p>
          </div>
        </div>
        <div className="relative z-10 shrink-0">
          <button disabled className="bg-emerald-600/50 cursor-not-allowed text-white text-sm font-semibold py-2 px-4 rounded-lg transition whitespace-nowrap">
            Unlock Premium
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} className="w-full" />
        ))}
      </div>
    </div>
  );
}
