"use client";

import React from "react";

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onValidate?: (value: number) => number;
}

export function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  className = "",
  onValidate,
  ...props
}: NumberInputProps) {
  const handleBlur = () => {
    let num = parseFloat(value);
    if (isNaN(num)) {
      if (min !== undefined) num = min;
      else num = 0;
    }

    if (onValidate) {
      num = onValidate(num);
    } else {
      if (step !== undefined && step > 0) {
        num = Math.round(num / step) * step;
      }
      if (min !== undefined) num = Math.max(min, num);
      if (max !== undefined) num = Math.min(max, num);
    }

    const cleanStr = Number(num.toFixed(4)).toString();
    onChange(cleanStr);
  };

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block text-caption font-normal uppercase tracking-widest text-[var(--color-text-secondary)] ml-1 mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        className={`w-full bg-white dark:bg-slate-950 border border-[var(--color-border-base)] dark:border-slate-800 rounded-xl p-3 text-lg focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-alpha)] outline-none transition-all ${className}`}
      />
    </div>
  );
}
