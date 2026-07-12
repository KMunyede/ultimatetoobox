"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumberTicker, Tooltip } from "@utilitiessite/ui";
import { Info, Calculator, Cpu, AlertTriangle, HelpCircle, Settings2 } from "lucide-react";
import { Select } from "../../../components/ui/Select";
import { NumberInput } from "../../../components/ui/NumberInput";
import { AI_MODELS } from "@utilitiessite/config";

export function AITokenCalculatorClient() {
  const [text, setText] = useState("");
  const [selectedModelLabel, setSelectedModelLabel] = useState(AI_MODELS[0].label);
  const [outRatio, setOutRatio] = useState("0.3");

  // Custom rate states
  const [customIn, setCustomIn] = useState("1.00");
  const [customOut, setCustomOut] = useState("3.00");

  const stats = useMemo(() => {
    const charCount = text.length;
    const tokenEstimate = Math.ceil(charCount / 4);
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { charCount, wordCount, tokenEstimate };
  }, [text]);

  const selectedModel = useMemo(() =>
    AI_MODELS.find(m => m.label === selectedModelLabel) || AI_MODELS[0]
  , [selectedModelLabel]);

  const isCustom = selectedModel.isCustom;

  const currentRates = useMemo(() => {
    if (isCustom) {
      return {
        in: parseFloat(customIn) || 0,
        out: parseFloat(customOut) || 0
      };
    }
    return {
      in: selectedModel.inputCostPer1M,
      out: selectedModel.outputCostPer1M
    };
  }, [isCustom, selectedModel, customIn, customOut]);

  const pricing = useMemo(() => {
    const inCost = (stats.tokenEstimate / 1_000_000) * currentRates.in;
    const estimatedOutTokens = Math.ceil(stats.tokenEstimate * parseFloat(outRatio));
    const outCost = (estimatedOutTokens / 1_000_000) * currentRates.out;

    return { inCost, outCost, totalCost: inCost + outCost, estimatedOutTokens };
  }, [stats.tokenEstimate, currentRates, outRatio]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-5 my-5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Input Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Cpu size={14} className="text-brand-primary" />
                Prompt Analysis
              </label>
              <div className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">
                {stats.charCount.toLocaleString()} Characters
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text or prompt here..."
              className="w-full h-72 bg-slate-50 dark:bg-slate-950 border border-[var(--color-border-base)] dark:border-slate-800 rounded-xl p-4 text-sm focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-alpha)] outline-none transition-all resize-none font-mono"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-3">
            <HelpCircle className="text-slate-400 shrink-0" size={18} />
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <strong>About these estimates:</strong> Model providers update tokenizers and pricing frequently. These calculations use a standard 4-character-per-token benchmark. Always confirm current rates and specific model vocabularies (e.g. O200k, Tiktoken) directly with providers before making financial decisions.
            </p>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-5">
          {/* Token Estimate Card */}
          <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 shadow-sm text-center space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                Estimated Tokens
                <Tooltip content="Heuristic estimate (~4 chars/token). Actual count depends on model vocabulary.">
                  <Info size={12} className="cursor-help" />
                </Tooltip>
              </span>
              <div className="text-5xl font-black text-[var(--color-brand-primary)] tracking-tighter">
                <NumberTicker value={stats.tokenEstimate} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase">Words</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{stats.wordCount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase">Pages</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{(stats.wordCount / 500).toFixed(1)}</p>
              </div>
            </div>
          </div>

          {/* Cost Projector */}
          <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Calculator size={14} className="text-blue-500" />
                Cost Projector
              </h3>
              <div className="text-[8px] font-bold text-slate-400 uppercase">
                Reference Pricing
              </div>
            </div>

            <div className="space-y-3">
              <Select
                label="Benchmark Model"
                value={selectedModelLabel}
                onChange={(e) => setSelectedModelLabel(e.target.value)}
                options={AI_MODELS.map(m => ({ label: m.label, value: m.label }))}
              />

              <AnimatePresence mode="wait">
                {isCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3 overflow-hidden pt-1 border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Settings2 size={12} className="text-blue-500" />
                      <span className="text-[9px] font-black uppercase text-blue-600">Manual Rates ($/1M Tokens)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <NumberInput
                        label="Input Cost"
                        value={customIn}
                        onChange={setCustomIn}
                        min={0}
                        step={0.01}
                      />
                      <NumberInput
                        label="Output Cost"
                        value={customOut}
                        onChange={setCustomOut}
                        min={0}
                        step={0.01}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Select
                label="Projected Response Length"
                value={outRatio}
                onChange={(e) => setOutRatio(e.target.value)}
                options={[
                  { label: "Short (10% of prompt)", value: "0.1" },
                  { label: "Standard (30% of prompt)", value: "0.3" },
                  { label: "Long (100% of prompt)", value: "1.0" },
                  { label: "Agentic / Multi-turn (300%)", value: "3.0" },
                ]}
              />
            </div>

            <div className="pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Input Cost</span>
                <span className="font-black text-slate-900 dark:text-white">${pricing.inCost.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Projected Output</span>
                <span className="font-black text-slate-900 dark:text-white">${pricing.outCost.toFixed(4)}</span>
              </div>
              <div className="pt-3 border-t-2 border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Estimated Total</span>
                <span className="text-xl font-black text-brand-primary tracking-tight">
                  ${pricing.totalCost.toFixed(3)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[9px] text-slate-400 italic leading-tight text-center">
                Model lineup and prices are illustrative examples. Providers frequently update models and rates. Verify current pricing directly with providers before budgeting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
