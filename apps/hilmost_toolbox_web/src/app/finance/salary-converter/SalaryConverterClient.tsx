"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

type Period = "hourly" | "daily" | "weekly" | "monthly" | "annually";

export function SalaryConverterClient({ defaultPeriod = "annually" }: { defaultPeriod?: Period }) {
  const [state, setState] = useUrlState({
    amount: "50000",
    period: defaultPeriod,
    hoursPerWeek: "40",
  });

  const { amount, period, hoursPerWeek } = state;

  const h = parseFloat(hoursPerWeek as string) || 40;
  const a = parseFloat(amount as string) || 0;

  let annual = 0;
  if (period === "hourly") annual = a * h * 52;
  else if (period === "daily") annual = a * 5 * 52;
  else if (period === "weekly") annual = a * 52;
  else if (period === "monthly") annual = a * 12;
  else if (period === "annually") annual = a;

  const hourly = annual / 52 / h;
  const daily = annual / 52 / 5;
  const weekly = annual / 52;
  const monthly = annual / 12;

  const tourSteps = [
    { element: '#tour-salary-inputs', popover: { title: '1. Input Salary', description: 'Enter your pay amount, frequency, and typical hours per week.' } },
    { element: '#tour-salary-results', popover: { title: '2. Conversions', description: 'Instantly view the equivalent pay rate across all other time periods.' } },
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
        <ToolTutorial tourId="salary_converter" steps={tourSteps} buttonText="How to use" />
      </div>
      <div id="tour-salary-inputs" className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Salary Amount</label>
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Pay Period</label>
            <select
              value={period}
              onChange={(e) => setState({ period: e.target.value as Period })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Hours per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setState({ hoursPerWeek: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
        </div>
      </div>

      <div id="tour-salary-results" className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
        <ResultRow label="Hourly" value={hourly} highlight={period === "hourly"} />
        <ResultRow label="Daily" value={daily} highlight={period === "daily"} />
        <ResultRow label="Weekly" value={weekly} highlight={period === "weekly"} />
        <ResultRow label="Monthly" value={monthly} highlight={period === "monthly"} />
        <ResultRow label="Annually" value={annual} highlight={period === "annually"} isLast />
      </div>
    </motion.div>
  );

  function ResultRow({ label, value, highlight, isLast }: { label: string, value: number, highlight: boolean, isLast?: boolean }) {
    return (
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex justify-between items-center p-3 ${!isLast ? 'border-b border-slate-200 dark:border-slate-700' : ''} ${highlight ? 'bg-blue-50 dark:bg-blue-900/20 rounded-xl' : ''}`}
      >
        <span className={`text-sm ${highlight ? 'font-semibold text-blue-700 dark:text-blue-300' : 'font-medium text-slate-500 dark:text-slate-400'}`}>{label}</span>
        <span className={`text-lg flex items-center ${highlight ? 'font-bold text-blue-700 dark:text-blue-300' : 'font-semibold text-slate-900 dark:text-white'}`}>
          <NumberTicker value={value} prefix="$" decimals={2} duration={0.6} />
        </span>
      </motion.div>
    );
  }
}
