import Link from "next/link";
import { ArrowRight, Code2, HeartPulse, ShieldCheck, Utensils, Wrench, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 bg-canvas-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                <Sparkles size={12} className="animate-pulse" />
                HILMOST HOLDINGS
            </div>
            <h1 className="font-black tracking-tighter text-text-primary text-4xl sm:text-6xl md:text-7xl mb-8">
              Building the future <br className="hidden md:block" />
              <span className="text-brand-primary">across industries.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium max-w-2xl mx-auto">
              A diversified holdings company operating excellence-driven subsidiaries. We engineer, nourish, and empower the modern world.
            </p>
          </div>

          {/* Active Divisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Subsidiary 1 */}
            <Link href="/softwarehub" className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition-transform group-hover:scale-110 duration-500 mb-8">
                        <Code2 size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-4">Hilmost Software</h2>
                    <p className="text-text-secondary font-medium leading-relaxed mb-10">
                        Empowering millions with high-performance digital tools, specialized calculators, and browser-first utility platforms.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
                        Launch Software Hub <ArrowRight size={16} />
                    </span>
                </div>
            </Link>

            {/* Subsidiary 2 */}
            <Link href="/healthhub" className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-rose-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 transition-transform group-hover:scale-110 duration-500 mb-8">
                        <HeartPulse size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-4">Hilmost Health</h2>
                    <p className="text-text-secondary font-medium leading-relaxed mb-10">
                        Pioneering accessible wellness solutions and philosophical grounding through modern mental health technologies.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-rose-600 group-hover:gap-4 transition-all">
                        Visit Health Hub <ArrowRight size={16} />
                    </span>
                </div>
            </Link>
          </div>

          {/* Future Pipeline Section */}
          <div className="mt-32">
            <div className="flex flex-col items-center text-center mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">Future Pipeline</span>
                <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">Strategic expansion targets</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Engineering */}
                <div className="group relative flex flex-col bg-canvas-card border border-base border-dashed rounded-3xl p-8 opacity-60 transition-all hover:opacity-100 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-canvas-muted border border-base text-[8px] font-black uppercase tracking-widest text-text-muted">Research</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-text-muted mb-6">
                        <Wrench size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Engineering</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Mechanical and civil solutions for large-scale industrial infrastructure.</p>
                </div>

                {/* Foods */}
                <div className="group relative flex flex-col bg-canvas-card border border-base border-dashed rounded-3xl p-8 opacity-60 transition-all hover:opacity-100 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-canvas-muted border border-base text-[8px] font-black uppercase tracking-widest text-text-muted">Scaffold</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-text-muted mb-6">
                        <Utensils size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Foods</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Sustainable agriculture and high-efficiency food distribution systems.</p>
                </div>

                {/* Insurance */}
                <div className="group relative flex flex-col bg-canvas-card border border-base border-dashed rounded-3xl p-8 opacity-60 transition-all hover:opacity-100 duration-500">
                    <div className="absolute top-6 right-6 px-2 py-0.5 rounded-md bg-canvas-muted border border-base text-[8px] font-black uppercase tracking-widest text-text-muted">Drafting</div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-canvas-muted text-text-muted mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Insurance</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">Tailored protection products for businesses in emerging markets.</p>
                </div>
            </div>
          </div>

          {/* Core Web Vitals Banner */}
          <div className="mt-32 p-8 md:p-12 bg-text-primary dark:bg-canvas-card rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Zap size={16} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">High Performance Engine</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-canvas-card dark:text-text-primary tracking-tighter leading-tight mb-4">
                            Optimization is at our <span className="text-brand-primary">core.</span>
                        </h2>
                        <p className="text-text-muted font-medium text-lg leading-relaxed">
                            Every Hilmost platform is engineered for speed, hitting 95+ Lighthouse scores to ensure instant access to information.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/softwarehub" className="px-8 py-4 bg-brand-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all text-sm">
                            Explore Platform
                        </Link>
                        <span className="text-[10px] font-bold text-text-muted uppercase">Achievement is one click away</span>
                    </div>
                </div>
          </div>
        </div>
    </main>
  );
}
