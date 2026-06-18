"use client";
import { useState, useEffect } from "react";
import { ToolTutorial, DateTimePicker } from "@utilitiessite/ui";
import { Copy, Check } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";

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
    setTimeout(() => setCurrentEpoch(now), 0);
    
    // Initialize timestampStr and dateStr if they are empty
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
    // Check if it's in ms instead of s (heuristic: if > 1e11)
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

  const tourSteps = [
    { element: '#tour-unix-current', popover: { title: '1. Current Epoch', description: 'This is the current Unix timestamp. You can click the copy icon to copy it.' } },
    { element: '#tour-unix-ts2date', popover: { title: '2. Timestamp to Date', description: 'Enter a Unix timestamp to convert it into a human-readable date.' } },
    { element: '#tour-unix-date2ts', popover: { title: '3. Date to Timestamp', description: 'Select a date and time to get its equivalent Unix timestamp.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="unix_time_converter" steps={tourSteps} buttonText="How to use" />
      </div>
      
      {/* Current Epoch */}
      <div id="tour-unix-current" className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <h2 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">Current Unix Epoch Time</h2>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">
            {currentEpoch || "..."}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 flex items-center justify-center h-12 w-14 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95"
          title="Copy current epoch"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Timestamp to Date */}
        <div id="tour-unix-ts2date" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Timestamp to Date</h2>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full h-12 px-4 text-lg font-mono border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
              value={timestampStr}
              onChange={e => setState({ timestampStr: e.target.value })}
              placeholder="e.g. 1718000000"
            />
            <div className="h-16 flex items-center px-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-blue-700 dark:text-blue-400 font-medium break-words leading-tight">
              {getReadableDate(timestampStr)}
            </div>
          </div>
        </div>

        {/* Date to Timestamp */}
        <div id="tour-unix-date2ts" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Date to Timestamp</h2>
          <div className="space-y-4">
            <DateTimePicker
              value={dateStr}
              onChange={(val) => setState({ dateStr: val })}
            />
            <div className="h-16 flex items-center px-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-mono text-2xl font-bold break-all">
              {getTimestampFromDate(dateStr)}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
