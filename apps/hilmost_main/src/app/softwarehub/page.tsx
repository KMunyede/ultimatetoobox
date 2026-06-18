import Link from "next/link";
import { AppWindow, Gamepad2, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hilmost Software Hub | Apps, Games & Utilities",
  description: "Explore the ecosystem of Hilmost Software Corporation products including the free Ultimate Toolbox, native desktop applications, and casual games.",
};

export default function SoftwareHub() {
  return (
    <main className="flex-1 bg-canvas-base">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-8 md:py-12">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-brand-primary/5 to-transparent" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} className="animate-pulse" />
                The best software hub
            </div>
            <h1 className="mx-auto max-w-4xl font-black tracking-tight text-text-primary text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
              Hilmost <span className="text-brand-primary">Software</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed font-medium">
              A comprehensive laboratory of digital products. From high-precision utility suites to cross-platform native experiences.
            </p>
          </div>
        </section>

        {/* Product Hub Grid */}
        <section className="py-8 md:py-10 border-t border-base">

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                
                {/* Tools & Utilities Tile */}
                <Link
                    href="https://hilmost-toolbox.hilmost.net"
                    className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                  <div className="relative z-10">
                    <div className="h-16 w-16 mb-8 flex items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                        <Wrench size={32} />
                    </div>
                    <h3 className="text-xl font-black text-text-primary mb-4">
                        Ultimate Toolbox
                    </h3>
                    <p className="text-text-secondary font-medium leading-relaxed mb-10">
                        Our flagship suite of free, private, browser-based calculators and specialized data tools.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all">
                        Launch Toolbox <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>

                {/* Apps Tile */}
                <div className="group relative flex flex-col bg-canvas-card border border-base border-dashed rounded-3xl p-8 md:p-10 opacity-60 hover:opacity-100 transition-all duration-500">
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-canvas-muted border border-base text-[10px] font-black uppercase tracking-widest text-text-muted">Drafting</div>
                  <div className="h-16 w-16 mb-8 flex items-center justify-center rounded-2xl bg-canvas-muted text-text-muted">
                    <AppWindow size={32} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-4">Native Apps</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">
                    Powerhouse applications for Windows, macOS, iOS, and Android designed to eliminate productivity bottlenecks.
                  </p>
                </div>

                {/* Games Tile */}
                <div className="group relative flex flex-col bg-canvas-card border border-base border-dashed rounded-3xl p-8 md:p-10 opacity-60 hover:opacity-100 transition-all duration-500">
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-canvas-muted border border-base text-[10px] font-black uppercase tracking-widest text-text-muted">Concept</div>
                  <div className="h-16 w-16 mb-8 flex items-center justify-center rounded-2xl bg-canvas-muted text-text-muted">
                    <Gamepad2 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-4">Digital Games</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">
                    Entertaining casual experiences built for high-fidelity performance on any modern web or mobile browser.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Global Footer Banner */}
        <section className="container mx-auto px-4 py-20">
            <div className="bg-text-primary dark:bg-canvas-card rounded-[2.5rem] p-8 md:p-16 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
                <h2 className="text-3xl md:text-5xl font-black text-canvas-card dark:text-text-primary tracking-tighter mb-6 relative z-10">
                    Ready to achieve <span className="text-brand-primary text-italic">more?</span>
                </h2>
                <Link
                    href="https://hilmost-toolbox.hilmost.net"
                    className="relative z-10 px-10 py-5 bg-brand-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all text-sm"
                >
                    Open Ultimate Toolbox
                </Link>
            </div>
        </section>

    </main>
  );
}
