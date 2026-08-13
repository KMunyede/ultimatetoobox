"use client";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Cake, Calendar } from "lucide-react";
import { parseISO, intervalToDuration } from "date-fns";
import { DateTimeDropdown } from "@utilitiessite/ui";
import { useMemo } from "react";

export function AgeCalculatorClient() {
  const [state, setState] = useUrlState({
    birthDate: "1990-01-01T00:00:00",
    targetDate: new Date().toISOString().split('.')[0],
  });

  const { birthDate, targetDate } = state as { birthDate: string; targetDate: string };

  const results = useMemo(() => {
    try {
      const start = parseISO(birthDate);
      const end = parseISO(targetDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const duration = intervalToDuration({ start, end });
        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return {
          years: duration.years || 0,
          months: duration.months || 0,
          days: duration.days || 0,
          totalDays,
          totalWeeks: Math.floor(totalDays / 7)
        };
      }
    } catch (e) {
      console.error(e);
    }
    return { years: 0, months: 0, days: 0, totalDays: 0, totalWeeks: 0 };
  }, [birthDate, targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6 my-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 space-y-8">
            <div id="tour-age-birth" className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Cake size={16} className="text-brand-primary" />
                    <label className="block text-caption font-medium uppercase tracking-widest text-black dark:text-white">Date of Birth</label>
                </div>
                <DateTimeDropdown
                    id="birth-date-picker"
                    key="birth-date-picker"
                    value={birthDate}
                    legend="Birth date and time"
                    onChange={val => setState({ birthDate: val })}
                />
            </div>
            <div id="tour-age-target" className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Calendar size={16} className="text-slate-400" />
                    <label className="block text-caption font-medium uppercase tracking-widest text-black dark:text-white">Age at Date of</label>
                </div>
                <DateTimeDropdown
                    id="target-date-picker"
                    key="target-date-picker"
                    value={targetDate}
                    legend="Age at date and time"
                    onChange={val => setState({ targetDate: val })}
                />
            </div>
        </div>

        {/* Results */}
        <div id="tour-age-results" className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="relative z-10 text-center space-y-4 py-4">
                <span className="text-caption font-normal uppercase tracking-[0.2em] text-black dark:text-white">Current Age</span>
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl md:text-7xl font-normal text-brand-primary tracking-tighter tabular-nums">{results.years}</span>
                    <span className="text-xl font-normal text-black dark:text-white uppercase">Years</span>
                </div>
                <p className="text-lg font-normal text-black dark:text-white uppercase tracking-tight">
                    {results.months} months and {results.days} days
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center space-y-1">
                    <span className="text-caption font-normal uppercase tracking-widest text-black dark:text-white">Total Weeks</span>
                    <p className="text-2xl font-normal text-black dark:text-white tabular-nums">{results.totalWeeks.toLocaleString()}</p>
                </div>
                <div className="text-center space-y-1">
                    <span className="text-caption font-normal uppercase tracking-widest text-black dark:text-white">Total Days</span>
                    <p className="text-2xl font-normal text-black dark:text-white tabular-nums">{results.totalDays.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
