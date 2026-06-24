import Link from "next/link";
import { ArrowRight, Code2, HeartPulse, ShieldCheck, Utensils, Wrench, Sparkles, Zap, Binary, Microchip, Banknote, FileText, Replace } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 bg-canvas-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-6 md:mb-8">
            <div className="text-center md:text-left mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest font-mono">
                  <Sparkles size={14} className="animate-pulse" />
                  HILMOST DIGITAL LABS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <h1 className="font-black tracking-tighter text-text-primary text-3xl sm:text-4xl lg:text-5xl leading-[1] text-left">
                Engineering the <br />
                <span className="text-brand-primary">Everyday Utility.</span>
              </h1>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium text-left">
                A specialized software research and development unit building high-precision digital tools. We bridge the gap between complex enterprise logic and secure, browser-first solutions.
              </p>
            </div>
          </div>


          {/* Core Tool Categories - Flattened Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Money & Tax",
                description: "Professional calculators for currency, loans, interest, and taxes.",
                href: "https://hilmost-toolbox.hilmost.net/finance",
                icon: <Banknote size={32} />,
                color: "blue",
                count: 12
              },
              {
                name: "PDF Tools",
                description: "Securely merge, split, and manage PDF files 100% in your browser.",
                href: "https://hilmost-toolbox.hilmost.net/pdf-tools",
                icon: <FileText size={32} />,
                color: "red",
                count: 4
              },
              {
                name: "Unit Converters",
                description: "Quickly convert length, weight, temperature, and data storage units.",
                href: "https://hilmost-toolbox.hilmost.net/converters",
                icon: <Replace size={32} />,
                color: "amber",
                count: 10
              },
              {
                name: "Text & Formatting",
                description: "Clean up text, count words, and encode data with ease.",
                href: "https://hilmost-toolbox.hilmost.net/text-data",
                icon: <Binary size={32} />,
                color: "green",
                count: 4
              },
              {
                name: "Math & Science",
                description: "From standard math to astrophysics and science equation solvers.",
                href: "https://hilmost-toolbox.hilmost.net/calculators",
                icon: <Wrench size={32} />,
                color: "indigo",
                count: 4
              },
              {
                name: "Health & Wellness",
                description: "Simple tools for BMI tracking and daily wellness check-ins.",
                href: "https://hilmost-toolbox.hilmost.net/health",
                icon: <HeartPulse size={32} />,
                color: "rose",
                count: 2
              },
              {
                name: "Developer Experience",
                description: "JSON, Regex, and JWT utilities built for modern engineering workflows.",
                href: "https://hilmost-toolbox.hilmost.net/dx",
                icon: <Code2 size={32} />,
                color: "slate",
                count: 3
              }
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${cat.color}-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-${cat.color}-500/10 transition-colors`} />
                <div className="relative z-10">
                    <div className={`h-16 w-16 flex items-center justify-center rounded-2xl bg-${cat.color}-500/10 text-${cat.color}-600 transition-transform group-hover:scale-110 duration-500 mb-8`}>
                        {cat.icon}
                    </div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-4">{cat.name}</h2>
                    <p className="text-text-secondary font-medium leading-relaxed mb-8">
                        {cat.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-${cat.color}-600 group-hover:gap-4 transition-all`}>
                          Open Tools <ArrowRight size={16} />
                      </span>
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-canvas-muted px-3 py-1 rounded-full">
                        {cat.count} Utilities
                      </span>
                    </div>
                </div>
              </Link>
            ))}
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
                            Open All Tools
                        </Link>
                        <span className="text-[10px] font-mono font-bold text-text-muted uppercase">SYSTEMS OPERATIONAL v2.4.0</span>
                    </div>
                </div>
          </div>
        </div>
    </main>
  );
}
