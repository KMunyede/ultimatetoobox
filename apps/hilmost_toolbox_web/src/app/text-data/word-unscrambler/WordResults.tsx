"use client";

import { motion } from "framer-motion";
import { Check, Copy, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { calculateScrabblePoints, groupWordsByLength } from "@/lib/wordLogic";

interface WordResultsProps {
  results: string[];
}

export default function WordResults({ results }: WordResultsProps) {
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [copiedGroup, setCopiedGroup] = useState<number | null>(null);

  const copyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  const copyGroupToClipboard = (words: string[], len: number) => {
    const text = words.join(", ");
    navigator.clipboard.writeText(text);
    setCopiedGroup(len);
    setTimeout(() => setCopiedGroup(null), 2000);
  };

  const groupedResults = groupWordsByLength(results);
  const sortedLengths = Object.keys(groupedResults).map(Number).sort((a, b) => b - a);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {sortedLengths.map((len) => (
        <div key={len} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-black text-text-primary tracking-tight whitespace-nowrap">
                {len} <span className="text-text-muted">Letter Words</span>
              </h3>
              <div className="h-px w-16 bg-gradient-to-r from-border-base to-transparent" />
              <div className="flex items-center gap-1.5 bg-canvas-card border border-base px-2 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest whitespace-nowrap">
                  {groupedResults[len].length}
                </span>
              </div>
            </div>

            <button
              onClick={() => copyGroupToClipboard(groupedResults[len], len)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all font-black text-[10px] uppercase tracking-wider shadow-sm ${
                copiedGroup === len
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-canvas-card border-base text-text-secondary hover:border-brand-primary hover:text-brand-primary hover:shadow-sm"
              }`}
            >
              {copiedGroup === len ? (
                <>
                  <ClipboardCheck size={12} />
                  Copied All
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy Group
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {groupedResults[len].map((word) => {
              const score = calculateScrabblePoints(word);
              return (
                <button
                  key={word}
                  onClick={() => copyToClipboard(word)}
                  className="group relative bg-canvas-card border border-base p-3 md:p-4 rounded-xl flex items-center justify-between hover:border-brand-primary hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  <div className="flex flex-col items-start overflow-hidden mr-2">
                    <span className="text-base font-black text-text-primary group-hover:text-brand-primary transition-colors uppercase tracking-tight truncate w-full">
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
                      <Check size={16} className="text-brand-primary" />
                    ) : (
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" />
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
