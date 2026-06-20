"use client";
import { useMemo, useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function RetirementPlannerClient() {
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useUrlState({
    currentAge: "30",
    retireAge: "65",
    currentSavings: "50000",
    monthlyContribution: "1000",
    expectedReturn: "7",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { currentAge, retireAge, currentSavings, monthlyContribution, expectedReturn } = state;

  const chartData = useMemo(() => {
    const age = parseInt(currentAge as string) || 0;
    const rAge = parseInt(retireAge as string) || 0;
    const p = parseFloat(currentSavings as string) || 0;
    const c = parseFloat(monthlyContribution as string) || 0;
    const r = (parseFloat(expectedReturn as string) || 0) / 100;

    const years = Math.max(0, rAge - age);
    const data = [];
    let balance = p;

    for (let i = 0; i <= years; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + r / 12) + c;
        }
      }
      data.push({
        age: age + i,
        balance: Math.round(balance),
      });
    }
    return data;
  }, [currentAge, retireAge, currentSavings, monthlyContribution, expectedReturn]);

  const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1].balance : 0;
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const tourSteps = [
    { element: '#tour-retire-inputs', popover: { title: '1. Plan Details', description: 'Enter your ages, current savings, contributions, and expected returns.' } },
    { element: '#tour-retire-results', popover: { title: '2. Projected Savings', description: 'See how much you are projected to have saved by your retirement age.' } },
    { element: '#tour-retire-chart', popover: { title: '3. Growth Trajectory', description: 'Visualize your wealth accumulation over time leading up to retirement.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="retirement_planner" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Inputs */}
          <div id="tour-retire-inputs" className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Current Age</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentAge}
                  onChange={(e) => setState({ currentAge: e.target.value })}
                  className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Retire Age</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={retireAge}
                  onChange={(e) => setState({ retireAge: e.target.value })}
                  className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Current Savings ($)</label>
              <input
                type="number"
                inputMode="decimal"
                value={currentSavings}
                onChange={(e) => setState({ currentSavings: e.target.value })}
                className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Monthly Contribution ($)</label>
              <input
                type="number"
                inputMode="decimal"
                value={monthlyContribution}
                onChange={(e) => setState({ monthlyContribution: e.target.value })}
                className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Expected Return (%)</label>
              <input
                type="number"
                inputMode="decimal"
                value={expectedReturn}
                onChange={(e) => setState({ expectedReturn: e.target.value })}
                className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Results & Chart */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <motion.div
              layout
              id="tour-retire-results"
              className="bg-brand-primary/5 rounded-2xl p-6 border border-brand-primary/10 flex-shrink-0 transition-all hover:shadow-md"
            >
              <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Projected Savings at Age {retireAge}</p>
              <div className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter">
                <NumberTicker value={finalBalance} prefix="$" duration={0.8} />
              </div>
              <p className="text-sm text-text-muted mt-2">
                Based on {Math.max(0, parseInt(retireAge as string) - parseInt(currentAge as string))} years of compounding.
              </p>
            </motion.div>

            <div id="tour-retire-chart" className="flex-1 min-h-[300px] w-full @lg:h-[350px]">
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalanceRetire" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="age" stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `Age ${val}`} />
                    <YAxis
                      stroke="var(--color-text-muted)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <Tooltip
                      labelFormatter={(label) => `Age ${label}`}
                      formatter={(value: unknown) => formatCurrency(Number(value))}
                      contentStyle={{ backgroundColor: 'var(--color-canvas-card)', borderRadius: '12px', border: '1px solid var(--color-border-base)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Area type="monotone" dataKey="balance" name="Projected Savings" stroke="var(--color-brand-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalanceRetire)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
