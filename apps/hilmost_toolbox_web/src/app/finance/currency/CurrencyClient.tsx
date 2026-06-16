"use client";
import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { ToolTutorial, CopyButton, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";

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

export function CurrencyClient({ defaultFrom = "USD", defaultTo = "EUR" }: { defaultFrom?: string, defaultTo?: string }) {
  const [state, setState] = useUrlState({
    val1: "1",
    unit1: defaultFrom,
    val2: "",
    unit2: defaultTo,
    activeInput: 1,
  });

  const { val1, unit1, val2, unit2, activeInput } = state as { val1: string; unit1: string; val2: string; unit2: string; activeInput: number };

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    setError(false);
    try {
      // Primary API: Frankfurter (European Central Bank data)
      const res = await fetch("https://api.frankfurter.app/latest?from=USD");
      if (!res.ok) throw new Error("Primary API failed");
      const data = await res.json();
      setRates({ USD: 1, ...data.rates });
    } catch (primaryErr) {
      console.warn("Primary API failed, trying backup API...", primaryErr);
      try {
        // Backup API: Fawazahmed0 Currency API (CDN hosted, extremely reliable)
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
        if (!res.ok) throw new Error("Backup API failed");
        const data = await res.json();
        // The backup API returns lowercase keys inside data.usd
        const upperRates: Record<string, number> = { USD: 1 };
        for (const [key, val] of Object.entries(data.usd)) {
          upperRates[key.toUpperCase()] = val as number;
        }
        setRates(upperRates);
      } catch (backupErr) {
        console.warn("All live APIs failed, using hardcoded fallbacks.", backupErr);
        setError(true);
        setRates(FALLBACK_RATES);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchRates(), 0);
  }, []);

  useEffect(() => {
    if (activeInput !== 1) return;
    if (val1 === "") {
      setState({ val2: "" });
      return;
    }
    const num = parseFloat(val1);
    if (!isNaN(num) && rates[unit1] && rates[unit2]) {
      // Convert to USD first, then to target
      const inUSD = num / rates[unit1];
      const result = inUSD * rates[unit2];
      setState({ val2: result.toFixed(2) });
    }
  }, [val1, unit1, unit2, activeInput, rates]);

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
  }, [val2, unit1, unit2, activeInput, rates]);

  const tourSteps = [
    { element: '#tour-currency-input1', popover: { title: '1. Base Currency', description: 'Enter your amount and select the currency you are converting from.' } },
    { element: '#tour-currency-input2', popover: { title: '2. Target Currency', description: 'Select the currency you want to convert to. You can also type here to convert in reverse!' } },
    { element: '#tour-currency-status', popover: { title: '3. Exchange Rates', description: 'This indicator shows if you are using live market rates or cached fallbacks.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="currency_converter" steps={tourSteps} buttonText="How to use" />
      </div>
      <div id="tour-currency-status" className="flex items-center justify-between mb-6">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> Fetching latest rates...</motion.span>
            ) : error ? (
              <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-amber-600 dark:text-amber-500">Using estimated rates. Our live feed is taking a quick breather, but we are working on it! Check back shortly.</motion.span>
            ) : (
              <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-600 dark:text-emerald-500 font-medium">Using live market rates</motion.span>
            )}
          </AnimatePresence>
        </div>
        <Tooltip content="Fetch latest exchange rates">
          <button 
            onClick={fetchRates}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
            aria-label="Refresh rates"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </Tooltip>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Input 1 */}
        <motion.div layout id="tour-currency-input1" className="flex-1 w-full flex flex-col gap-2">
          <Tooltip content="Enter base currency amount" className="w-full">
            <input
              type="number"
              inputMode="decimal"
              className="w-full h-14 px-4 text-xl font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={val1}
              onChange={(e) => {
                setState({ activeInput: 1, val1: e.target.value });
              }}
            />
          </Tooltip>
          <Tooltip content="Select starting currency">
            <select
              className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium hover:border-blue-400 transition-all"
              value={unit1}
              onChange={(e) => {
                setState({ activeInput: 1, unit1: e.target.value });
              }}
            >
              {Object.keys(rates).sort().map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </Tooltip>
          <div className="flex items-center justify-between mt-2 px-1 text-sm">
            {val1 && !isNaN(Number(val1)) && (
              <span className="text-slate-500 font-mono font-medium">
                {Number(val1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {unit1}
              </span>
            )}
            {val1 && <CopyButton value={val1} />}
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div layout className="hidden md:flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <ArrowRightLeft size={24} />
        </motion.div>
        
        {/* Input 2 */}
        <motion.div layout id="tour-currency-input2" className="flex-1 w-full flex flex-col gap-2">
          <Tooltip content="Enter target currency amount for reverse calculation" className="w-full">
            <input
              type="number"
              inputMode="decimal"
              className="w-full h-14 px-4 text-xl font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={val2}
              onChange={(e) => {
                setState({ activeInput: 2, val2: e.target.value });
              }}
            />
          </Tooltip>
          <Tooltip content="Select target currency">
            <select
              className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium hover:border-blue-400 transition-all"
              value={unit2}
              onChange={(e) => {
                setState({ activeInput: 1, unit2: e.target.value });
              }}
            >
              {Object.keys(rates).sort().map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </Tooltip>
          <div className="flex items-center justify-between mt-2 px-1 text-sm">
            {val2 && !isNaN(Number(val2)) && (
              <span className="text-slate-500 font-mono font-medium">
                {Number(val2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {unit2}
              </span>
            )}
            {val2 && <CopyButton value={val2} />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
