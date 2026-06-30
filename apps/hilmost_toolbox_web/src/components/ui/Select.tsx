"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  className?: string;
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none cursor-pointer transition-all ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
