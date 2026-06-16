"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, Download, Printer } from "lucide-react";
import { ToolTutorial, CopyButton, Tooltip } from "@utilitiessite/ui";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";


type BudgetItem = {
  id: string;
  name: string;
  amount: number;
};

export function BudgetClient() {
  const [incomes, setIncomes] = useState<BudgetItem[]>([{ id: 'inc-1', name: 'Primary Salary', amount: 4000 }]);
  const [needs, setNeeds] = useState<BudgetItem[]>([
    { id: 'need-1', name: 'Housing (Rent/Mortgage)', amount: 1200 },
    { id: 'need-2', name: 'Groceries', amount: 400 },
    { id: 'need-3', name: 'Utilities', amount: 200 }
  ]);
  const [wants, setWants] = useState<BudgetItem[]>([
    { id: 'want-1', name: 'Dining Out', amount: 250 },
    { id: 'want-2', name: 'Entertainment', amount: 100 }
  ]);
  const [savings, setSavings] = useState<BudgetItem[]>([
    { id: 'save-1', name: 'Emergency Fund', amount: 300 },
    { id: 'save-2', name: 'Investments', amount: 200 }
  ]);

  const totalIncome = useMemo(() => incomes.reduce((sum, item) => sum + (item.amount || 0), 0), [incomes]);
  const totalNeeds = useMemo(() => needs.reduce((sum, item) => sum + (item.amount || 0), 0), [needs]);
  const totalWants = useMemo(() => wants.reduce((sum, item) => sum + (item.amount || 0), 0), [wants]);
  const totalSavings = useMemo(() => savings.reduce((sum, item) => sum + (item.amount || 0), 0), [savings]);
  
  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const remaining = totalIncome - totalExpenses;

  // Calculate percentages (avoid NaN if income is 0)
  const needsPct = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
  const wantsPct = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
  const savingsPct = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  const updateItem = (listName: string, id: string, field: keyof BudgetItem, value: any) => {
    const updateFn = (items: BudgetItem[]) => items.map(item => item.id === id ? { ...item, [field]: value } : item);
    if (listName === 'incomes') setIncomes(updateFn);
    if (listName === 'needs') setNeeds(updateFn);
    if (listName === 'wants') setWants(updateFn);
    if (listName === 'savings') setSavings(updateFn);
  };

  const addItem = (listName: string) => {
    const newItem = { id: Math.random().toString(36).substr(2, 9), name: '', amount: 0 };
    if (listName === 'incomes') setIncomes([...incomes, newItem]);
    if (listName === 'needs') setNeeds([...needs, newItem]);
    if (listName === 'wants') setWants([...wants, newItem]);
    if (listName === 'savings') setSavings([...savings, newItem]);
  };

  const removeItem = (listName: string, id: string) => {
    const filterFn = (items: BudgetItem[]) => items.filter(item => item.id !== id);
    if (listName === 'incomes') setIncomes(filterFn);
    if (listName === 'needs') setNeeds(filterFn);
    if (listName === 'wants') setWants(filterFn);
    if (listName === 'savings') setSavings(filterFn);
  };

  const exportCSV = () => {
    const rows = [
      ["Category", "Item", "Amount"],
      ...incomes.map(i => ["Income", i.name, i.amount]),
      ...needs.map(n => ["Needs (50%)", n.name, n.amount]),
      ...wants.map(w => ["Wants (30%)", w.name, w.amount]),
      ...savings.map(s => ["Savings & Debt (20%)", s.name, s.amount]),
      [],
      ["Summary", "Total Income", totalIncome],
      ["Summary", "Total Needs", totalNeeds],
      ["Summary", "Total Wants", totalWants],
      ["Summary", "Total Savings", totalSavings],
      ["Summary", "Remaining", remaining]
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "budget_planner.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSection = (title: string, subtitle: string, listName: string, items: BudgetItem[], total: number, targetPct?: number, actualPct?: number) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {title} <span className="text-sm font-medium px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
        {targetPct !== undefined && actualPct !== undefined && (
          <div className="mt-2 sm:mt-0 text-right">
            <div className={`text-sm font-bold ${actualPct > targetPct ? 'text-red-500' : 'text-emerald-500'}`}>
              Actual: {actualPct.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Target: {targetPct}%
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <Tooltip content="Enter budget item name" className="flex-grow">
              <input 
                type="text" 
                value={item.name} 
                onChange={(e) => updateItem(listName, item.id, 'name', e.target.value)}
                placeholder="Item name"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </Tooltip>
            <div className="relative flex-1 min-w-[120px] shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <Tooltip content="Enter budget item amount" className="w-full">
                <input 
                  type="number" 
                  value={item.amount || ''} 
                  onChange={(e) => updateItem(listName, item.id, 'amount', parseFloat(e.target.value))}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </Tooltip>
            </div>
            <Tooltip content="Remove budget item">
              <button onClick={() => removeItem(listName, item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0">
                <Trash2 size={18} />
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
      
      <Tooltip content={`Add new item to ${title}`}>
        <button 
          onClick={() => addItem(listName)}
          className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </Tooltip>
    </div>
  );

  const tourSteps = [
    { element: '#tour-budget-income', popover: { title: '1. Add Income', description: 'Enter all sources of income (after tax) here.' } },
    { element: '#tour-budget-expenses', popover: { title: '2. Track Expenses', description: 'List your needs, wants, and savings. The tool will compare them to the recommended 50/30/20 rule.' } },
    { element: '#tour-budget-summary', popover: { title: '3. Visual Breakdown', description: 'See instantly if you are overspending in any category.' } },
    { element: '#tour-budget-export', popover: { title: '4. Save & Export', description: 'Download your budget as a CSV spreadsheet or Print to PDF to keep your records.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl print-container"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container { position: absolute; left: 0; top: 0; width: 100%; border: none; box-shadow: none; }
          button { display: none !important; }
        }
      `}} />

      <div className="flex flex-wrap justify-end gap-3 mb-6 print:hidden">
        <Tooltip content="Export budget items to a CSV spreadsheet file">
          <button id="tour-budget-export" onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-xl font-medium transition-colors">
            <Download size={18} /> CSV
          </button>
        </Tooltip>
        <Tooltip content="Print budget to paper or save as PDF file">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors">
            <Printer size={18} /> Print PDF
          </button>
        </Tooltip>
        <ShareButton />
        <ToolTutorial tourId="budget_planner" steps={tourSteps} buttonText="Tutorial" />
      </div>

      <div id="tour-budget-summary" className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Budget Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Total Income</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50">
            <div className="text-sm text-rose-600 dark:text-rose-400 font-medium mb-1">Total Expenses</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className={`p-4 rounded-xl border ${remaining >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/50'} col-span-2 md:col-span-2 flex justify-between items-center`}>
            <div>
              <div className={`text-sm font-medium mb-1 ${remaining >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>Left to Spend (Zero-Based)</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <CopyButton value={remaining.toFixed(2)} className="bg-white/50 dark:bg-slate-900/50" />
          </div>
        </div>

        {/* 50/30/20 Progress Bar */}
        <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div className="bg-red-500 h-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden" style={{ width: `${Math.min(needsPct, 100)}%` }}>{needsPct > 10 ? 'NEEDS' : ''}</div>
          <div className="bg-amber-500 h-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden" style={{ width: `${Math.min(wantsPct, 100)}%` }}>{wantsPct > 10 ? 'WANTS' : ''}</div>
          <div className="bg-emerald-500 h-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden" style={{ width: `${Math.min(savingsPct, 100)}%` }}>{savingsPct > 10 ? 'SAVINGS' : ''}</div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium px-2">
          <span>0%</span>
          <span>50%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div id="tour-budget-income">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Income Sources</h2>
          {renderSection("Monthly Income", "After-tax take-home pay", "incomes", incomes, totalIncome)}
        </div>
        
        <div id="tour-budget-expenses">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Expenses & Savings</h2>
          {renderSection("Needs (50%)", "Essentials like housing, food, and utilities.", "needs", needs, totalNeeds, 50, needsPct)}
          {renderSection("Wants (30%)", "Non-essentials like dining out and hobbies.", "wants", wants, totalWants, 30, wantsPct)}
          {renderSection("Savings & Debt (20%)", "Emergency funds, investing, and debt payoff.", "savings", savings, totalSavings, 20, savingsPct)}
        </div>
      </div>
    </motion.div>
  );
}
