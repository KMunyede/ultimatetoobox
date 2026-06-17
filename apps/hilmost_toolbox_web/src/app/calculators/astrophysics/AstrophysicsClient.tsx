"use client";
import { ToolTutorial, ScientificNumber, ConstantSelector } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Orbit, Compass, Binary } from "lucide-react";

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
    { id: "escape", label: "Escape Velocity", icon: <Zap size={16} /> },
    { id: "orbital", label: "Orbital Speed", icon: <Orbit size={16} /> },
    { id: "schwarzschild", label: "Schwarzschild", icon: <Binary size={16} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Cosmic Constants</span>
        <div className="flex gap-4">
            <ShareButton />
            <ToolTutorial tourId="astro_calc" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
        {/* Mode Selector */}
        <div id="tour-astro-select" className="flex p-1 bg-canvas-muted rounded-2xl border border-base overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setState({ ...state, calc: cat.id })}
                    className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all ${calc === cat.id ? "bg-canvas-card text-brand-primary shadow-lg border border-base" : "text-text-muted hover:text-text-secondary"}`}
                >
                    {cat.icon}
                    {cat.label}
                </button>
            ))}
        </div>

        <div id="tour-astro-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Mass (kg)</label>
                    <ConstantSelector onSelect={(val) => setState({ ...state, mass: val })} />
                </div>
                <input
                    type="text"
                    className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-mono"
                    value={mass as string}
                    onChange={e => setState({ ...state, mass: e.target.value })}
                />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Radius (m)</label>
                    <ConstantSelector onSelect={(val) => setState({ ...state, radius: val })} />
                </div>
                <input
                    type="text"
                    className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-mono"
                    value={radius as string}
                    onChange={e => setState({ ...state, radius: e.target.value })}
                />
            </div>
        </div>

        {/* Result Area */}
        <div id="tour-astro-result" className="p-8 bg-brand-primary/5 rounded-3xl border border-brand-primary/10 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary/20" />
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-3">Calculated Physics Constant</span>
            <div className="flex items-center gap-3">
                <ScientificNumber value={resultValue} suffix={unit} className="text-3xl md:text-5xl font-black text-text-primary tracking-tighter" />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
