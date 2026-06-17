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
    let result: number;
    switch(operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "×": result = a * b; break;
      case "÷": result = b === 0 ? NaN : a / b; break;
      default: result = b;
    }
    // Fix floating point precision issues (e.g. 0.1 + 0.2)
    return parseFloat(result.toFixed(12));
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
      className="bg-canvas-card border border-border-base rounded-[2.5rem] p-8 shadow-2xl mx-auto w-full max-w-[min(100%,384px)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20" />

      <div className="flex justify-end mb-6 gap-3">
        <ShareButton />
        <ToolTutorial tourId="standard_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      {/* Screen */}
      <div id="tour-standard-display" className="bg-canvas-muted border border-border-base rounded-2xl p-6 mb-8 text-right h-36 flex flex-col justify-end shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[10px] font-black text-orange-500 uppercase tracking-widest opacity-40">Standard</div>
        <div className="text-text-muted text-sm font-bold h-6 overflow-hidden tracking-tight">
          {equation}
        </div>
        <motion.div 
          key={display}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-5xl md:text-6xl font-black text-text-primary truncate tracking-tighter"
        >
          {display}
        </motion.div>
      </div>

      {/* Grid */}
      <div id="tour-standard-keypad" className="grid grid-cols-4 gap-4">
        {/* Row 1 */}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={clear}
          className="col-span-2 h-16 bg-red-500/10 text-red-600 font-black rounded-2xl border border-red-500/10 hover:bg-red-500/20 transition-all text-lg"
        >
          AC
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={backspace}
          className="h-16 bg-canvas-muted text-text-secondary font-black rounded-2xl border border-border-base hover:border-text-muted transition-all flex items-center justify-center"
        >
          <Delete size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleOp("÷")}
          className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '÷' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}
        >
          ÷
        </motion.button>
        
        {/* Row 2 */}
        {[7,8,9].map(n => (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            key={n}
            onClick={() => handleNum(String(n))}
            className="h-16 bg-canvas-card text-text-primary font-black text-xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm"
          >
            {n}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleOp("×")}
          className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '×' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}
        >
          ×
        </motion.button>

        {/* Row 3 */}
        {[4,5,6].map(n => (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            key={n}
            onClick={() => handleNum(String(n))}
            className="h-16 bg-canvas-card text-text-primary font-black text-xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm"
          >
            {n}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleOp("-")}
          className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '-' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}
        >
          -
        </motion.button>

        {/* Row 4 */}
        {[1,2,3].map(n => (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            key={n}
            onClick={() => handleNum(String(n))}
            className="h-16 bg-canvas-card text-text-primary font-black text-xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm"
          >
            {n}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleOp("+")}
          className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '+' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}
        >
          +
        </motion.button>

        {/* Row 5 */}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={toggleSign}
          className="h-16 bg-canvas-muted text-text-secondary font-black text-lg rounded-2xl border border-border-base hover:border-text-muted transition-all"
        >
          +/-
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleNum("0")}
          className="h-16 bg-canvas-card text-text-primary font-black text-xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm"
        >
          0
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleDot}
          className="h-16 bg-canvas-card text-text-primary font-black text-xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm"
        >
          .
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleEqual}
          className="h-16 bg-brand-primary text-white font-black text-2xl rounded-2xl border border-brand-primary hover:bg-brand-hover transition-all shadow-xl shadow-brand-primary/20"
        >
          =
        </motion.button>
      </div>
    </motion.div>
  );
}
