"use client";

import React, { useMemo } from "react";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Download, Table as TableIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export function LoanCalculatorClient() {
  const [state, setState] = useUrlState({
    amount: "250000",
    rate: "6.5",
    years: "30",
  });

  const { amount, rate, years } = state as Record<string, string>;

  const P = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  let monthlyPayment = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayable = monthlyPayment * n;
    totalInterest = totalPayable - P;
  }

  const schedule = useMemo(() => {
    if (P <= 0 || r <= 0 || n <= 0) return [];

    const data = [];
    let balance = P;

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance = Math.max(0, balance - principal);

      data.push({
        month: i,
        payment: monthlyPayment,
        principal,
        interest,
        balance
      });
    }
    return data;
  }, [P, r, n, monthlyPayment]);

  const downloadCSV = () => {
    const headers = ["Month", "Payment", "Principal", "Interest", "Balance"];
    const rows = schedule.map(row => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.balance.toFixed(2)
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "loan-amortization.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 space-y-4 shadow-sm">
          <NumberInput
            label="Loan Amount ($)"
            value={amount}
            onChange={val => setState({ amount: val })}
            placeholder="e.g. 250000"
            min={0}
          />
          <NumberInput
            label="Annual Interest Rate (%)"
            value={rate}
            onChange={val => setState({ rate: val })}
            placeholder="e.g. 6.5"
            min={0}
            max={100}
            step={0.01}
          />
          <NumberInput
            label="Loan Term (Years)"
            value={years}
            onChange={val => setState({ years: val })}
            placeholder="e.g. 30"
            min={1}
            max={50}
          />
        </div>

        {/* Results */}
        <div id="tour-loan-results" className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-2 py-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Payment</span>
            <div className="text-5xl md:text-6xl font-black text-[var(--color-brand-primary)] tracking-tighter">
              $<NumberTicker value={monthlyPayment} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[var(--color-border-base)] dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Interest</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalInterest} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Payable</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalPayable} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Section */}
      {schedule.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-[2.5rem] p-4 md:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-brand-alpha)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20">
                <TableIcon size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Amortization Schedule</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly breakdown of your loan repayment</p>
              </div>
            </div>
            <Button variant="secondary" onClick={downloadCSV} className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Download size={16} />
              Export CSV
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--color-border-base)] dark:border-slate-800">
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 border-b border-[var(--color-border-base)] dark:border-slate-700">
                  <tr>
                    <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Month</th>
                    <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Payment</th>
                    <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Principal</th>
                    <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Interest</th>
                    <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-xs font-bold text-slate-400">#{row.month}</td>
                      <td className="p-3 text-xs font-black text-slate-900 dark:text-white">{formatCurrency(row.payment)}</td>
                      <td className="p-3 text-xs font-bold text-emerald-600">{formatCurrency(row.principal)}</td>
                      <td className="p-3 text-xs font-bold text-rose-500">{formatCurrency(row.interest)}</td>
                      <td className="p-3 text-xs font-black text-slate-900 dark:text-white text-right">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

