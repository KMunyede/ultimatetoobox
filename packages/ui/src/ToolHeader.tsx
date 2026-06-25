"use client";

import React, { ReactNode } from "react";
import { Calendar } from "lucide-react";
import { ToolTutorial } from "./ToolTutorial";
import { DriveStep } from "driver.js";
import { usePathname } from "next/navigation";

interface ToolHeaderProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  tourId: string;
  tourSteps: DriveStep[];
  shareButton?: ReactNode;
}

/**
 * Ultra-Compressed Header for Utility Tools.
 * Targets ~20px H1 and minimal vertical margins for maximum content density.
 */
export function ToolHeader({
  title,
  subtitle,
  lastUpdated,
  tourId,
  tourSteps,
  shareButton
}: ToolHeaderProps) {
  const pathname = usePathname();
  const showDate = pathname?.includes('/guides/');

  return (
    <div className="w-full mb-3">
      {/* Title Line - Tightened further */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
        <h1 className="text-[17px] md:text-[19px] font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          {title}
        </h1>
        {showDate && lastUpdated && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/30 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
            <Calendar size={10} />
            {lastUpdated}
          </span>
        )}
      </div>

      {/* Subtitle - Single line, smaller text */}
      <p className="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
        {subtitle}
      </p>

      {/* Action Row - Forced 1-line with divider */}
      <div className="flex items-center gap-3 py-1.5 border-y border-slate-100 dark:border-slate-800/50">
        <ToolTutorial tourId={tourId} steps={tourSteps} />
        {shareButton && (
          <div className="flex-shrink-0 border-l border-slate-200 dark:border-slate-700 pl-3">
            {shareButton}
          </div>
        )}
      </div>
    </div>
  );
}
