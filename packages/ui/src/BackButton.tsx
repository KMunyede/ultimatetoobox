"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Tooltip } from "./Tooltip";


export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMainSite, setIsMainSite] = useState(true);
  const shouldScrollToTop = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      setIsMainSite(
        host === "hilmost.net" || 
        host === "hsc-platform-core.web.app" || 
        host === "hsc-platform-core-staging.web.app" || 
        host.includes("localhost")
      );
    }
  }, []);

  // Effect to handle scrolling to top after navigation completes
  useEffect(() => {
    if (shouldScrollToTop.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      shouldScrollToTop.current = false;

      // Reset scroll restoration to auto after the jump
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    }
  }, [pathname]);

  // Hide the back button if we are on the homepage of the main site
  if (pathname === "/" && isMainSite) {
    return null;
  }

  const handleBack = () => {
    if (pathname === "/" || pathname === "") {
      if (!isMainSite) {
        window.location.href = "https://hilmost.net";
      }
    } else {
      // 1. Set flag to trigger scroll in the useEffect after route change
      shouldScrollToTop.current = true;

      // 2. Override scroll restoration for this specific action
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // 3. Trigger the navigation
      router.back();
    }
  };

  return (
    <Tooltip content="Go back to the previous page">
      <button 
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors mr-2"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
    </Tooltip>
  );
}
