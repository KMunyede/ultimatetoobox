"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { calculateScrabblePoints, groupWordsByLength } from "@/lib/wordLogic";

interface WordResultsProps {
  results: string[];
}

export default function WordResults({ results }: WordResultsProps) {
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  const copyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  const groupedResults = groupWordsByLength(results);
  const sortedLengths = Object.keys(groupedResults).map(Number).sort((a, b) => b - a);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      {sortedLengths.map((len) => (
        <div key={len} className="space-y-6">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-black text-text-primary tracking-tighter whitespace-nowrap">
              {len} <span className="text-text-muted">Letter Words</span>
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-border-base to-transparent" />
            <div className="flex items-center gap-2 bg-canvas-card border border-base px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="text-xs font-black text-text-secondary uppercase tracking-widest whitespace-nowrap">
                {groupedResults[len].length}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupedResults[len].map((word) => {
              const score = calculateScrabblePoints(word);
              return (
                <button
                  key={word}
                  onClick={() => copyToClipboard(word)}
                  className="group relative bg-canvas-card border border-base p-4 md:p-5 rounded-[1.25rem] flex items-center justify-between hover:border-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                >
                  <div className="flex flex-col items-start overflow-hidden mr-2">
                    <span className="text-lg md:text-xl font-black text-text-primary group-hover:text-brand-primary transition-colors uppercase tracking-tight truncate w-full">
                      {word}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] font-black text-text-muted group-hover:text-brand-primary/70 uppercase tracking-tighter transition-colors">
                        {score} Points
                      </span>
                    </div>
                  </div>
                  <div className="text-text-muted group-hover:text-brand-primary transition-all flex-shrink-0">
                    {copiedWord === word ? (
                      <Check size={18} className="text-brand-primary" />
                    ) : (
                      <Copy size={16} className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
