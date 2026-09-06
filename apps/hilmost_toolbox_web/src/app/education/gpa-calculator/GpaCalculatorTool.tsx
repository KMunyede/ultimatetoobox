"use client";

import React, { useState, useMemo } from "react";
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
import {
  Course,
  InputMode,
  GradingScale,
  LETTER_GRADES,
  clampGradeInput,
  calculateSemesterGpa,
  calculateCumulativeGpa
} from "./gpaCalculator";

const createInitialCourses = (mode: InputMode): Course[] => [
  { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: mode === 'letter' ? "A" : mode === 'percentage' ? "95" : "4.0", mode },
  { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: mode === 'letter' ? "A" : mode === 'percentage' ? "95" : "4.0", mode },
  { id: Math.random().toString(36).substr(2, 9), name: "", credits: "3", grade: mode === 'letter' ? "A" : mode === 'percentage' ? "95" : "4.0", mode },
];

export function GpaCalculatorTool() {
  const [scale, setScale] = useState<GradingScale>('4.0');
  const [inputMode, setInputMode] = useState<InputMode>('letter');

  const [semesterCourses, setSemesterCourses] = useState<Course[]>(() => createInitialCourses('letter'));
  const [prevGpa, setPrevGpa] = useState<string>("");
  const [prevCredits, setPrevCredits] = useState<string>("");

  const [copyStatus, setCopyStatus] = useState(false);

  const semesterResults = useMemo(() => {
    return calculateSemesterGpa(semesterCourses, scale);
  }, [semesterCourses, scale]);

  const cumulativeResults = useMemo(() => {
    return calculateCumulativeGpa(
      prevGpa,
      prevCredits,
      semesterResults.totalPoints,
      semesterResults.totalCredits
    );
  }, [prevGpa, prevCredits, semesterResults]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      credits: "3",
      grade: inputMode === 'letter' ? "A" : inputMode === 'percentage' ? "95" : "4.0",
      mode: inputMode
    };
    setSemesterCourses(prev => [...prev, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (semesterCourses.length > 1) {
      setSemesterCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setSemesterCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleReset = () => {
    setSemesterCourses(createInitialCourses(inputMode));
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
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5">
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
          <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-brand-primary" />
              <h2 className="text-sm font-normal uppercase tracking-widest text-black dark:text-white">Semester Courses</h2>
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
                      max={6}
                      step={0.5}
                      className="text-center"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    {course.mode === 'letter' ? (
                      <Select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        options={LETTER_GRADES.map(g => ({ label: g, value: g }))}
                      />
                    ) : (
                      <Input
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                        onBlur={(e) => {
                          const clamped = clampGradeInput(e.target.value, course.mode, scale);
                          updateCourse(course.id, { grade: clamped });
                        }}
                        placeholder={course.mode === 'percentage' ? "0-100" : "0.0"}
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
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-[#D8D6CF] dark:border-slate-800 rounded-2xl text-black dark:text-white hover:border-brand-primary hover:text-brand-primary transition-all text-caption font-normal uppercase tracking-widest"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>

          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-500/20 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                <Calculator size={120} />
             </div>
             <div className="relative z-10">
                <p className="text-caption font-normal uppercase tracking-[0.3em] mb-2 opacity-80">Semester GPA</p>
                <div className="text-7xl font-normal mb-2">{semesterResults.gpa.toFixed(2)}</div>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-caption font-normal uppercase tracking-widest">
                    Grade Class: {semesterResults.classification}
                </div>
             </div>
          </div>
        </div>

        <div id="cumulative-section" className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-brand-primary" />
              <h2 className="text-sm font-normal uppercase tracking-widest text-black dark:text-white">Cumulative</h2>
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
                step={0.5}
              />

              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 space-y-4 text-center">
                <div className="text-5xl font-normal text-black dark:text-white">
                    {cumulativeResults.gpa.toFixed(2)}
                </div>
                <p className="text-caption font-normal text-black dark:text-white uppercase tracking-[0.2em]">Overall Cumulative</p>
                <div className="text-caption font-normal text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
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

      <div className="flex items-center justify-center gap-2 text-black dark:text-white select-none mt-12">
        <GraduationCap size={12} />
        <span className="text-caption font-normal uppercase tracking-[0.25em]">🔒 Private academic tool. Your data stays in your browser.</span>
      </div>
    </div>
  );
}
