"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, Wallet, CreditCard, PiggyBank, ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

// Lazy load Recharts
const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

type Category = 'income' | 'fixed' | 'variable' | 'savings';

interface BudgetItem {
  id: string;
  name: string;
  amount: string;
  category: Category;
}

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; icon: React.ElementType; placeholder: string }> = {
  income: { label: "Income", color: "#000000", icon: Wallet, placeholder: "e.g. Salary, Freelance" },
  fixed: { label: "Fixed Expenses", color: "#f43f5e", icon: ArrowDownCircle, placeholder: "e.g. Rent, Bills" },
  variable: { label: "Variable Expenses", color: "#fbbf24", icon: CreditCard, placeholder: "e.g. Food, Fun" },
  savings: { label: "Savings & Debt", color: "#3b82f6", icon: PiggyBank, placeholder: "e.g. Emergency Fund" },
};

export function BudgetClient() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("hsc_budget_items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse budget items", e);
      }
    } else {
        setItems([
            { id: '1', name: 'Monthly Salary', amount: '5000', category: 'income' },
            { id: '2', name: 'Rent/Mortgage', amount: '1500', category: 'fixed' },
            { id: '3', name: 'Groceries', amount: '400', category: 'variable' },
            { id: '4', name: 'Savings', amount: '500', category: 'savings' },
        ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hsc_budget_items", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const totals = useMemo(() => {
    const res = { income: 0, fixed: 0, variable: 0, savings: 0, expenses: 0 };
    items.forEach(item => {
      const amountNum = parseFloat(item.amount) || 0;
      res[item.category] += amountNum;
      if (item.category !== 'income') res.expenses += amountNum;
    });
    return res;
  }, [items]);

  const netBalance = totals.income - totals.expenses;

  const addItem = (category: Category) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: "",
      amount: "",
      category
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<BudgetItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const chartData = [
    { name: "Fixed", value: totals.fixed, color: CATEGORY_CONFIG.fixed.color },
    { name: "Variable", value: totals.variable, color: CATEGORY_CONFIG.variable.color },
    { name: "Savings", value: totals.savings, color: CATEGORY_CONFIG.savings.color },
    { name: "Remaining", value: Math.max(0, netBalance), color: "var(--color-brand-primary)" },
  ].filter(d => d.value > 0);

  if (!isLoaded) return <div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Entry Area */}
        <div className="lg:col-span-2 space-y-10">

          <Section
            id="tour-budget-income"
            category="income"
            items={items.filter(i => i.category === 'income')}
            onAdd={() => addItem('income')}
            onUpdate={updateItem}
            onDelete={deleteItem}
            total={totals.income}
          />

          <div id="tour-budget-expenses" className="space-y-10">
            <Section
                category="fixed"
                items={items.filter(i => i.category === 'fixed')}
                onAdd={() => addItem('fixed')}
                onUpdate={updateItem}
                onDelete={deleteItem}
                total={totals.fixed}
            />
            <Section
                category="variable"
                items={items.filter(i => i.category === 'variable')}
                onAdd={() => addItem('variable')}
                onUpdate={updateItem}
                onDelete={deleteItem}
                total={totals.variable}
            />
            <Section
                category="savings"
                items={items.filter(i => i.category === 'savings')}
                onAdd={() => addItem('savings')}
                onUpdate={updateItem}
                onDelete={deleteItem}
                total={totals.savings}
            />
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
            <div id="tour-budget-summary" className="sticky top-24 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
                    <ArrowUpCircle className="text-brand-primary" />
                    Summary
                </h3>

                <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total In</span>
                        <span className="text-2xl font-black text-brand-primary">$<NumberTicker value={totals.income} /></span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Out</span>
                        <span className="text-2xl font-black text-rose-500">$<NumberTicker value={totals.expenses} /></span>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />
                    <div className="flex justify-between items-end pt-2">
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Net Balance</span>
                        <span className={`text-2xl md:text-3xl font-black ${netBalance >= 0 ? 'text-brand-primary' : 'text-rose-600'}`}>
                            {netBalance < 0 && "-"}$<NumberTicker value={Math.abs(netBalance)} />
                        </span>
                    </div>
                </div>

                <div className="h-[250px] w-full relative mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Remaining</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                            {totals.income > 0 ? Math.round((Math.max(0, netBalance) / totals.income) * 100) : 0}%
                        </span>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex gap-3 items-start border border-slate-100 dark:border-slate-800">
                    <Info size={18} className="text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-widest">
                        Your data is saved automatically to your device.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

interface SectionProps {
  id?: string;
  category: Category;
  items: BudgetItem[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
  total: number;
}

function Section({ id, category, items, onAdd, onUpdate, onDelete, total }: SectionProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  return (
    <div id={id} className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border-2`} style={{ backgroundColor: `${config.color}10`, color: config.color, borderColor: `${config.color}20` }}>
            <Icon size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">{config.label}</h2>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Subtotal: <span className="text-slate-900 dark:text-white">$<NumberTicker value={total} /></span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] p-2 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1 w-full">
                  <Input
                    placeholder={config.placeholder}
                    className="!bg-transparent !border-none !p-0 !text-sm !font-bold"
                    value={item.name}
                    onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-32">
                        <span className="absolute left-3 top-3 text-slate-400 font-bold text-sm">$</span>
                        <NumberInput
                            className="!pl-7"
                            value={item.amount}
                            onChange={val => onUpdate(item.id, { amount: val })}
                        />
                    </div>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                        title="Delete Item"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={onAdd}
          className="w-full p-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all group uppercase tracking-widest"
        >
          <Plus size={16} className="group-hover:scale-125 transition-transform" />
          Add {config.label} Item
        </button>
      </div>
    </div>
  );
}
