"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none transition-all ${className}`}
      />
    </div>
  );
}
