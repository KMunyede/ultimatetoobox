"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

export function LoanCalculatorClient() {
  const [state, setState] = useUrlState({
    amount: "250000",
    rate: "6.5",
    years: "30",
  });

  const { amount, rate, years } = state as Record<string, string>;

  const P = parseFloat(amount);
  const r = parseFloat(rate) / 100 / 12;
  const n = parseFloat(years) * 12;

  let monthlyPayment = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayable = monthlyPayment * n;
    totalInterest = totalPayable - P;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <NumberInput
            label="Loan Amount ($)"
            value={amount}
            onChange={val => setState({ amount: val })}
            placeholder="e.g. 250000"
            min={0}
          />
          <NumberInput
            label="Annual Interest Rate (%)"
            value={rate}
            onChange={val => setState({ rate: val })}
            placeholder="e.g. 6.5"
            min={0}
            max={100}
            step={0.01}
          />
          <NumberInput
            label="Loan Term (Years)"
            value={years}
            onChange={val => setState({ years: val })}
            placeholder="e.g. 30"
            min={1}
            max={50}
          />
        </div>

        {/* Results */}
        <div id="tour-loan-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2 py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Payment</span>
            <div className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={monthlyPayment} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Interest</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalInterest} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Payable</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalPayable} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
