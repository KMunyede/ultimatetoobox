"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function IncomeTaxClient() {
  const [state, setState] = useUrlState({
    income: "50000",
    deductions: "10000",
    taxRate: "20",
  });

  const { income, deductions, taxRate } = state;

  let taxableIncome = 0;
  let totalTax = 0;
  let netAnnual = 0;
  let netMonthly = 0;

  const inc = parseFloat(income as string) || 0;
  const ded = parseFloat(deductions as string) || 0;
  const rate = parseFloat(taxRate as string) || 0;

  taxableIncome = Math.max(0, inc - ded);
  totalTax = (taxableIncome * rate) / 100;
  netAnnual = inc - totalTax;
  netMonthly = netAnnual / 12;

  const tourSteps = [
    { element: '#tour-tax-inputs', popover: { title: '1. Salary & Tax Info', description: 'Enter your gross annual income, any tax deductions, and your effective tax rate.' } },
    { element: '#tour-tax-results', popover: { title: '2. Tax Breakdown', description: 'See your taxable income and the estimated tax that will be withheld.' } },
    { element: '#tour-tax-monthly', popover: { title: '3. Net Monthly Pay', description: 'This is the estimated amount you will actually take home each month.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="income_tax_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <motion.div layout id="tour-tax-inputs" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Gross Annual Income</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">$</span>
            <input
              type="number"
              className="w-full h-12 pl-8 pr-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={income}
              onChange={e => setState({ income: e.target.value })}
              placeholder="e.g. 50000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Total Deductions / Non-taxable</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">$</span>
            <input
              type="number"
              className="w-full h-12 pl-8 pr-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={deductions}
              onChange={e => setState({ deductions: e.target.value })}
              placeholder="e.g. 10000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Effective Tax Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              className="w-full h-12 px-4 pr-8 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={taxRate}
              onChange={e => setState({ taxRate: e.target.value })}
              placeholder="e.g. 20"
            />
            <span className="absolute right-4 top-3 text-slate-400">%</span>
          </div>
        </div>
        </motion.div>

      {/* Results */}
      <motion.div layout id="tour-tax-results" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-center hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Take-Home Pay Summary</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Taxable Income</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <NumberTicker value={taxableIncome} prefix="$" duration={0.8} />
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Estimated Tax</div>
              <div className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center">
                - <NumberTicker value={totalTax} prefix="$" duration={0.8} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl border-l-4 border-l-blue-500">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Net Annual Income</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
              <NumberTicker value={netAnnual} prefix="$" duration={0.8} />
            </div>
          </div>
          
          <div id="tour-tax-monthly" className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="text-base font-medium text-slate-700 dark:text-slate-300">Net Monthly Pay</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-500 flex items-center gap-1">
              <NumberTicker value={netMonthly} prefix="$" duration={0.8} /> <span className="text-sm text-slate-400 font-normal">/mo</span>
            </div>
          </div>
        </div>
      </motion.div>

      </div>
    </motion.div>
  );
}
