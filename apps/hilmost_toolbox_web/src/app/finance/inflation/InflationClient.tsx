"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function InflationClient() {
  const [state, setState] = useUrlState({
    amount: "1000",
    years: "10",
    rate: "3",
  });

  const { amount, years, rate } = state;

  const a = parseFloat(amount as string) || 0;
  const y = parseFloat(years as string) || 0;
  const r = (parseFloat(rate as string) || 0) / 100;

  const futureCost = a * Math.pow(1 + r, y);
  const purchasingPower = a / Math.pow(1 + r, y);

  const tourSteps = [
    { element: '#tour-inflation-inputs', popover: { title: '1. Parameters', description: 'Enter the amount, time period, and estimated inflation rate.' } },
    { element: '#tour-inflation-cost', popover: { title: '2. Future Cost', description: 'See how much more you will need to buy the same things in the future.' } },
    { element: '#tour-inflation-power', popover: { title: '3. Purchasing Power', description: 'See how much your money will actually be worth in today\'s terms.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="inflation_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div id="tour-inflation-inputs" className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setState({ amount: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setState({ years: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Average Inflation Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setState({ rate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          id="tour-inflation-cost" 
          className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl transition-all hover:shadow-md"
        >
          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Cost of Goods in {y} Years</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            <NumberTicker value={futureCost} prefix="$" decimals={2} duration={0.8} />
          </p>
          <p className="text-xs text-slate-500 mt-2">What costs ${a} today will cost ${Math.round(futureCost)} in {y} years.</p>
        </motion.div>
        
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          id="tour-inflation-power" 
          className="p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl transition-all hover:shadow-md"
        >
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Purchasing Power in {y} Years</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            <NumberTicker value={purchasingPower} prefix="$" decimals={2} duration={0.8} />
          </p>
          <p className="text-xs text-slate-500 mt-2">${a} will only buy ${Math.round(purchasingPower)} worth of today&apos;s goods.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
