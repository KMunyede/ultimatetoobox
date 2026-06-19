"use client";

import React, { useState } from "react";
import { IconHistory, IconCornerDownLeft, IconTrash } from "@tabler/icons-react";
import { HistoryEntry } from "../../hooks/useHistory";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  history: HistoryEntry[];
  onClearHistory: () => void;
  onRestore: (entry: HistoryEntry) => void;
}

export function CalculatorDisplay({
  expression,
  result,
  history,
  onClearHistory,
  onRestore,
}: CalculatorDisplayProps) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      {/* Main Display Card */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col items-end min-h-[80px] justify-center">
          {/* Expression Line */}
          <div className="text-sm font-mono text-slate-500 dark:text-slate-400 break-all text-right w-full pr-8">
            {expression || "\u00A0"}
          </div>
          {/* Result Line */}
          <div className="text-3xl md:text-4xl font-mono font-bold text-slate-900 dark:text-white break-all text-right w-full pr-8 mt-1">
            {result || "0"}
          </div>
        </div>

        {/* History Toggle Button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            showHistory
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          title="History Tape"
        >
          <IconHistory size={20} />
        </button>
      </div>

      {/* History Tape Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mt-2 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">History tape</span>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-bold">
                    {history.length}
                  </span>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <IconTrash size={14} />
                    Clear all
                  </button>
                )}
              </div>

              {/* Entries */}
              <div className="max-h-[300px] overflow-y-auto">
                {history.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400 italic">
                    No history yet
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {history.map((entry, index) => (
                      <button
                        key={entry.timestamp}
                        onClick={() => onRestore(entry)}
                        className={`group flex flex-col items-end px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 text-right w-full relative ${
                          index === 0 ? "bg-[#E6F1FB] dark:bg-blue-900/20" : ""
                        }`}
                      >
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1 break-all">
                          {entry.expression}
                        </div>
                        <div className="text-base font-mono font-bold text-slate-900 dark:text-white break-all">
                          = {entry.result}
                        </div>

                        {/* Restore Icon on Hover */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400">
                          <IconCornerDownLeft size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
