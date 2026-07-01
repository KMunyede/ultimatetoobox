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
  const baseStyles = "flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase tracking-widest border";

  const variants = {
    primary: "px-12 py-4 bg-brand-primary text-white border-brand-primary rounded-lg text-sm shadow-xl shadow-brand-primary/20 hover:scale-105",
    secondary: "px-10 py-5 bg-white dark:bg-slate-800 border-[#D8D6CF] dark:border-slate-700 text-[#57544C] dark:text-slate-300 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-700",
    pill: "px-10 py-5 bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 rounded-lg text-xs shadow-xl",
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
