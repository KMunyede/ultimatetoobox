"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus,
  X,
  RotateCcw,
  Copy,
  Check,
  GraduationCap,
  Calculator,
  BookOpen,
  History,
  Info
} from "lucide-react";
import { FAQAccordion } from "@utilitiessite/ui";

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

  const faqs = [
    {
      question: "What is a good GPA?",
      answer: "A 'good' GPA depends on your academic goals and institution. Generally, a 3.0 (B average) is considered good, while a 3.5 or higher is often required for top-tier graduate programs and honors societies."
    },
    {
      question: "How is GPA calculated?",
      answer: "GPA is calculated by dividing the total number of grade points earned by the total number of credit hours attempted. Grade points are determined by multiplying the course's credit value by the numerical value of the grade received (e.g., an 'A' in a 3-credit course equals 12 grade points on a 4.0 scale)."
    },
    {
      question: "What is the difference between 4.0 and 5.0 weighted GPA?",
      answer: "A standard 4.0 scale treats all classes equally. A weighted 5.0 scale gives extra points for advanced classes like AP, IB, or Honors courses, recognizing the increased difficulty of the workload."
    },
    {
      question: "How do I calculate cumulative GPA?",
      answer: "To calculate cumulative GPA, you add all the grade points earned across all semesters and divide that sum by the total number of credit hours attempted since you started your degree."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-10">

      {/* 1. Scale Toggle & 2. Input Mode */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div id="scale-toggle" className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto">
          {(['4.0', '5.0'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${scale === s ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {s} Scale
            </button>
          ))}
        </div>

        <div id="input-mode" className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto">
          {(['letter', 'percentage', 'points'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setInputMode(m)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${inputMode === m ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {m === 'letter' ? 'Letter' : m === 'percentage' ? 'Percentage' : 'Points'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* 3. Semester Section */}
        <div id="semester-section" className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-brand-primary" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Semester Courses</h2>
            </div>

            <div className="space-y-3">
              {semesterCourses.map((course, idx) => (
                <div key={course.id} className="grid grid-cols-12 gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder={`Course ${idx + 1}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-brand-primary outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, { credits: e.target.value })}
                      onBlur={() => {
                        const val = parseInt(course.credits);
                        const clamped = isNaN(val) ? 3 : Math.min(20, Math.max(0, val));
                        updateCourse(course.id, { credits: clamped.toString() });
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-center focus:border-brand-primary outline-none"
                    />
                  </div>
                  <div className="col-span-3">
                    {inputMode === 'letter' ? (
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm appearance-none cursor-pointer focus:border-brand-primary outline-none"
                      >
                        {LETTER_GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        placeholder={inputMode === 'percentage' ? "0-100" : "0.0"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-center focus:border-brand-primary outline-none"
                      />
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
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
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all text-xs font-black uppercase tracking-widest"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>

          <div className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-500/20 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                <Calculator size={120} />
             </div>
             <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-80">Semester GPA</p>
                <div className="text-6xl font-black mb-2">{semesterResults.gpa.toFixed(2)}</div>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest">
                    Grade Class: {semesterResults.classification}
                </div>
             </div>
          </div>
        </div>

        {/* 4. Cumulative Section */}
        <div id="cumulative-section" className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-brand-primary" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Cumulative GPA</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Previous Cumulative GPA</label>
                <input
                  type="text"
                  placeholder="e.g. 3.50"
                  value={prevGpa}
                  onChange={(e) => setPrevGpa(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Total Previous Credits</label>
                <input
                  type="text"
                  placeholder="e.g. 60"
                  value={prevCredits}
                  onChange={(e) => setPrevCredits(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-brand-primary outline-none transition-all"
                />
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 text-center">
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                    {cumulativeResults.gpa.toFixed(2)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Overall Cumulative</p>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Total Credits Earned: {cumulativeResults.totalCredits}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Copy & 6. Reset */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <button
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
        >
          {copyStatus ? <Check size={16} /> : <Copy size={16} />}
          {copyStatus ? "Copied Report!" : "Copy Results"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
        >
          <RotateCcw size={16} /> Reset All
        </button>
      </div>

      {/* SEO Content Block */}
      <div className="mt-16 space-y-16">
        <div className="flex items-center justify-center gap-2 text-slate-400 select-none">
          <GraduationCap size={12} />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 Private academic tool. Your data stays in your browser.</span>
        </div>

        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Free GPA Calculator — Semester & Cumulative</h1>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Navigating academic success requires precise planning. Our <strong>GPA Calculator</strong> is designed to provide students, from high school to university, with a professional-grade environment to track their Grade Point Average. Whether you need to calculate your <strong>semester GPA</strong> to check eligibility for honors or your <strong>cumulative GPA</strong> to see where you stand for graduation, our tool handles the complex mathematics for you.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Flexibility is key to accurate tracking. This laboratory supports standard <strong>4.0 scales</strong> as well as <strong>weighted 5.0 scales</strong> often used in advanced placement (AP) and honors programs. You can choose to enter your results via <strong>Letter Grades</strong>, <strong>Percentages</strong>, or raw <strong>Grade Points</strong>, and our engine will instantly synchronize the values across all formats.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Strategic academic forecasting becomes simple with our <strong>Cumulative GPA</strong> mode. By inputting your previous overall GPA and total credit hours, you can see exactly how your current semester performance will shift your long-term average. Best of all, following the Hilmost "Zero-Server" commitment, your academic data is processed entirely on your device and is never stored on our servers.
          </p>

          <FAQAccordion items={faqs} />
        </section>
      </div>

    </div>
  );
}
