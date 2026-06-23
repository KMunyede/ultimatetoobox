"use client";
import { NumberTicker, Tooltip, NumericInput } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";

export function EPSCalculatorClient() {
  const [state, setState] = useUrlState({
    netIncome: "1000000",
    preferredDividends: "50000",
    weightedShares: "200000",
    dilutiveShares: "15000",
  });

  const income = parseFloat(state.netIncome as string) || 0;
  const dividends = parseFloat(state.preferredDividends as string) || 0;
  const shares = parseFloat(state.weightedShares as string) || 0;
  const dilutive = parseFloat(state.dilutiveShares as string) || 0;

  const netProfit = income - dividends;
  const basicEps = shares > 0 ? netProfit / shares : 0;
  const totalDilutedShares = shares + dilutive;
  const dilutedEps = totalDilutedShares > 0 ? netProfit / totalDilutedShares : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Form */}
        <div className="bg-canvas-card border border-base rounded-2xl p-5 space-y-5 shadow-sm">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Net Income ($)</label>
            <Tooltip content="The company's total earnings after all expenses and taxes." position="top">
              <NumericInput
                className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={state.netIncome}
                onChange={val => setState({ netIncome: val })}
                placeholder="e.g. 1,000,000"
              />
            </Tooltip>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Preferred Dividends ($)</label>
            <Tooltip content="Dividends promised to preferred shareholders, subtracted from net income." position="top">
              <NumericInput
                className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={state.preferredDividends}
                onChange={val => setState({ preferredDividends: val })}
                placeholder="e.g. 50,000"
              />
            </Tooltip>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Weighted Avg Shares</label>
            <Tooltip content="The average number of common shares outstanding during the period." position="top">
              <NumericInput
                className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={state.weightedShares}
                onChange={val => setState({ weightedShares: val })}
                placeholder="e.g. 200,000"
              />
            </Tooltip>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Dilutive Potential Shares</label>
            <Tooltip content="Convertible securities like stock options that could become common shares." position="top">
              <NumericInput
                className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={state.dilutiveShares}
                onChange={val => setState({ dilutiveShares: val })}
                placeholder="e.g. 15,000"
              />
            </Tooltip>
          </div>
        </div>

        {/* Results */}
        <div className="bg-canvas-card border border-base rounded-2xl p-6 flex flex-col justify-center shadow-xl relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Basic EPS</span>
              <div className="text-5xl font-black text-brand-primary tracking-tighter">
                $<NumberTicker value={basicEps} decimals={2} />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Diluted EPS</span>
              <div className="text-4xl font-black text-slate-800 tracking-tighter">
                $<NumberTicker value={dilutedEps} decimals={2} />
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Net Profit</span>
                <p className="text-sm font-bold text-text-primary">${netProfit.toLocaleString()}</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Total Diluted Sh.</span>
                <p className="text-sm font-bold text-text-primary">{totalDilutedShares.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
