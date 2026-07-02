"use client";
import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

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
    setIsClient(true);
  }, []);

  const { currentAge, retireAge, currentSavings, monthlyContribution, expectedReturn } = state as Record<string, string>;

  const chartData = useMemo(() => {
    const age = parseInt(currentAge) || 0;
    const rAge = parseInt(retireAge) || 0;
    const p = parseFloat(currentSavings) || 0;
    const c = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100;

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
      className="@container space-y-8 my-8"
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div id="tour-retire-inputs" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Current Age"
                value={currentAge}
                onChange={val => setState({ currentAge: val })}
                min={0}
                max={100}
              />
              <NumberInput
                label="Retire Age"
                value={retireAge}
                onChange={val => setState({ retireAge: val })}
                min={0}
                max={110}
              />
            </div>

            <NumberInput
              label="Current Savings ($)"
              value={currentSavings}
              onChange={val => setState({ currentSavings: val })}
              min={0}
              className="font-bold"
            />
            <NumberInput
              label="Monthly Contribution ($)"
              value={monthlyContribution}
              onChange={val => setState({ monthlyContribution: val })}
              min={0}
              className="font-bold"
            />
            <NumberInput
              label="Expected Return (%)"
              value={expectedReturn}
              onChange={val => setState({ expectedReturn: val })}
              min={0}
              max={50}
              step={0.1}
              className="font-bold"
            />
          </div>

          {/* Results & Chart */}
          <div className="lg:col-span-2 flex flex-col space-y-8">
            <div
              id="tour-retire-results"
              className="bg-brand-primary/5 rounded-2xl p-6 border border-brand-primary/10 flex-shrink-0"
            >
              <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">Projected Savings at Age {retireAge}</p>
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                <NumberTicker value={finalBalance} prefix="$" duration={0.8} />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Based on {Math.max(0, parseInt(retireAge) - parseInt(currentAge))} years of compounding.
              </p>
            </div>

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
                    <XAxis dataKey="age" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(val) => `Age ${val}`} />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={10}
                      fontWeight="bold"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <ChartTooltip
                      labelFormatter={(label) => `Age ${label}`}
                      formatter={(value: unknown) => formatCurrency(Number(value))}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ fontWeight: '800', fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="balance" name="Savings" stroke="var(--color-brand-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalanceRetire)" />
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
