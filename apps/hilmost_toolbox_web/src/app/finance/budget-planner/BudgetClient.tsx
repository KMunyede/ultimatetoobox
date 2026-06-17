"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, Wallet, CreditCard, PiggyBank, ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react";

type Category = 'income' | 'fixed' | 'variable' | 'savings';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: Category;
}

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; icon: any; placeholder: string }> = {
  income: { label: "Income", color: "var(--color-brand-primary)", icon: Wallet, placeholder: "e.g. Salary, Freelance" },
  fixed: { label: "Fixed Expenses", color: "#f43f5e", icon: ArrowDownCircle, placeholder: "e.g. Rent, Bills" },
  variable: { label: "Variable Expenses", color: "#fbbf24", icon: CreditCard, placeholder: "e.g. Food, Fun" },
  savings: { label: "Savings & Debt", color: "#3b82f6", icon: PiggyBank, placeholder: "e.g. Emergency Fund" },
};

export function BudgetClient() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("hsc_budget_items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse budget items", e);
      }
    } else {
        // Initial defaults
        setItems([
            { id: '1', name: 'Monthly Salary', amount: 5000, category: 'income' },
            { id: '2', name: 'Rent/Mortgage', amount: 1500, category: 'fixed' },
            { id: '3', name: 'Groceries', amount: 400, category: 'variable' },
            { id: '4', name: 'Savings', amount: 500, category: 'savings' },
        ]);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hsc_budget_items", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const totals = useMemo(() => {
    const res = { income: 0, fixed: 0, variable: 0, savings: 0, expenses: 0 };
    items.forEach(item => {
      res[item.category] += item.amount;
      if (item.category !== 'income') res.expenses += item.amount;
    });
    return res;
  }, [items]);

  const netBalance = totals.income - totals.expenses;

  const addItem = (category: Category) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
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

  const tourSteps = [
    { element: '#tour-budget-income', popover: { title: '1. Add Income', description: 'List all your sources of monthly income here.' } },
    { element: '#tour-budget-expenses', popover: { title: '2. Track Expenses', description: 'Enter your fixed and variable costs to see where your money goes.' } },
    { element: '#tour-budget-summary', popover: { title: '3. Net Balance', description: 'The most important number: what is left over at the end of the month.' } },
  ];

  if (!isLoaded) return <div className="h-96 animate-pulse bg-canvas-muted rounded-3xl" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-12"
    >
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Live Budget Engine</span>
        </div>
        <div className="flex gap-4">
          <ShareButton />
          <ToolTutorial tourId="budget_advanced" steps={tourSteps} buttonText="Help Guide" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Entry Area */}
        <div className="lg:col-span-2 space-y-10">

          {/* Income Section */}
          <Section
            id="tour-budget-income"
            category="income"
            items={items.filter(i => i.category === 'income')}
            onAdd={() => addItem('income')}
            onUpdate={updateItem}
            onDelete={deleteItem}
            total={totals.income}
          />

          {/* Expenses Group */}
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
            <div id="tour-budget-summary" className="sticky top-24 bg-canvas-card border border-base rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary/20" />

                <h3 className="text-xl font-black text-text-primary mb-8 flex items-center gap-3">
                    <ArrowUpCircle className="text-brand-primary" />
                    Financial Summary
                </h3>

                <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total In</span>
                        <span className="text-2xl font-black text-brand-primary">$<NumberTicker value={totals.income} /></span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Out</span>
                        <span className="text-2xl font-black text-rose-500">$<NumberTicker value={totals.expenses} /></span>
                    </div>
                    <div className="h-px bg-border-base" />
                    <div className="flex justify-between items-end pt-2">
                        <span className="text-xs font-black text-text-primary uppercase tracking-widest">Net Balance</span>
                        <span className={`text-4xl font-black ${netBalance >= 0 ? 'text-brand-primary' : 'text-rose-600'}`}>
                            {netBalance < 0 && "-"}$<NumberTicker value={Math.abs(netBalance)} />
                        </span>
                    </div>
                </div>

                {/* Visualization */}
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
                                contentStyle={{ backgroundColor: 'var(--color-canvas-card)', borderRadius: '12px', border: '1px solid var(--color-border-base)', fontSize: '12px', fontWeight: 'bold' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Remaining</span>
                        <span className="text-lg font-black text-text-primary">
                            {totals.income > 0 ? Math.round((Math.max(0, netBalance) / totals.income) * 100) : 0}%
                        </span>
                    </div>
                </div>

                <div className="bg-canvas-muted rounded-2xl p-4 flex gap-3 items-start border border-base">
                    <Info size={18} className="text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                        Your data is saved automatically to your device. Click the share icon above to send this budget to someone else.
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
          <div className={`p-2 rounded-xl border`} style={{ backgroundColor: `${config.color}10`, color: config.color, borderColor: `${config.color}20` }}>
            <Icon size={20} />
          </div>
          <h2 className="text-lg font-black text-text-primary tracking-tight">{config.label}</h2>
        </div>
        <div className="text-sm font-black text-text-muted">
          Subtotal: <span className="text-text-primary">$<NumberTicker value={total} /></span>
        </div>
      </div>

      <div className="bg-canvas-card border border-base rounded-[2rem] p-2 shadow-sm overflow-hidden">
        <div className="divide-y divide-border-base/50">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-canvas-muted/50 transition-colors"
              >
                <input
                  type="text"
                  placeholder={config.placeholder}
                  className="flex-1 w-full h-12 bg-transparent text-sm font-bold text-text-primary placeholder:text-text-muted outline-none px-2"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-32">
                        <span className="absolute left-3 top-3 text-text-muted font-bold text-sm">$</span>
                        <input
                            type="number"
                            className="w-full h-12 pl-7 pr-4 bg-canvas-muted border border-base rounded-xl text-sm font-black text-text-primary outline-none focus:border-brand-primary transition-all"
                            value={item.amount || ""}
                            onChange={(e) => onUpdate(item.id, { amount: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="p-3 text-text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
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
          className="w-full p-4 flex items-center justify-center gap-2 text-xs font-black text-text-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-all group"
        >
          <Plus size={16} className="group-hover:scale-125 transition-transform" />
          ADD ITEM TO {config.label.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
