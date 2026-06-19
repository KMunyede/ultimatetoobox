"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdUnitProps {
  publisherId: string;
  slotId: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Explicit height for CLS prevention.
   * For standard banners use '90px', for sidebars '600px', for rectangles '250px'.
   */
  minHeight?: string;
}

export function AdUnit({ 
  publisherId, 
  slotId, 
  format = "auto", 
  responsive = true, 
  className = "",
  style,
  minHeight = "280px"
}: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only push if not already initialized in this mount
    if (!initialized.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        initialized.current = true;
      } catch (err) {
        console.error("AdSense Error", err);
      }
    }
  }, [pathname]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800/50 ${className}`}
      style={{ minHeight, ...style }}
    >
      <span className="absolute text-xs text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest pointer-events-none">Advertisement</span>
      <ins
        ref={adRef}
        className="adsbygoogle w-full h-full relative z-10"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
