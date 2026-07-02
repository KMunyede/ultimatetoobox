"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

export function EPSCalculatorClient() {
  const [state, setState] = useUrlState({
    netIncome: "1000000",
    preferredDividends: "50000",
    weightedShares: "200000",
    dilutiveShares: "15000",
  });

  const { netIncome, preferredDividends, weightedShares, dilutiveShares } = state as Record<string, string>;

  const income = parseFloat(netIncome) || 0;
  const dividends = parseFloat(preferredDividends) || 0;
  const shares = parseFloat(weightedShares) || 0;
  const dilutive = parseFloat(dilutiveShares) || 0;

  const netProfit = income - dividends;
  const basicEps = shares > 0 ? netProfit / shares : 0;
  const totalDilutedShares = shares + dilutive;
  const dilutedEps = totalDilutedShares > 0 ? netProfit / totalDilutedShares : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm">
          <NumberInput
            label="Net Income ($)"
            value={netIncome}
            onChange={val => setState({ netIncome: val })}
            min={0}
            className="text-lg font-bold"
          />

          <NumberInput
            label="Preferred Dividends ($)"
            value={preferredDividends}
            onChange={val => setState({ preferredDividends: val })}
            min={0}
            className="text-lg font-bold"
          />

          <NumberInput
            label="Weighted Avg Shares"
            value={weightedShares}
            onChange={val => setState({ weightedShares: val })}
            min={1}
            className="text-lg font-bold"
          />

          <NumberInput
            label="Dilutive Potential Shares"
            value={dilutiveShares}
            onChange={val => setState({ dilutiveShares: val })}
            min={0}
            className="text-lg font-bold"
          />
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Basic EPS</span>
              <div className="text-6xl font-black text-brand-primary tracking-tighter">
                $<NumberTicker value={basicEps} decimals={2} />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Diluted EPS</span>
              <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                $<NumberTicker value={dilutedEps} decimals={2} />
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Profit</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">${netProfit.toLocaleString()}</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Diluted Sh.</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">{totalDilutedShares.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
