"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Save, Trash2, History, Scale, Globe, Calendar, Clock, AlertTriangle, Info } from "lucide-react";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Button } from "../../../components/ui/Button";
import { PillSelector } from "../../../components/ui/PillSelector";
import { Select } from "../../../components/ui/Select";
import { TAX_DATA, CURRENT_TAX_YEAR, CountryConfig, YearConfig } from "./brackets";

interface TaxScenario {
  id: string;
  label: string;
  salary: string;
  deductions: string;
  country: string;
  frequency: string;
  timestamp: number;
}

export function IncomeTaxClient() {
  const [state, setState] = useUrlState({
    salary: "85000",
    deductions: "0",
    country: "usa",
    frequency: "annually",
  });

  const { salary, deductions, country, frequency } = state as Record<string, string>;
  const [scenarios, setScenarios] = useState<TaxScenario[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const countryConfig = TAX_DATA[country] || TAX_DATA.usa;
  const yearConfig = countryConfig.years[CURRENT_TAX_YEAR] || Object.values(countryConfig.years)[0];

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

  const calculateResults = (s: string, d: string, c: string, f: string) => {
    const countryData = TAX_DATA[c] || TAX_DATA.usa;
    const config = countryData.years[CURRENT_TAX_YEAR] || Object.values(countryData.years)[0];

    let rawSalary = parseFloat(s) || 0;
    let rawDeductions = parseFloat(d) || 0;

    // Normalize to annual for bracket calculation
    let annualSalary = rawSalary;
    let annualDeductions = rawDeductions;
    if (f === "monthly") {
      annualSalary *= 12;
      annualDeductions *= 12;
    } else if (f === "weekly") {
      annualSalary *= 52;
      annualDeductions *= 52;
    }

    const totalDeductions = annualDeductions + config.standardDeduction;
    const taxableIncome = Math.max(0, annualSalary - totalDeductions);

    // Progressive calculation
    let annualTax = 0;
    let remainingIncome = taxableIncome;
    let lowerLimit = 0;
    let marginalRate = 0;

    for (const bracket of config.brackets) {
      const upperLimit = bracket.upTo;
      const bracketIncome = upperLimit === null
        ? Math.max(0, remainingIncome)
        : Math.min(Math.max(0, remainingIncome), upperLimit - lowerLimit);

      if (bracketIncome > 0) marginalRate = bracket.rate;

      annualTax += bracketIncome * (bracket.rate / 100);
      remainingIncome -= bracketIncome;
      if (upperLimit === null || remainingIncome <= 0) break;
      lowerLimit = upperLimit;
    }

    let additionalLevyAmount = 0;
    if (config.additionalLevy) {
        additionalLevyAmount = annualTax * config.additionalLevy.rate;
    }

    const totalAnnualTax = annualTax + additionalLevyAmount;
    const netAnnual = annualSalary - (rawDeductions * (f === 'annually' ? 1 : f === 'monthly' ? 12 : 52)) - totalAnnualTax;

    // Denormalize back to selected frequency for display
    let factor = 1;
    if (f === "monthly") factor = 12;
    else if (f === "weekly") factor = 52;

    return {
      taxAmount: totalAnnualTax / factor,
      netAmount: netAnnual / factor,
      levyAmount: additionalLevyAmount / factor,
      grossAmount: annualSalary / factor,
      totalDeductions: totalDeductions / factor,
      effectiveRate: annualSalary > 0 ? (totalAnnualTax / annualSalary) * 100 : 0,
      marginalRate,
      symbol: countryData.symbol,
    };
  };

  const currentResults = useMemo(() =>
    calculateResults(salary, deductions, country, frequency),
    [salary, deductions, country, frequency]
  );

  const handleSave = () => {
    if (scenarios.length >= 5) {
      alert("Maximum 5 scenarios allowed.");
      return;
    }

    const newScenario: TaxScenario = {
      id: Date.now().toString(),
      label: `Scenario ${scenarios.length + 1}`,
      salary,
      deductions,
      country,
      frequency,
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

  const countryOptions = Object.values(TAX_DATA).map(c => ({ label: c.name, value: c.id }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6 my-8 max-w-4xl mx-auto"
    >
      {/* Form Section - Now Full Width */}
      <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="w-full md:w-auto">
                  <PillSelector
                      label="Frequency"
                      value={frequency}
                      onChange={v => setState({ frequency: v })}
                      options={[
                          { label: "Annual", value: "annually" },
                          { label: "Monthly", value: "monthly" },
                          { label: "Weekly", value: "weekly" },
                      ]}
                  />
              </div>
              <div className="flex-1 max-w-sm">
                  <Select
                      label="Country / Jurisdiction"
                      value={country}
                      onChange={e => setState({ country: e.target.value })}
                      options={countryOptions}
                  />
                  <div className="space-y-1 mt-2 px-1">
                      <div className="flex items-center gap-1.5">
                          <Clock size={10} className="text-slate-400" />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              {yearConfig.taxYear} · Verified {new Date(yearConfig.lastVerified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                      </div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed opacity-70">
                          Verified on {new Date(yearConfig.lastVerified).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}. Accurate until 15 Jan {new Date(yearConfig.lastVerified).getFullYear() + 1}.
                      </p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <NumberInput
                  label={`${frequency.charAt(0).toUpperCase() + frequency.slice(1, -2)} Gross Salary (${countryConfig.symbol})`}
                  value={salary}
                  onChange={val => setState({ salary: val })}
                  min={0}
              />

              <NumberInput
                  label={`Other Deductions (${countryConfig.symbol})`}
                  value={deductions}
                  onChange={val => setState({ deductions: val })}
                  min={0}
              />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button onClick={handleSave} className="w-full sm:w-auto flex items-center justify-center gap-2" variant="secondary">
                  <Save size={18} />
                  Save Scenario
              </Button>

              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
                  <Info size={16} className="text-brand-primary shrink-0" />
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-none">
                      Source: <span className="text-brand-primary">{yearConfig.source}</span>
                      {yearConfig.disclaimer && <span className="ml-2 opacity-60 italic">* {yearConfig.disclaimer}</span>}
                  </p>
              </div>
          </div>
      </div>

      {/* Results Dashboard - Now Below */}
      <div id="tour-tax-results" className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center py-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Estimated {frequency === 'annually' ? 'Annual' : frequency === 'monthly' ? 'Monthly' : 'Weekly'} Net Pay</span>
              <div className="text-6xl md:text-7xl font-black text-[var(--color-brand-primary)] tracking-tighter tabular-nums leading-none mt-2">
                  {countryConfig.symbol}<NumberTicker value={currentResults.netAmount} decimals={0} />
              </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pt-6 border-t border-[var(--color-border-base)] dark:border-slate-800">
              <div className="text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Pay</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {countryConfig.symbol}{Math.round(currentResults.grossAmount).toLocaleString()}
                  </p>
              </div>
              <div className="text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Tax</span>
                  <p className="text-xl font-black text-rose-500 tracking-tight">
                      -{countryConfig.symbol}{Math.round(currentResults.taxAmount).toLocaleString()}
                  </p>
                  {currentResults.levyAmount > 0 && (
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Incl. {yearConfig.additionalLevy?.name}</p>
                  )}
              </div>
              <div className="text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deductions</span>
                  <p className="text-xl font-black text-slate-500 tracking-tight">
                      -{countryConfig.symbol}{Math.round(currentResults.totalDeductions).toLocaleString()}
                  </p>
              </div>
              <div className="text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Effective</span>
                  <p className="text-xl font-black text-brand-primary tracking-tight">
                      {currentResults.effectiveRate.toFixed(1)}%
                  </p>
              </div>
              <div className="text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marginal</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {currentResults.marginalRate}%
                  </p>
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
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Comparison history (Max 5)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-base)] dark:border-slate-800">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compare</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Label</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Country</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Pay</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scenarios.map((s) => {
                  const res = calculateResults(s.salary, s.deductions, s.country, s.frequency);
                  const conf = TAX_DATA[s.country] || TAX_DATA.usa;
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(s.id)}
                          onChange={() => toggleSelection(s.id)}
                          className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-xs font-black text-slate-900 dark:text-white">
                          {s.label}
                          <span className="block text-[8px] text-slate-400 font-bold uppercase mt-0.5">{s.frequency}</span>
                      </td>
                      <td className="p-4 text-xs font-bold text-slate-500 uppercase">{conf.name}</td>
                      <td className="p-4 text-xs font-bold text-slate-500">{conf.symbol}{Math.round(parseFloat(s.salary)).toLocaleString()}</td>
                      <td className="p-4 text-xs font-black text-[var(--color-brand-primary)]">{conf.symbol}{Math.round(res.netAmount).toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Tax Comparison</h3>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {selectedScenarios.map((s) => {
                  const res = calculateResults(s.salary, s.deductions, s.country, s.frequency);
                  const conf = TAX_DATA[s.country] || TAX_DATA.usa;
                  return (
                    <div key={s.id} className="flex-1 min-w-[220px] bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{s.label}</span>
                        <span className="text-[8px] font-black text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-800 uppercase">{s.frequency}</span>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Country</p>
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase truncate">{conf.name}</p>
                        </div>
                        <div className="h-px bg-slate-200 dark:bg-slate-700" />
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gross Pay</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white">{conf.symbol}{Math.round(parseFloat(s.salary)).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Tax</p>
                          <p className="text-xl font-black text-rose-500">-{conf.symbol}{Math.round(res.taxAmount).toLocaleString()}</p>
                        </div>
                        <div className="h-px bg-slate-200 dark:bg-slate-700" />
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Net Pay</p>
                          <p className="text-2xl font-black text-[var(--color-brand-primary)]">{conf.symbol}{Math.round(res.netAmount).toLocaleString()}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-2 text-center border border-slate-100 dark:border-slate-800">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Effective Rate</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{res.effectiveRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] text-center max-w-2xl mx-auto leading-relaxed">
              Disclaimer: Tax brackets are estimates for general reference only, may not reflect the latest local budget updates, and do not constitute tax advice. Verify with official sources for filing purposes.
          </p>
      </footer>
    </motion.div>
  );
}
