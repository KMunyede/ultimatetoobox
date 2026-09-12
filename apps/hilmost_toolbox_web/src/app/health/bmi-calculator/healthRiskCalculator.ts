export type UnitSystem = "metric" | "imperial";
export type BiologicalSex = "male" | "female";
export type RegionEthnicity =
  | "europid"
  | "south_asian"
  | "japanese"
  | "sub_saharan_african"
  | "middle_east";

export interface HealthRiskInput {
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
}

export interface IdfThreshold {
  maleCm: number;
  femaleCm: number;
  isPlaceholder: boolean;
}

export const IDF_THRESHOLDS: Record<RegionEthnicity, IdfThreshold> = {
  europid: { maleCm: 94, femaleCm: 80, isPlaceholder: false },
  south_asian: { maleCm: 90, femaleCm: 80, isPlaceholder: false },
  japanese: { maleCm: 85, femaleCm: 90, isPlaceholder: false },
  sub_saharan_african: { maleCm: 94, femaleCm: 80, isPlaceholder: true },
  middle_east: { maleCm: 94, femaleCm: 80, isPlaceholder: true },
};

export const REGION_LABELS: Record<RegionEthnicity, string> = {
  europid: "Europid / Caucasian",
  south_asian: "South Asian / Chinese / South-Central American",
  japanese: "Japanese",
  sub_saharan_african: "African",
  middle_east: "Middle East / Arab",
};

export function calculateBmi(
  unitSystem: UnitSystem,
  cm: string,
  kg: string,
  ft: string,
  inch: string,
  lbs: string
): number | null {
  if (unitSystem === "metric") {
    const h = parseFloat(cm) / 100;
    const w = parseFloat(kg);
    if (h > 0 && w > 0) {
      return w / (h * h);
    }
  } else {
    const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    const w = parseFloat(lbs);
    if (hInches > 0 && w > 0) {
      return (w / (hInches * hInches)) * 703;
    }
  }
  return null;
}

export function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", level: "low" as const };
  if (bmi < 25) return { label: "Normal weight", level: "normal" as const };
  if (bmi < 30) return { label: "Overweight", level: "elevated" as const };
  return { label: "Obese", level: "high" as const };
}

export function getHeightInCm(
  unitSystem: UnitSystem,
  cm: string,
  ft: string,
  inch: string
): number | null {
  if (unitSystem === "metric") {
    const h = parseFloat(cm);
    return !isNaN(h) && h > 0 ? h : null;
  } else {
    const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    return hInches > 0 ? hInches * 2.54 : null;
  }
}

export function getWaistInCm(unitSystem: UnitSystem, waist: string): number | null {
  const w = parseFloat(waist);
  if (isNaN(w) || w <= 0) return null;
  return unitSystem === "metric" ? w : w * 2.54;
}

export function getHipInCm(unitSystem: UnitSystem, hip: string): number | null {
  const h = parseFloat(hip);
  if (isNaN(h) || h <= 0) return null;
  return unitSystem === "metric" ? h : h * 2.54;
}

export function calculateWhtr(
  waistCm: number | null,
  heightCm: number | null
): { whtr: number; isElevated: boolean } | null {
  if (!waistCm || !heightCm || heightCm <= 0) return null;
  const whtr = waistCm / heightCm;
  return {
    whtr,
    isElevated: whtr >= 0.5,
  };
}

export function calculateWhr(
  waistCm: number | null,
  hipCm: number | null,
  sex: BiologicalSex
): { whr: number; isElevated: boolean } | null {
  if (!waistCm || !hipCm || hipCm <= 0) return null;
  const whr = waistCm / hipCm;
  const threshold = sex === "male" ? 0.90 : 0.85;
  return {
    whr,
    isElevated: whr > threshold,
  };
}

export function evaluateWaistRisk(
  waistCm: number | null,
  sex: BiologicalSex,
  region: RegionEthnicity
): { waistCm: number; thresholdCm: number; isElevated: boolean; isPlaceholder: boolean } | null {
  if (!waistCm) return null;
  const thresholdObj = IDF_THRESHOLDS[region];
  const thresholdCm = sex === "male" ? thresholdObj.maleCm : thresholdObj.femaleCm;
  return {
    waistCm,
    thresholdCm,
    isElevated: waistCm >= thresholdCm,
    isPlaceholder: thresholdObj.isPlaceholder,
  };
}

export function clampCircumferenceInput(value: string, unitSystem: UnitSystem): string {
  if (value.trim() === "") return "";
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  const min = unitSystem === "metric" ? 30 : 12;
  const max = unitSystem === "metric" ? 250 : 100;
  const clamped = Math.min(Math.max(num, min), max);
  return Number(clamped.toFixed(1)).toString();
}
