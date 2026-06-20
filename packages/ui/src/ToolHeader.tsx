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
 * Compressed Header for Utility Tools.
 * Designed to minimize vertical footprint so inputs are visible in first viewport.
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
    <div className="w-full mb-4">
      {/* Title & Date Line */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          {title}
        </h1>
        {lastUpdated && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
            <Calendar size={10} />
            {lastUpdated}
          </span>
        )}
      </div>

      {/* Subtitle - Single line on mobile, hidden if too long */}
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">
        {subtitle}
      </p>

      {/* Action Row - Combined Share/Feedback/Tutorial */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y border-slate-100 dark:border-slate-800/50 mb-2">
        <div className="flex items-center gap-3">
          <ToolTutorial tourId={tourId} steps={tourSteps} />
        </div>
        <div className="flex-shrink-0">
          {shareButton}
        </div>
      </div>
    </div>
  );
}
