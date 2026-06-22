"use client";
import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { NumberTicker, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";

// Lazy load Recharts
const AreaChart = dynamic(() => import("recharts").then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const ChartTooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="@container space-y-4"
    >

      <div className="bg-canvas-card border border-border-base rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Inputs */}
          <div id="tour-retire-inputs" className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Current Age</label>
                <Tooltip content="Your current age today" position="top">
                  <input
                    type="number"
                    title="Your Current Age"
                    inputMode="numeric"
                    value={currentAge}
                    onChange={(e) => setState({ currentAge: e.target.value })}
                    className="w-full bg-canvas-muted border border-border-base rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  />
                </Tooltip>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Retire Age</label>
                <Tooltip content="The age at which you plan to stop working" position="top">
                  <input
                    type="number"
                    title="Planned Retirement Age"
                    inputMode="numeric"
                    value={retireAge}
                    onChange={(e) => setState({ retireAge: e.target.value })}
                    className="w-full bg-canvas-muted border border-border-base rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  />
                </Tooltip>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Current Savings ($)</label>
              <Tooltip content="The total amount you have already saved for retirement" position="top">
                <input
                  type="number"
                  title="Existing Retirement Savings"
                  inputMode="decimal"
                  value={currentSavings}
                  onChange={(e) => setState({ currentSavings: e.target.value })}
                  className="w-full bg-canvas-muted border border-border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </Tooltip>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Monthly Contribution ($)</label>
              <Tooltip content="How much you plan to save every month until retirement" position="top">
                <input
                  type="number"
                  title="Monthly Savings Amount"
                  inputMode="decimal"
                  value={monthlyContribution}
                  onChange={(e) => setState({ monthlyContribution: e.target.value })}
                  className="w-full bg-canvas-muted border border-border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </Tooltip>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5 ml-1">Expected Return (%)</label>
              <Tooltip content="The estimated annual growth rate of your investments" position="top">
                <input
                  type="number"
                  title="Estimated Annual ROI Percentage"
                  inputMode="decimal"
                  value={expectedReturn}
                  onChange={(e) => setState({ expectedReturn: e.target.value })}
                  className="w-full bg-canvas-muted border border-border-base rounded-xl px-4 py-3 text-text-primary font-bold text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
              </Tooltip>
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
                    <ChartTooltip
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
