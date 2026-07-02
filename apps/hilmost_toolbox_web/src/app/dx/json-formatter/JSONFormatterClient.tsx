"use client";

import React, { useState, useMemo } from "react";
import { Trash2, Maximize2, Minimize2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { CopyButton } from "@utilitiessite/ui";
import { Button } from "../../../components/ui";

export function JSONFormatterClient() {
  const [input, setInput] = useState("");
  const [isPretty, setIsPretty] = useState(true);

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null };
    }

    try {
      const parsed = JSON.parse(input);
      const result = isPretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      return { output: result, error: null };
    } catch (e: unknown) {
      return { output: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, [input, isPretty]);

  const handleClear = () => {
    setInput("");
  };

  const handleSample = () => {
    const sample = {
      id: 1,
      name: "Hilmost Toolbox",
      version: "2.0.0",
      features: ["JSON Formatter", "Regex Tester", "JWT Decoder"],
      active: true,
      settings: {
        theme: "dark",
        notifications: false
      }
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      {/* Left: Input */}
      <div className="flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
            Raw Input
            {error && <span className="text-rose-500 animate-pulse flex items-center gap-1"><AlertCircle size={12} /> Invalid</span>}
            {!error && input && <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Valid</span>}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSample}
              className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline px-2 py-1 rounded transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
              title="Clear Input"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <textarea
          id="tour-json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste your JSON here... e.g. {"key": "value"}'
          className="flex-1 w-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all resize-none shadow-inner"
        />
        {error && (
            <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-xl text-[11px] text-rose-600 dark:text-rose-400 font-mono leading-relaxed">
                <strong>Error:</strong> {error}
            </div>
        )}
      </div>

      {/* Right: Output */}
      <div className="flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-4" id="tour-json-actions">
            <button
              onClick={() => setIsPretty(true)}
              className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${isPretty ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Maximize2 size={14} /> Pretty
            </button>
            <button
              onClick={() => setIsPretty(false)}
              className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${!isPretty ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Minimize2 size={14} /> Minify
            </button>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton value={output} />
          </div>
        </div>
        <div className="flex-1 relative bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl">
           {!output && !error && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 opacity-30 select-none">
                <Sparkles size={48} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-center px-8">Result will appear here instantly</p>
             </div>
           )}
           <pre className="h-full w-full p-4 font-mono text-sm overflow-auto text-emerald-400 custom-scrollbar whitespace-pre-wrap break-all">
             {output}
           </pre>
        </div>
      </div>
    </div>
  );
}
