"use client";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@utilitiessite/ui";
import { Copy, Check, Clock } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export function UnixTimeClient() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const [state, setState] = useUrlState({
    timestampStr: "",
    dateStr: "",
  });

  const { timestampStr, dateStr } = state as { timestampStr: string, dateStr: string };

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setCurrentEpoch(now);
    
    if (!timestampStr && !dateStr) {
      setState({ timestampStr: now.toString() });
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      setState({ dateStr: date.toISOString().slice(0,16) });
    }

    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEpoch.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReadableDate = (ts: string) => {
    if (!ts) return "";
    const num = parseInt(ts, 10);
    if (isNaN(num)) return "Invalid timestamp";
    const ms = num > 1e11 ? num : num * 1000;
    try {
      return new Date(ms).toUTCString();
    } catch {
      return "Invalid timestamp";
    }
  };

  const getTimestampFromDate = (ds: string) => {
    if (!ds) return "";
    try {
      const d = new Date(ds);
      return Math.floor(d.getTime() / 1000).toString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 my-8"
    >
      <div id="tour-unix-current" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Clock size={28} />
          </div>
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Unix Epoch</h2>
            <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white tracking-widest tabular-nums">
              {currentEpoch || "..."}
            </div>
          </div>
        </div>
        <Button
          onClick={handleCopy}
          variant={copied ? "primary" : "secondary"}
          className="!px-5 !py-4"
          title="Copy current epoch"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Timestamp to Date */}
        <div id="tour-unix-ts2date" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp to Date</h2>
          <div className="space-y-4">
            <Input
              type="text"
              className="text-lg font-mono"
              value={timestampStr}
              onChange={e => setState({ timestampStr: e.target.value })}
              placeholder="e.g. 1718000000"
            />
            <div className="min-h-16 flex items-center px-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-brand-primary font-bold text-sm break-words leading-relaxed shadow-inner">
              {getReadableDate(timestampStr)}
            </div>
          </div>
        </div>

        {/* Date to Timestamp */}
        <div id="tour-unix-date2ts" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date to Timestamp</h2>
          <div className="space-y-4">
            <DateTimePicker
              value={dateStr}
              onChange={(val) => setState({ dateStr: val })}
            />
            <div className="min-h-16 flex items-center px-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-mono text-2xl font-black break-all shadow-inner">
              {getTimestampFromDate(dateStr)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
