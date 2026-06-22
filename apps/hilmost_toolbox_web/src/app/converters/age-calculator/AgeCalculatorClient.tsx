"use client";
import { ToolTutorial, DateTimePicker, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { Cake, Calendar, Hourglass } from "lucide-react";
import { differenceInYears, differenceInMonths, differenceInDays, parseISO, intervalToDuration } from "date-fns";

export function AgeCalculatorClient() {
  const [state, setState] = useUrlState({
    birthDate: "1990-01-01",
    targetDate: new Date().toISOString().split('T')[0],
  });

  const { birthDate, targetDate } = state;

  let ageResult = { years: 0, months: 0, days: 0 };
  let totalDays = 0;
  let totalWeeks = 0;

  try {
    const start = parseISO(birthDate as string);
    const end = parseISO(targetDate as string);
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

  const tourSteps = [
    { element: '#tour-age-birth', popover: { title: '1. Date of Birth', description: 'Select your birth date or the start date of the period.' } },
    { element: '#tour-age-target', popover: { title: '2. Age at Date', description: 'Select the date you want to calculate the age at (defaults to today).' } },
    { element: '#tour-age-results', popover: { title: '3. Age Breakdown', description: 'See your exact age in years, months, and days, plus total weeks and days.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Form */}
        <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-5 space-y-8 shadow-sm">
            <div id="tour-age-birth" className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Cake size={14} className="text-brand-primary" /> Date of Birth
                </label>
                <Tooltip content="Select your date of birth" position="top">
                  <input
                      type="date"
                      title="Date of Birth"
                      className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                      value={birthDate}
                      onChange={e => setState({ birthDate: e.target.value })}
                  />
                </Tooltip>
            </div>
            <div id="tour-age-target" className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Calendar size={14} className="text-text-muted" /> Age at Date of
                </label>
                <Tooltip content="Select the date you want to calculate the age at" position="top">
                  <input
                      type="date"
                      title="Target Age Date"
                      className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                      value={targetDate}
                      onChange={e => setState({ targetDate: e.target.value })}
                  />
                </Tooltip>
            </div>
        </div>

        {/* Results */}
        <div id="tour-age-results" className="bg-canvas-card border border-base rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="relative z-10 text-center space-y-4">
                <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Current Age</span>
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter">{ageResult.years}</span>
                    <span className="text-xl font-bold text-text-secondary uppercase">Years</span>
                </div>
                <p className="text-lg font-medium text-text-muted">
                    {ageResult.months} months and {ageResult.days} days
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-base">
                <div className="text-center space-y-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Weeks</span>
                    <p className="text-2xl font-bold text-text-primary">{totalWeeks.toLocaleString()}</p>
                </div>
                <div className="text-center space-y-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Days</span>
                    <p className="text-2xl font-bold text-text-primary">{totalDays.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
