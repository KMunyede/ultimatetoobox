"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

export function WACCCalculatorClient() {
  const [state, setState] = useUrlState({
    marketCap: "500000000",
    beta: "1.2",
    riskFreeRate: "4.2",
    equityPremium: "5.5",
    totalDebt: "250000000",
    interestRate: "6.0",
    taxRate: "25.0",
  });

  const { marketCap, beta, riskFreeRate, equityPremium, totalDebt, interestRate, taxRate } = state as Record<string, string>;

  // Parse values
  const E = parseFloat(marketCap) || 0;
  const b = parseFloat(beta) || 0;
  const rf = parseFloat(riskFreeRate) / 100 || 0;
  const erm = parseFloat(equityPremium) / 100 || 0;
  const D = parseFloat(totalDebt) || 0;
  const rd = parseFloat(interestRate) / 100 || 0;
  const T = parseFloat(taxRate) / 100 || 0;

  // 1. Cost of Equity (CAPM)
  const Re = rf + b * erm;

  // 2. Cost of Debt (After-tax)
  const RdAfterTax = rd * (1 - T);

  // 3. Total Value
  const V = E + D;

  // 4. WACC
  const wacc = V > 0 ? (E / V) * Re + (D / V) * RdAfterTax : 0;

  // 5. Tax Shield Savings (Yearly)
  const taxShield = D * rd * T;

  const equityWeight = V > 0 ? (E / V) * 100 : 0;
  const debtWeight = V > 0 ? (D / V) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Sections */}
        <div className="space-y-8">
          {/* Section 1: Equity & CAPM */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm border-l-4 border-l-brand-primary">
            <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px]">1</span>
              Equity & CAPM Inputs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Market Cap ($)"
                value={marketCap}
                onChange={val => setState({ marketCap: val })}
                min={0}
              />
              <NumberInput
                label="Beta (Risk)"
                value={beta}
                onChange={val => setState({ beta: val })}
                min={0}
                step={0.01}
              />
              <NumberInput
                label="Risk-Free Rate (%)"
                value={riskFreeRate}
                onChange={val => setState({ riskFreeRate: val })}
                min={0}
                max={100}
                step={0.01}
              />
              <NumberInput
                label="Equity Risk Prem (%)"
                value={equityPremium}
                onChange={val => setState({ equityPremium: val })}
                min={0}
                max={100}
                step={0.01}
              />
            </div>
          </div>

          {/* Section 2: Debt & Taxes */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm border-l-4 border-l-rose-500">
            <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-[10px]">2</span>
              Debt & Taxes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Total Debt ($)"
                value={totalDebt}
                onChange={val => setState({ totalDebt: val })}
                min={0}
              />
              <NumberInput
                label="Interest Rate (%)"
                value={interestRate}
                onChange={val => setState({ interestRate: val })}
                min={0}
                max={100}
                step={0.01}
              />
              <div className="sm:col-span-2">
                <NumberInput
                  label="Corporate Tax Rate (%)"
                  value={taxRate}
                  onChange={val => setState({ taxRate: val })}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Results */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center flex-1 flex flex-col justify-center py-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Calculated WACC</span>
            <div className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
              <NumberTicker value={wacc * 100} decimals={2} />%
            </div>
            <p className="mt-6 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 inline-block px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700 mx-auto">
              {wacc < 0.1 ? "Efficient Capital Structure" : "High Risk Required"}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost of Equity</span>
                <p className="text-xl font-black text-brand-primary">{(Re * 100).toFixed(2)}%</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost of Debt</span>
                <p className="text-xl font-black text-rose-500">{(RdAfterTax * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="relative z-10 mt-8 bg-brand-primary/5 rounded-2xl p-5 border border-brand-primary/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Tax Shield Savings</span>
              <span className="text-[9px] font-black text-slate-400 uppercase">Yearly Est.</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              $<NumberTicker value={taxShield} decimals={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Capital Structure Breakdown */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Capital Structure Breakdown</h4>
        <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div style={{ width: `${equityWeight}%` }} className="h-full bg-brand-primary transition-all duration-1000" />
          <div style={{ width: `${debtWeight}%` }} className="h-full bg-rose-500 transition-all duration-1000" />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-primary" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Equity: {equityWeight.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Debt: {debtWeight.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
