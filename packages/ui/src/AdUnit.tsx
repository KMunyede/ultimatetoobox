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
}

export function AdUnit({ 
  publisherId, 
  slotId, 
  format = "auto", 
  responsive = true, 
  className = "",
  style
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
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
      <span className="absolute text-xs text-slate-400 dark:text-slate-500 font-medium">Advertisement</span>
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
