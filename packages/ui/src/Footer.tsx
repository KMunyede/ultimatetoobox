"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
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
    wisdom: isStaging ? "https://hilmost-wisdom-staging.web.app" : "https://hilmost-wisdom.web.app",
  };

  return (
    <footer className="border-t border-base bg-canvas-card text-text-primary mt-auto print:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 pr-0 md:pr-12">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-brand-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-semibold tracking-tight text-xl text-text-primary uppercase letter tracking-tighter">Hilmost</span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              Hilmost builds free, browser-based tools and everyday software — fast, private, and built to just work. All calculations run on your device; nothing is sent to a server.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-text-primary mb-4 uppercase tracking-widest text-[10px]">Research Verticals</h3>
            <ul className="space-y-2 text-sm text-text-secondary font-medium">
              <li><Link href={`${domains.toolbox}/text-data`} className="hover:text-brand-primary transition-colors">Text & Data</Link></li>
              <li><Link href={`${domains.toolbox}/finance`} className="hover:text-brand-primary transition-colors">Financial</Link></li>
              <li><Link href={`${domains.toolbox}/converters`} className="hover:text-brand-primary transition-colors">Converters</Link></li>
              <li><Link href={`${domains.toolbox}/calculators`} className="hover:text-brand-primary transition-colors">Calculators</Link></li>
              <li><Link href={`${domains.toolbox}/health`} className="hover:text-brand-primary transition-colors">Health & Wisdom</Link></li>
              <li><Link href={`${domains.toolbox}/pdf-tools`} className="hover:text-brand-primary transition-colors">PDF Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-4 uppercase tracking-widest text-[10px]">Platform</h3>
            <ul className="space-y-2 text-sm text-text-secondary font-medium">
              <li><Link href={`${domains.corporate}/blog`} className="hover:text-brand-primary transition-colors">Blog</Link></li>
              <li><Link href={`${domains.corporate}/about`} className="hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link href={`${domains.corporate}/contact`} className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
              <li><Link href={`${domains.toolbox}/guides`} className="hover:text-brand-primary transition-colors">Utility Guides</Link></li>
              <li><div className="flex items-center gap-2 text-[10px] text-text-muted mt-4 font-mono">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SYSTEMS OPERATIONAL v2.4
              </div></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-base mt-10 pt-6">
          <div className="mb-10">
            <h3 className="font-bold text-text-primary mb-4 uppercase tracking-widest text-[10px]">Our Products</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-text-secondary">
              <Link href={domains.corporate} className="hover:text-brand-primary transition-colors">Hilmost.net</Link>
              <Link href={domains.toolbox} className="hover:text-brand-primary transition-colors">Hilmost Toolbox</Link>
              <a href="https://shop.hilmost.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Hilmost Apparel</a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 text-sm text-text-secondary">
          <div className="flex flex-col gap-3 flex-1">
            <p>© {new Date().getFullYear()} Hilmost Software Corporation. All rights reserved.</p>
            <div className="text-xs leading-relaxed max-w-3xl opacity-80">
              <p className="mb-1">
                <strong>Technical Disclaimer:</strong> Tools provided by Hilmost are intended for informational and research purposes. Calculations are performed locally on your device to ensure data privacy. Please consult a qualified professional for high-stakes financial, health, or legal decisions.
              </p>
              <p>
                Developer Feedback? <a href="mailto:support@hilmost.net?subject=Engineering Feedback" className="text-brand-primary hover:underline transition-colors font-medium">Contact the Engineering Team</a>
              </p>
              <div className="mt-4">
                <a href="https://fazier.com/launches/hilmost-toolbox.hilmost.net" target="_blank" rel="noopener noreferrer">
                  <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" width="120" alt="Fazier badge" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-x-8 gap-y-4 whitespace-nowrap pt-2 font-medium">
            <Link href={`${domains.corporate}/privacy-policy`} className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link href={`${domains.corporate}/terms-of-service`} className="hover:text-text-primary transition-colors">Terms</Link>
            <Link href={`${domains.corporate}/cookie-policy`} className="hover:text-text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}
