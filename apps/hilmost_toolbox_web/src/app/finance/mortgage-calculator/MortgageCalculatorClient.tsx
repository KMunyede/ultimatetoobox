"use client";

import React, { useMemo } from "react";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Download, Table as TableIcon, Info } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Tooltip } from "@utilitiessite/ui";

export function MortgageCalculatorClient() {
  const [state, setState] = useUrlState({
    price: "400000",
    downPayment: "80000",
    rate: "6.5",
    years: "30",
    taxRate: "1.2",
    insurance: "1200",
  });

  const { price, downPayment, rate, years, taxRate, insurance } = state as Record<string, string>;

  const P = (parseFloat(price) || 0) - (parseFloat(downPayment) || 0);
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;
  const annualTax = (parseFloat(price) || 0) * ((parseFloat(taxRate) || 0) / 100);
  const annualInsurance = parseFloat(insurance) || 0;

  let monthlyPI = 0;
  if (P > 0 && r > 0 && n > 0) {
    monthlyPI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (P > 0 && r === 0 && n > 0) {
    monthlyPI = P / n;
  }

  const monthlyTax = annualTax / 12;
  const monthlyInsurance = annualInsurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

  const totalPayable = monthlyPI * n;
  const totalInterest = Math.max(0, totalPayable - P);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-5 my-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="Home Price ($)"
              value={price}
              onChange={val => setState({ price: val })}
              min={0}
            />
            <NumberInput
              label="Down Payment ($)"
              value={downPayment}
              onChange={val => setState({ downPayment: val })}
              min={0}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="Interest Rate (%)"
              value={rate}
              onChange={val => setState({ rate: val })}
              min={0}
              max={100}
              step={0.01}
            />
            <NumberInput
              label="Loan Term (Years)"
              value={years}
              onChange={val => setState({ years: val })}
              min={1}
              max={50}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="Property Tax Rate (%)"
              value={taxRate}
              onChange={val => setState({ taxRate: val })}
              min={0}
              max={10}
              step={0.01}
            />
            <NumberInput
              label="Annual Insurance ($)"
              value={insurance}
              onChange={val => setState({ insurance: val })}
              min={0}
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-1 py-2">
            <span className="text-caption font-normal text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              Total Monthly Payment (PITI)
              <Tooltip content="Principal, Interest, Taxes, and Insurance">
                <Info size={12} className="cursor-help" />
              </Tooltip>
            </span>
            <div className="text-5xl md:text-6xl font-normal text-[var(--color-brand-primary)] tracking-tighter">
              $<NumberTicker value={totalMonthly} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[var(--color-border-base)] dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-micro font-normal text-slate-400 uppercase tracking-tighter">P&I</span>
                <p className="text-sm font-normal text-slate-900 dark:text-white">{formatCurrency(monthlyPI)}</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-micro font-normal text-slate-400 uppercase tracking-tighter">Tax & Ins.</span>
                <p className="text-sm font-normal text-slate-900 dark:text-white">{formatCurrency(monthlyTax + monthlyInsurance)}</p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-micro font-normal text-slate-400 uppercase tracking-tighter">Total Interest</span>
                <p className="text-sm font-normal text-slate-900 dark:text-white">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
