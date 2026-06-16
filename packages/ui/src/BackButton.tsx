"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Tooltip } from "./Tooltip";


export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMainSite, setIsMainSite] = useState(true);

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

  // Hide the back button if we are on the homepage of the main site
  if (pathname === "/" && isMainSite) {
    return null;
  }

  const handleBack = () => {
    if (pathname === "/" || pathname === "") {
      if (!isMainSite) {
        window.location.href = "https://hilmost.net/softwarehub";
      }
    } else {
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
