"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Plus,
  X,
  RotateCcw,
  Copy,
  Check,
  GraduationCap,
  Calculator,
  BookOpen,
  History
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { PillSelector } from "../../../components/ui/PillSelector";
import { NumberInput } from "../../../components/ui/NumberInput";

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

const GRADE_POINTS_4: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

const GRADE_POINTS_5: Record<string, number> = {
  "A+": 5.0, "A": 5.0, "A-": 4.7,
  "B+": 4.3, "B": 4.0, "B-": 3.7,
  "C+": 3.3, "C": 3.0, "C-": 2.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

const LETTER_GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

export function GpaCalculatorTool() {
  const [scale, setScale] = useState<'4.0' | '5.0'>('4.0');
  const [inputMode, setInputMode] = useState<'letter' | 'percentage' | 'points'>('letter');

  const initialCourses: Course[] = [
    { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: "A" },
    { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: "A" },
    { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: "A" },
  ];

  const [semesterCourses, setSemesterCourses] = useState<Course[]>(initialCourses);
  const [prevGpa, setPrevGpa] = useState<string>("");
  const [prevCredits, setPrevCredits] = useState<string>("");

  const [copyStatus, setCopyStatus] = useState(false);

  const getPointsFromGrade = useCallback((grade: string, mode: 'letter' | 'percentage' | 'points', currentScale: '4.0' | '5.0') => {
    const table = currentScale === '4.0' ? GRADE_POINTS_4 : GRADE_POINTS_5;

    if (mode === 'points') {
        const p = parseFloat(grade);
        return isNaN(p) ? 0 : p;
    }

    if (mode === 'letter') {
        return table[grade] || 0;
    }

    if (mode === 'percentage') {
        const pct = parseFloat(grade);
        if (isNaN(pct)) return 0;

        let letter = "F";
        if (pct >= 90) {
            if (pct >= 97) letter = "A+";
            else if (pct >= 93) letter = "A";
            else letter = "A-";
        } else if (pct >= 80) {
            if (pct >= 87) letter = "B+";
            else if (pct >= 83) letter = "B";
            else letter = "B-";
        } else if (pct >= 70) {
            if (pct >= 77) letter = "C+";
            else if (pct >= 73) letter = "C";
            else letter = "C-";
        } else if (pct >= 60) {
            if (pct >= 67) letter = "D+";
            else if (pct >= 63) letter = "D";
            else letter = "D-";
        }
        return table[letter] || 0;
    }

    return 0;
  }, []);

  const semesterResults = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesterCourses.forEach(c => {
      const gp = getPointsFromGrade(c.grade, inputMode, scale);
      const creditsNum = parseFloat(c.credits) || 0;
      totalPoints += gp * creditsNum;
      totalCredits += creditsNum;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    let classification = "F";
    if (gpa >= 3.7) classification = "A";
    else if (gpa >= 3.0) classification = "B";
    else if (gpa >= 2.0) classification = "C";
    else if (gpa >= 1.0) classification = "D";

    return { gpa, totalCredits, classification };
  }, [semesterCourses, inputMode, scale, getPointsFromGrade]);

  const cumulativeResults = useMemo(() => {
    const pGpa = parseFloat(prevGpa) || 0;
    const pCreds = parseFloat(prevCredits) || 0;

    const currentTotalPoints = semesterResults.gpa * semesterResults.totalCredits;
    const prevTotalPoints = pGpa * pCreds;

    const totalCredits = pCreds + semesterResults.totalCredits;
    const gpa = totalCredits > 0 ? (currentTotalPoints + prevTotalPoints) / totalCredits : 0;

    return { gpa, totalCredits };
  }, [prevGpa, prevCredits, semesterResults]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      credits: "3",
      grade: inputMode === 'letter' ? "A" : inputMode === 'percentage' ? "95" : "4.0"
    };
    setSemesterCourses([...semesterCourses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (semesterCourses.length > 1) {
      setSemesterCourses(semesterCourses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setSemesterCourses(semesterCourses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleReset = () => {
    setSemesterCourses(initialCourses);
    setPrevGpa("");
    setPrevCredits("");
  };

  const handleCopy = () => {
    const text = `GPA Report (Hilmost Toolbox)
Scale: ${scale}
Semester GPA: ${semesterResults.gpa.toFixed(2)} (${semesterResults.classification})
Semester Credits: ${semesterResults.totalCredits}
Cumulative GPA: ${cumulativeResults.gpa.toFixed(2)}
Total Credits: ${cumulativeResults.totalCredits}`;

    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto my-8 space-y-10">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <PillSelector
          label="Grading Scale"
          value={scale}
          onChange={setScale}
          options={[
            { label: '4.0 Scale', value: '4.0' },
            { label: '5.0 Scale', value: '5.0' },
          ]}
          className="!space-y-2"
        />

        <PillSelector
          label="Input Mode"
          value={inputMode}
          onChange={setInputMode}
          options={[
            { label: 'Letter', value: 'letter' },
            { label: 'Percentage', value: 'percentage' },
            { label: 'Points', value: 'points' },
          ]}
          className="!space-y-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div id="semester-section" className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-brand-primary" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Semester Courses</h2>
            </div>

            <div className="space-y-3">
              {semesterCourses.map((course, idx) => (
                <div key={course.id} className="grid grid-cols-12 gap-2 items-end animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="col-span-5 sm:col-span-6">
                    <Input
                      placeholder={`Course ${idx + 1}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <NumberInput
                      value={course.credits}
                      onChange={(val) => updateCourse(course.id, { credits: val })}
                      min={0}
                      max={20}
                      className="text-center"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    {inputMode === 'letter' ? (
                      <Select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        options={LETTER_GRADES.map(g => ({ label: g, value: g }))}
                      />
                    ) : (
                      <Input
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        placeholder={inputMode === 'percentage' ? "0-100" : "0.0"}
                        className="text-center"
                      />
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-center mb-2.5">
                    <button
                      onClick={() => removeCourse(course.id)}
                      disabled={semesterCourses.length === 1}
                      className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCourse}
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-[#D8D6CF] dark:border-slate-800 rounded-2xl text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>

          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-500/20 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                <Calculator size={120} />
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">Semester GPA</p>
                <div className="text-7xl font-black mb-2">{semesterResults.gpa.toFixed(2)}</div>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Grade Class: {semesterResults.classification}
                </div>
             </div>
          </div>
        </div>

        <div id="cumulative-section" className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-brand-primary" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Cumulative</h2>
            </div>

            <div className="space-y-6">
              <NumberInput
                label="Prior Cumulative GPA"
                placeholder="e.g. 3.50"
                value={prevGpa}
                onChange={setPrevGpa}
                min={0}
                max={5}
                step={0.01}
              />
              <NumberInput
                label="Prior Total Credits"
                placeholder="e.g. 60"
                value={prevCredits}
                onChange={setPrevCredits}
                min={0}
                max={500}
              />

              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 space-y-4 text-center">
                <div className="text-5xl font-black text-slate-900 dark:text-white">
                    {cumulativeResults.gpa.toFixed(2)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Overall Cumulative</p>
                <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    Total Credits: {cumulativeResults.totalCredits}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Button
          onClick={handleCopy}
          className={`flex-1 sm:flex-none !py-4`}
          variant={copyStatus ? 'primary' : 'pill'}
        >
          {copyStatus ? <Check size={16} /> : <Copy size={16} />}
          {copyStatus ? "Copied Report!" : "Copy Results"}
        </Button>
        <Button
          onClick={handleReset}
          variant="secondary"
          className="flex-1 sm:flex-none !py-4"
        >
          <RotateCcw size={16} /> Reset All
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none mt-12">
        <GraduationCap size={12} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 Private academic tool. Your data stays in your browser.</span>
      </div>
    </div>
  );
}
