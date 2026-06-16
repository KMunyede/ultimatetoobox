"use client";
import { useMemo } from "react";
import { ToolTutorial, DateTimePicker } from "@utilitiessite/ui";
import { CalendarClock } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";

type FormatOptions = "hours" | "seconds" | "minutes" | "days" | "full";

export function AgeCalculatorClient() {
  const [state, setState] = useUrlState({
    startDate: "",
    endDate: "",
    format: "hours",
  });

  const { startDate, endDate, format } = state as { startDate: string, endDate: string, format: FormatOptions };

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;

    const d1 = new Date(startDate);
    const d2 = new Date(endDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    // Always calculate from earlier date to later date
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const isNegative = d1 > d2;

    const diffMs = end.getTime() - start.getTime();

    let valueStr = "";

    switch (format) {
      case "seconds":
        valueStr = (diffMs / 1000).toFixed(0) + " seconds";
        break;
      case "minutes":
        valueStr = (diffMs / (1000 * 60)).toFixed(2) + " minutes";
        break;
      case "hours":
        valueStr = (diffMs / (1000 * 60 * 60)).toFixed(4) + " hours";
        break;
      case "days":
        valueStr = (diffMs / (1000 * 60 * 60 * 24)).toFixed(4) + " days";
        break;
      case "full":
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();
        let hours = end.getHours() - start.getHours();
        let minutes = end.getMinutes() - start.getMinutes();
        let seconds = end.getSeconds() - start.getSeconds();

        if (seconds < 0) {
          seconds += 60;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes += 60;
          hours -= 1;
        }
        if (hours < 0) {
          hours += 24;
          days -= 1;
        }
        if (days < 0) {
          const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
          days += previousMonth.getDate();
          months -= 1;
        }
        if (months < 0) {
          months += 12;
          years -= 1;
        }

        const centuries = Math.floor(years / 100);
        years = years % 100;

        valueStr = `${centuries} Centuries : ${years} Years : ${months} Months : ${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
        break;
    }

    return { valueStr, isNegative };
  }, [startDate, endDate, format]);

  const tourSteps = [
    { element: '#tour-age-dates', popover: { title: '1. Select Dates', description: 'Choose the starting and ending dates for the duration you want to calculate.' } },
    { element: '#tour-age-format', popover: { title: '2. Choose Format', description: 'Select how you want the result to be displayed (hours, days, full string, etc.).' } },
    { element: '#tour-age-result', popover: { title: '3. See Result', description: 'Your calculated time difference appears here.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="age_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div id="tour-age-dates" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DateTimePicker
          label="Start Date & Time"
          value={startDate}
          onChange={(val) => setState({ startDate: val })}
        />
        <DateTimePicker
          label="End Date & Time"
          value={endDate}
          onChange={(val) => setState({ endDate: val })}
        />
      </div>

      <div id="tour-age-format" className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Output Format
        </label>
        <select
          value={format}
          onChange={(e) => setState({ format: e.target.value as FormatOptions })}
          className="w-full h-14 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all hover:border-blue-400"
        >
          <option value="hours">Hours (e.g. 16263.5364 hours)</option>
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="days">Days</option>
          <option value="full">Full Chronological String (CC:YY:MM:DD:HH:MM:SS)</option>
        </select>
      </div>

      {result && (
        <div id="tour-age-result" className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 flex items-start gap-4 transition-all hover:shadow-md">
          <div className="text-blue-600 dark:text-blue-400 mt-1 animate-pulse">
            <CalendarClock size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">
              Time Passed
            </h3>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {result.isNegative ? "-" : ""}{result.valueStr}
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
