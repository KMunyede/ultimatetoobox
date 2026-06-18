"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";

export function InflationClient() {
  const [state, setState] = useUrlState({
    amount: "100",
    startYear: "1990",
    endYear: "2024",
    rate: "2.5",
  });

  const { amount, startYear, endYear, rate } = state;

  const V = parseFloat(amount as string) || 0;
  const startY = parseInt(startYear as string) || 1990;
  const endY = parseInt(endYear as string) || 2024;
  const R = parseFloat(rate as string) || 0;

  const years = Math.max(0, endY - startY);
  const adjustedValue = V * Math.pow(1 + R / 100, years);
  const cumulativeInflation = ((adjustedValue - V) / V) * 100;

  const tourSteps = [
    { element: '#tour-inf-inputs', popover: { title: '1. Purchasing Power', description: 'Enter the historical amount of money and the timeframe you want to compare.' } },
    { element: '#tour-inf-results', popover: { title: '2. Adjusted Value', description: 'See what that same amount of money is worth today based on the average inflation rate.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="inflation_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div id="tour-inf-inputs" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Historical Amount ($)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={amount}
              onChange={e => setState({ amount: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Calendar size={12} /> Start Year
                </label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                value={startYear}
                onChange={e => setState({ startYear: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Calendar size={12} /> End Year
                </label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                value={endYear}
                onChange={e => setState({ endYear: e.target.value })}
                />
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                <TrendingUp size={12} /> Avg. Inflation Rate (%)
            </label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={rate}
              onChange={e => setState({ rate: e.target.value })}
            />
          </div>
        </div>

        {/* Results */}
        <div id="tour-inf-results" className="bg-canvas-card border border-base rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2">
            <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Adjusted Value in {endYear}</span>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={adjustedValue} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 mt-8 pt-8 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Cumulative Inflation</span>
                <p className="text-2xl font-bold text-text-primary">
                    <NumberTicker value={cumulativeInflation} decimals={1} />%
                </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
