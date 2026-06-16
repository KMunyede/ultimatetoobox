"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function TipCalculatorClient() {
  const [state, setState] = useUrlState({
    bill: "",
    tipPercent: "15",
    people: "1",
  });

  const { bill, tipPercent, people } = state;

  const b = parseFloat(bill as string) || 0;
  const t = parseFloat(tipPercent as string) || 0;
  const p = parseInt(people as string) || 1;

  const tipAmount = b * (t / 100);
  const totalAmount = b + tipAmount;
  
  const tipPerPerson = tipAmount / p;
  const totalPerPerson = totalAmount / p;

  const tourSteps = [
    { element: '#tour-tip-inputs', popover: { title: '1. Bill Details', description: 'Enter the bill amount, adjust your tip percentage, and set how many people are splitting it.' } },
    { element: '#tour-tip-results', popover: { title: '2. Your Share', description: 'Instantly see the tip and total amount owed per person.' } },
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
        <ToolTutorial tourId="tip_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div id="tour-tip-inputs" className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-500">$</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setState({ bill: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
        </div>
        
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Tip Percentage</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{tipPercent}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={tipPercent}
            onChange={(e) => setState({ tipPercent: e.target.value })}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0%</span>
            <span>15%</span>
            <span>30%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Number of People</label>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setState({ people: String(Math.max(1, p - 1)) })}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="text-xl font-semibold text-slate-900 dark:text-white w-8 text-center">{p}</span>
            <button 
              onClick={() => setState({ people: String(p + 1) })}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div id="tour-tip-results" className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4 transition-all hover:shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Tip Amount</p>
            <p className="text-xs text-slate-500">/ person</p>
          </div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
            <NumberTicker value={tipPerPerson} prefix="$" decimals={2} duration={0.5} />
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Total</p>
            <p className="text-xs text-slate-500">/ person</p>
          </div>
          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
            <NumberTicker value={totalPerPerson} prefix="$" decimals={2} duration={0.5} />
          </span>
        </div>
      </div>

      {p > 1 && (
        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          Total Bill with Tip: <span className="font-semibold text-slate-700 dark:text-slate-300"><NumberTicker value={totalAmount} prefix="$" decimals={2} duration={0.5} /></span>
        </div>
      )}
    </motion.div>
  );
}
