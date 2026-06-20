"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";

interface AdUnitProps {
  publisherId: string;
  slotId: string;
  format?: AdFormat;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Explicit min-height for CLS prevention.
   * If not provided, it will use defaults based on the 'format'.
   */
  minHeight?: string;
}

const FORMAT_DEFAULTS: Record<AdFormat, { minHeight: string, minWidth?: string }> = {
  vertical: { minHeight: "600px", minWidth: "160px" },
  horizontal: { minHeight: "90px", minWidth: "100%" },
  rectangle: { minHeight: "250px", minWidth: "300px" },
  fluid: { minHeight: "auto" },
  auto: { minHeight: "280px" },
};

/**
 * AdUnit component with aggressive CLS prevention.
 * Reserves space using IntersectionObserver and predefined format dimensions.
 */
export function AdUnit({
  publisherId, 
  slotId, 
  format = "auto", 
  responsive = true, 
  className = "",
  style,
  minHeight
}: AdUnitProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const defaults = FORMAT_DEFAULTS[format];
  const finalMinHeight = minHeight || defaults.minHeight;

  useEffect(() => {
    // Reset initialization on route change to ensure ads are re-pushed correctly
    initialized.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Load earlier than before to allow script to fetch before user reaches it
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    // Only push if visible and not already initialized in this mount
    if (isVisible && !initialized.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        // Delay push slightly to ensure DOM element 'ins' is ready
        const timer = setTimeout(() => {
          adsbygoogle.push({});
          initialized.current = true;
        }, 50);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("AdSense Error", err);
      }
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800/50 transition-colors ${className}`}
      style={{
        minHeight: finalMinHeight,
        minWidth: defaults.minWidth,
        ...style
      }}
    >
      <span className="absolute text-[10px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-[0.2em] pointer-events-none select-none">
        Advertisement
      </span>
      {isVisible && (
        <ins
          className="adsbygoogle w-full h-full relative z-10"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      )}
    </div>
  );
}
