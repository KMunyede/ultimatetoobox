"use client";
import { ToolTutorial, ScientificNumber, ConstantSelector } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";

type EquationType = "kinematics" | "force" | "gas";

export function EquationSolverClient({ defaultEquation = "kinematics" }: { defaultEquation?: EquationType }) {
  const [state, setState] = useUrlState({
    equation: defaultEquation,
    v: "",
    u: "",
    a: "",
    t: "",
    F: "",
    m: "",
    aForce: "",
    P: "",
    VGas: "",
    n: "",
    Temp: ""
  });

  const equation = state.equation as EquationType;
  const { v, u, a, t, F, m, aForce, P, VGas, n, Temp } = state as Record<string, string>;
  const T = Temp;
  
  const setEquation = (eq: EquationType) => setState({ ...state, equation: eq });
  
  const setV = (val: string) => setState({ ...state, v: val });
  const setU = (val: string) => setState({ ...state, u: val });
  const setA = (val: string) => setState({ ...state, a: val });
  const setT = (val: string) => setState({ ...state, t: val });

  const setF = (val: string) => setState({ ...state, F: val });
  const setM = (val: string) => setState({ ...state, m: val });
  const setAForce = (val: string) => setState({ ...state, aForce: val });

  const setP = (val: string) => setState({ ...state, P: val });
  const setVGas = (val: string) => setState({ ...state, VGas: val });
  const setN = (val: string) => setState({ ...state, n: val });
  const setTemp = (val: string) => setState({ ...state, Temp: val });

  const R = 8.314;

  const formatResult = (label: string, value: number, unit: string) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        key={`${label}-${value}`}
        className="flex items-center gap-2"
      >
        <span>{label} = </span>
        <ScientificNumber value={value} suffix={unit} />
      </motion.div>
    );
  };

  const solveKinematics = () => {
    let missing = 0;
    if (v === "") missing++;
    if (u === "") missing++;
    if (a === "") missing++;
    if (t === "") missing++;

    if (missing !== 1) return <motion.p key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-sm text-slate-500">Leave exactly one field blank to solve.</motion.p>;

    if (v === "") return formatResult("v", Number(u) + Number(a) * Number(t), "m/s");
    if (u === "") return formatResult("u", Number(v) - Number(a) * Number(t), "m/s");
    if (a === "") return formatResult("a", (Number(v) - Number(u)) / Number(t), "m/s²");
    if (t === "") return formatResult("t", (Number(v) - Number(u)) / Number(a), "s");
  };

  const solveForce = () => {
    let missing = 0;
    if (F === "") missing++;
    if (m === "") missing++;
    if (aForce === "") missing++;

    if (missing !== 1) return <motion.p key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-sm text-slate-500">Leave exactly one field blank to solve.</motion.p>;

    if (F === "") return formatResult("F", Number(m) * Number(aForce), "N");
    if (m === "") return formatResult("m", Number(F) / Number(aForce), "kg");
    if (aForce === "") return formatResult("a", Number(F) / Number(m), "m/s²");
  };

  const solveGas = () => {
    let missing = 0;
    if (P === "") missing++;
    if (VGas === "") missing++;
    if (n === "") missing++;
    if (T === "") missing++;

    if (missing !== 1) return <motion.p key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-sm text-slate-500">Leave exactly one field blank to solve.</motion.p>;

    if (P === "") return formatResult("P", (Number(n) * R * Number(T)) / Number(VGas), "Pa");
    if (VGas === "") return formatResult("V", (Number(n) * R * Number(T)) / Number(P), "m³");
    if (n === "") return formatResult("n", (Number(P) * Number(VGas)) / (R * Number(T)), "mol");
    if (T === "") return formatResult("T", (Number(P) * Number(VGas)) / (Number(n) * R), "K");
  };

  const renderInputs = () => {
    if (equation === "kinematics") {
      return (
        <motion.div key="kinematics" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-2 gap-4">
          <Input label="Final Velocity (v)" value={v} onChange={setV} placeholder="m/s" />
          <Input label="Initial Velocity (u)" value={u} onChange={setU} placeholder="m/s" />
          <Input label="Acceleration (a)" value={a} onChange={setA} placeholder="m/s²" />
          <Input label="Time (t)" value={t} onChange={setT} placeholder="s" />
        </motion.div>
      );
    }
    if (equation === "force") {
      return (
        <motion.div key="force" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-2 gap-4">
          <Input label="Force (F)" value={F} onChange={setF} placeholder="N" />
          <Input label="Mass (m)" value={m} onChange={setM} placeholder="kg" />
          <Input label="Acceleration (a)" value={aForce} onChange={setAForce} placeholder="m/s²" />
        </motion.div>
      );
    }
    if (equation === "gas") {
      return (
        <motion.div key="gas" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} id="tour-equation-inputs" className="grid grid-cols-2 gap-4">
          <Input label="Pressure (P)" value={P} onChange={setP} placeholder="Pa" />
          <Input label="Volume (V)" value={VGas} onChange={setVGas} placeholder="m³" />
          <Input label="Moles (n)" value={n} onChange={setN} placeholder="mol" />
          <Input label="Temperature (T)" value={T} onChange={setTemp} placeholder="K" />
        </motion.div>
      );
    }
  };

  const result = equation === "kinematics" ? solveKinematics() : equation === "force" ? solveForce() : solveGas();

  const tourSteps = [
    { element: '#tour-equation-select', popover: { title: '1. Choose Equation', description: 'First, select the physics or chemistry equation you want to solve.' } },
    { element: '#tour-equation-inputs', popover: { title: '2. Enter Knowns', description: 'Enter all the values you already know into these fields.' } },
    { element: '#tour-equation-inputs', popover: { title: '3. Leave One Blank', description: 'Leave exactly ONE field completely blank. The tool will automatically solve for this missing variable.' } },
    { element: '#tour-equation-result', popover: { title: '4. View Result', description: 'Your final answer will instantly appear right here as you type!' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Select Equation
        </label>
        <div className="flex items-center gap-2">
          <ShareButton />
          <ToolTutorial tourId="equation_solver" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>
      <div className="mb-6">
        <select
          id="tour-equation-select"
          value={equation}
          onChange={(e) => setEquation(e.target.value as EquationType)}
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
        >
          <option value="kinematics">Kinematics (v = u + at)</option>
          <option value="force">Newton&apos;s Second Law (F = ma)</option>
          <option value="gas">Ideal Gas Law (PV = nRT)</option>
        </select>
      </div>

      <AnimatePresence mode="popLayout">
        {renderInputs()}
      </AnimatePresence>

      <div id="tour-equation-result" className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50 min-h-24 flex items-center justify-center">
        <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center">
          {result}
        </div>
      </div>
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </label>
        <div className="-mb-1 -mr-2"><ConstantSelector onSelect={onChange} /></div>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    </div>
  );
}
