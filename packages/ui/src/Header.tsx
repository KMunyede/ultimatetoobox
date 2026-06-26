"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { BackButton } from "./BackButton";
import { GlobalSearch } from "./GlobalSearch";
import { Tooltip } from "./Tooltip";
import { NavigationMenu } from "./NavigationMenu";


export function Header() {
  const [isStaging, setIsStaging] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStaging(
        window.location.hostname.includes("staging") || 
        window.location.hostname.includes("localhost")
      );
    }
  }, []);

  const domains = {
    corporate: isStaging ? "https://hsc-platform-core-staging.web.app" : "https://hilmost.net",
    toolbox: isStaging ? "https://hilmost-toolbox-staging.web.app" : "https://hilmost-toolbox.hilmost.net",
  };

  const wisdomUrl = `${domains.toolbox}/health/daily-wisdom`;

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-base bg-canvas-card/80 backdrop-blur supports-[backdrop-filter]:bg-canvas-card/60 overflow-x-hidden">
      {/* Top accent bar with White, Light Green, and Red */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-white to-brand-primary opacity-90"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          
          {/* Left Side: Navigation & Brand */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <BackButton />
            <Tooltip content="Go to Hilmost corporate homepage" position="right">
              <Link href={domains.corporate} className="flex items-center gap-2">
                <div className="h-8 w-8 bg-text-primary dark:bg-canvas-card rounded-md flex items-center justify-center border border-base">
                  <span className="text-canvas-card dark:text-text-primary font-bold text-lg">H</span>
                </div>
                <span className="font-semibold text-xl tracking-tight hidden sm:block text-text-primary">Hilmost</span>
              </Link>
            </Tooltip>
            
            <div className="flex items-center gap-6">
              <NavigationMenu />
              <div className="hidden lg:flex items-center gap-6">
                <Link href={`${domains.corporate}/about`} className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">
                  About
                </Link>
                <Link href={`${domains.corporate}/contact`} className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-4 justify-end">
            <GlobalSearch />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
