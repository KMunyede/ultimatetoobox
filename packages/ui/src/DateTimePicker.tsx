"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerProps {
  value: string; // ISO format or similar
  onChange: (value: string) => void;
  label?: string;
}

type ViewMode = "month" | "year" | "decade" | "century";

export function DateTimePicker({ value, onChange, label }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const initialDate = value ? new Date(value) : new Date();
  
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  // Input value state
  const formatForInput = (d: Date) => {
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  
  const [inputValue, setInputValue] = useState(value ? formatForInput(initialDate) : "");

  // Refs for scrolling dials
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

  const itemHeight = 40; // 40px height for dial items (h-10)

  // Sync internal state if external value changes (and we're not focused/open)
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
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync scroll positions when popover opens
  useEffect(() => {
    if (isOpen) {
      setViewMode("month"); // Reset to month view on open
      setTimeout(() => {
        if (hoursRef.current) hoursRef.current.scrollTop = currentDate.getHours() * itemHeight;
        if (minutesRef.current) minutesRef.current.scrollTop = currentDate.getMinutes() * itemHeight;
        if (secondsRef.current) secondsRef.current.scrollTop = currentDate.getSeconds() * itemHeight;
      }, 50);
    }
  }, [isOpen]);

  const applyChange = (newDate: Date) => {
    setCurrentDate(newDate);
    setInputValue(formatForInput(newDate));
    // Emit ISO-like string format that `<input type="datetime-local">` originally used: YYYY-MM-DDThh:mm:ss
    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatted = `${newDate.getFullYear()}-${pad(newDate.getMonth() + 1)}-${pad(newDate.getDate())}T${pad(newDate.getHours())}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}`;
    onChange(formatted);
  };

  // Typed Input Parsing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    // Attempt to parse DD-MM-YYYY HH:mm:ss
    const regex = /^(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/;
    const match = val.match(regex);
    let newDate: Date | null = null;

    if (match) {
      const [_, day, month, year, h, m, s] = match;
      newDate = new Date(Number(year), Number(month) - 1, Number(day), Number(h), Number(m), Number(s));
    } else {
      // Fallback
      newDate = new Date(val);
    }

    if (newDate && !isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
      // Emit the change
      const pad = (n: number) => n.toString().padStart(2, "0");
      const formatted = `${newDate.getFullYear()}-${pad(newDate.getMonth() + 1)}-${pad(newDate.getDate())}T${pad(newDate.getHours())}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}`;
      onChange(formatted);
    }
  };

  // View Navigation Handlers
  const handlePrev = () => {
    if (viewMode === "month") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (viewMode === "year") setCurrentYear(currentYear - 10);
    else if (viewMode === "decade") setCurrentYear(currentYear - 100);
    else if (viewMode === "century") setCurrentYear(currentYear - 1000);
  };

  const handleNext = () => {
    if (viewMode === "month") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (viewMode === "year") setCurrentYear(currentYear + 10);
    else if (viewMode === "decade") setCurrentYear(currentYear + 100);
    else if (viewMode === "century") setCurrentYear(currentYear + 1000);
  };

  const handleHeaderClick = () => {
    if (viewMode === "month") setViewMode("year");
    else if (viewMode === "year") setViewMode("decade");
    else if (viewMode === "decade") setViewMode("century");
  };

  // View Renderers
  const renderHeaderLabel = () => {
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
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blankDays = Array.from({ length: firstDay }, (_, i) => i);

    return (
      <>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <div key={day} className="text-xs font-semibold text-slate-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blankDays.map(b => <div key={`blank-${b}`} className="h-8 w-8" />)}
          {daysArray.map(day => {
            const isSelected = day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
            const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(currentYear);
                  newDate.setMonth(currentMonth);
                  newDate.setDate(day);
                  applyChange(newDate);
                }}
                className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-sm transition-colors
                  ${isSelected ? "bg-blue-600 text-white font-bold" 
                  : isToday ? "border border-blue-500 text-blue-600 dark:text-blue-400 font-bold" 
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  const renderYearView = () => {
    const startYear = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);
    return (
      <div className="grid grid-cols-4 gap-2 py-4">
        {years.map(y => {
          const isSelected = y === currentDate.getFullYear();
          const isOut = y < startYear || y > startYear + 9;
          return (
            <button
              key={y}
              type="button"
              onClick={() => {
                setCurrentYear(y);
                setViewMode("month");
              }}
              className={`py-3 rounded-lg text-sm transition-colors font-medium
                ${isSelected ? "bg-blue-600 text-white" 
                : isOut ? "text-slate-400" 
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              {y}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDecadeView = () => {
    const startDecade = Math.floor(currentYear / 100) * 100;
    const decades = Array.from({ length: 12 }, (_, i) => startDecade - 10 + i * 10);
    return (
      <div className="grid grid-cols-4 gap-2 py-4">
        {decades.map(d => {
          const isSelected = Math.floor(currentDate.getFullYear() / 10) * 10 === d;
          const isOut = d < startDecade || d > startDecade + 90;
          return (
            <button
              key={d}
              type="button"
              onClick={() => {
                setCurrentYear(d);
                setViewMode("year");
              }}
              className={`py-3 rounded-lg text-xs transition-colors font-medium
                ${isSelected ? "bg-blue-600 text-white" 
                : isOut ? "text-slate-400" 
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              {d}-{d + 9}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCenturyView = () => {
    const startCentury = Math.floor(currentYear / 1000) * 1000;
    const centuries = Array.from({ length: 12 }, (_, i) => startCentury - 100 + i * 100);
    return (
      <div className="grid grid-cols-4 gap-2 py-4">
        {centuries.map(c => {
          const isSelected = Math.floor(currentDate.getFullYear() / 100) * 100 === c;
          const isOut = c < startCentury || c > startCentury + 900;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCurrentYear(c);
                setViewMode("decade");
              }}
              className={`py-3 rounded-lg text-xs transition-colors font-medium
                ${isSelected ? "bg-blue-600 text-white" 
                : isOut ? "text-slate-400" 
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              {c}-{c + 99}
            </button>
          );
        })}
      </div>
    );
  };

  // Time Logic
  const handleScroll = (type: "hour" | "minute" | "second", e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    clearTimeout((el as any).scrollTimeout);
    (el as any).scrollTimeout = setTimeout(() => {
      const index = Math.round(el.scrollTop / itemHeight);
      const newDate = new Date(currentDate);
      if (type === "hour") newDate.setHours(index);
      else if (type === "minute") newDate.setMinutes(index);
      else if (type === "second") newDate.setSeconds(index);
      applyChange(newDate);
    }, 150);
  };

  const clickDialItem = (type: "hour" | "minute" | "second", index: number) => {
    if (type === "hour" && hoursRef.current) hoursRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
    if (type === "minute" && minutesRef.current) minutesRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
    if (type === "second" && secondsRef.current) secondsRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
  };

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);
  const secondsList = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative w-full" ref={containerRef}>
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
        <div 
          ref={popoverRef}
          className="absolute z-50 mt-2 w-full min-w-[320px] max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 sm:flex gap-4 sm:min-w-[540px]"
        >
          {/* Calendar Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={handlePrev} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                onClick={handleHeaderClick}
                className="font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1 rounded-lg transition-colors"
              >
                {renderHeaderLabel()}
              </button>
              <button type="button" onClick={handleNext} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                <ChevronRight size={20} />
              </button>
            </div>

            {viewMode === "month" && renderMonthView()}
            {viewMode === "year" && renderYearView()}
            {viewMode === "decade" && renderDecadeView()}
            {viewMode === "century" && renderCenturyView()}
          </div>

          <div className="hidden sm:block w-px bg-slate-200 dark:bg-slate-700 mx-2" />
          <div className="sm:hidden h-px bg-slate-200 dark:bg-slate-700 my-4" />

          {/* Time Scrollers */}
          <div className="w-full sm:w-[180px] flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium mb-3">
              <Clock size={16} /> Time
            </div>
            
            <div className="relative w-full flex justify-between h-40 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2 overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Highlight selection bar */}
              <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg pointer-events-none" />
              
              {/* Hours Dial */}
              <div 
                ref={hoursRef}
                onScroll={(e) => handleScroll("hour", e)}
                className="w-12 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar text-center z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="h-[60px]" />
                {hoursList.map(h => (
                  <div key={h} onClick={() => clickDialItem("hour", h)} className="h-10 flex items-center justify-center snap-center cursor-pointer text-slate-800 dark:text-slate-200 hover:text-blue-600 font-medium select-none">
                    {h.toString().padStart(2, '0')}
                  </div>
                ))}
                <div className="h-[60px]" />
              </div>
              
              <div className="h-full flex items-center font-bold text-slate-400 z-10">:</div>

              {/* Minutes Dial */}
              <div 
                ref={minutesRef}
                onScroll={(e) => handleScroll("minute", e)}
                className="w-12 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar text-center z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="h-[60px]" />
                {minutesList.map(m => (
                  <div key={m} onClick={() => clickDialItem("minute", m)} className="h-10 flex items-center justify-center snap-center cursor-pointer text-slate-800 dark:text-slate-200 hover:text-blue-600 font-medium select-none">
                    {m.toString().padStart(2, '0')}
                  </div>
                ))}
                <div className="h-[60px]" />
              </div>

              <div className="h-full flex items-center font-bold text-slate-400 z-10">:</div>

              {/* Seconds Dial */}
              <div 
                ref={secondsRef}
                onScroll={(e) => handleScroll("second", e)}
                className="w-12 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar text-center z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="h-[60px]" />
                {secondsList.map(s => (
                  <div key={s} onClick={() => clickDialItem("second", s)} className="h-10 flex items-center justify-center snap-center cursor-pointer text-slate-800 dark:text-slate-200 hover:text-blue-600 font-medium select-none">
                    {s.toString().padStart(2, '0')}
                  </div>
                ))}
                <div className="h-[60px]" />
              </div>
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
