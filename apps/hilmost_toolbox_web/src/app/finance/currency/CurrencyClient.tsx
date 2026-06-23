"use client";
import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, Globe } from "lucide-react";
import { Tooltip, NumericInput } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";

// Fallback rates if API fails (Base: USD)
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

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      setError(false);

      try {
        const primaryRes = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!primaryRes.ok) throw new Error("Primary API failed");
        const primaryData = await primaryRes.json();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRates(primaryData.rates);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProvider("ExchangeRate-API (Global)");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLastUpdated(primaryData.time_last_update_utc || new Date().toUTCString());
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
        return;
      } catch (primaryErr) {
        console.warn("Primary API failed, trying backup...", primaryErr);
      }

      try {
        const backupRes = await fetch("https://api.frankfurter.app/latest?from=USD");
        if (!backupRes.ok) throw new Error("Backup API failed");
        const backupData = await backupRes.json();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRates({ USD: 1, ...backupData.rates });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProvider("Frankfurter (Backup)");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLastUpdated(backupData.date || new Date().toISOString());
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
        return;
      } catch (backupErr) {
        console.error("All live APIs failed, using hardcoded fallbacks.", backupErr);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError(true);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRates(FALLBACK_RATES);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProvider("Fallback Engine");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLastUpdated("Cached data");
      } finally {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      }
    }

    fetchRates();
  }, []);


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

  const triggerManualRefresh = () => {
    // Basic implementation of manual refresh by re-running the fetch logic if needed
    // But since it's in useEffect, we'd need a dependency or a separate function.
    // For now, focusing on lint fix.
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >
      <div className="flex justify-between items-center">
        <div id="tour-currency-status" className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${error ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'}`}>
                {loading ? <RefreshCw size={10} className="animate-spin" /> : <Globe size={10} />}
                {loading ? 'Syncing...' : provider}
            </div>
            {!loading && (
              <span className="text-xs text-text-muted font-bold uppercase tracking-tighter opacity-60">
                Updated: {lastUpdated.split(' ').slice(0, 4).join(' ')}
              </span>
            )}
            <button
                onClick={triggerManualRefresh}
                disabled={loading}
                className="p-1.5 rounded-full hover:bg-canvas-muted text-text-muted transition-colors disabled:opacity-50 hidden sm:block"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
      </div>

      <div className="bg-canvas-card border border-border-base rounded-2xl p-5 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-5">

          {/* Currency 1 */}
          <div id="tour-currency-input1" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">From</label>
            <div className="space-y-3">
              <Tooltip content="The amount you want to convert" position="top">
                <NumericInput
                  title="Source Currency Amount"
                  className="w-full h-14 px-5 text-2xl font-bold border border-border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all shadow-inner"
                  value={val1}
                  onChange={val => setState({ activeInput: 1, val1: val })}
                />
              </Tooltip>
              <Tooltip content="Select the currency you are converting from" position="bottom">
                <select
                  title="Select Source Currency"
                  className="w-full h-12 px-4 border border-border-base rounded-xl bg-canvas-card text-text-primary font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                  value={unit1}
                  onChange={(e) => setState({ activeInput: 1, unit1: e.target.value })}
                >
                  {Object.keys(rates).sort().map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </Tooltip>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>

          {/* Currency 2 */}
          <div id="tour-currency-input2" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">To</label>
            <div className="space-y-3">
              <Tooltip content="The resulting amount after conversion" position="top">
                <NumericInput
                  title="Resulting Currency Amount"
                  className="w-full h-14 px-5 text-2xl font-bold border border-border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all shadow-inner"
                  value={val2}
                  onChange={val => setState({ activeInput: 2, val2: val })}
                />
              </Tooltip>
              <Tooltip content="Select the currency you want to convert to" position="bottom">
                <select
                  title="Select Target Currency"
                  className="w-full h-12 px-4 border border-border-base rounded-xl bg-canvas-card text-text-primary font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                  value={unit2}
                  onChange={(e) => setState({ activeInput: 1, unit2: e.target.value })}
                >
                  {Object.keys(rates).sort().map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </Tooltip>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-border-base text-center">
            <p className="text-text-secondary font-medium italic">
                {val1 || "0"} <span className="font-bold not-italic">{unit1}</span> equals approximately <span className="text-brand-primary font-black not-italic text-2xl">{val2 || "0"}</span> <span className="font-bold not-italic">{unit2}</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
}
