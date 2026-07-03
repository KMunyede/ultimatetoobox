"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Save, Trash2, History, Scale, Check, Plus } from "lucide-react";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Button } from "../../../components/ui/Button";

interface TaxScenario {
  id: string;
  label: string;
  salary: string;
  deductions: string;
  taxRate: string;
  netMonthly: number;
  netAnnual: number;
  taxAmount: number;
  timestamp: number;
}

export function IncomeTaxClient() {
  const [state, setState] = useUrlState({
    salary: "85000",
    taxRate: "22",
    deductions: "13850",
  });

  const { salary, taxRate, deductions } = state as Record<string, string>;
  const [scenarios, setScenarios] = useState<TaxScenario[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hilmost_income_tax_scenarios");
    if (saved) {
      try {
        setScenarios(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tax scenarios", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hilmost_income_tax_scenarios", JSON.stringify(scenarios));
    }
  }, [scenarios, isLoaded]);

  const calculateResults = (s: string, r: string, d: string) => {
    const gross = parseFloat(s) || 0;
    const rate = parseFloat(r) || 0;
    const deduct = parseFloat(d) || 0;
    const taxable = Math.max(0, gross - deduct);
    const taxAmount = taxable * (rate / 100);
    const netAnnual = gross - taxAmount;
    const netMonthly = netAnnual / 12;
    return { netMonthly, netAnnual, taxAmount };
  };

  const currentResults = useMemo(() => calculateResults(salary, taxRate, deductions), [salary, taxRate, deductions]);

  const handleSave = () => {
    if (scenarios.length >= 5) {
      alert("Maximum 5 scenarios allowed. Please delete one to save a new one.");
      return;
    }

    const newScenario: TaxScenario = {
      id: Date.now().toString(),
      label: `Scenario ${scenarios.length + 1}`,
      salary,
      deductions,
      taxRate,
      ...currentResults,
      timestamp: Date.now(),
    };

    setScenarios([...scenarios, newScenario]);
  };

  const handleDelete = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    setSelectedIds(selectedIds.filter(sid => sid !== id));
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const selectedScenarios = scenarios.filter(s => selectedIds.includes(s.id));

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm h-fit">
          <NumberInput
            label="Annual Gross Salary ($)"
            value={salary}
            onChange={val => setState({ salary: val })}
            placeholder="e.g. 85000"
            min={0}
          />
          <NumberInput
            label="Annual Deductions ($)"
            value={deductions}
            onChange={val => setState({ deductions: val })}
            placeholder="e.g. 13850"
            min={0}
          />
          <NumberInput
            label="Estimated Tax Rate (%)"
            value={taxRate}
            onChange={val => setState({ taxRate: val })}
            placeholder="e.g. 22"
            min={0}
            max={100}
            step={0.1}
          />
          <Button onClick={handleSave} className="w-full flex items-center justify-center gap-2" variant="secondary">
            <Save size={18} />
            Save Current Scenario
          </Button>
        </div>

        {/* Results Dashboard */}
        <div id="tour-tax-results" className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2 py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Take-Home</span>
            <div className="text-5xl md:text-6xl font-black text-[var(--color-brand-primary)] tracking-tighter">
              $<NumberTicker value={currentResults.netMonthly} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[var(--color-border-base)] dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Net</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">$<NumberTicker value={currentResults.netAnnual} decimals={0} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tax Paid</span>
                <p className="text-2xl font-black text-rose-500">$<NumberTicker value={currentResults.taxAmount} decimals={0} /></p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Scenarios List */}
      {scenarios.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <History size={20} className="text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Saved Scenarios</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Stored locally on your device (Max 5)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-base)] dark:border-slate-800">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compare</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Label</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Salary</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Take-Home</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tax</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scenarios.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(s.id)}
                        onChange={() => toggleSelection(s.id)}
                        className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-xs font-black text-slate-900 dark:text-white">{s.label}</td>
                    <td className="p-4 text-xs font-bold text-slate-500">{formatCurrency(parseFloat(s.salary))}</td>
                    <td className="p-4 text-xs font-black text-[var(--color-brand-primary)]">{formatCurrency(s.netAnnual)}</td>
                    <td className="p-4 text-xs font-bold text-rose-500">{formatCurrency(s.taxAmount)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparison View */}
      <AnimatePresence>
        {selectedScenarios.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-slate-900 border-2 border-[var(--color-brand-primary)] rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--color-brand-alpha)] text-[var(--color-brand-primary)]">
                <Scale size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Side-by-Side Comparison</h3>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {selectedScenarios.map((s) => (
                  <div key={s.id} className="flex-1 min-w-[200px] bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{s.label}</span>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gross Salary</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(parseFloat(s.salary))}</p>
                      </div>
                      <div className="h-px bg-slate-200 dark:bg-slate-700" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deductions</p>
                        <p className="text-lg font-bold text-slate-600 dark:text-slate-400">{formatCurrency(parseFloat(s.deductions))}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tax Rate</p>
                        <p className="text-lg font-bold text-slate-600 dark:text-slate-400">{s.taxRate}%</p>
                      </div>
                      <div className="h-px bg-slate-200 dark:bg-slate-700" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Net Take-Home (Annual)</p>
                        <p className="text-2xl font-black text-[var(--color-brand-primary)]">{formatCurrency(s.netAnnual)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tax Paid</p>
                        <p className="text-xl font-black text-rose-500">{formatCurrency(s.taxAmount)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

