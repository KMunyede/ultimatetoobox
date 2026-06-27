import Link from "next/link";
import { AppWindow, Gamepad2, Wrench, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hilmost Software Corporation Hub",
  description: "Explore the ecosystem of Hilmost Software Corporation products including free online utilities, desktop and mobile apps, and casual games.",
};

export default function SoftwareHub() {
  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-20">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-950" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="mx-auto max-w-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-4xl sm:text-6xl">
              Hilmost <span className="text-indigo-600 dark:text-indigo-500">Software Corporation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Discover our comprehensive suite of digital products, from powerful cross-platform applications and casual games to our industry-leading suite of free online utilities.
            </p>
          </div>
        </section>

        {/* Product Hub Grid */}
        <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                
                {/* Apps Tile */}
                <div className="relative flex flex-col bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 border border-slate-200 dark:border-slate-800/50 opacity-80">
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    Coming Soon 🚧
                  </div>
                  <div className="h-16 w-16 mb-6 flex items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <AppWindow size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Apps</h3>
                  <p className="text-slate-500 dark:text-slate-500 flex-1">
                    Download powerful native applications for Windows, macOS, iOS, and Android devices to supercharge your productivity.
                  </p>
                  <div className="mt-8 flex items-center text-sm font-semibold text-slate-400 dark:text-slate-500">
                    Coming Soon
                  </div>
                </div>

                {/* Games Tile */}
                <div className="relative flex flex-col bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 border border-slate-200 dark:border-slate-800/50 opacity-80">
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    Coming Soon 🚧
                  </div>
                  <div className="h-16 w-16 mb-6 flex items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Gamepad2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Games</h3>
                  <p className="text-slate-500 dark:text-slate-500 flex-1">
                    Discover entertaining casual games developed by Hilmost. Available across web and mobile platforms for fun on the go.
                  </p>
                  <div className="mt-8 flex items-center text-sm font-semibold text-slate-400 dark:text-slate-500">
                    Coming Soon
                  </div>
                </div>

                {/* Tools & Utilities Tile - Descriptive Anchor Text for SEO */}
                <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-lg hover:ring-green-500/50 dark:hover:ring-green-400/50">
                  <div className="h-16 w-16 mb-6 flex items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Free Online Tools & Utilities - Ultimate Toolbox</h3>
                  <p className="text-slate-600 dark:text-slate-400 flex-1 cursor-text select-text">
                    Access our comprehensive suite of free, private, browser-based calculators, converters, and specialized data tools.
                  </p>
                  <Link href="https://hilmost-toolbox.hilmost.net" className="mt-8 flex items-center w-fit text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                    Open Toolbox <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
