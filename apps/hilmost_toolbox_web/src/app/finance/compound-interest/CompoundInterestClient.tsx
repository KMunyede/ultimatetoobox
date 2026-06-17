"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function CompoundInterestClient() {
  const [state, setState] = useUrlState({
    principal: "10000",
    rate: "8",
    years: "20",
    monthly: "500",
  });

  const { principal, rate, years, monthly } = state;

  const P = parseFloat(principal as string) || 0;
  const r = (parseFloat(rate as string) || 0) / 100 / 12;
  const t = parseFloat(years as string) || 0;
  const PMT = parseFloat(monthly as string) || 0;

  const chartData = [];
  let currentBalance = P;
  let totalContributions = P;

  for (let i = 0; i <= t; i++) {
    chartData.push({
      year: i,
      balance: Math.round(currentBalance),
      contributions: Math.round(totalContributions),
    });

    // Calculate next year's balance (compounded monthly)
    for (let m = 0; i < t && m < 12; m++) {
      currentBalance = (currentBalance + PMT) * (1 + r);
      totalContributions += PMT;
    }
  }

  const finalBalance = chartData[chartData.length - 1].balance;
  const totalInterest = finalBalance - totalContributions;

  const tourSteps = [
    { element: '#tour-ci-inputs', popover: { title: '1. Strategy', description: 'Enter your initial deposit, monthly contribution, and expected return.' } },
    { element: '#tour-ci-chart', popover: { title: '2. Growth Visualization', description: 'Watch the "Snowball Effect" happen as your interest starts earning its own interest.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="compound_interest" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div id="tour-ci-inputs" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow h-fit">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Initial Principal ($)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={principal}
              onChange={e => setState({ principal: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Monthly Contribution ($)</label>
            <input
              type="number"
              className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              value={monthly}
              onChange={e => setState({ monthly: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Annual Rate (%)</label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                value={rate}
                onChange={e => setState({ rate: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Years</label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                value={years}
                onChange={e => setState({ years: e.target.value })}
                />
            </div>
          </div>
        </div>

        {/* Chart/Result Column */}
        <div className="lg:col-span-2 space-y-6">
            <div id="tour-ci-chart" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Estimated Future Balance</span>
                        <div className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter">
                            $<NumberTicker value={finalBalance} decimals={0} />
                        </div>
                    </div>
                    <div className="text-right sm:text-right">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Interest Earned</span>
                        <p className="text-xl font-bold text-text-primary">+$<NumberTicker value={totalInterest} decimals={0} /></p>
                    </div>
                </div>

                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                            <XAxis dataKey="year" stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--color-canvas-card)', borderRadius: '12px', border: '1px solid var(--color-border-base)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="balance" stroke="var(--color-brand-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                            <Area type="monotone" dataKey="contributions" stroke="var(--color-text-muted)" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-primary" />
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Balance</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border-2 border-dashed border-text-muted" />
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Contributions</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
