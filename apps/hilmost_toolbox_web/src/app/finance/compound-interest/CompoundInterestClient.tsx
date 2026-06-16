"use client";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function CompoundInterestClient() {
  const [state, setState] = useUrlState({
    principal: "10000",
    contribution: "500",
    years: "10",
    rate: "7",
  });

  const { principal, contribution, years, rate } = state;

  const chartData = useMemo(() => {
    const p = parseFloat(principal as string) || 0;
    const c = parseFloat(contribution as string) || 0;
    const y = parseInt(years as string) || 0;
    const r = (parseFloat(rate as string) || 0) / 100;

    const data = [];
    let currentBalance = p;
    let totalContributions = p;

    for (let i = 0; i <= y; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          currentBalance = currentBalance * (1 + r / 12) + c;
          totalContributions += c;
        }
      }
      data.push({
        year: `Year ${i}`,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContributions),
        interest: Math.round(currentBalance - totalContributions),
      });
    }
    return data;
  }, [principal, contribution, years, rate]);

  const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1].balance : 0;
  const finalContributions = chartData.length > 0 ? chartData[chartData.length - 1].contributions : 0;
  const finalInterest = finalBalance - finalContributions;

  const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const tourSteps = [
    { element: '#tour-compound-inputs', popover: { title: '1. Set Parameters', description: 'Enter your starting amount, monthly contributions, duration, and expected interest rate.' } },
    { element: '#tour-compound-results', popover: { title: '2. Future Value', description: 'See your projected total balance, including a breakdown of principal vs. interest.' } },
    { element: '#tour-compound-chart', popover: { title: '3. Growth Chart', description: 'Visualize the power of compound interest accelerating your wealth over time.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="compound_interest_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Inputs */}
        <motion.div layout id="tour-compound-inputs" className="space-y-5 md:col-span-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Initial Deposit</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setState({ principal: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500">$</span>
              <input
                type="number"
                value={contribution}
                onChange={(e) => setState({ contribution: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Years to Grow</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setState({ years: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setState({ rate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-blue-400"
            />
          </div>
        </motion.div>

        {/* Results & Chart */}
        <motion.div layout className="md:col-span-2 space-y-6">
          <div id="tour-compound-results" className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Total Future Value</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <NumberTicker value={finalBalance} prefix="$" duration={0.8} />
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900/30 transition-all hover:shadow-md">
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider">Total Interest</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 flex items-center">
                <NumberTicker value={finalInterest} prefix="$" duration={0.8} />
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 col-span-2 md:col-span-1 transition-all hover:shadow-md">
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Total Principal</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <NumberTicker value={finalContributions} prefix="$" duration={0.8} />
              </p>
            </div>
          </div>

          <div id="tour-compound-chart" className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  formatter={(value: unknown) => formatCurrency(Number(value))}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="balance" name="Total Value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" />
                <Area type="monotone" dataKey="contributions" name="Principal" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrincipal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
