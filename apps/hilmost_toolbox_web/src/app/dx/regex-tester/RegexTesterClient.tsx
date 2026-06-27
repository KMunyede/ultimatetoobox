"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Search, Trash2, AlertCircle } from "lucide-react";

export function RegexTesterClient() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [testString, setTestString] = useState("Contact us at support@hilmost.net or hello@example.com");
  const [flags, setFlags] = useState({ g: true, i: true, m: false });

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, active]) => active)
      .map(([f]) => f)
      .join("");
  }, [flags]);

  const { matches, error } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null };
    }

    try {
      const regex = new RegExp(pattern, flagString);
      const allMatches = Array.from(testString.matchAll(regex));
      return { matches: allMatches, error: null };
    } catch (e: unknown) {
      return { matches: [], error: e instanceof Error ? e.message : String(e) };
    }
  }, [pattern, testString, flagString]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const highlightedText = useMemo(() => {
    if (!pattern || error || matches.length === 0) return testString;

    const result = [];
    let lastIndex = 0;

    // Sort matches by index to handle them sequentially
    const sortedMatches = [...matches].sort((a, b) => (a.index || 0) - (b.index || 0));

    for (const match of sortedMatches) {
        const index = match.index || 0;
        const length = match[0].length;

        // Skip if this match overlaps with the previous one (can happen with some patterns)
        if (index < lastIndex) continue;

        // Add plain text before match
        result.push(testString.substring(lastIndex, index));

        // Add highlighted match
        result.push(
          <span key={index} className="bg-blue-500/30 text-blue-100 px-0.5 rounded border border-blue-400/50 font-black">
            {match[0]}
          </span>
        );

        lastIndex = index + length;
    }

    // Add remaining text
    result.push(testString.substring(lastIndex));
    return result;
  }, [testString, matches, error, pattern]);

  const handleClearTestString = useCallback(() => setTestString(""), []);

  return (
    <div className="space-y-6 my-8">
      {/* Pattern Input */}
      <div className="bg-canvas-card border-2 border-base rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Search size={14} className="text-blue-600" /> Pattern
            </label>
            <div className="flex items-center gap-2">
                {(['g', 'i', 'm'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => toggleFlag(f)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${flags[f] ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                        title={`Toggle ${f} flag`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono select-none">/</span>
            <input
                id="tour-regex-pattern"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-base rounded-xl py-3 pl-8 pr-12 font-mono text-sm focus:border-blue-500 outline-none transition-all shadow-inner"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono select-none">/{flagString}</span>
        </div>

        {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl text-[11px] text-red-600 dark:text-red-400 font-mono leading-relaxed flex items-center gap-2">
                <AlertCircle size={14} /> <strong>Error:</strong> {error}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test String Input */}
        <div className="flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-3 px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Test String
                </label>
                <button
                    onClick={handleClearTestString}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 size={14} />
                </button>
            </div>
            <textarea
                id="tour-regex-test"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against..."
                className="flex-1 w-full bg-slate-50 dark:bg-slate-950 border-2 border-base rounded-2xl p-4 font-mono text-sm focus:border-blue-500 outline-none transition-all resize-none shadow-inner"
            />
        </div>

        {/* Highlighted Result & Stats */}
        <div className="flex flex-col h-[400px]">
             <div className="flex items-center justify-between mb-3 px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Results
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${matches.length > 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {matches.length} Matches Found
                    </span>
                </label>
            </div>
            <div className="flex-1 bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col">
                <div className="flex-1 p-4 font-mono text-sm overflow-auto text-slate-300 whitespace-pre-wrap break-all custom-scrollbar bg-slate-950/50">
                    {highlightedText}
                </div>
                {matches.length > 0 && (
                    <div className="p-4 bg-slate-900 border-t border-slate-800 max-h-[150px] overflow-auto custom-scrollbar">
                         <div className="grid grid-cols-1 gap-2">
                            {matches.slice(0, 10).map((m, i) => (
                                <div key={i} className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1">
                                    <span className="font-bold text-blue-500">Match {i + 1}</span>
                                    <span className="font-mono bg-slate-800 px-1.5 rounded">&quot;{m[0]}&quot;</span>
                                    <span>Index: {m.index}</span>
                                </div>
                            ))}
                            {matches.length > 10 && (
                                <div className="text-[10px] text-slate-600 italic text-center py-1">
                                    + {matches.length - 10} more matches...
                                </div>
                            )}
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
