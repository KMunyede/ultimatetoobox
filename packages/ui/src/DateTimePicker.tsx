"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerProps {
  value: string; // ISO format or similar: YYYY-MM-DDThh:mm:ss
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

type ViewMode = "month" | "year" | "decade" | "century";

const ITEM_HEIGHT = 40;

const formatForInput = (d: Date) => {
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const formatDateToISO = (d: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// Sub-component for the Time Dial to isolate re-renders and optimize scrolling
const TimeDial = React.memo(({
  type,
  value,
  onChange
}: {
  type: "hour" | "minute" | "second",
  value: number,
  onChange: (val: number) => void
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);
  const max = type === "hour" ? 24 : 60;

  // Generate the 3x list once
  const list = useMemo(() => Array.from({ length: max * 3 }, (_, i) => i % max), [max]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;

    // Silent loop logic for infinite scroll
    if (el.scrollTop <= ITEM_HEIGHT) {
      el.scrollTop += max * ITEM_HEIGHT;
    } else if (el.scrollTop >= (max * 2 - 1) * ITEM_HEIGHT) {
      el.scrollTop -= max * ITEM_HEIGHT;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const index = Math.round(el.scrollTop / ITEM_HEIGHT) % max;
      onChange(index);
    }, 100);
  }, [max, onChange]);

  const handleClickItem = useCallback((val: number) => {
    const targetScroll = (val + max) * ITEM_HEIGHT;
    scrollRef.current?.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, [max]);

  // Sync scroll position when external value changes (e.g. via typed input)
  useEffect(() => {
    if (scrollRef.current) {
      const currentScrollIndex = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT) % max;
      if (currentScrollIndex !== value) {
        scrollRef.current.scrollTo({ top: (value + max) * ITEM_HEIGHT, behavior: "smooth" });
      }
    }
  }, [value, max]);

  // Initial scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (value + max) * ITEM_HEIGHT;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="w-12 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar text-center z-10 overscroll-contain"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="h-[40px] shrink-0" />
      {list.map((v, i) => (
        <div
          key={i}
          onClick={() => handleClickItem(v)}
          className={`h-10 flex items-center justify-center snap-center cursor-pointer font-medium select-none transition-colors
            ${v === value ? "text-blue-600 font-normal scale-110" : "text-slate-800 dark:text-slate-200 hover:text-blue-500"}`}
        >
          {v.toString().padStart(2, '0')}
        </div>
      ))}
      <div className="h-[40px] shrink-0" />
    </div>
  );
});

TimeDial.displayName = "TimeDial";

