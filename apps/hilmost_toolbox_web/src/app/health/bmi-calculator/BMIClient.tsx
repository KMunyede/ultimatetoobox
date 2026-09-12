"use client";

import React from "react";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { PillSelector } from "../../../components/ui/PillSelector";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";
import {
  UnitSystem,
  BiologicalSex,
  RegionEthnicity,
  REGION_LABELS,
  calculateBmi,
  getBmiCategory,
  getHeightInCm,
  getWaistInCm,
  getHipInCm,
  calculateWhtr,
  calculateWhr,
  evaluateWaistRisk,
  clampCircumferenceInput
} from "./healthRiskCalculator";
import { AlertTriangle, Activity, Heart, ShieldAlert } from "lucide-react";

export function BMIClient() {
  const [state, setState] = useUrlState({
    unitSystem: "metric",
    sex: "male",
    region: "europid",
    cm: "170",
    kg: "70",
    ft: "5",
    inch: "7",
    lbs: "154",
    waist: "",
    hip: "",
  });

  const { unitSystem, sex, region, cm, kg, ft, inch, lbs, waist, hip } = state as {
    unitSystem: UnitSystem;
    sex: BiologicalSex;
    region: RegionEthnicity;
    cm: string;
    kg: string;
    ft: string;
    inch: string;
    lbs: string;
    waist: string;
    hip: string;
  };

  const bmi = calculateBmi(unitSystem, cm, kg, ft, inch, lbs);
  const heightCm = getHeightInCm(unitSystem, cm, ft, inch);
  const waistCm = getWaistInCm(unitSystem, waist);
  const hipCm = getHipInCm(unitSystem, hip);

  const whtrEval = calculateWhtr(waistCm, heightCm);
  const whrEval = calculateWhr(waistCm, hipCm, sex);
  const waistEval = evaluateWaistRisk(waistCm, sex, region);

  const bmiCat = bmi !== null && !isNaN(bmi) && isFinite(bmi) ? getBmiCategory(bmi) : null;

  // Surface any disagreement between BMI and waist-based indicators
  const hasDisagreement = (() => {
    if (!bmiCat || (!waistEval && !whtrEval)) return false;
    const bmiIsNormalOrLow = bmiCat.level === "normal" || bmiCat.level === "low";
    const waistIsElevated = (waistEval && waistEval.isElevated) || (whtrEval && whtrEval.isElevated);
    return bmiIsNormalOrLow && waistIsElevated;
  })();

  const isPlaceholderRegion = region === "sub_saharan_african" || region === "middle_east";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="@container space-y-8 my-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div id="tour-bmi-inputs" className="lg:col-span-6 bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-brand-primary" />
            <h2 className="text-sm font-normal uppercase tracking-widest text-black dark:text-white">Health Risk Inputs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PillSelector
              label="Unit System"
              value={unitSystem}
              onChange={(val) => setState({ unitSystem: val })}
              options={[
                { label: "Metric", value: "metric" },
                { label: "Imperial", value: "imperial" },
              ]}
              className="!space-y-1.5"
            />

            <PillSelector
              label="Biological Gender"
              value={sex}
              onChange={(val) => setState({ sex: val })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              className="!space-y-1.5"
            />
          </div>

          <Select
            label="Region / Ethnicity (IDF Consensus Thresholds)"
            value={region}
            onChange={(e) => setState({ region: e.target.value as RegionEthnicity })}
            options={(Object.keys(REGION_LABELS) as RegionEthnicity[]).map((r) => ({
              label: REGION_LABELS[r],
              value: r,
            }))}
          />

          {unitSystem === "metric" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Height (cm)"
                value={cm}
                onChange={(val) => setState({ cm: val })}
                placeholder="e.g. 175"
                min={50}
                max={300}
              />
              <NumberInput
                label="Weight (kg)"
                value={kg}
                onChange={(val) => setState({ kg: val })}
                placeholder="e.g. 70"
                min={10}
                max={300}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5 w-full">
                <label className="block text-caption font-normal uppercase tracking-widest text-[#57544C] dark:text-slate-400 ml-1 mb-1">Height</label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <NumberInput
                       value={ft}
                       onChange={(val) => setState({ ft: val })}
                       placeholder="ft"
                       min={2}
                       max={9}
                    />
                    <span className="absolute right-4 bottom-3 text-black dark:text-white font-normal text-xs">ft</span>
                  </div>
                  <div className="flex-1 relative">
                    <NumberInput
                       value={inch}
                       onChange={(val) => setState({ inch: val })}
                       placeholder="in"
                       min={0}
                       max={11}
                    />
                    <span className="absolute right-4 bottom-3 text-black dark:text-white font-normal text-xs">in</span>
                  </div>
                </div>
              </div>
              <NumberInput
                label="Weight (lbs)"
                value={lbs}
                onChange={(val) => setState({ lbs: val })}
                placeholder="e.g. 150"
                min={20}
                max={661}
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-normal uppercase tracking-widest text-[#57544C] dark:text-slate-400">Abdominal Risk Inputs (Optional)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label={`Waist Circumference (${unitSystem === "metric" ? "cm" : "in"})`}
                value={waist}
                onChange={(val) => setState({ waist: val })}
                onBlur={(e) => {
                  const clamped = clampCircumferenceInput(e.target.value, unitSystem);
                  setState({ waist: clamped });
                }}
                placeholder={unitSystem === "metric" ? "e.g. 85" : "e.g. 33.5"}
                min={unitSystem === "metric" ? 30 : 12}
                max={unitSystem === "metric" ? 250 : 100}
                step={0.5}
              />

              <NumberInput
                label={`Hip Circumference (${unitSystem === "metric" ? "cm" : "in"})`}
                value={hip}
                onChange={(val) => setState({ hip: val })}
                onBlur={(e) => {
                  const clamped = clampCircumferenceInput(e.target.value, unitSystem);
                  setState({ hip: clamped });
                }}
                placeholder={unitSystem === "metric" ? "e.g. 98" : "e.g. 38.5"}
                min={unitSystem === "metric" ? 30 : 12}
                max={unitSystem === "metric" ? 250 : 100}
                step={0.5}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Results & Health Risk Dashboard */}
        <div id="tour-bmi-results" className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={20} className="text-brand-primary" />
              <h2 className="text-sm font-normal uppercase tracking-widest text-black dark:text-white">Health Risk Summary</h2>
            </div>

            {bmi !== null && !isNaN(bmi) && isFinite(bmi) ? (
              <div className="space-y-6">
                {/* Main BMI Display */}
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-caption font-normal uppercase tracking-[0.2em] text-black dark:text-white mb-1">BMI Score</div>
                  <div className="text-5xl md:text-6xl font-normal text-black dark:text-white mb-4 tracking-tighter">
                    <NumberTicker value={bmi} decimals={1} duration={0.8} />
                  </div>
                  {bmiCat && (
                    <span className="inline-block px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-normal text-sm uppercase tracking-widest text-black dark:text-white shadow-sm">
                      {bmiCat.label}
                    </span>
                  )}
                </div>

                {/* Combined Risk Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  {/* Waist Circumference */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Waist Risk</div>
                    {waistEval ? (
                      <div>
                        <div className="text-base font-normal text-black dark:text-white">
                          {waistEval.waistCm.toFixed(1)} cm
                        </div>
                        <div className={`text-[11px] font-normal uppercase tracking-wider ${waistEval.isElevated ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {waistEval.isElevated ? `≥${waistEval.thresholdCm}cm (Elevated)` : `<${waistEval.thresholdCm}cm (Normal)`}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 py-1">Enter Waist</div>
                    )}
                  </div>

                  {/* WHtR */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Waist-Height Ratio</div>
                    {whtrEval ? (
                      <div>
                        <div className="text-base font-normal text-black dark:text-white">
                          {whtrEval.whtr.toFixed(2)}
                        </div>
                        <div className={`text-[11px] font-normal uppercase tracking-wider ${whtrEval.isElevated ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {whtrEval.isElevated ? "≥0.50 (Elevated)" : "<0.50 (Healthy)"}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 py-1">Enter Waist</div>
                    )}
                  </div>

                  {/* WHR */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Waist-Hip Ratio</div>
                    {whrEval ? (
                      <div>
                        <div className="text-base font-normal text-black dark:text-white">
                          {whrEval.whr.toFixed(2)}
                        </div>
                        <div className={`text-[11px] font-normal uppercase tracking-wider ${whrEval.isElevated ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {whrEval.isElevated ? "Elevated Risk" : "Normal Risk"}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 py-1">Enter Hip (Opt)</div>
                    )}
                  </div>
                </div>

                {/* Disagreement Warning Box */}
                {hasDisagreement && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-900 dark:text-amber-200 text-xs space-y-1">
                    <div className="font-normal uppercase tracking-widest flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <AlertTriangle size={14} /> Indicator Discrepancy Surfaced
                    </div>
                    <p>
                      Your BMI indicates <strong>{bmiCat?.label}</strong>, but your abdominal measures indicate <strong>Elevated Metabolic Risk</strong>. Abdominal fat distribution carries independent cardiovascular risk even when total body mass is normal.
                    </p>
                  </div>
                )}

                {/* CRITICAL RED WARNING BANNER for Sub-Saharan African & Middle Eastern placeholder data */}
                {isPlaceholderRegion && waistEval && (
                  <div className="p-4 bg-rose-500/10 border-2 border-rose-500 rounded-xl text-rose-900 dark:text-rose-200 text-xs space-y-1.5 shadow-sm">
                    <div className="font-normal uppercase tracking-widest flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                      <ShieldAlert size={16} /> Reference Data Placeholder Warning
                    </div>
                    <p className="leading-relaxed">
                      IDF waist circumference thresholds for <strong>{REGION_LABELS[region]}</strong> populations currently use European reference data (Male ≥94cm, Female ≥80cm) as placeholders due to limited region-specific research. Please interpret these waist-based risk results with added caution.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-slate-300 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <span className="text-3xl font-normal">?</span>
                </div>
                <p className="max-w-[200px] text-xs font-normal uppercase tracking-widest text-center text-slate-400">Enter height and weight to calculate your health risk profile</p>
              </div>
            )}
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center select-none">
            <p className="text-[11px] font-normal uppercase tracking-wider text-slate-600 dark:text-slate-400 leading-normal">
              🔒 Screening tool, not a medical diagnosis — consult a qualified healthcare provider for clinical assessments.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
