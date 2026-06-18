"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function IncomeTaxClient() {
  const [state, setState] = useUrlState({
    salary: "85000",
    taxRate: "22",
    deductions: "13850",
  });

  const { salary, taxRate, deductions } = state;

  const gross = parseFloat(salary as string) || 0;
  const rate = parseFloat(taxRate as string) || 0;
  const deduct = parseFloat(deductions as string) || 0;

  const taxable = Math.max(0, gross - deduct);
  const taxAmount = taxable * (rate / 100);
  const netAnnual = gross - taxAmount;
  const netMonthly = netAnnual / 12;

  const tourSteps = [
    { element: '#tour-tax-salary', popover: { title: '1. Gross Salary', description: 'Enter your total annual income before any taxes or deductions.' } },
    { element: '#tour-tax-deductions', popover: { title: '2. Total Deductions', description: 'Enter your total annual deductions (e.g. Standard Deduction, 401k).' } },
    { element: '#tour-tax-rate', popover: { title: '3. Effective Rate', description: 'Enter your estimated effective tax rate as a percentage.' } },
    { element: '#tour-tax-results', popover: { title: '4. Net Pay', description: 'Your estimated take-home pay is calculated instantly here.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="income_tax_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Form */}
        <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-5 space-y-6 shadow-sm hover:shadow-md transition-shadow">
          <div id="tour-tax-salary" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Annual Gross Salary ($)</label>
            <input
              type="number"
              className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={salary}
              onChange={e => setState({ salary: e.target.value })}
              placeholder="e.g. 85000"
            />
          </div>
          <div id="tour-tax-deductions" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Annual Deductions ($)</label>
            <input
              type="number"
              className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={deductions}
              onChange={e => setState({ deductions: e.target.value })}
              placeholder="e.g. 13850"
            />
          </div>
          <div id="tour-tax-rate" className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Estimated Tax Rate (%)</label>
            <input
              type="number"
              className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={taxRate}
              onChange={e => setState({ taxRate: e.target.value })}
              placeholder="e.g. 22"
            />
          </div>
        </div>

        {/* Results Dashboard */}
        <div id="tour-tax-results" className="bg-canvas-card border border-base rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2">
            <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Monthly Take-Home</span>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={netMonthly} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Annual Net</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={netAnnual} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Tax Paid</span>
                <p className="text-xl font-bold text-red-500">$<NumberTicker value={taxAmount} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
