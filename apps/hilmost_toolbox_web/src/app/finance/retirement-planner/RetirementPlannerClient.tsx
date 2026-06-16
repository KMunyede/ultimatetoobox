"use client";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function RetirementPlannerClient() {
  const [state, setState] = useUrlState({
    currentAge: "30",
    retireAge: "65",
    currentSavings: "50000",
    monthlyContribution: "1000",
    expectedReturn: "7",
  });

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
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="retirement_planner" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Inputs */}
        <div id="tour-retire-inputs" className="space-y-5 md:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setState({ currentAge: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Retirement Age</label>
              <input
                type="number"
                value={retireAge}
                onChange={(e) => setState({ retireAge: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Savings</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500">$</span>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setState({ currentSavings: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setState({ monthlyContribution: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expected Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setState({ expectedReturn: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400"
            />
          </div>
        </div>

        {/* Results & Chart */}
        <div className="md:col-span-2 flex flex-col">
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            id="tour-retire-results" 
            className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30 mb-6 flex-shrink-0 transition-all hover:shadow-md"
          >
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Projected Savings at Age {retireAge}</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white flex items-center">
              <NumberTicker value={finalBalance} prefix="$" duration={0.8} />
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Based on {Math.max(0, parseInt(retireAge as string) - parseInt(currentAge as string))} years of compounding.
            </p>
          </motion.div>

          <div id="tour-retire-chart" className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="age" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `Age ${val}`} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  labelFormatter={(label) => `Age ${label}`}
                  formatter={(value: unknown) => formatCurrency(Number(value))}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="balance" name="Projected Savings" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
