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
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">
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
        className={`w-full bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all ${className}`}
      />
    </div>
  );
}
