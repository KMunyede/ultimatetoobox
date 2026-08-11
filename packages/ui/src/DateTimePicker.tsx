"use client";

import React, { useMemo, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { parseISO, format, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  value: string; // ISO format: YYYY-MM-DDThh:mm:ss
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

const TimeInput = ({ date, onChange }: { date?: Date; onChange?: (date: Date) => void }) => {
  const [localH, setLocalH] = useState("");
  const [localM, setLocalM] = useState("");
  const [localS, setLocalS] = useState("");

  // Sync local state when the date prop changes (e.g. from calendar click)
  useEffect(() => {
    if (date && isValid(date)) {
      setLocalH(date.getHours().toString().padStart(2, '0'));
      setLocalM(date.getMinutes().toString().padStart(2, '0'));
      setLocalS(date.getSeconds().toString().padStart(2, '0'));
    }
  }, [date]);

  const handleBlur = (type: 'h' | 'm' | 's') => {
    let val = parseInt(type === 'h' ? localH : type === 'm' ? localM : localS, 10);

    if (isNaN(val)) {
        // Reset to prop value if invalid
        if (date) {
            setLocalH(date.getHours().toString().padStart(2, '0'));
            setLocalM(date.getMinutes().toString().padStart(2, '0'));
            setLocalS(date.getSeconds().toString().padStart(2, '0'));
        }
        return;
    }

    // Clamp values
    if (type === 'h') val = Math.max(0, Math.min(23, val));
    else val = Math.max(0, Math.min(59, val));

    // Update local string for visual consistency
    const padded = val.toString().padStart(2, '0');
    if (type === 'h') setLocalH(padded);
    else if (type === 'm') setLocalM(padded);
    else setLocalS(padded);

    // Commit change to parent
    const next = new Date(date || new Date());
    if (type === 'h') next.setHours(val);
    else if (type === 'm') next.setMinutes(val);
    else if (type === 's') next.setSeconds(val);

    if (onChange && next.getTime() !== date?.getTime()) {
        onChange(next);
    }
  };

  const inputClass = "w-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums text-black dark:text-white";

  return (
    <div className="flex items-center justify-center gap-2 p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Hrs</span>
        <input
          type="text"
          inputMode="numeric"
          value={localH}
          onChange={(e) => setLocalH(e.target.value.replace(/\D/g, '').slice(0, 2))}
          onBlur={() => handleBlur('h')}
          className={inputClass}
        />
      </div>
      <span className="text-slate-300 self-end pb-2.5 font-bold">:</span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Min</span>
        <input
          type="text"
          inputMode="numeric"
          value={localM}
          onChange={(e) => setLocalM(e.target.value.replace(/\D/g, '').slice(0, 2))}
          onBlur={() => handleBlur('m')}
          className={inputClass}
        />
      </div>
      <span className="text-slate-300 self-end pb-2.5 font-bold">:</span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Sec</span>
        <input
          type="text"
          inputMode="numeric"
          value={localS}
          onChange={(e) => setLocalS(e.target.value.replace(/\D/g, '').slice(0, 2))}
          onBlur={() => handleBlur('s')}
          className={inputClass}
        />
      </div>
    </div>
  );
};

const CustomInput = React.forwardRef(({ value, onClick, onChange, label, id }: any, ref: any) => (
  <div className="relative w-full">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-black dark:text-white mb-1">
        {label}
      </label>
    )}
    <div className="relative w-full">
      <input
        id={id}
        ref={ref}
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder="DD-MM-YYYY HH:mm:ss"
        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-black dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-y-0 right-0 px-3 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded-r-xl"
      >
        <CalendarIcon size={18} />
      </button>
    </div>
  </div>
));

CustomInput.displayName = "CustomInput";

export function DateTimePicker({ value, onChange, label, id }: DateTimePickerProps) {
  const selectedDate = useMemo(() => {
    if (!value) return null;
    const d = parseISO(value);
    return isValid(d) ? d : null;
  }, [value]);

  const handleChange = (date: Date | null) => {
    if (date && isValid(date)) {
      // Use the exact same ISO format as the previous implementation
      onChange(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
    }
  };

  return (
    <div className="w-full hsc-datetime-picker">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeInput
        customTimeInput={<TimeInput />}
        timeInputLabel=""
        dateFormat="dd-MM-yyyy HH:mm:ss"
        customInput={<CustomInput label={label} id={id} />}
        popperClassName="hsc-datepicker-popper"
        calendarClassName="hsc-datepicker-calendar"
        wrapperClassName="w-full"
      />
      <style jsx global>{`
        .hsc-datetime-picker .react-datepicker-wrapper {
          display: block;
          width: 100%;
        }
        .hsc-datepicker-calendar {
          border-radius: 1rem !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
          font-family: inherit !important;
          background-color: white !important;
        }
        .dark .hsc-datepicker-calendar {
          background-color: #0f172a !important;
          border-color: #1e293b !important;
          color: white !important;
        }
        .hsc-datepicker-calendar .react-datepicker__header {
          background-color: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          padding-top: 1rem !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__header {
          background-color: #1e293b !important;
          border-bottom-color: #334155 !important;
        }
        .hsc-datepicker-calendar .react-datepicker__current-month,
        .hsc-datepicker-calendar .react-datepicker-time__header {
          color: #0f172a !important;
          font-weight: 600 !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__current-month,
        .dark .hsc-datepicker-calendar .react-datepicker-time__header {
          color: white !important;
        }
        .hsc-datepicker-calendar .react-datepicker__day {
          color: #334155 !important;
          border-radius: 9999px !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__day {
          color: #cbd5e1 !important;
        }
        .hsc-datepicker-calendar .react-datepicker__day:hover {
          background-color: #f1f5f9 !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__day:hover {
          background-color: #334155 !important;
        }
        .hsc-datepicker-calendar .react-datepicker__day--selected {
          background-color: #2563eb !important;
          color: white !important;
        }
        .hsc-datepicker-calendar .react-datepicker__day--today {
          border: 1px solid #2563eb !important;
        }
        .hsc-datepicker-calendar .react-datepicker__time-container {
          border-left: 1px solid #e2e8f0 !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__time-container {
          border-left-color: #334155 !important;
        }
        .hsc-datepicker-calendar .react-datepicker__time-box {
          border-bottom-right-radius: 1rem !important;
        }
        .hsc-datepicker-calendar .react-datepicker__time-list-item--selected {
          background-color: #2563eb !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__time-container {
          background-color: #0f172a !important;
        }
        .dark .hsc-datepicker-calendar .react-datepicker__time-list-item:hover {
          background-color: #334155 !important;
        }
        /* Style for the custom time input container */
        .react-datepicker__input-time-container {
          margin: 0 !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}
