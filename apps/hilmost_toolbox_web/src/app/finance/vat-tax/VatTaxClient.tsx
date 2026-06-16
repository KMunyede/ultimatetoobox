"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function VatTaxClient() {
  const [state, setState] = useUrlState({
    amount: "",
    rate: "15",
    mode: "add" as "add" | "remove",
  });

  const { amount, rate, mode } = state;

  const a = parseFloat(amount as string) || 0;
  const r = (parseFloat(rate as string) || 0) / 100;

  let net = 0, vat = 0, gross = 0;

  if (mode === "add") {
    net = a;
    vat = a * r;
    gross = a + vat;
  } else {
    gross = a;
    net = a / (1 + r);
    vat = gross - net;
  }

  const tourSteps = [
    { element: '#tour-vat-mode', popover: { title: '1. Tax Direction', description: 'Choose whether you want to add VAT to a price, or extract/remove VAT from a price.' } },
    { element: '#tour-vat-inputs', popover: { title: '2. Amounts & Rates', description: 'Enter the amount and the applicable VAT/GST rate.' } },
    { element: '#tour-vat-results', popover: { title: '3. Tax Breakdown', description: 'View the net amount, the tax charged, and the final gross amount.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="vat_tax_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      
      <div id="tour-vat-mode" className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6 relative">
        <button
          onClick={() => setState({ mode: "add" })}
          className={`relative z-10 flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
            mode === "add" 
              ? "text-slate-900 dark:text-white" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Add VAT (Exclusive)
        </button>
        <button
          onClick={() => setState({ mode: "remove" })}
          className={`relative z-10 flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
            mode === "remove" 
              ? "text-slate-900 dark:text-white" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Remove VAT (Inclusive)
        </button>
        
        {/* Animated background pill */}
        <div className="absolute inset-1 flex pointer-events-none">
          <motion.div
            layout
            className="w-1/2 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
            initial={false}
            animate={{ x: mode === "add" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div id="tour-vat-inputs" className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount</label>
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
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tax Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={rate}
              onChange={(e) => setState({ rate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
            <span className="absolute right-4 top-3 text-slate-500">%</span>
          </div>
        </div>
      </div>

      <motion.div layout id="tour-vat-results" className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4 transition-all hover:shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Net Amount (excl. VAT)</span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
            <NumberTicker value={net} prefix="$" decimals={2} duration={0.6} />
          </span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">VAT Amount</span>
          <span className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center">
            +<NumberTicker value={vat} prefix="$" decimals={2} duration={0.6} />
          </span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">Gross Amount (incl. VAT)</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
            <NumberTicker value={gross} prefix="$" decimals={2} duration={0.6} />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
