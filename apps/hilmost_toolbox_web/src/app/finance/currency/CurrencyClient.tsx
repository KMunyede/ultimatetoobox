"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRightLeft, RefreshCw, Globe } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { SearchableSelect } from "../../../components/ui/SearchableSelect";
import { CURRENCY_NAMES } from "@/lib/currencies";

/**
 * Approximate offline fallback rates (USD base = 1.0).
 * These are mid-market estimates from mid-2026 to ensure the tool remains usable
 * if live market APIs are unreachable.
 */
const FALLBACK_RATES: Record<string, number> = {
  // Hubs
  USD: 1, EUR: 0.90, GBP: 0.77, JPY: 145.0, AUD: 1.50, CAD: 1.35, CHF: 0.88,
  CNY: 7.15, INR: 83.0, NZD: 1.62, ZAR: 18.0, NGN: 1550.0, KES: 130.0, GHS: 15.0, AED: 3.67,
  // Spokes
  EGP: 48.0, MAD: 10.0, BWP: 13.5, ZMW: 26.0, MZN: 64.0, TZS: 2700.0, UGX: 3700.0,
  SGD: 1.32, HKD: 7.8, SAR: 3.75, THB: 34.0, MYR: 4.4, IDR: 15800.0, PHP: 57.0,
  VND: 25000.0, KRW: 1350.0, BRL: 5.4, MXN: 19.5, ARS: 950.0, CLP: 920.0, COP: 4100.0,
  PLN: 3.9, SEK: 10.3, NOK: 10.7, DKK: 6.7, CZK: 23.0, HUF: 360.0, RON: 4.5,
  TRY: 33.0, RUB: 90.0, ILS: 3.7, PKR: 278.0, BDT: 118.0, LKR: 300.0, XOF: 590.0
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
    const timeoutId = setTimeout(() => {
      fetchRates();
    }, 0);
    return () => clearTimeout(timeoutId);
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

  const currencyOptions = useMemo(() => {
    return Object.keys(rates).sort().map(code => ({
      label: code,
      value: code,
      searchTerms: CURRENCY_NAMES[code] || ""
    }));
  }, [rates]);

  const formatCurrencyDisplay = (label: string) => {
    const name = CURRENCY_NAMES[label];
    return name ? `${label} - ${name}` : label;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6 my-6"
    >
      <div className="flex justify-between items-center">
        <div id="tour-currency-status" className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-caption font-normal uppercase tracking-widest ${error ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500/20 text-amber-600' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500/20 text-emerald-600'}`}>
                {loading ? <RefreshCw size={10} className="animate-spin" /> : <Globe size={10} />}
                {loading ? 'Syncing Rates...' : provider}
            </div>
            {!loading && (
              <span className="text-caption text-black dark:text-white font-normal uppercase tracking-widest opacity-60">
                Updated: {lastUpdated.split(' ').slice(0, 4).join(' ')}
              </span>
            )}
            <button
                onClick={fetchRates}
                disabled={loading}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white transition-colors disabled:opacity-50 hidden sm:block"
                title="Refresh Exchange Rates"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5">
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Currency 1 */}
          <div id="tour-currency-input1" className="flex-1 w-full space-y-4">
            <NumberInput
              value={val1}
              onChange={v => setState({ activeInput: 1, val1: v })}
              className="text-2xl font-normal"
              min={0}
            />
            <SearchableSelect
              label="From"
              value={unit1}
              onChange={(val) => setState({ activeInput: 1, unit1: val })}
              options={currencyOptions}
              formatDisplay={formatCurrencyDisplay}
            />
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>

          {/* Currency 2 */}
          <div id="tour-currency-input2" className="flex-1 w-full space-y-4">
            <NumberInput
              value={val2}
              onChange={v => setState({ activeInput: 2, val2: v })}
              className="text-2xl font-normal"
              min={0}
            />
            <SearchableSelect
              label="To"
              value={unit2}
              onChange={(val) => setState({ activeInput: 1, unit2: val })}
              options={currencyOptions}
              formatDisplay={formatCurrencyDisplay}
            />
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-black dark:text-white font-normal uppercase tracking-widest text-sm leading-relaxed">
                {val1 || "0"} <span className="text-brand-primary font-normal">{unit1}</span> equals approximately <span className="text-brand-primary font-normal text-2xl">{val2 || "0"}</span> <span className="text-brand-primary font-normal">{unit2}</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
}
