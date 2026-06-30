"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pill';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase tracking-widest";

  const variants = {
    primary: "px-12 py-4 bg-rose-600 text-white rounded-[2rem] text-sm shadow-xl shadow-rose-500/20 hover:scale-105",
    secondary: "px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[2rem] text-xs hover:bg-slate-200 dark:hover:bg-slate-700",
    pill: "px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] text-xs shadow-xl",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
