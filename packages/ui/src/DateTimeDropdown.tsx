"use client";

import React, { useState, useMemo, useEffect } from "react";
import { format, parseISO, isValid, getDaysInMonth } from "date-fns";

interface DateTimeDropdownProps {
  value: string; // ISO format: YYYY-MM-DDThh:mm:ss
  onChange: (value: string) => void;
  legend: string;
  id?: string;
}

export function DateTimeDropdown({ value, onChange, legend, id }: DateTimeDropdownProps) {
  // Instruction: "No useEffect syncing from a parent date prop after initial mount"
  // We parse the initial value once and then the component owns the state.
  const initialDate = useMemo(() => {
    const d = parseISO(value);
    return isValid(d) ? d : new Date();
  }, []); // Only compute once on mount

  const [year, setYearState] = useState(initialDate.getFullYear());
  const [month, setMonthState] = useState(initialDate.getMonth() + 1); // 1-12
  const [day, setDayState] = useState(initialDate.getDate());
  const [hour, setHourState] = useState(initialDate.getHours());
  const [minute, setMinuteState] = useState(initialDate.getMinutes());
  const [second, setSecondState] = useState(initialDate.getSeconds());
  const [is12Hour, setIs12Hour] = useState(false);

  const daysInMonth = useMemo(() => {
    // Correct Leap Year logic is handled by date-fns/getDaysInMonth:
    // (divisible by 4, except centuries not divisible by 400 unless divisible by 400)
    return getDaysInMonth(new Date(year, month - 1));
  }, [year, month]);

  // Instruction: If Day was already selected and Month/Year change makes it invalid,
  // reset Day to the last valid day of the new month.
  useEffect(() => {
    if (day > daysInMonth) {
        setDayState(daysInMonth);
        const nextDate = new Date(year, month - 1, daysInMonth, hour, minute, second);
        onChange(format(nextDate, "yyyy-MM-dd'T'HH:mm:ss"));
    }
  }, [daysInMonth, day, year, month, hour, minute, second, onChange]);

  const notifyChange = (y: number, m: number, d: number, h: number, min: number, s: number) => {
    const nextDate = new Date(y, m - 1, d, h, min, s);
    if (isValid(nextDate)) {
        onChange(format(nextDate, "yyyy-MM-dd'T'HH:mm:ss"));
    }
  };

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (val: number) => {
    setYearState(val);
    notifyChange(val, month, day, hour, minute, second);
  };

  const handleMonthChange = (val: number) => {
    setMonthState(val);
    notifyChange(year, val, day, hour, minute, second);
  };

  const handleDayChange = (val: number) => {
    setDayState(val);
    notifyChange(year, month, val, hour, minute, second);
  };

  const handleHourChange = (val: number) => {
    setHourState(val);
    notifyChange(year, month, day, val, minute, second);
  };

  const handleMinuteChange = (val: number) => {
    setMinuteState(val);
    notifyChange(year, month, day, hour, val, second);
  };

  const handleSecondChange = (val: number) => {
    setSecondState(val);
    notifyChange(year, month, day, hour, minute, val);
  };

  // Hour display logic for 12h/24h
  const displayHour = is12Hour ? (hour % 12 || 12) : hour;
  const ampm = hour >= 12 ? "PM" : "AM";

  const handle12HourTimeChange = (newDisplayHour: number, newAmpm: string) => {
    let h = newDisplayHour;
    if (newAmpm === "PM" && h < 12) h += 12;
    if (newAmpm === "AM" && h === 12) h = 0;
    handleHourChange(h);
  };

  const selectClass = "bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black dark:text-white appearance-none cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-colors";

  return (
    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm" id={id}>
      <legend className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full">
        {legend}
      </legend>

      <div className="flex flex-col @md:flex-row gap-6">
        {/* Date Group */}
        <div className="flex flex-1 gap-3">
            <div className="flex flex-col flex-[2] gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Month</label>
                <select
                    aria-label="Month"
                    value={month}
                    onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                    className={selectClass}
                >
                    {months.map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col flex-1 gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Day</label>
                <select
                    aria-label="Day"
                    value={day}
                    onChange={(e) => handleDayChange(parseInt(e.target.value))}
                    className={selectClass}
                >
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col flex-1 gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Year</label>
                <select
                    aria-label="Year"
                    value={year}
                    onChange={(e) => handleYearChange(parseInt(e.target.value))}
                    className={selectClass}
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Time Group */}
        <div className="flex flex-1 gap-3">
            <div className="flex flex-col flex-1 gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Hrs</label>
                <select
                    aria-label="Hours"
                    value={displayHour}
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (is12Hour) handle12HourTimeChange(val, ampm);
                        else handleHourChange(val);
                    }}
                    className={selectClass}
                >
                    {Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? i + 1 : i).map(h => (
                        <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col flex-1 gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Min</label>
                <select
                    aria-label="Minutes"
                    value={minute}
                    onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
                    className={selectClass}
                >
                    {Array.from({ length: 60 }, (_, i) => i).map(m => (
                        <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col flex-1 gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Sec</label>
                <select
                    aria-label="Seconds"
                    value={second}
                    onChange={(e) => handleSecondChange(parseInt(e.target.value))}
                    className={selectClass}
                >
                    {Array.from({ length: 60 }, (_, i) => i).map(s => (
                        <option key={s} value={s}>{s.toString().padStart(2, '0')}</option>
                    ))}
                </select>
            </div>

            {is12Hour && (
                <div className="flex flex-col flex-1 gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">AM/PM</label>
                    <select
                        aria-label="AM/PM"
                        value={ampm}
                        onChange={(e) => handle12HourTimeChange(displayHour, e.target.value)}
                        className={selectClass}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Format</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                    type="button"
                    onClick={() => setIs12Hour(false)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${!is12Hour ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    24H
                </button>
                <button
                    type="button"
                    onClick={() => setIs12Hour(true)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${is12Hour ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    12H
                </button>
            </div>
        </div>
      </div>
    </fieldset>
  );
}
