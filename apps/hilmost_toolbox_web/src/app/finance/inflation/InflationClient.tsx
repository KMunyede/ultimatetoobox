"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";
import { NumberInput } from "../../../components/ui/NumberInput";

export function InflationClient() {
  const [state, setState] = useUrlState({
    amount: "100",
    startYear: "1990",
    endYear: "2024",
    rate: "2.5",
  });

  const { amount, startYear, endYear, rate } = state as Record<string, string>;

  const V = parseFloat(amount) || 0;
  const startY = parseInt(startYear) || 1990;
  const endY = parseInt(endYear) || 2024;
  const R = parseFloat(rate) || 0;

  const years = Math.max(0, endY - startY);
  const adjustedValue = V * Math.pow(1 + R / 100, years);
  const cumulativeInflation = V > 0 ? ((adjustedValue - V) / V) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div id="tour-inf-inputs" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm h-fit">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Historical Amount ($)</label>
            <NumberInput
              value={amount}
              onChange={val => setState({ amount: val })}
              min={0}
              className="text-lg font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Calendar size={16} className="text-brand-primary" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Start Year</label>
                </div>
                <NumberInput
                  value={startYear}
                  onChange={val => setState({ startYear: val })}
                  min={1800}
                  max={2100}
                  className="text-lg font-bold"
                />
            </div>
            <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Calendar size={16} className="text-brand-primary" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">End Year</label>
                </div>
                <NumberInput
                  value={endYear}
                  onChange={val => setState({ endYear: val })}
                  min={1800}
                  max={2100}
                  className="text-lg font-bold"
                />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2 ml-1">
                <TrendingUp size={16} className="text-brand-primary" />
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Avg. Inflation Rate (%)</label>
            </div>
            <NumberInput
              value={rate}
              onChange={val => setState({ rate: val })}
              min={-20}
              max={1000}
              step={0.1}
              className="text-lg font-bold"
            />
          </div>
        </div>

        {/* Results */}
        <div id="tour-inf-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2 py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Adjusted Value in {endY}</span>
            <div className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={adjustedValue} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cumulative Inflation</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                    <NumberTicker value={cumulativeInflation} decimals={1} />%
                </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
