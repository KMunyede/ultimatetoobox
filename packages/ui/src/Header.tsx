"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { BackButton } from "./BackButton";
import { GlobalSearch } from "./GlobalSearch";
import { Tooltip } from "./Tooltip";
import { NavigationMenu } from "./NavigationMenu";
import { GraduationCap } from "lucide-react";


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
    <header className="sticky top-0 z-[60] w-full border-b border-base bg-canvas-card/80 backdrop-blur supports-[backdrop-filter]:bg-canvas-card/60">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-white to-brand-primary opacity-90"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:h-16 items-stretch lg:items-center justify-between py-4 lg:py-0 gap-4 lg:gap-0">
          
          {/* Row 1: Brand & Action Icons */}
          <div className="flex items-center justify-between lg:justify-start gap-4">
            <div className="flex items-center gap-3">
              <BackButton />
              <Link href={domains.corporate} className="flex items-center gap-2 group">
                <div className="h-8 w-8 bg-text-primary dark:bg-canvas-card rounded-md flex items-center justify-center border border-base transition-transform group-hover:scale-105">
                  <span className="text-canvas-card dark:text-text-primary font-bold text-lg">H</span>
                </div>
                <span className="font-bold text-xl tracking-tighter text-text-primary">Hilmost</span>
              </Link>
            </div>
            
            <div className="flex lg:hidden items-center gap-3">
              <GlobalSearch />
              <ThemeToggle />
            </div>
          </div>

          {/* Row 2: Quick Links Pills (Mobile Only) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Link href={domains.toolbox + "/guides"} className="flex items-center justify-center py-2.5 px-1 bg-canvas-muted rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary border border-base/50 active:bg-base transition-colors">
              Guides
            </Link>
            <Link href={domains.corporate + "/about"} className="flex items-center justify-center py-2.5 px-1 bg-canvas-muted rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary border border-base/50 active:bg-base transition-colors">
              About
            </Link>
            <Link href={domains.corporate + "/contact"} className="flex items-center justify-center py-2.5 px-1 bg-canvas-muted rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary border border-base/50 active:bg-base transition-colors">
              Contact
            </Link>
          </div>

          {/* Row 3 (Mobile) / Desktop Nav */}
          <div className="flex items-center gap-4 lg:gap-8">
            <NavigationMenu />

            {/* Desktop-only Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href={domains.corporate + "/about"} className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">
                About
              </Link>
              <Link href={domains.corporate + "/contact"} className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop-only Actions */}
          <div className="hidden lg:flex items-center gap-4 justify-end">
            <GlobalSearch />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
