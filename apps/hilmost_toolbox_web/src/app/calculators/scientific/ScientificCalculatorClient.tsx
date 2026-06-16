"use client";
import { useState } from "react";
import { Delete } from "lucide-react";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function ScientificCalculatorClient() {
  const [state, setState] = useUrlState({
    display: "0",
    equation: "",
    op: "",
    modeRad: "true"
  });
  
  const { display, equation, op } = state as { display: string, equation: string, op: string };
  const modeRad = String(state.modeRad) === "true";
  
  const [waitingForNewVal, setWaitingForNewVal] = useState(false);
  const [prevVal, setPrevVal] = useState<number | null>(null);

  const calculate = (a: number, b: number, operator: string) => {
    switch(operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      case "yⁿ": return Math.pow(a, b);
      default: return b;
    }
  };

  const handleNum = (num: string) => {
    if (waitingForNewVal) {
      setState({ display: num, equation, op, modeRad: String(modeRad) });
      setWaitingForNewVal(false);
    } else {
      setState({ display: display === "0" ? num : display + num, equation, op, modeRad: String(modeRad) });
    }
  };

  const handleOp = (nextOp: string) => {
    const inputVal = parseFloat(display);
    
    if (prevVal === null) {
      setPrevVal(inputVal);
      setState({ display, equation: `${inputVal} ${nextOp}`, op: nextOp, modeRad: String(modeRad) });
    } else if (op) {
      if (waitingForNewVal) {
        setState({ display, equation: `${prevVal} ${nextOp}`, op: nextOp, modeRad: String(modeRad) });
        return;
      }
      const result = calculate(prevVal, inputVal, op);
      setPrevVal(result);
      setState({ display: String(result), equation: `${result} ${nextOp}`, op: nextOp, modeRad: String(modeRad) });
    } else {
      setPrevVal(inputVal);
      setState({ display, equation: `${inputVal} ${nextOp}`, op: nextOp, modeRad: String(modeRad) });
    }
    
    setWaitingForNewVal(true);
  };

  const handleEqual = () => {
    if (!op || prevVal === null) return;
    const inputVal = parseFloat(display);
    const result = calculate(prevVal, inputVal, op);
    setPrevVal(null);
    setState({ display: String(result), equation: `${prevVal} ${op} ${inputVal} =`, op: "", modeRad: String(modeRad) });
    setWaitingForNewVal(true);
  };

  const clear = () => {
    setPrevVal(null);
    setWaitingForNewVal(false);
    setState({ display: "0", equation: "", op: "", modeRad: String(modeRad) });
  };

  const backspace = () => {
    if (waitingForNewVal) return;
    setState({ display: display.length > 1 ? display.slice(0, -1) : "0", equation, op, modeRad: String(modeRad) });
  };

  const handleDot = () => {
    if (waitingForNewVal) {
      setState({ display: "0.", equation, op, modeRad: String(modeRad) });
      setWaitingForNewVal(false);
      return;
    }
    if (!display.includes(".")) {
      setState({ display: display + ".", equation, op, modeRad: String(modeRad) });
    }
  };

  const toggleSign = () => {
    setState({ display: String(parseFloat(display) * -1), equation, op, modeRad: String(modeRad) });
  };

  // Scientific functions
  const execFunc = (funcName: string) => {
    const val = parseFloat(display);
    let result = 0;
    let funcSymbol = funcName;
    
    // Helper for trig to respect Rad/Deg mode
    const getAngle = (v: number) => modeRad ? v : v * (Math.PI / 180);
    const fromAngle = (v: number) => modeRad ? v : v * (180 / Math.PI);

    switch(funcName) {
      case "sin": result = Math.sin(getAngle(val)); break;
      case "cos": result = Math.cos(getAngle(val)); break;
      case "tan": result = Math.tan(getAngle(val)); break;
      case "asin": result = fromAngle(Math.asin(val)); break;
      case "acos": result = fromAngle(Math.acos(val)); break;
      case "atan": result = fromAngle(Math.atan(val)); break;
      case "ln": result = Math.log(val); break;
      case "log": result = Math.log10(val); break;
      case "sqrt": result = Math.sqrt(val); funcSymbol = "√"; break;
      case "x²": result = val * val; break;
      case "1/x": result = 1 / val; break;
      case "eⁿ": result = Math.exp(val); break;
      case "10ⁿ": result = Math.pow(10, val); break;
    }
    
    // Fix floating point errors for clean trig values
    if (Math.abs(result) < 1e-10) result = 0;
    
    setState({ display: String(result), equation: `${funcSymbol}(${val})`, op, modeRad: String(modeRad) });
    setWaitingForNewVal(true);
  };

  const insertConstant = (c: string) => {
    if (c === "π") setState({ display: String(Math.PI), equation, op, modeRad: String(modeRad) });
    if (c === "e") setState({ display: String(Math.E), equation, op, modeRad: String(modeRad) });
    setWaitingForNewVal(true);
  };

  const sciBtnClass = "h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm md:text-base";
  const numBtnClass = "h-12 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-lg rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm";
  const opBtnClass = "h-12 font-medium rounded-xl transition-colors text-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50";
  const activeOpBtnClass = "h-12 font-medium rounded-xl transition-colors text-lg bg-blue-600 text-white";

  const tourSteps = [
    { element: '#tour-sci-toggle', popover: { title: '1. Angle Mode', description: 'Switch between Radians (RAD) and Degrees (DEG) for trigonometric functions.' } },
    { element: '#tour-sci-display', popover: { title: '2. Display', description: 'View your input, ongoing equations, and the final results here.' } },
    { element: '#tour-sci-functions', popover: { title: '3. Scientific Functions', description: 'Access advanced math functions like trig, logs, exponents, and constants.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl mx-auto w-full max-w-2xl"
    >
      <div className="flex justify-end mb-4 gap-2">
        <ShareButton />
        <ToolTutorial tourId="scientific_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      {/* Screen */}
      <div id="tour-sci-display" className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 text-right h-32 flex flex-col justify-end shadow-inner">
        <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm mb-1">
          <button 
            id="tour-sci-toggle"
            onClick={() => setState({ display, equation, op, modeRad: String(!modeRad) })}
            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold transition-colors"
          >
            {modeRad ? "RAD" : "DEG"}
          </button>
          <div className="h-5 overflow-hidden">{equation}</div>
        </div>
        <motion.div 
          key={display}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white truncate"
        >
          {display}
        </motion.div>
      </div>

      {/* Grid */}
      <div id="tour-sci-functions" className="grid grid-cols-5 md:grid-cols-6 gap-2 md:gap-3">
        {/* Row 1 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("sin")} className={sciBtnClass}>sin</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("cos")} className={sciBtnClass}>cos</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("tan")} className={sciBtnClass}>tan</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={clear} className="col-span-2 md:col-span-1 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">AC</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={backspace} className="col-span-3 md:col-span-1 h-12 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"><Delete size={18} /></motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("÷")} className={`col-span-2 md:col-span-1 ${op === '÷' && waitingForNewVal ? activeOpBtnClass : opBtnClass}`}>÷</motion.button>
        
        {/* Row 2 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("asin")} className={sciBtnClass}>asin</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("acos")} className={sciBtnClass}>acos</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("atan")} className={sciBtnClass}>atan</motion.button>
        {[7,8,9].map(n => <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className={numBtnClass}>{n}</motion.button>)}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("×")} className={`hidden md:block ${op === '×' && waitingForNewVal ? activeOpBtnClass : opBtnClass}`}>×</motion.button>

        {/* Row 3 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("x²")} className={sciBtnClass}>x²</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("yⁿ")} className={op === 'yⁿ' && waitingForNewVal ? activeOpBtnClass : sciBtnClass}>xʸ</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("sqrt")} className={sciBtnClass}>√x</motion.button>
        {[4,5,6].map(n => <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className={numBtnClass}>{n}</motion.button>)}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("-")} className={`hidden md:block ${op === '-' && waitingForNewVal ? activeOpBtnClass : opBtnClass}`}>-</motion.button>

        {/* Row 4 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("1/x")} className={sciBtnClass}>1/x</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("eⁿ")} className={sciBtnClass}>eˣ</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("10ⁿ")} className={sciBtnClass}>10ˣ</motion.button>
        {[1,2,3].map(n => <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className={numBtnClass}>{n}</motion.button>)}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("+")} className={`hidden md:block ${op === '+' && waitingForNewVal ? activeOpBtnClass : opBtnClass}`}>+</motion.button>

        {/* Row 5 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("ln")} className={sciBtnClass}>ln</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => execFunc("log")} className={sciBtnClass}>log</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleSign} className={sciBtnClass}>+/-</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => insertConstant("π")} className={numBtnClass}>π</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleNum("0")} className={numBtnClass}>0</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDot} className={numBtnClass}>.</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEqual} className="col-span-4 md:col-span-1 mt-2 md:mt-0 h-12 bg-blue-600 text-white font-medium text-xl rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">=</motion.button>
        
        {/* Mobile Ops Row (since they were hidden md:block) */}
        <div className="col-span-5 grid grid-cols-4 gap-2 mt-2 md:hidden">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("×")} className={op === '×' && waitingForNewVal ? activeOpBtnClass : opBtnClass}>×</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("-")} className={op === '-' && waitingForNewVal ? activeOpBtnClass : opBtnClass}>-</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("+")} className={op === '+' && waitingForNewVal ? activeOpBtnClass : opBtnClass}>+</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEqual} className="bg-blue-600 text-white font-medium text-xl rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">=</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
