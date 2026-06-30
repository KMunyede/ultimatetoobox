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
      if (min !== undefined) num = Math.max(min, num);
      if (max !== undefined) num = Math.min(max, num);
    }

    onChange(num.toString());
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          {label}
        </label>
      )}
      <input
        {...props}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none transition-all ${className}`}
      />
    </div>
  );
}
