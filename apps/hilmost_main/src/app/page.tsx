import Link from "next/link";
import { ArrowRight, Code2, HeartPulse, ShieldCheck, Utensils, Wrench, Sparkles, Zap, Binary, Microchip } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 bg-canvas-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-6 font-mono">
                <Sparkles size={14} className="animate-pulse" />
                HILMOST DIGITAL LABS
            </div>
            <h1 className="font-black tracking-tighter text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              Engineering the <br className="hidden md:block" />
              <span className="text-brand-primary">Everyday Utility.</span>
            </h1>
            <p className="text-base md:text-xl text-text-secondary leading-relaxed font-medium max-w-2xl mx-auto">
              A specialized software research and development unit building high-precision digital tools. We bridge the gap between complex enterprise logic and secure, browser-first solutions.
            </p>
          </div>


          {/* Core Research Hubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Subsidiary 1 */}
            <Link href="https://hilmost-toolbox.hilmost.net" className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition-transform group-hover:scale-110 duration-500 mb-8">
                        <Binary size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-4">Ultimate Toolbox</h2>
                    <p className="text-text-secondary font-medium leading-relaxed mb-10">
                        Our flagship utility engine. Over 260+ high-precision tools for finance, physics, and data science, running 100% locally in your browser.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
                        Open the Toolbox <ArrowRight size={16} />
                    </span>
                </div>
            </Link>

            {/* Subsidiary 2 */}
            <Link href="https://hilmost-toolbox.hilmost.net/health/daily-wisdom" className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-rose-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 transition-transform group-hover:scale-110 duration-500 mb-8">
                        <HeartPulse size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-4">Daily Wisdom Project</h2>
                    <p className="text-text-secondary font-medium leading-relaxed mb-10">
                        An experimental vertical focusing on health informatics and psychological grounding through modern mindfulness technologies.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-rose-600 group-hover:gap-4 transition-all">
                        View Research <ArrowRight size={16} />
                    </span>
                </div>
            </Link>
          </div>

          {/* Active Research Frontiers */}
          <div className="mt-32">
            <div className="flex flex-col items-center text-center mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4 font-mono">Development Pipeline</span>
                <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight uppercase">Active Research Frontiers</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Engineering */}
                <div className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 transition-all hover:border-brand-primary/50 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-[8px] font-black uppercase tracking-widest text-green-600">Active</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-brand-primary mb-6">
                        <Microchip size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Utility Engineering</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Developing high-precision conversion engines and physical constant solvers for global standards.</p>
                </div>

                {/* Finance */}
                <div className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 transition-all hover:border-brand-primary/50 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-[8px] font-black uppercase tracking-widest text-green-600">Active</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-brand-primary mb-6">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Financial Modeling</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Researching tax algorithms, compound growth projections, and currency exchange arbitrage logic.</p>
                </div>

                {/* Privacy */}
                <div className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 transition-all hover:border-brand-primary/50 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[8px] font-black uppercase tracking-widest text-amber-600">Drafting</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-brand-primary mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Data Security</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Local cryptographic research focusing on browser-side MD5, SHA, and Base64 manipulation.</p>
                </div>
            </div>
          </div>

          {/* Core Web Vitals Banner */}
          <div className="mt-32 p-8 md:p-12 bg-text-primary dark:bg-canvas-card rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Code2 size={16} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary font-mono">Architecture Status: Stable</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-canvas-card dark:text-text-primary tracking-tighter leading-tight mb-4">
                            Banking-grade <span className="text-brand-primary">Precision.</span>
                        </h2>
                        <p className="text-text-muted font-medium text-lg leading-relaxed">
                            Every Hilmost tool is engineered by architectural experts to ensure mathematical accuracy and 100% client-side data privacy.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Link href="https://hilmost-toolbox.hilmost.net" className="px-8 py-4 bg-brand-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all text-sm">
                            Open Lab Hub
                        </Link>
                        <span className="text-[10px] font-mono font-bold text-text-muted uppercase">SYSTEMS OPERATIONAL v2.4.0</span>
                    </div>
                </div>
          </div>
        </div>
    </main>
  );
}
