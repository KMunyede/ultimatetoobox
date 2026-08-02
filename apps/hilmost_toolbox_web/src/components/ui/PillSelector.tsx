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
    <div className={`space-y-3 w-full ${className}`}>
      {label && (
        <h3 className="text-center text-caption font-normal uppercase tracking-widest text-[var(--color-text-secondary)] mb-1">
          {label}
        </h3>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <div
          className="inline-flex max-w-full overflow-x-auto custom-scrollbar flex-nowrap bg-white dark:bg-slate-950 p-1 rounded-xl border border-[var(--color-border-base)] dark:border-slate-800 shadow-inner"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`px-6 py-3 rounded-lg text-caption font-normal uppercase tracking-widest transition-all ${
                value === opt.value
                  ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                  : "text-black dark:text-white hover:text-black dark:text-white dark:hover:text-white"
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

