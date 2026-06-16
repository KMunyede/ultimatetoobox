"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { BackButton } from "./BackButton";
import { GlobalSearch } from "./GlobalSearch";
import { Tooltip } from "./Tooltip";


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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top accent bar with White, Light Green, and Red */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-white to-emerald-400 opacity-90"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          
          {/* Left Side: Navigation & Brand */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <BackButton />
            <Tooltip content="Go to Hilmost corporate homepage" position="right">
              <Link href={domains.corporate} className="flex items-center gap-2">
                <div className="h-8 w-8 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center">
                  <span className="text-white dark:text-slate-900 font-bold text-lg">H</span>
                </div>
                <span className="font-semibold text-xl tracking-tight hidden sm:block">Hilmost</span>
              </Link>
            </Tooltip>
            
            <nav className="hidden md:flex items-center justify-evenly flex-1 px-8 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Tooltip content="Explore apps, games and tools" position="bottom">
                <Link href={`${domains.corporate}/softwarehub`} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  Software Hub
                </Link>
              </Tooltip>
              <Tooltip content="Back to Corporate homepage" position="bottom">
                <Link href={domains.corporate} className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Corporate
                </Link>
              </Tooltip>
              <Tooltip content="Explore wisdom & wellness journal" position="bottom">
                <Link href={wisdomUrl} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Daily Wisdom
                </Link>
              </Tooltip>
              <Tooltip content="Read about our team & story" position="bottom">
                <Link href={`${domains.corporate}/about`} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </Tooltip>
            </nav>
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
