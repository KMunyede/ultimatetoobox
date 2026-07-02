"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";

export function SalaryConverterClient({ defaultPeriod }: { defaultPeriod?: string }) {
  const [state, setState] = useUrlState({
    amount: "50000",
    frequency: defaultPeriod || "annually",
    hoursPerWeek: "40",
  });

  const { amount, frequency, hoursPerWeek } = state as Record<string, string>;

  const val = parseFloat(amount) || 0;
  const hours = parseFloat(hoursPerWeek) || 40;

  let annual = 0;
  if (frequency === "hourly") annual = val * hours * 52;
  else if (frequency === "daily") annual = val * 5 * 52;
  else if (frequency === "weekly") annual = val * 52;
  else if (frequency === "monthly") annual = val * 12;
  else annual = val;

  const results = [
    { label: "Annual", value: annual },
    { label: "Monthly", value: annual / 12 },
    { label: "Weekly", value: annual / 52 },
    { label: "Daily", value: annual / 52 / 5 },
    { label: "Hourly", value: annual / 52 / hours },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Inputs */}
        <div className="space-y-6">
            <div id="tour-salary-input" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm h-fit">
                <NumberInput
                  label="Amount ($)"
                  value={amount}
                  onChange={val => setState({ amount: val })}
                  min={0}
                  className="text-lg font-bold"
                />
                <Select
                  label="Frequency"
                  value={frequency}
                  onChange={e => setState({ frequency: e.target.value })}
                  options={[
                    { label: "Hourly", value: "hourly" },
                    { label: "Daily", value: "daily" },
                    { label: "Weekly", value: "weekly" },
                    { label: "Monthly", value: "monthly" },
                    { label: "Annually", value: "annually" },
                  ]}
                />
            </div>

            <div id="tour-salary-hours" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 shadow-sm">
                <NumberInput
                  label="Hours Per Week"
                  value={hoursPerWeek}
                  onChange={val => setState({ hoursPerWeek: val })}
                  min={1}
                  max={168}
                  className="text-lg font-bold"
                />
            </div>
        </div>

        {/* Results Grid */}
        <div id="tour-salary-results" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((res, idx) => (
                <div
                    key={res.label}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col justify-center ${idx === 0 ? 'bg-brand-primary text-white border-brand-primary shadow-xl sm:col-span-2' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm hover:shadow-md'}`}
                >
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${idx === 0 ? 'text-white/70' : 'text-slate-400'}`}>
                        {res.label} Pay
                    </span>
                    <div className={`font-black tracking-tighter ${idx === 0 ? 'text-5xl md:text-6xl' : 'text-2xl'}`}>
                        $<NumberTicker value={res.value} decimals={2} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
