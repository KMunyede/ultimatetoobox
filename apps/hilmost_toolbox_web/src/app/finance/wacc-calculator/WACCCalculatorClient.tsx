"use client";
import { NumberTicker, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";

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

  // Parse values
  const E = parseFloat(state.marketCap as string) || 0;
  const beta = parseFloat(state.beta as string) || 0;
  const rf = parseFloat(state.riskFreeRate as string) / 100 || 0;
  const erm = parseFloat(state.equityPremium as string) / 100 || 0;
  const D = parseFloat(state.totalDebt as string) || 0;
  const rd = parseFloat(state.interestRate as string) / 100 || 0;
  const T = parseFloat(state.taxRate as string) / 100 || 0;

  // 1. Cost of Equity (CAPM)
  const Re = rf + beta * erm;

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
      className="@container space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Sections */}
        <div className="space-y-6">
          {/* Section 1: Equity & CAPM */}
          <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-6 space-y-5 shadow-sm border-l-4 border-l-blue-500">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
              Equity & CAPM Inputs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Market Cap ($)</label>
                <Tooltip content="The total market value of all company shares. (Market Price x Total Shares)" position="top">
                  <input
                    type="number"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    value={state.marketCap}
                    onChange={e => setState({ marketCap: e.target.value })}
                  />
                </Tooltip>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Beta (Risk)</label>
                <Tooltip content="Measure of stock volatility compared to the market. Average is 1.0. High risk is > 1.0." position="top">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    value={state.beta}
                    onChange={e => setState({ beta: e.target.value })}
                  />
                </Tooltip>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Risk-Free Rate (%)</label>
                <Tooltip content="The return on investment with zero risk, typically the 10-year Treasury Bond rate." position="top">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    value={state.riskFreeRate}
                    onChange={e => setState({ riskFreeRate: e.target.value })}
                  />
                </Tooltip>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Equity Risk Prem (%)</label>
                <Tooltip content="The extra return investors demand for choosing stocks over risk-free bonds. Usually 5-6%." position="top">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    value={state.equityPremium}
                    onChange={e => setState({ equityPremium: e.target.value })}
                  />
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Section 2: Debt & Taxes */}
          <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-6 space-y-5 shadow-sm border-l-4 border-l-red-500">
            <h3 className="text-sm font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[10px]">2</span>
              Debt & Taxes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Total Debt ($)</label>
                <Tooltip content="All interest-bearing debt (Short-term + Long-term loans)." position="top">
                  <input
                    type="number"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                    value={state.totalDebt}
                    onChange={e => setState({ totalDebt: e.target.value })}
                  />
                </Tooltip>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Interest Rate (%)</label>
                <Tooltip content="The average annual interest rate the company pays on its debt." position="top">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                    value={state.interestRate}
                    onChange={e => setState({ interestRate: e.target.value })}
                  />
                </Tooltip>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Corporate Tax Rate (%)</label>
                <Tooltip content="The percentage of profit paid in taxes. Debt interest is tax-deductible!" position="top">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full h-11 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                    value={state.taxRate}
                    onChange={e => setState({ taxRate: e.target.value })}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Results */}
        <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 flex flex-col shadow-xl relative overflow-hidden bg-gradient-to-br from-white via-white to-amber-50/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="relative z-10 text-center flex-1 flex flex-col justify-center py-8">
            <span className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-2">Total WACC</span>
            <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">
              <NumberTicker value={wacc * 100} decimals={2} />%
            </div>
            <p className="mt-4 text-xs font-bold text-text-muted bg-white/50 inline-block px-4 py-2 rounded-full border border-base mx-auto">
              {wacc < 0.1 ? "Efficient Capital Structure" : "High Risk / High Return Requirement"}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-base/50">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Cost of Equity</span>
                <p className="text-xl font-black text-blue-600">{(Re * 100).toFixed(2)}%</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Cost of Debt</span>
                <p className="text-xl font-black text-red-600">{(RdAfterTax * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="relative z-10 mt-8 bg-brand-primary/5 rounded-2xl p-5 border border-brand-primary/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Tax Shield Savings</span>
              <span className="text-xs font-bold text-text-muted">Yearly Estimate</span>
            </div>
            <div className="text-2xl font-black text-slate-800 tracking-tight">
              $<NumberTicker value={taxShield} decimals={0} />
            </div>
            <p className="text-[10px] text-text-muted mt-2 leading-relaxed">
              *Because interest is tax-deductible, your debt actually saves you this much in taxes every year.
            </p>
          </div>
        </div>
      </div>

      {/* Capital Structure Breakdown */}
      <div className="bg-canvas-card border border-base rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-black text-text-primary uppercase tracking-widest mb-6">Capital Structure Breakdown</h4>
        <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div style={{ width: `${equityWeight}%` }} className="h-full bg-blue-500 transition-all duration-1000" />
          <div style={{ width: `${debtWeight}%` }} className="h-full bg-red-500 transition-all duration-1000" />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-text-secondary">Equity: {equityWeight.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs font-bold text-text-secondary">Debt: {debtWeight.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
