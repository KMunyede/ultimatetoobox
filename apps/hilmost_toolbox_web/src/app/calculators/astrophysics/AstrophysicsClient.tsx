"use client";
import { ToolTutorial, ScientificNumber, ConstantSelector } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { Zap, Orbit, Binary, ChevronDown } from "lucide-react";

type CalcType = "escape" | "orbital" | "schwarzschild";

export function AstrophysicsClient({ defaultTab }: { defaultTab?: CalcType }) {
  const [state, setState] = useUrlState({
    calc: (defaultTab || "escape") as string,
    mass: "5.972e24", // Earth
    radius: "6371000", // Earth
  });

  const calc = state.calc as CalcType;
  const { mass, radius } = state;

  const M = parseFloat(mass as string) || 0;
  const R = parseFloat(radius as string) || 0;
  const G = 6.6743e-11;
  const c = 299792458;

  let resultValue = 0;
  let unit = "m/s";

  if (calc === "escape") {
    resultValue = Math.sqrt((2 * G * M) / R);
  } else if (calc === "orbital") {
    resultValue = Math.sqrt((G * M) / R);
  } else if (calc === "schwarzschild") {
    resultValue = (2 * G * M) / (c * c);
    unit = "m";
  }

  const tourSteps = [
    { element: '#tour-astro-select', popover: { title: '1. Calculation Type', description: 'Choose what you want to calculate: Escape Velocity, Orbital Speed, or Schwarzschild Radius.' } },
    { element: '#tour-astro-inputs', popover: { title: '2. Mass & Radius', description: 'Enter the mass and radius of the celestial body. Use the dropdown to pick common planets.' } },
    { element: '#tour-astro-result', popover: { title: '3. Result', description: 'The resulting physical constant will be calculated in real-time.' } },
  ];

  const categories = [
    { id: "escape", label: "Escape Velocity", icon: <Zap size={18} className="text-pink-500" /> },
    { id: "orbital", label: "Orbital Speed", icon: <Orbit size={18} className="text-purple-500" /> },
    { id: "schwarzschild", label: "Schwarzschild", icon: <Binary size={18} className="text-indigo-500" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8"
    >
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Cosmic Engine</span>
        </div>
        <div className="flex gap-4">
            <ShareButton />
            <ToolTutorial tourId="astro_calc" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-border-base rounded-[2.5rem] p-6 md:p-12 shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30" />

        {/* Mode Selector */}
        <div id="tour-astro-select" className="flex p-1.5 bg-canvas-muted rounded-[1.5rem] border border-border-base overflow-x-auto no-scrollbar shadow-inner">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setState({ ...state, calc: cat.id })}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-3 py-4 text-[11px] font-black rounded-2xl transition-all ${calc === cat.id ? "bg-canvas-card text-text-primary shadow-xl border border-border-base scale-[1.02]" : "text-text-muted hover:text-text-secondary"}`}
                >
                    {cat.icon}
                    {cat.label.toUpperCase()}
                </button>
            ))}
        </div>

        <div id="tour-astro-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.15em]">Body Mass (kg)</label>
                    <div className="relative group">
                      <ConstantSelector onSelect={(val) => setState({ ...state, mass: val })} />
                    </div>
                </div>
                <div className="relative">
                  <input
                      type="text"
                      inputMode="decimal"
                      className="w-full h-16 px-6 border border-border-base rounded-2xl bg-canvas-muted text-text-primary text-xl font-black focus:ring-8 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-mono shadow-inner"
                      value={mass as string}
                      onChange={e => setState({ ...state, mass: e.target.value })}
                  />
                  <div className="absolute right-4 top-5 text-[10px] font-black text-text-muted uppercase tracking-widest pointer-events-none">kg</div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.15em]">Radius (m)</label>
                    <ConstantSelector onSelect={(val) => setState({ ...state, radius: val })} />
                </div>
                <div className="relative">
                  <input
                      type="text"
                      inputMode="decimal"
                      className="w-full h-16 px-6 border border-border-base rounded-2xl bg-canvas-muted text-text-primary text-xl font-black focus:ring-8 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-mono shadow-inner"
                      value={radius as string}
                      onChange={e => setState({ ...state, radius: e.target.value })}
                  />
                  <div className="absolute right-4 top-5 text-[10px] font-black text-text-muted uppercase tracking-widest pointer-events-none">m</div>
                </div>
            </div>
        </div>

        {/* Result Area */}
        <div id="tour-astro-result" className="p-10 md:p-14 bg-canvas-muted rounded-[2rem] border border-border-base flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-30">Universal Solution</div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700" />

            <span className="text-[11px] font-black text-text-secondary uppercase tracking-[0.25em] mb-4">Calculated Velocity</span>
            <div className="flex items-center gap-4">
                <ScientificNumber value={resultValue} suffix={unit} className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter" />
            </div>
            <div className="mt-4 flex items-center gap-2">
               <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
               <span className="text-[10px] font-bold text-text-muted italic">Instant Physics Resolution</span>
               <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
