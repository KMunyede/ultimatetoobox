"use client";
import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft, RefreshCw, Globe } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.5,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.91,
  CNY: 7.23,
  INR: 83.3,
  ZAR: 18.8,
  NZD: 1.66,
};

export function CurrencyClient({ defaultFrom, defaultTo }: { defaultFrom?: string, defaultTo?: string }) {
  const [state, setState] = useUrlState({
    val1: "1",
    unit1: defaultFrom || "USD",
    val2: "",
    unit2: defaultTo || "EUR",
    activeInput: 1,
  });

  const { val1, unit1, val2, unit2, activeInput } = state as { val1: string; unit1: string; val2: string; unit2: string; activeInput: number };

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [provider, setProvider] = useState<string>("Initializing");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const primaryRes = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!primaryRes.ok) throw new Error("Primary API failed");
      const primaryData = await primaryRes.json();

      setRates(primaryData.rates);
      setProvider("ExchangeRate-API (Global)");
      setLastUpdated(primaryData.time_last_update_utc || new Date().toUTCString());
      setLoading(false);
      return;
    } catch (primaryErr) {
      console.warn("Primary API failed, trying backup...", primaryErr);
    }

    try {
      const backupRes = await fetch("https://api.frankfurter.app/latest?from=USD");
      if (!backupRes.ok) throw new Error("Backup API failed");
      const backupData = await backupRes.json();

      setRates({ USD: 1, ...backupData.rates });
      setProvider("Frankfurter (Backup)");
      setLastUpdated(backupData.date || new Date().toISOString());
      setLoading(false);
      return;
    } catch (backupErr) {
      console.error("All live APIs failed, using hardcoded fallbacks.", backupErr);
      setError(true);
      setRates(FALLBACK_RATES);
      setProvider("Fallback Engine");
      setLastUpdated("Cached data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);


  useEffect(() => {
    if (activeInput !== 1) return;
    if (val1 === "") {
      setState({ val2: "" });
      return;
    }
    const num = parseFloat(val1);
    if (!isNaN(num) && rates[unit1] && rates[unit2]) {
      const inUSD = num / rates[unit1];
      const result = inUSD * rates[unit2];
      setState({ val2: result.toFixed(2) });
    }
  }, [val1, unit1, unit2, activeInput, rates, setState]);

  useEffect(() => {
    if (activeInput !== 2) return;
    if (val2 === "") {
      setState({ val1: "" });
      return;
    }
    const num = parseFloat(val2);
    if (!isNaN(num) && rates[unit1] && rates[unit2]) {
      const inUSD = num / rates[unit2];
      const result = inUSD * rates[unit1];
      setState({ val1: result.toFixed(2) });
    }
  }, [val2, unit1, unit2, activeInput, rates, setState]);

  const currencyOptions = Object.keys(rates).sort().map(u => ({ label: u, value: u }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="flex justify-between items-center">
        <div id="tour-currency-status" className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${error ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500/20 text-amber-600' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500/20 text-emerald-600'}`}>
                {loading ? <RefreshCw size={10} className="animate-spin" /> : <Globe size={10} />}
                {loading ? 'Syncing Rates...' : provider}
            </div>
            {!loading && (
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-60">
                Updated: {lastUpdated.split(' ').slice(0, 4).join(' ')}
              </span>
            )}
            <button
                onClick={fetchRates}
                disabled={loading}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-50 hidden sm:block"
                title="Refresh Exchange Rates"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Currency 1 */}
          <div id="tour-currency-input1" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">From</label>
            <div className="space-y-4">
              <NumberInput
                value={val1}
                onChange={v => setState({ activeInput: 1, val1: v })}
                className="text-2xl font-black"
                min={0}
              />
              <Select
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value })}
                options={currencyOptions}
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>

          {/* Currency 2 */}
          <div id="tour-currency-input2" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">To</label>
            <div className="space-y-4">
              <NumberInput
                value={val2}
                onChange={v => setState({ activeInput: 2, val2: v })}
                className="text-2xl font-black"
                min={0}
              />
              <Select
                value={unit2}
                onChange={(e) => setState({ activeInput: 1, unit2: e.target.value })}
                options={currencyOptions}
              />
            </div>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-bold italic uppercase tracking-widest text-sm leading-relaxed">
                {val1 || "0"} <span className="text-brand-primary font-black not-italic">{unit1}</span> equals approximately <span className="text-brand-primary font-black not-italic text-2xl">{val2 || "0"}</span> <span className="text-brand-primary font-black not-italic">{unit2}</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
}
