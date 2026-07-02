"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

export function IncomeTaxClient() {
  const [state, setState] = useUrlState({
    salary: "85000",
    taxRate: "22",
    deductions: "13850",
  });

  const { salary, taxRate, deductions } = state as Record<string, string>;

  const gross = parseFloat(salary) || 0;
  const rate = parseFloat(taxRate) || 0;
  const deduct = parseFloat(deductions) || 0;

  const taxable = Math.max(0, gross - deduct);
  const taxAmount = taxable * (rate / 100);
  const netAnnual = gross - taxAmount;
  const netMonthly = netAnnual / 12;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm h-fit">
          <NumberInput
            label="Annual Gross Salary ($)"
            value={salary}
            onChange={val => setState({ salary: val })}
            placeholder="e.g. 85000"
            min={0}
            className="text-lg font-bold"
          />
          <NumberInput
            label="Annual Deductions ($)"
            value={deductions}
            onChange={val => setState({ deductions: val })}
            placeholder="e.g. 13850"
            min={0}
            className="text-lg font-bold"
          />
          <NumberInput
            label="Estimated Tax Rate (%)"
            value={taxRate}
            onChange={val => setState({ taxRate: val })}
            placeholder="e.g. 22"
            min={0}
            max={100}
            step={0.1}
            className="text-lg font-bold"
          />
        </div>

        {/* Results Dashboard */}
        <div id="tour-tax-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2 py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Take-Home</span>
            <div className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={netMonthly} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Net</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={netAnnual} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tax Paid</span>
                <p className="text-2xl font-black text-rose-500">$<NumberTicker value={taxAmount} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
