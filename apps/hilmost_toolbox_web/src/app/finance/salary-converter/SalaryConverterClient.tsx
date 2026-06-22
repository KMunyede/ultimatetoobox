"use client";
import { ToolTutorial, NumberTicker, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function SalaryConverterClient({ defaultPeriod }: { defaultPeriod?: string }) {
  const [state, setState] = useUrlState({
    amount: "50000",
    frequency: defaultPeriod || "annually",
    hoursPerWeek: "40",
  });

  const { amount, frequency, hoursPerWeek } = state;

  const val = parseFloat(amount as string) || 0;
  const hours = parseFloat(hoursPerWeek as string) || 40;

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

  const tourSteps = [
    { element: '#tour-salary-input', popover: { title: '1. Current Wage', description: 'Enter your current pay amount and how often you receive it (e.g. $25 Hourly).' } },
    { element: '#tour-salary-hours', popover: { title: '2. Work Week', description: 'Adjust your average working hours per week for more accurate results.' } },
    { element: '#tour-salary-results', popover: { title: '3. Full Breakdown', description: 'See how your wage translates across all timeframes instantly.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sidebar Inputs */}
        <div className="space-y-6">
            <div id="tour-salary-input" className="bg-canvas-card border border-base rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Amount ($)</label>
                    <Tooltip content="The base pay amount to convert" position="top">
                        <input
                            type="number"
                            title="Base Pay Amount"
                            className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            value={amount}
                            onChange={e => setState({ amount: e.target.value })}
                        />
                    </Tooltip>
                </div>
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Frequency</label>
                    <Tooltip content="How often this amount is earned" position="top">
                        <select
                            title="Payment Frequency"
                            className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-bold outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                            value={frequency}
                            onChange={e => setState({ frequency: e.target.value })}
                        >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="annually">Annually</option>
                        </select>
                    </Tooltip>
                </div>
            </div>

            <div id="tour-salary-hours" className="bg-canvas-card border border-base rounded-2xl p-5 space-y-2 shadow-sm">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Hours Per Week</label>
                <Tooltip content="The average number of hours you work each week" position="top">
                    <input
                        type="number"
                        title="Weekly Work Hours"
                        className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        value={hoursPerWeek}
                        onChange={e => setState({ hoursPerWeek: e.target.value })}
                    />
                </Tooltip>
            </div>
        </div>

        {/* Results Grid */}
        <div id="tour-salary-results" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((res, idx) => (
                <div
                    key={res.label}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-center ${idx === 0 ? 'bg-brand-primary text-white border-brand-primary shadow-xl sm:col-span-2' : 'bg-canvas-card border-base text-text-primary shadow-sm hover:shadow-md'}`}
                >
                    <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${idx === 0 ? 'text-white/70' : 'text-text-muted'}`}>
                        {res.label} Pay
                    </span>
                    <div className={`font-black tracking-tighter ${idx === 0 ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                        $<NumberTicker value={res.value} decimals={2} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
