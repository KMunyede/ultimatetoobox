"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DateTimePicker } from "@utilitiessite/ui";
import { Copy, Check, Clock } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

// Extract Live Epoch to prevent whole-page re-renders every second
const LiveEpoch = React.memo(() => {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentEpoch.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentEpoch]);

  return (
    <div id="tour-unix-current" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <Clock size={28} />
        </div>
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Unix Epoch</h2>
          <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white tracking-widest tabular-nums">
            {currentEpoch}
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
  );
});
LiveEpoch.displayName = "LiveEpoch";

export function UnixTimeClient() {
  const [state, setState] = useUrlState({
    timestampStr: "",
    dateStr: "",
  });

  const { timestampStr, dateStr } = state as { timestampStr: string, dateStr: string };

  useEffect(() => {
    if (!timestampStr && !dateStr) {
      const now = Math.floor(Date.now() / 1000);
      const date = new Date();
      // Use local date for ISO string part
      const pad = (n: number) => n.toString().padStart(2, "0");
      const localISO = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

      setState({
        timestampStr: now.toString(),
        dateStr: localISO
      });
    }
  }, []);

  const readableDate = useMemo(() => {
    if (!timestampStr) return "";
    const num = parseInt(timestampStr, 10);
    if (isNaN(num)) return "Invalid timestamp";
    const ms = num > 1e11 ? num : num * 1000;
    try {
      return new Date(ms).toUTCString();
    } catch {
      return "Invalid timestamp";
    }
  }, [timestampStr]);

  const timestampFromDate = useMemo(() => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Invalid date";
      return Math.floor(d.getTime() / 1000).toString();
    } catch {
      return "Invalid date";
    }
  }, [dateStr]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 my-8"
    >
      <LiveEpoch />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              {readableDate}
            </div>
          </div>
        </div>

        <div id="tour-unix-date2ts" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date to Timestamp</h2>
          <div className="space-y-4">
            <DateTimePicker
              value={dateStr}
              onChange={(val) => setState({ dateStr: val })}
            />
            <div className="min-h-16 flex items-center px-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-mono text-2xl font-black break-all shadow-inner">
              {timestampFromDate}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
