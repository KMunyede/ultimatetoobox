"use client";
import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, Globe, Zap } from "lucide-react";
import { ToolTutorial } from "@utilitiessite/ui";
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

  const fetchRates = async () => {
    setLoading(true);
    setError(false);

    try {
      // Primary: ExchangeRate-API (160+ currencies)
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
      // Backup: Frankfurter (ECB Official Rates)
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
  };

  useEffect(() => {
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

  const tourSteps = [
    { element: '#tour-currency-input1', popover: { title: '1. Base Currency', description: 'Enter your amount and select the currency you are converting from.' } },
    { element: '#tour-currency-input2', popover: { title: '2. Target Currency', description: 'Select the currency you want to convert to. You can also type here to convert in reverse!' } },
    { element: '#tour-currency-status', popover: { title: '3. Exchange Rates', description: 'This indicator shows if you are using live market rates or cached fallbacks.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-between items-center">
        <div id="tour-currency-status" className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${error ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'}`}>
                {loading ? <RefreshCw size={10} className="animate-spin" /> : <Globe size={10} />}
                {loading ? 'Syncing...' : provider}
            </div>
            {!loading && (
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter opacity-60">
                Updated: {lastUpdated.split(' ').slice(0, 4).join(' ')}
              </span>
            )}
            <button
                onClick={fetchRates}
                disabled={loading}
                className="p-1.5 rounded-full hover:bg-canvas-muted text-text-muted transition-colors disabled:opacity-50 hidden sm:block"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
        <div className="flex gap-4">
            <ShareButton />
            <ToolTutorial tourId="currency_converter" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">

          {/* Currency 1 */}
          <div id="tour-currency-input1" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">From</label>
            <div className="space-y-3">
              <input
                type="number"
                inputMode="decimal"
                className="w-full h-16 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                value={val1}
                onChange={(e) => setState({ activeInput: 1, val1: e.target.value })}
              />
              <select
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value })}
              >
                {Object.keys(rates).sort().map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={24} className="rotate-90 md:rotate-0" />
          </div>

          {/* Currency 2 */}
          <div id="tour-currency-input2" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">To</label>
            <div className="space-y-3">
              <input
                type="number"
                inputMode="decimal"
                className="w-full h-16 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                value={val2}
                onChange={(e) => setState({ activeInput: 2, val2: e.target.value })}
              />
              <select
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                value={unit2}
                onChange={(e) => setState({ activeInput: 1, unit2: e.target.value })}
              >
                {Object.keys(rates).sort().map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-base text-center">
            <p className="text-text-secondary font-medium italic">
                {val1 || "0"} <span className="font-bold not-italic">{unit1}</span> equals approximately <span className="text-brand-primary font-black not-italic text-2xl">{val2 || "0"}</span> <span className="font-bold not-italic">{unit2}</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
}
