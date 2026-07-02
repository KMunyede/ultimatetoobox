"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

// Lazy load Recharts for massive bundle size reduction on landing
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import("recharts").then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const ChartTooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });

export function CompoundInterestClient() {
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useUrlState({
    principal: "10000",
    rate: "8",
    years: "20",
    monthly: "500",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { principal, rate, years, monthly } = state as Record<string, string>;

  // Memoize calculations to prevent main-thread lag during re-renders
  const { chartData, finalBalance, totalInterest } = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const t = parseFloat(years) || 0;
    const PMT = parseFloat(monthly) || 0;

    const data = [];
    let currentBalance = P;
    let totalContrib = P;

    for (let i = 0; i <= t; i++) {
      data.push({
        year: i,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContrib),
      });

      // Calculate next year's balance (compounded monthly)
      for (let m = 0; i < t && m < 12; m++) {
        currentBalance = (currentBalance + PMT) * (1 + r);
        totalContrib += PMT;
      }
    }

    const last = data[data.length - 1];
    return {
      chartData: data,
      finalBalance: last?.balance || 0,
      totalContributions: Math.round(totalContrib),
      totalInterest: (last?.balance || 0) - Math.round(totalContrib),
    };
  }, [principal, rate, years, monthly]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Column */}
        <div id="tour-ci-inputs" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm h-fit">
          <NumberInput
            label="Initial Principal ($)"
            value={principal}
            onChange={val => setState({ principal: val })}
            min={0}
          />

          <NumberInput
            label="Monthly Contribution ($)"
            value={monthly}
            onChange={val => setState({ monthly: val })}
            min={0}
          />

          <div className="grid grid-cols-1 @[300px]:grid-cols-2 gap-5">
            <NumberInput
              label="Annual Rate (%)"
              value={rate}
              onChange={val => setState({ rate: val })}
              min={0}
              max={100}
              step={0.1}
            />
            <NumberInput
              label="Years"
              value={years}
              onChange={val => setState({ years: val })}
              min={1}
              max={100}
            />
          </div>
        </div>

        {/* Chart/Result Column */}
        <div className="lg:col-span-2 space-y-6">
            <div id="tour-ci-chart" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 relative z-10">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estimated Future Balance</span>
                        <div className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mt-1">
                            $<NumberTicker value={finalBalance} decimals={0} />
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Interest Earned</span>
                        <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                          +<NumberTicker value={totalInterest} decimals={0} />
                        </div>
                    </div>
                </div>

                <div className="h-[300px] w-full mt-4 @lg:h-[400px] relative z-10">
                    {isClient && (
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                              <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tick={{dy: 10}} />
                              <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                              <ChartTooltip
                                  contentStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                    padding: '12px'
                                  }}
                                  itemStyle={{ fontWeight: '800', fontSize: '10px', textTransform: 'uppercase' }}
                              />
                              <Area type="monotone" dataKey="balance" stroke="var(--color-brand-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorBalance)" />
                              <Area type="monotone" dataKey="contributions" stroke="#94a3b8" strokeWidth={2} fill="transparent" strokeDasharray="6 6" />
                          </AreaChart>
                      </ResponsiveContainer>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-brand-primary shadow-sm" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Total Portfolio</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-slate-300" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Total Contributions</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
