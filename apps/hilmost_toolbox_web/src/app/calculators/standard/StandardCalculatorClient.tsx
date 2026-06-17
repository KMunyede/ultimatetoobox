"use client";
import { useState } from "react";
import { Delete, History } from "lucide-react";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { formatResult } from "@/lib/calcLogic";

export function StandardCalculatorClient() {
  const [state, setState] = useUrlState({
    display: "0",
    equation: "",
    op: "",
    memory: "0",
    ans: "0"
  });
  
  const { display, equation, op, memory, ans } = state as Record<string, string>;
  
  const [waitingForNewVal, setWaitingForNewVal] = useState(false);
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const calculate = (a: number, b: number, operator: string) => {
    let result: number;
    switch(operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "×": result = a * b; break;
      case "÷": result = b === 0 ? NaN : a / b; break;
      default: result = b;
    }
    return result;
  };

  const handleNum = (num: string) => {
    if (waitingForNewVal) {
      setState({ ...state, display: num });
      setWaitingForNewVal(false);
    } else {
      setState({ ...state, display: display === "0" ? num : display + num });
    }
  };

  const handleOp = (nextOp: string) => {
    const inputVal = parseFloat(display);
    
    if (prevVal === null) {
      setPrevVal(inputVal);
      setState({ ...state, equation: `${inputVal} ${nextOp}`, op: nextOp });
    } else if (op) {
      if (waitingForNewVal) {
        setState({ ...state, equation: `${prevVal} ${nextOp}`, op: nextOp });
        return;
      }
      const result = calculate(prevVal, inputVal, op);
      setPrevVal(result);
      setState({ ...state, display: formatResult(result), equation: `${formatResult(result)} ${nextOp}`, op: nextOp });
    }
    
    setWaitingForNewVal(true);
  };

  const handleEqual = () => {
    if (!op || prevVal === null) return;
    const inputVal = parseFloat(display);
    const result = calculate(prevVal, inputVal, op);
    const formatted = formatResult(result);

    setHistory(prev => [ `${prevVal} ${op} ${inputVal} = ${formatted}`, ...prev].slice(0, 5));
    setPrevVal(null);
    setState({ ...state, display: formatted, equation: `${prevVal} ${op} ${inputVal} =`, op: "", ans: formatted });
    setWaitingForNewVal(true);
  };

  const clear = () => {
    setPrevVal(null);
    setWaitingForNewVal(false);
    setState({ ...state, display: "0", equation: "", op: "" });
  };

  const backspace = () => {
    if (waitingForNewVal) return;
    setState({ ...state, display: display.length > 1 ? display.slice(0, -1) : "0" });
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    if (prevVal !== null && op) {
      // Logic for 100 + 10% = 110
      const p = (prevVal * current) / 100;
      setState({ ...state, display: formatResult(p) });
    } else {
      setState({ ...state, display: formatResult(current / 100) });
    }
  };

  const memoryClear = () => setState({ ...state, memory: "0" });
  const memoryRecall = () => {
    setState({ ...state, display: memory });
    setWaitingForNewVal(true);
  };
  const memoryAdd = () => setState({ ...state, memory: formatResult(parseFloat(memory) + parseFloat(display)) });
  const memorySub = () => setState({ ...state, memory: formatResult(parseFloat(memory) - parseFloat(display)) });

  const useAns = () => {
    setState({ ...state, display: ans });
    setWaitingForNewVal(true);
  };

  const tourSteps = [
    { element: '#tour-standard-display', popover: { title: '1. Multi-line Display', description: 'See your expression on top and result on bottom.' } },
    { element: '#tour-standard-memory', popover: { title: '2. Memory Functions', description: 'Use MC, MR, M+, M- to store and recall numbers.' } },
    { element: '#tour-standard-keypad', popover: { title: '3. Number Pad', description: 'Arranged in the standard 7-8-9 sequence for rapid input.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
    >
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-end gap-3 px-1">
          <ShareButton />
          <ToolTutorial tourId="standard_calculator" steps={tourSteps} buttonText="How to use" />
        </div>

        <div className="bg-canvas-card border border-border-base rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500/20" />

          {/* Display */}
          <div id="tour-standard-display" className="bg-canvas-muted border border-border-base rounded-3xl p-8 mb-8 text-right h-44 flex flex-col justify-end shadow-inner relative group">
            <div className="absolute top-4 left-6 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
               <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Standard Engine</span>
            </div>
            {parseFloat(memory) !== 0 && (
              <div className="absolute top-4 right-6 text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded">M</div>
            )}
            <div className="text-text-muted text-lg font-bold h-8 overflow-hidden tracking-tight opacity-60">
              {equation}
            </div>
            <motion.div
              key={display}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-7xl font-black text-text-primary tracking-tighter truncate"
            >
              {display}
            </motion.div>
          </div>

          {/* Memory Row */}
          <div id="tour-standard-memory" className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "MC", action: memoryClear, color: "text-red-500 bg-red-500/5 hover:bg-red-500/10" },
              { label: "MR", action: memoryRecall, color: "text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10" },
              { label: "M+", action: memoryAdd, color: "text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10" },
              { label: "M-", action: memorySub, color: "text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10" },
            ].map(m => (
              <button key={m.label} onClick={m.action} className={`h-12 rounded-xl text-xs font-black transition-all border border-transparent hover:border-current/20 ${m.color}`}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Keypad Grid */}
          <div id="tour-standard-keypad" className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <button onClick={clear} className="h-16 bg-red-500/10 text-red-600 font-black rounded-2xl border border-red-500/10 hover:bg-red-500/20 transition-all text-lg">AC</button>
            <button onClick={backspace} className="h-16 bg-canvas-muted text-text-secondary font-black rounded-2xl border border-border-base hover:border-text-muted transition-all flex items-center justify-center"><Delete size={24} /></button>
            <button onClick={handlePercent} className="h-16 bg-orange-500/10 text-orange-600 font-black rounded-2xl border border-orange-500/10 hover:bg-orange-500/20 transition-all text-xl">%</button>
            <button onClick={() => handleOp("÷")} className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '÷' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}>÷</button>

            {/* Row 2 (7-8-9) */}
            {[7,8,9].map(n => (
              <button key={n} onClick={() => handleNum(String(n))} className="h-16 bg-canvas-card text-text-primary font-black text-2xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm">{n}</button>
            ))}
            <button onClick={() => handleOp("×")} className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '×' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}>×</button>

            {/* Row 3 (4-5-6) */}
            {[4,5,6].map(n => (
              <button key={n} onClick={() => handleNum(String(n))} className="h-16 bg-canvas-card text-text-primary font-black text-2xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm">{n}</button>
            ))}
            <button onClick={() => handleOp("-")} className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '-' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}>-</button>

            {/* Row 4 (1-2-3) */}
            {[1,2,3].map(n => (
              <button key={n} onClick={() => handleNum(String(n))} className="h-16 bg-canvas-card text-text-primary font-black text-2xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm">{n}</button>
            ))}
            <button onClick={() => handleOp("+")} className={`h-16 font-black rounded-2xl transition-all text-2xl border ${op === '+' && waitingForNewVal ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20'}`}>+</button>

            {/* Row 5 */}
            <button onClick={useAns} className="h-16 bg-canvas-muted text-brand-primary font-black text-sm rounded-2xl border border-border-base hover:border-brand-primary/50 transition-all uppercase tracking-tighter">Ans</button>
            <button onClick={() => handleNum("0")} className="h-16 bg-canvas-card text-text-primary font-black text-2xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm">0</button>
            <button onClick={() => handleNum(".")} className="h-16 bg-canvas-card text-text-primary font-black text-2xl rounded-2xl border border-border-base hover:bg-canvas-muted transition-all shadow-sm">.</button>
            <button onClick={handleEqual} className="h-16 bg-brand-primary text-white font-black text-3xl rounded-2xl border border-brand-primary hover:bg-brand-hover transition-all shadow-2xl shadow-brand-primary/30">=</button>
          </div>
        </div>
      </div>

      {/* Side Panel: History */}
      <div className="space-y-6">
          <div className="bg-canvas-card border border-border-base rounded-[2.5rem] p-8 shadow-xl h-full min-h-[400px]">
              <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-orange-500/10 rounded-xl text-orange-600">
                    <History size={20} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">Recent History</h3>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {history.length > 0 ? (
                    history.map((entry, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className="p-4 bg-canvas-muted border border-border-base rounded-2xl group hover:border-brand-primary/30 transition-all cursor-pointer"
                        onClick={() => {
                           const parts = entry.split('=');
                           if (parts.length > 1) setState({ ...state, display: parts[1].trim() });
                        }}
                      >
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1 group-hover:text-brand-primary">Calculation {history.length - i}</p>
                        <p className="text-sm font-bold text-text-primary break-all">{entry}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center opacity-40 grayscale">
                        <History size={48} className="text-text-muted mb-4" />
                        <p className="text-sm font-bold text-text-muted italic">No history yet</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
          </div>
      </div>
    </motion.div>
  );
}
