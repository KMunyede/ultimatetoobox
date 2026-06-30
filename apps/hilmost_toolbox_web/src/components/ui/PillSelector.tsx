"use client";

import React from "react";

interface Option<T> {
  label: string;
  value: T;
}

interface PillSelectorProps<T> {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  pillClassName?: string;
}

export function PillSelector<T extends string | number>({
  label,
  options,
  value,
  onChange,
  className = "",
  pillClassName = "",
}: PillSelectorProps<T>) {
  return (
    <div className={`space-y-4 w-full ${className}`}>
      {label && (
        <h3 className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </h3>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shadow-inner">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                value === opt.value
                  ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              } ${pillClassName}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
