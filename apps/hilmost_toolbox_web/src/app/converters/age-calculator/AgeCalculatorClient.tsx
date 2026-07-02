"use client";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Cake, Calendar } from "lucide-react";
import { parseISO, intervalToDuration } from "date-fns";
import { Input } from "../../../components/ui/Input";

export function AgeCalculatorClient() {
  const [state, setState] = useUrlState({
    birthDate: "1990-01-01",
    targetDate: new Date().toISOString().split('T')[0],
  });

  const { birthDate, targetDate } = state as { birthDate: string; targetDate: string };

  let ageResult = { years: 0, months: 0, days: 0 };
  let totalDays = 0;
  let totalWeeks = 0;

  try {
    const start = parseISO(birthDate);
    const end = parseISO(targetDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const duration = intervalToDuration({ start, end });
      ageResult = {
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0
      };
      totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      totalWeeks = Math.floor(totalDays / 7);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-8 shadow-sm">
            <div id="tour-age-birth" className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Cake size={16} className="text-brand-primary" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Date of Birth</label>
                </div>
                <Input
                    type="date"
                    value={birthDate}
                    onChange={e => setState({ birthDate: e.target.value })}
                    className="font-bold text-lg"
                />
            </div>
            <div id="tour-age-target" className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Calendar size={16} className="text-slate-400" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Age at Date of</label>
                </div>
                <Input
                    type="date"
                    value={targetDate}
                    onChange={e => setState({ targetDate: e.target.value })}
                    className="font-bold text-lg"
                />
            </div>
        </div>

        {/* Results */}
        <div id="tour-age-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="relative z-10 text-center space-y-4 py-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Age</span>
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl md:text-7xl font-black text-brand-primary tracking-tighter">{ageResult.years}</span>
                    <span className="text-xl font-black text-slate-400 uppercase">Years</span>
                </div>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                    {ageResult.months} months and {ageResult.days} days
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Weeks</span>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{totalWeeks.toLocaleString()}</p>
                </div>
                <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Days</span>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{totalDays.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
