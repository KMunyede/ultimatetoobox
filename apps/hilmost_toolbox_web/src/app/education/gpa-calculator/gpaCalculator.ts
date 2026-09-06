export type InputMode = 'letter' | 'percentage' | 'points';
export type GradingScale = '4.0' | '5.0';

export interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
  mode: InputMode;
}

export const GRADE_POINTS_4: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

export const GRADE_POINTS_5: Record<string, number> = {
  "A+": 5.0, "A": 5.0, "A-": 4.7,
  "B+": 4.3, "B": 4.0, "B-": 3.7,
  "C+": 3.3, "C": 3.0, "C-": 2.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

export const LETTER_GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

export function getPointsFromGrade(
  grade: string,
  mode: InputMode,
  currentScale: GradingScale
): number {
  const table = currentScale === '4.0' ? GRADE_POINTS_4 : GRADE_POINTS_5;
  const maxScale = currentScale === '4.0' ? 4.0 : 5.0;

  if (mode === 'points') {
    const p = parseFloat(grade);
    if (isNaN(p)) return 0;
    return Math.min(Math.max(p, 0), maxScale);
  }

  if (mode === 'letter') {
    return table[grade] || 0;
  }

  if (mode === 'percentage') {
    const rawPct = parseFloat(grade);
    if (isNaN(rawPct)) return 0;
    const pct = Math.min(Math.max(rawPct, 0), 100);

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
}

export function calculateSemesterGpa(
  courses: Course[],
  scale: GradingScale
) {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(c => {
    const creditsNum = parseFloat(c.credits);
    if (!isNaN(creditsNum) && creditsNum > 0) {
      const gp = getPointsFromGrade(c.grade, c.mode, scale);
      totalPoints += gp * creditsNum;
      totalCredits += creditsNum;
    }
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const maxScale = scale === '4.0' ? 4.0 : 5.0;
  const factor = maxScale / 4.0;

  let classification = "F";
  if (gpa >= 3.7 * factor) classification = "A";
  else if (gpa >= 3.0 * factor) classification = "B";
  else if (gpa >= 2.0 * factor) classification = "C";
  else if (gpa >= 1.0 * factor) classification = "D";

  return { gpa, totalPoints, totalCredits, classification };
}

export function calculateCumulativeGpa(
  prevGpa: string,
  prevCredits: string,
  semesterTotalPoints: number,
  semesterTotalCredits: number
) {
  const pGpa = parseFloat(prevGpa) || 0;
  const pCreds = parseFloat(prevCredits) || 0;

  const prevTotalPoints = pGpa * pCreds;
  const totalCredits = pCreds + semesterTotalCredits;
  const gpa = totalCredits > 0 ? (semesterTotalPoints + prevTotalPoints) / totalCredits : 0;

  return { gpa, totalCredits };
}
