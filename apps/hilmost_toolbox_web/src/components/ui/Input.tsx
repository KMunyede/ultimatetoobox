"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all ${className}`}
      />
    </div>
  );
}
