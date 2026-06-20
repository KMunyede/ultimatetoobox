"use client";

import React, { ReactNode } from "react";
import { Calendar } from "lucide-react";
import { ToolTutorial } from "./ToolTutorial";
import { DriveStep } from "driver.js";

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
  return (
    <div className="w-full mb-2">
      {/* Title & Date Line - Tightened further */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
        <h1 className="text-[18px] md:text-[20px] font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          {title}
        </h1>
        {lastUpdated && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800 shrink-0">
            <Calendar size={9} />
            {lastUpdated}
          </span>
        )}
      </div>

      {/* Subtitle - Single line, smaller text */}
      <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
        {subtitle}
      </p>

      {/* Action Row - Ultra-tight padding */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-y border-slate-100 dark:border-slate-800/50 mb-1">
        <div className="flex items-center gap-2">
          <ToolTutorial tourId={tourId} steps={tourSteps} />
        </div>
        <div className="flex-shrink-0">
          {shareButton}
        </div>
      </div>
    </div>
  );
}
