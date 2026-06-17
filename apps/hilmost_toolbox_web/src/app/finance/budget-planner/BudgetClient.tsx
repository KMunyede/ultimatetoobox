"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function BudgetClient() {
  const [state, setState] = useUrlState({
    income: "5000",
  });

  const { income } = state;

  const total = parseFloat(income as string) || 0;

  const needs = total * 0.50;
  const wants = total * 0.30;
  const savings = total * 0.20;

  const data = [
    { name: "Needs (50%)", value: needs, color: "var(--color-brand-primary)" },
    { name: "Wants (30%)", value: wants, color: "#fbbf24" }, // amber-400
    { name: "Savings (20%)", value: savings, color: "#3b82f6" }, // blue-500
  ];

  const tourSteps = [
    { element: '#tour-budget-input', popover: { title: '1. Monthly Income', description: 'Enter your total monthly take-home pay.' } },
    { element: '#tour-budget-viz', popover: { title: '2. The 50/30/20 Rule', description: 'See how your income should be divided between essential needs, personal wants, and financial goals.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="budget_planner" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
            <div id="tour-budget-input" className="bg-canvas-card border border-base rounded-3xl p-8 shadow-sm">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-3 ml-1">Monthly Take-Home Pay ($)</label>
                <input
                    type="number"
                    className="w-full h-16 px-5 border border-base rounded-2xl bg-canvas-muted text-text-primary text-2xl font-black focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                    value={income}
                    onChange={e => setState({ income: e.target.value })}
                    placeholder="e.g. 5000"
                />
                <p className="mt-4 text-xs text-text-secondary leading-relaxed italic">
                    The 50/30/20 rule is a simple thumb-rule for personal budgeting.
                </p>
            </div>

            <div className="space-y-3">
                {data.map((item) => (
                    <div key={item.name} className="bg-canvas-card border border-base rounded-2xl p-4 flex items-center justify-between group hover:border-brand-primary/50 transition-colors shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="font-bold text-text-primary">{item.name.split(' ')[0]}</span>
                        </div>
                        <div className="text-xl font-black text-text-primary">
                            $<NumberTicker value={item.value} decimals={0} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Visualization */}
        <div id="tour-budget-viz" className="bg-canvas-card border border-base rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl relative min-h-[400px]">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--color-canvas-card)', borderRadius: '12px', border: '1px solid var(--color-border-base)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Budget</span>
                <span className="text-2xl font-black text-text-primary">${total}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-sm">
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Needs</p>
                    <div className="h-1.5 w-full bg-brand-primary rounded-full opacity-30" />
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Wants</p>
                    <div className="h-1.5 w-full bg-amber-400 rounded-full opacity-30" />
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Savings</p>
                    <div className="h-1.5 w-full bg-blue-500 rounded-full opacity-30" />
                 </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