export function DateTimePicker({ value, onChange, label, id }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDate = useMemo(() => {
    if (!value) return new Date();
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);
  
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const [inputValue, setInputValue] = useState(value ? formatForInput(initialDate) : "");

  // Sync internal state if external value changes while closed
  useEffect(() => {
    if (!isOpen && value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentDate(d);
        setCurrentMonth(d.getMonth());
        setCurrentYear(d.getFullYear());
        setInputValue(formatForInput(d));
      }
    }
  }, [value, isOpen]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const applyChange = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
    setInputValue(formatForInput(newDate));
    onChange(formatDateToISO(newDate));
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const regex = /^(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/;
    const match = val.match(regex);
    let newDate: Date | null = null;

    if (match) {
      const [_, day, month, year, h, m, s] = match;
      newDate = new Date(Number(year), Number(month) - 1, Number(day), Number(h), Number(m), Number(s));
    } else {
      newDate = new Date(val);
    }

    if (newDate && !isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
      onChange(formatDateToISO(newDate));
    }
  };

  const handlePrev = useCallback(() => {
    if (viewMode === "month") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else if (viewMode === "year") setCurrentYear(prev => prev - 10);
    else if (viewMode === "decade") setCurrentYear(prev => prev - 100);
    else if (viewMode === "century") setCurrentYear(prev => prev - 1000);
  }, [viewMode, currentMonth]);

  const handleNext = useCallback(() => {
    if (viewMode === "month") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    } else if (viewMode === "year") setCurrentYear(prev => prev + 10);
    else if (viewMode === "decade") setCurrentYear(prev => prev + 100);
    else if (viewMode === "century") setCurrentYear(prev => prev + 1000);
  }, [viewMode, currentMonth]);

  const handleHeaderClick = useCallback(() => {
    if (viewMode === "month") setViewMode("year");
    else if (viewMode === "year") setViewMode("decade");
    else if (viewMode === "decade") setViewMode("century");
  }, [viewMode]);

  const headerLabel = useMemo(() => {
    if (viewMode === "month") {
      return new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" });
    } else if (viewMode === "year") {
      const start = Math.floor(currentYear / 10) * 10;
      return `${start} - ${start + 9}`;
    } else if (viewMode === "decade") {
      const start = Math.floor(currentYear / 100) * 100;
      return `${start} - ${start + 90}`;
    } else if (viewMode === "century") {
      const start = Math.floor(currentYear / 1000) * 1000;
      return `${start} - ${start + 900}`;
    }
  }, [viewMode, currentYear, currentMonth]);

  const handleTimeChange = useCallback((type: "hour" | "minute" | "second", newVal: number) => {
    setCurrentDate(prev => {
        const next = new Date(prev);
        if (type === "hour") next.setHours(newVal);
        else if (type === "minute") next.setMinutes(newVal);
        else if (type === "second") next.setSeconds(newVal);

        // Side effects after state update
        setTimeout(() => {
            setInputValue(formatForInput(next));
            onChange(formatDateToISO(next));
        }, 0);

        return next;
    });
  }, [onChange]);

  return (
    <div className="relative w-full" ref={containerRef} id={id}>
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
      
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="DD-MM-YYYY HH:mm:ss"
          onFocus={() => setIsOpen(true)}
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 px-3 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded-r-xl"
        >
          <CalendarIcon size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[288px] max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 sm:flex gap-4 sm:min-w-[540px] animate-in fade-in zoom-in-95 duration-200">
          {/* Calendar Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={handlePrev} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                onClick={handleHeaderClick}
                className="font-normal text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1 rounded-lg transition-colors"
              >
                {headerLabel}
              </button>
              <button type="button" onClick={handleNext} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            {viewMode === "month" && (
                <MonthView
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    selectedDate={currentDate}
                    onSelect={(d: number) => {
                        const next = new Date(currentDate);
                        next.setFullYear(currentYear);
                        next.setMonth(currentMonth);
                        next.setDate(d);
                        applyChange(next);
                    }}
                />
            )}
            {viewMode === "year" && (
                <YearView
                    currentYear={currentYear}
                    selectedYear={currentDate.getFullYear()}
                    onSelect={(y: number) => {
                        setCurrentYear(y);
                        setViewMode("month");
                    }}
                />
            )}
            {viewMode === "decade" && (
                <DecadeView
                    currentYear={currentYear}
                    selectedYear={currentDate.getFullYear()}
                    onSelect={(y: number) => {
                        setCurrentYear(y);
                        setViewMode("year");
                    }}
                />
            )}
            {viewMode === "century" && (
                <CenturyView
                    currentYear={currentYear}
                    selectedYear={currentDate.getFullYear()}
                    onSelect={(y: number) => {
                        setCurrentYear(y);
                        setViewMode("decade");
                    }}
                />
            )}
          </div>

          <div className="hidden sm:block w-px bg-slate-200 dark:bg-slate-700 mx-2" />
          <div className="sm:hidden h-px bg-slate-200 dark:bg-slate-700 my-4" />

          {/* Time Scrollers */}
          <div className="w-full sm:w-[162px] flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium mb-3">
              <Clock size={16} /> Time
            </div>
            
            <div className="relative w-full flex justify-between h-40 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2 overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg pointer-events-none" />

              <TimeDial
                type="hour"
                value={currentDate.getHours()}
                onChange={(val) => handleTimeChange("hour", val)}
              />
              <div className="h-full flex items-center font-normal text-slate-400 z-10">:</div>
              <TimeDial
                type="minute"
                value={currentDate.getMinutes()}
                onChange={(val) => handleTimeChange("minute", val)}
              />
              <div className="h-full flex items-center font-normal text-slate-400 z-10">:</div>
              <TimeDial
                type="second"
                value={currentDate.getSeconds()}
                onChange={(val) => handleTimeChange("second", val)}
              />
            </div>
            
            <div className="mt-4 w-full">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Internal view components for better memoization and cleaner code
interface ViewProps {
    currentYear: number;
    currentMonth?: number;
    selectedDate?: Date;
    selectedYear?: number;
    onSelect: (val: number) => void;
}

const MonthView = React.memo(({ currentYear, currentMonth, selectedDate, onSelect }: ViewProps) => {
    const month = currentMonth ?? 0;
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
    const firstDay = new Date(currentYear, month, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blankDays = Array.from({ length: firstDay }, (_, i) => i);
    const today = new Date();

    return (
        <>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day} className="text-caption font-normal text-slate-400 uppercase">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {blankDays.map(b => <div key={`blank-${b}`} className="h-8 w-8" />)}
                {daysArray.map(day => {
                    const isSelected = selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
                    const isToday = day === today.getDate() && month === today.getMonth() && currentYear === today.getFullYear();
                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => onSelect(day)}
                            className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs transition-all
                                ${isSelected ? "bg-blue-600 text-white font-normal shadow-md scale-110"
                                : isToday ? "border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-normal"
                                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </>
    );
});
MonthView.displayName = "MonthView";

const YearView = React.memo(({ currentYear, selectedYear, onSelect }: ViewProps) => {
    const startYear = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);
    return (
        <div className="grid grid-cols-4 gap-2 py-2">
            {years.map(y => (
                <button
                    key={y}
                    type="button"
                    onClick={() => onSelect(y)}
                    className={`py-3 rounded-xl text-xs transition-all font-medium
                        ${y === selectedYear ? "bg-blue-600 text-white shadow-md scale-105"
                        : (y < startYear || y > startYear + 9) ? "text-slate-400 opacity-50"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                >
                    {y}
                </button>
            ))}
        </div>
    );
});
YearView.displayName = "YearView";

const DecadeView = React.memo(({ currentYear, selectedYear, onSelect }: ViewProps) => {
    const startDecade = Math.floor(currentYear / 100) * 100;
    const decades = Array.from({ length: 12 }, (_, i) => startDecade - 10 + i * 10);
    const selYear = selectedYear ?? 0;
    return (
        <div className="grid grid-cols-3 gap-2 py-2">
            {decades.map(d => (
                <button
                    key={d}
                    type="button"
                    onClick={() => onSelect(d)}
                    className={`py-3 rounded-xl text-caption transition-all font-normal
                        ${Math.floor(selYear / 10) * 10 === d ? "bg-blue-600 text-white shadow-md"
                        : (d < startDecade || d > startDecade + 90) ? "text-slate-400 opacity-50"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                >
                    {d}s
                </button>
            ))}
        </div>
    );
});
DecadeView.displayName = "DecadeView";

const CenturyView = React.memo(({ currentYear, selectedYear, onSelect }: ViewProps) => {
    const startCentury = Math.floor(currentYear / 1000) * 1000;
    const centuries = Array.from({ length: 12 }, (_, i) => startCentury - 100 + i * 100);
    const selYear = selectedYear ?? 0;
    return (
        <div className="grid grid-cols-3 gap-2 py-2">
            {centuries.map(c => (
                <button
                    key={c}
                    type="button"
                    onClick={() => onSelect(c)}
                    className={`py-3 rounded-xl text-caption transition-all font-normal
                        ${Math.floor(selYear / 100) * 100 === c ? "bg-blue-600 text-white shadow-md"
                        : (c < startCentury || c > startCentury + 900) ? "text-slate-400 opacity-50"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                >
                    {c}s
                </button>
            ))}
        </div>
    );
});
CenturyView.displayName = "CenturyView";
