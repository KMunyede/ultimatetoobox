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
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 pr-0 md:pr-12">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-semibold tracking-tight text-xl text-gray-900 dark:text-white">Hilmost</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              A diversified holdings company operating across Software, Engineering, Foods, Health, and Insurance to build a better future.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Subsidiaries</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href={`${domains.corporate}/softwarehub`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hilmost Software</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hilmost Engineering</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hilmost Foods</Link></li>
              <li><Link href={`${domains.corporate}/healthhub`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hilmost Health</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hilmost Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href={`${domains.corporate}/about`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href={domains.toolbox} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ultimate Toolbox</Link></li>
              <li><Link href={domains.wisdom} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Daily Wisdom</Link></li>
              <li><Link href={`${domains.corporate}/careers`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href={`${domains.corporate}/contact`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row items-start justify-between gap-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col gap-3 flex-1">
            <p>© {new Date().getFullYear()} Hilmost Holdings. All rights reserved.</p>
            <div className="text-xs leading-relaxed max-w-3xl opacity-80">
              <p className="mb-1">
                <strong>Disclaimer:</strong> The tools, calculators, and information provided across Hilmost platforms are for general informational purposes only and should not be construed as professional advice. Please consult a qualified professional before making any significant financial, health, legal, or business decisions.
              </p>
              <p>
                Found an inconsistency or have a suggestion? <a href="mailto:support@hilmost.net?subject=Issue/Feedback Report" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors font-medium">Report an issue</a> so we can improve.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-x-8 gap-y-4 whitespace-nowrap pt-2">
            <Link href={`${domains.corporate}/privacy-policy`} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Privacy Policy</Link>
            <Link href={`${domains.corporate}/terms-of-service`} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Terms of Service</Link>
            <Link href={`${domains.corporate}/cookie-policy`} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
