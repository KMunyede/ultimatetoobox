"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  className?: string;
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none cursor-pointer transition-all ${className}`}
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
