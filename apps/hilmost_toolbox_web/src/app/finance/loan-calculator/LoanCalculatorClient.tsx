"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function LoanCalculatorClient() {
  const [state, setState] = useUrlState({
    amount: "250000",
    rate: "6.5",
    years: "30",
  });

  const { amount, rate, years } = state;

  const P = parseFloat(amount as string);
  const r = parseFloat(rate as string) / 100 / 12;
  const n = parseFloat(years as string) * 12;

  let monthlyPayment = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayable = monthlyPayment * n;
    totalInterest = totalPayable - P;
  }

  const tourSteps = [
    { element: '#tour-loan-amount', popover: { title: '1. Loan Amount', description: 'Enter the total amount you want to borrow.' } },
    { element: '#tour-loan-rate', popover: { title: '2. Interest Rate', description: 'Enter the annual interest rate offered by the bank.' } },
    { element: '#tour-loan-term', popover: { title: '3. Loan Term', description: 'How many years will the loan last? (e.g. 15 or 30)' } },
    { element: '#tour-loan-results', popover: { title: '4. Monthly Payment', description: 'Your estimated monthly payment and total interest are shown here.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="loan_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow">
          <div id="tour-loan-amount" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Loan Amount ($)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={amount}
              onChange={e => setState({ amount: e.target.value })}
              placeholder="e.g. 250000"
            />
          </div>
          <div id="tour-loan-rate" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={rate}
              onChange={e => setState({ rate: e.target.value })}
              placeholder="e.g. 6.5"
            />
          </div>
          <div id="tour-loan-term" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Loan Term (Years)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={years}
              onChange={e => setState({ years: e.target.value })}
              placeholder="e.g. 30"
            />
          </div>
        </div>

        {/* Results */}
        <div id="tour-loan-results" className="bg-canvas-card border border-base rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2">
            <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Monthly Payment</span>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={monthlyPayment} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Interest</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={totalInterest} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Payable</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={totalPayable} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
