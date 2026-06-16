"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function LoanCalculatorClient() {
  const [state, setState] = useUrlState({
    principal: "10000",
    rate: "5",
    years: "5",
  });

  const { principal, rate, years } = state;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  const p = parseFloat(principal as string) || 0;
  const r = (parseFloat(rate as string) || 0) / 100 / 12; // monthly interest rate
  const n = (parseFloat(years as string) || 0) * 12; // total number of months

  if (p > 0 && n > 0) {
    if (r === 0) {
      monthlyPayment = p / n;
    } else {
      monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    totalPayment = monthlyPayment * n;
    totalInterest = totalPayment - p;
  }

  const tourSteps = [
    { element: '#tour-loan-inputs', popover: { title: '1. Loan Details', description: 'Enter the principal amount, interest rate, and term of the loan.' } },
    { element: '#tour-loan-payment', popover: { title: '2. Monthly Payment', description: 'This is your required monthly payment to pay off the loan in time.' } },
    { element: '#tour-loan-summary', popover: { title: '3. Total Cost', description: 'See how much interest you will pay and the true total cost of the loan.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="loan_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <motion.div layout id="tour-loan-inputs" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">$</span>
            <input
              type="number"
              className="w-full h-12 pl-8 pr-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={principal}
              onChange={e => setState({ principal: e.target.value })}
              placeholder="e.g. 10000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Annual Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              className="w-full h-12 px-4 pr-8 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={rate}
              onChange={e => setState({ rate: e.target.value })}
              placeholder="e.g. 5"
            />
            <span className="absolute right-4 top-3 text-slate-400">%</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Loan Term (Years)</label>
          <input
            type="number"
            className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
            value={years}
            onChange={e => setState({ years: e.target.value })}
            placeholder="e.g. 5"
          />
        </div>
        </motion.div>

      {/* Results */}
      <motion.div layout className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-center hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Summary</h2>
        
        <div className="space-y-6">
          <div id="tour-loan-payment" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Payment</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
              <NumberTicker value={monthlyPayment} decimals={2} duration={0.8} prefix="$" />
            </div>
          </div>

          <div id="tour-loan-summary" className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Principal</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                <NumberTicker value={p > 0 && n > 0 ? p : 0} decimals={2} duration={0.8} prefix="$" />
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Interest</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white text-rose-500 dark:text-rose-400">
                <NumberTicker value={totalInterest} decimals={2} duration={0.8} prefix="$" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="text-base font-medium text-slate-700 dark:text-slate-300">Total Cost of Loan</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              <NumberTicker value={totalPayment} decimals={2} duration={0.8} prefix="$" />
            </div>
          </div>
        </div>
      </motion.div>

      </div>
    </motion.div>
  );
}
