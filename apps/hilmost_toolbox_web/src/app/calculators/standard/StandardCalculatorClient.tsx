"use client";
import { useState } from "react";
import { Delete } from "lucide-react";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function StandardCalculatorClient() {
  const [state, setState] = useUrlState({
    display: "0",
    equation: "",
    op: ""
  });
  
  const { display, equation, op } = state as { display: string, equation: string, op: string };
  
  const [waitingForNewVal, setWaitingForNewVal] = useState(false);
  const [prevVal, setPrevVal] = useState<number | null>(null);

  const calculate = (a: number, b: number, operator: string) => {
    switch(operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const handleNum = (num: string) => {
    if (waitingForNewVal) {
      setState({ display: num, equation, op });
      setWaitingForNewVal(false);
    } else {
      setState({ display: display === "0" ? num : display + num, equation, op });
    }
  };

  const handleOp = (nextOp: string) => {
    const inputVal = parseFloat(display);
    
    if (prevVal === null) {
      setPrevVal(inputVal);
      setState({ display, equation: `${inputVal} ${nextOp}`, op: nextOp });
    } else if (op) {
      if (waitingForNewVal) {
        setState({ display, equation: `${prevVal} ${nextOp}`, op: nextOp });
        return;
      }
      const result = calculate(prevVal, inputVal, op);
      setPrevVal(result);
      setState({ display: String(result), equation: `${result} ${nextOp}`, op: nextOp });
    } else {
      setPrevVal(inputVal);
      setState({ display, equation: `${inputVal} ${nextOp}`, op: nextOp });
    }
    
    setWaitingForNewVal(true);
  };

  const handleEqual = () => {
    if (!op || prevVal === null) return;
    const inputVal = parseFloat(display);
    const result = calculate(prevVal, inputVal, op);
    setPrevVal(null);
    setState({ display: String(result), equation: `${prevVal} ${op} ${inputVal} =`, op: "" });
    setWaitingForNewVal(true);
  };

  const clear = () => {
    setPrevVal(null);
    setWaitingForNewVal(false);
    setState({ display: "0", equation: "", op: "" });
  };

  const backspace = () => {
    if (waitingForNewVal) return;
    setState({ display: display.length > 1 ? display.slice(0, -1) : "0", equation, op });
  };

  const handleDot = () => {
    if (waitingForNewVal) {
      setState({ display: "0.", equation, op });
      setWaitingForNewVal(false);
      return;
    }
    if (!display.includes(".")) {
      setState({ display: display + ".", equation, op });
    }
  };

  const toggleSign = () => {
    setState({ display: String(parseFloat(display) * -1), equation, op });
  };

  const tourSteps = [
    { element: '#tour-standard-display', popover: { title: '1. Display', description: 'This screen shows your current input and the ongoing calculation above it.' } },
    { element: '#tour-standard-keypad', popover: { title: '2. Keypad', description: 'Use the buttons to enter numbers and perform basic arithmetic operations.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl mx-auto w-full max-w-sm"
    >
      <div className="flex justify-end mb-4 gap-2">
        <ShareButton />
        <ToolTutorial tourId="standard_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      {/* Screen */}
      <div id="tour-standard-display" className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 text-right h-32 flex flex-col justify-end shadow-inner">
        <div className="text-slate-500 dark:text-slate-400 text-sm h-6 overflow-hidden">
          {equation}
        </div>
        <motion.div 
          key={display}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-5xl font-light text-slate-900 dark:text-white truncate"
        >
          {display}
        </motion.div>
      </div>

      {/* Grid */}
      <div id="tour-standard-keypad" className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={clear} className="col-span-2 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">AC</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={backspace} className="h-14 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"><Delete size={20} /></motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("÷")} className={`h-14 font-medium rounded-xl transition-colors text-xl ${op === '÷' && waitingForNewVal ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'}`}>÷</motion.button>
        
        {/* Row 2 */}
        {[7,8,9].map(n => (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">{n}</motion.button>
        ))}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("×")} className={`h-14 font-medium rounded-xl transition-colors text-xl ${op === '×' && waitingForNewVal ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'}`}>×</motion.button>

        {/* Row 3 */}
        {[4,5,6].map(n => (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">{n}</motion.button>
        ))}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("-")} className={`h-14 font-medium rounded-xl transition-colors text-xl ${op === '-' && waitingForNewVal ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'}`}>-</motion.button>

        {/* Row 4 */}
        {[1,2,3].map(n => (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={n} onClick={() => handleNum(String(n))} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">{n}</motion.button>
        ))}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleOp("+")} className={`h-14 font-medium rounded-xl transition-colors text-xl ${op === '+' && waitingForNewVal ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'}`}>+</motion.button>

        {/* Row 5 */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleSign} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">+/-</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleNum("0")} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">0</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDot} className="h-14 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium text-xl rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">.</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEqual} className="h-14 bg-blue-600 text-white font-medium text-xl rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">=</motion.button>
      </div>
    </motion.div>
  );
}
