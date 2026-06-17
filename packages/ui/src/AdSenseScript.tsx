"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AdSenseScript({ publisherId }: { publisherId: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Strategy: Defer AdSense until the main window has fully loaded
    // and the user has started interacting or a short delay has passed.
    const handleLoad = () => {
      // Delay ad loading by 2 seconds after window load to prioritize LCP
      const timeout = setTimeout(() => setShouldLoad(true), 2000);
      return () => clearTimeout(timeout);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
