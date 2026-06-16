"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className = "relative inline-block",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Automatically hide after 10 seconds as requested
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
  };

  const hideTooltip = () => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const tooltipId = React.useId();

  // Create keyboard/mouse handlers
  const handleMouseEnter = () => showTooltip();
  const handleMouseLeave = () => hideTooltip();
  const handleFocus = () => showTooltip();
  const handleBlur = () => hideTooltip();

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {React.cloneElement(children, {
        "aria-describedby": content ? tooltipId : undefined,
      } as any)}
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-[100] w-max max-w-[200px] px-2.5 py-1.5 text-[11px] leading-normal font-medium text-white bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-sm rounded shadow-md pointer-events-none text-center ${positionClasses[position]}`}
          >
            {content}
            {/* Visual tiny arrow */}
            <div
              className={`absolute w-1.5 h-1.5 bg-slate-900/95 dark:bg-slate-800/95 rotate-45 ${
                position === "top"
                  ? "top-full left-1/2 -translate-x-1/2 -translate-y-1"
                  : position === "bottom"
                  ? "bottom-full left-1/2 -translate-x-1/2 translate-y-1"
                  : position === "left"
                  ? "left-full top-1/2 -translate-y-1/2 -translate-x-1"
                  : "right-full top-1/2 -translate-y-1/2 translate-x-1"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
