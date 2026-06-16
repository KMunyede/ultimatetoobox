"use client";
import { ToolTutorial, ScientificNumber, ConstantSelector } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";

const G = 6.67430e-11; // Gravitational constant (m^3 kg^-1 s^-2)
const c = 299792458; // Speed of light (m/s)

export function AstrophysicsClient({ defaultTab = "escape" }: { defaultTab?: "escape" | "schwarzschild" | "orbital" }) {
  const [state, setState] = useUrlState({
    activeTab: defaultTab,
    mass: "",
    radius: ""
  });
  
  const { activeTab, mass, radius } = state as { activeTab: "escape" | "schwarzschild" | "orbital", mass: string, radius: string };

  const setActiveTab = (tab: "escape" | "schwarzschild" | "orbital") => {
    setState({ activeTab: tab, mass, radius });
  };
  
  const setMass = (m: string) => {
    setState({ activeTab, mass: m, radius });
  };
  
  const setRadius = (r: string) => {
    setState({ activeTab, mass, radius: r });
  };

  const renderResult = () => {
    const m = parseFloat(mass);
    const r = parseFloat(radius);

    if (activeTab === "schwarzschild") {
      if (isNaN(m) || m <= 0) return null;
      const rs = (2 * G * m) / (c * c);
      return (
        <motion.div 
          key="schwarzschild"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50"
        >
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Schwarzschild Radius</p>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            <ScientificNumber value={rs} precision={4} suffix="meters" />
          </div>
        </motion.div>
      );
    }

    if (activeTab === "escape") {
      if (isNaN(m) || isNaN(r) || m <= 0 || r <= 0) return null;
      const v = Math.sqrt((2 * G * m) / r);
      return (
        <motion.div 
          key="escape"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50"
        >
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Escape Velocity</p>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            <ScientificNumber value={v} precision={4} suffix="m/s" />
          </div>
          <p className="text-sm text-slate-500 mt-2">({(v / 1000).toFixed(2)} km/s)</p>
        </motion.div>
      );
    }

    if (activeTab === "orbital") {
      if (isNaN(m) || isNaN(r) || m <= 0 || r <= 0) return null;
      const v = Math.sqrt((G * m) / r);
      return (
        <motion.div 
          key="orbital"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50"
        >
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Orbital Speed</p>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            <ScientificNumber value={v} precision={4} suffix="m/s" />
          </div>
          <p className="text-sm text-slate-500 mt-2">({(v / 1000).toFixed(2)} km/s)</p>
        </motion.div>
      );
    }
    return null;
  };

  const tourSteps = [
    { element: '#tour-astro-tabs', popover: { title: '1. Select Equation', description: 'Choose between calculating Escape Velocity, Schwarzschild Radius, or Orbital Speed.' } },
    { element: '#tour-astro-inputs', popover: { title: '2. Enter Values', description: 'Input the mass and radius in scientific notation (e.g., 5.972e24). The calculation will update automatically.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative"
    >
      <div className="flex justify-end mb-4 gap-2">
        <ShareButton />
        <ToolTutorial tourId="astrophysics_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      {/* Tabs */}
      <div id="tour-astro-tabs" className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("escape")}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "escape" 
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Escape Velocity
        </button>
        <button
          onClick={() => setActiveTab("schwarzschild")}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "schwarzschild" 
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Schwarzschild Radius
        </button>
        <button
          onClick={() => setActiveTab("orbital")}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "orbital" 
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Orbital Speed
        </button>
      </div>

      <div id="tour-astro-inputs" className="space-y-5">
        <motion.div layout>
          <div className="flex justify-between items-end mb-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Mass (kg)
            </label>
            <div className="-mb-1 -mr-2"><ConstantSelector onSelect={setMass} /></div>
          </div>
          <input
            type="number"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            placeholder="e.g. 5.972e24 (Earth's mass)"
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </motion.div>

        <AnimatePresence mode="popLayout">
          {activeTab !== "schwarzschild" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex justify-between items-end mb-1.5 pt-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Radius (m)
                </label>
                <div className="-mb-1 -mr-2"><ConstantSelector onSelect={setRadius} /></div>
              </div>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="e.g. 6.371e6 (Earth's radius)"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout">
        {renderResult()}
      </AnimatePresence>

      <div className="mt-8 text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p>Constants used:</p>
        <p>G (Gravitational constant) = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²</p>
        {activeTab === "schwarzschild" && <p>c (Speed of light) = 299,792,458 m/s</p>}
      </div>
    </motion.div>
  );
}
