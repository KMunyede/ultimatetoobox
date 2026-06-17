"use client";
import { ToolTutorial, ScientificNumber, ConstantSelector } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, AlertCircle } from "lucide-react";

type EquationType = "kinematics" | "force" | "gas";

export function EquationSolverClient({ defaultEquation }: { defaultEquation?: EquationType }) {
  const [state, setState] = useUrlState({
    equation: (defaultEquation || "kinematics") as string,
    v: "", u: "", a: "", t: "",
    F: "", m: "", aForce: "",
    P: "", VGas: "", n: "", Temp: ""
  });

  const equation = state.equation as EquationType;
  const { v, u, a, t, F, m, aForce, P, VGas, n, Temp } = state as Record<string, string>;
  const T = Temp;
  
  const setEquation = (eq: EquationType) => setState({ ...state, equation: eq });
  
  const setValue = (key: string, val: string) => setState({ ...state, [key]: val });

  const R = 8.314;

  const formatResult = (label: string, value: number, unit: string) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        key={`${label}-${value}`}
        className="flex items-center justify-center gap-4"
      >
        <span className="text-2xl font-black text-text-muted italic">{label} =</span>
        <ScientificNumber value={value} suffix={unit} className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter" />
      </motion.div>
    );
  };

  const solveKinematics = () => {
    const vals = [v, u, a, t].filter(x => x !== "").length;
    if (vals !== 3) return null;

    if (v === "") return formatResult("v", Number(u) + Number(a) * Number(t), "m/s");
    if (u === "") return formatResult("u", Number(v) - Number(a) * Number(t), "m/s");
    if (a === "") return formatResult("a", (Number(v) - Number(u)) / Number(t), "m/s²");
    if (t === "") return formatResult("t", (Number(v) - Number(u)) / Number(a), "s");
  };

  const solveForce = () => {
    const vals = [F, m, aForce].filter(x => x !== "").length;
    if (vals !== 2) return null;

    if (F === "") return formatResult("F", Number(m) * Number(aForce), "N");
    if (m === "") return formatResult("m", Number(F) / Number(aForce), "kg");
    if (aForce === "") return formatResult("a", Number(F) / Number(m), "m/s²");
  };

  const solveGas = () => {
    const vals = [P, VGas, n, T].filter(x => x !== "").length;
    if (vals !== 3) return null;

    if (P === "") return formatResult("P", (Number(n) * R * Number(T)) / Number(VGas), "Pa");
    if (VGas === "") return formatResult("V", (Number(n) * R * Number(T)) / Number(P), "m³");
    if (n === "") return formatResult("n", (Number(P) * Number(VGas)) / (R * Number(T)), "mol");
    if (T === "") return formatResult("T", (Number(P) * Number(VGas)) / (Number(n) * R), "K");
  };

  const renderInputs = () => {
    if (equation === "kinematics") {
      return (
        <motion.div key="kinematics" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Final Velocity (v)" value={v} onChange={(v) => setValue("v", v)} placeholder="m/s" accent="red" />
          <Input label="Initial Velocity (u)" value={u} onChange={(v) => setValue("u", v)} placeholder="m/s" accent="red" />
          <Input label="Acceleration (a)" value={a} onChange={(v) => setValue("a", v)} placeholder="m/s²" accent="orange" />
          <Input label="Time (t)" value={t} onChange={(v) => setValue("t", v)} placeholder="s" accent="orange" />
        </motion.div>
      );
    }
    if (equation === "force") {
      return (
        <motion.div key="force" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Force (F)" value={F} onChange={(v) => setValue("F", v)} placeholder="N" accent="red" />
          <Input label="Mass (m)" value={m} onChange={(v) => setValue("m", v)} placeholder="kg" accent="orange" />
          <Input label="Acceleration (a)" value={aForce} onChange={(v) => setValue("aForce", v)} placeholder="m/s²" accent="orange" />
        </motion.div>
      );
    }
    if (equation === "gas") {
      return (
        <motion.div key="gas" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Pressure (P)" value={P} onChange={(v) => setValue("P", v)} placeholder="Pa" accent="red" />
          <Input label="Volume (V)" value={VGas} onChange={(v) => setValue("VGas", v)} placeholder="m³" accent="orange" />
          <Input label="Moles (n)" value={n} onChange={(v) => setValue("n", v)} placeholder="mol" accent="pink" />
          <Input label="Temperature (T)" value={T} onChange={(v) => setValue("Temp", v)} placeholder="K" accent="pink" />
        </motion.div>
      );
    }
  };

  const result = equation === "kinematics" ? solveKinematics() : equation === "force" ? solveForce() : solveGas();

  const tourSteps = [
    { element: '#tour-equation-select', popover: { title: '1. Choose Equation', description: 'First, select the physics or chemistry equation you want to solve.' } },
    { element: '#tour-equation-inputs', popover: { title: '2. Enter Knowns', description: 'Enter all the values you already know into these fields.' } },
    { element: '#tour-equation-result', popover: { title: '3. View Result', description: 'Leave exactly ONE field blank. The tool will solve for it instantly!' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8"
    >
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
            <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Formula Resolution</span>
        </div>
        <div className="flex items-center gap-4">
          <ShareButton />
          <ToolTutorial tourId="equation_solver" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-border-base rounded-[2.5rem] p-6 md:p-12 shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20" />

        <div className="space-y-4">
          <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.15em] ml-2">Choose Formula</label>
          <div className="relative group">
              <select
              id="tour-equation-select"
              value={equation}
              onChange={(e) => setEquation(e.target.value as EquationType)}
              className="w-full h-16 bg-canvas-muted border border-border-base rounded-2xl px-6 text-xl font-black text-text-primary focus:ring-8 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all cursor-pointer appearance-none shadow-inner"
              >
                  <option value="kinematics">Kinematics: v = u + at</option>
                  <option value="force">Newton&apos;s Law: F = ma</option>
                  <option value="gas">Ideal Gas Law: PV = nRT</option>
              </select>
              <div className="pointer-events-none absolute right-6 top-5 text-text-muted group-hover:text-brand-primary transition-colors">
                  <ChevronDown size={24} />
              </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
            {renderInputs()}
        </AnimatePresence>

        <div id="tour-equation-result" className={`mt-12 p-10 md:p-14 rounded-[2rem] border transition-all duration-500 flex flex-col items-center justify-center shadow-inner relative overflow-hidden ${result ? 'bg-brand-primary/5 border-brand-primary/20' : 'bg-canvas-muted border-border-base opacity-60'}`}>
            <div className="absolute top-0 right-0 p-4">
              {result ? <Sparkles size={20} className="text-brand-primary animate-pulse" /> : <AlertCircle size={20} className="text-text-muted" />}
            </div>

            <span className="text-[11px] font-black uppercase tracking-[0.25em] mb-4 text-text-muted">
                {result ? 'Solution Resolved' : 'Awaiting Input'}
            </span>

            <div className="min-h-[60px] flex items-center justify-center">
                {result || (
                  <p className="text-sm font-bold text-text-muted italic max-w-xs text-center">
                    Leave exactly one field blank to solve for the missing variable.
                  </p>
                )}
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder, accent }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, accent: 'red' | 'orange' | 'pink' }) {
  const accentColors = {
    red: 'focus:ring-red-500/10 focus:border-red-500',
    orange: 'focus:ring-orange-500/10 focus:border-orange-500',
    pink: 'focus:ring-pink-500/10 focus:border-pink-500',
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end px-1">
        <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">
          {label}
        </label>
        <ConstantSelector onSelect={onChange} />
      </div>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-14 px-5 border border-border-base rounded-xl bg-canvas-muted text-text-primary text-xl font-black placeholder:text-text-muted/30 outline-none transition-all shadow-inner ${accentColors[accent]}`}
        />
      </div>
    </div>
  );
}
