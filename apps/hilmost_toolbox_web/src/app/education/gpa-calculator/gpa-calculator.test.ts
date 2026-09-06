import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import {
  type Course,
  getPointsFromGrade,
  clampGradeInput,
  calculateSemesterGpa,
  calculateCumulativeGpa,
  LETTER_GRADES
} from './gpaCalculator.ts';

function validateNumberInputBlur(value: string, step = 0.5, min = 0, max = 6): string {
  let num = parseFloat(value);
  if (isNaN(num)) {
    num = min !== undefined ? min : 0;
  } else {
    if (step !== undefined && step > 0) {
      num = Math.round(num / step) * step;
    }
    if (min !== undefined) num = Math.max(min, num);
    if (max !== undefined) num = Math.min(max, num);
  }
  return Number(num.toFixed(4)).toString();
}

test('Bug Reproduction & Fix: Mode switching retains row-level mode and grade-points', () => {
  let activeInputMode: 'letter' | 'percentage' | 'points' = 'letter';
  const courses: Course[] = [];

  for (let i = 1; i <= 6; i++) {
    courses.push({
      id: `c${i}`,
      name: `Course ${i}`,
      credits: '3',
      grade: activeInputMode === 'letter' ? 'A' : '95',
      mode: activeInputMode
    });
  }

  activeInputMode = 'percentage';
  courses.push({
    id: 'c7',
    name: 'Course 7',
    credits: '3',
    grade: '95',
    mode: activeInputMode
  });

  activeInputMode = 'points';
  courses.push({
    id: 'c8',
    name: 'Course 8',
    credits: '3',
    grade: '4.0',
    mode: activeInputMode
  });

  const result = calculateSemesterGpa(courses, '4.0');

  assert.equal(result.totalCredits, 24);
  assert.equal(result.totalPoints, 96);
  assert.equal(result.gpa, 4.0);
  assert.equal(result.gpa.toFixed(2), '4.00');
});

test('Task 3a Audit: GPA is weighted by credits Σ(points * credits) / Σ(credits)', () => {
  const courses: Course[] = [
    { id: '1', name: 'Course 1', credits: '4', grade: 'A', mode: 'letter' },
    { id: '2', name: 'Course 2', credits: '2', grade: 'C', mode: 'letter' }
  ];
  const result = calculateSemesterGpa(courses, '4.0');
  assert.equal(result.totalCredits, 6);
  assert.equal(result.totalPoints, 20);
  assert.equal(result.gpa.toFixed(2), '3.33');
});

test('Task 3b Audit: Cumulative GPA formula feeds prior cumulative GPA and credits correctly', () => {
  const courses: Course[] = [
    { id: '1', name: 'Semester Course', credits: '15', grade: 'A', mode: 'letter' }
  ];
  const semResult = calculateSemesterGpa(courses, '4.0');

  const cumResult = calculateCumulativeGpa('3.0', '45', semResult.totalPoints, semResult.totalCredits);

  assert.equal(cumResult.totalCredits, 60);
  assert.equal(cumResult.gpa, 3.25);
  assert.equal(cumResult.gpa.toFixed(2), '3.25');
});

test('Task 3c Audit: Toggling scale re-evaluates all rows under selected scale', () => {
  const courses: Course[] = [
    { id: '1', name: 'Course 1', credits: '3', grade: 'A', mode: 'letter' }
  ];

  const scale4Result = calculateSemesterGpa(courses, '4.0');
  assert.equal(scale4Result.gpa, 4.0);

  const scale5Result = calculateSemesterGpa(courses, '5.0');
  assert.equal(scale5Result.gpa, 5.0);
});

test('Task 3d Audit: Blank or 0-credit rows are excluded from denominator', () => {
  const courses: Course[] = [
    { id: '1', name: 'Course 1', credits: '3', grade: 'B', mode: 'letter' },
    { id: '2', name: 'Course 2', credits: '0', grade: 'F', mode: 'letter' },
    { id: '3', name: 'Course 3', credits: '', grade: 'A', mode: 'letter' }
  ];

  const result = calculateSemesterGpa(courses, '4.0');
  assert.equal(result.totalCredits, 3);
  assert.equal(result.totalPoints, 9);
  assert.equal(result.gpa, 3.0);
  assert.equal(result.gpa.toFixed(2), '3.00');
});

test('Task 3e Audit: Out of range inputs are clamped/handled safely', () => {
  assert.equal(getPointsFromGrade('150', 'percentage', '4.0'), 4.0);
  assert.equal(getPointsFromGrade('-20', 'percentage', '4.0'), 0.0);

  assert.equal(getPointsFromGrade('10.0', 'points', '4.0'), 4.0);
  assert.equal(getPointsFromGrade('-5.0', 'points', '4.0'), 0.0);
  assert.equal(getPointsFromGrade('10.0', 'points', '5.0'), 5.0);
});

test('Task 3f Audit: Final displayed GPA rounded to 2 decimal places', () => {
  const courses: Course[] = [
    { id: '1', name: 'C1', credits: '3', grade: 'B+', mode: 'letter' },
    { id: '2', name: 'C2', credits: '3', grade: 'A-', mode: 'letter' }
  ];
  const result = calculateSemesterGpa(courses, '4.0');
  assert.equal(result.gpa.toFixed(2), '3.50');
});

test('Classification Thresholds: Scale-proportional classification mapping', () => {
  const course4ScaleB: Course[] = [
    { id: '1', name: 'B Course', credits: '3', grade: 'B', mode: 'letter' }
  ];
  const res4ScaleB = calculateSemesterGpa(course4ScaleB, '4.0');
  assert.equal(res4ScaleB.gpa, 3.0);
  assert.equal(res4ScaleB.classification, 'B');

  const course5ScaleB: Course[] = [
    { id: '1', name: '4.0 Points Course', credits: '3', grade: '4.0', mode: 'points' }
  ];
  const res5ScaleB = calculateSemesterGpa(course5ScaleB, '5.0');
  assert.equal(res5ScaleB.gpa, 4.0);
  assert.equal(res5ScaleB.classification, 'B');

  const course5ScaleA: Course[] = [
    { id: '1', name: '4.625 Points Course', credits: '3', grade: '4.625', mode: 'points' }
  ];
  const res5ScaleA = calculateSemesterGpa(course5ScaleA, '5.0');
  assert.equal(res5ScaleA.gpa, 4.625);
  assert.equal(res5ScaleA.classification, 'A');
});

test('Credits Input Validation & Rounding (0.5 Increments)', () => {
  assert.equal(validateNumberInputBlur('3.7', 0.5, 0, 6), '3.5');
  assert.equal(validateNumberInputBlur('3.8', 0.5, 0, 6), '4');
  assert.equal(validateNumberInputBlur('3', 0.5, 0, 6), '3');
  assert.equal(validateNumberInputBlur('1.5', 0.5, 0, 6), '1.5');
  assert.equal(validateNumberInputBlur('10', 0.5, 0, 6), '6');
  assert.equal(validateNumberInputBlur('-2', 0.5, 0, 6), '0');
});

test('Letter Grade Dropdown Completeness', () => {
  assert.equal(LETTER_GRADES.length, 13);
  assert.deepEqual(LETTER_GRADES, ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']);
});

test('Grade Input Visual Clamping (Percentage & Points Modes)', () => {
  // Percentage "1000" on blur → "100"
  assert.equal(clampGradeInput('1000', 'percentage', '4.0'), '100');
  // Percentage "-23" on blur → "0"
  assert.equal(clampGradeInput('-23', 'percentage', '4.0'), '0');
  // Points "123567" on 4.0 scale on blur → "4"
  assert.equal(clampGradeInput('123567', 'points', '4.0'), '4');
  // Points "4.6666" on 4.0 scale on blur → "4"
  assert.equal(clampGradeInput('4.6666', 'points', '4.0'), '4');
  // Points "4.6666" on 5.0 scale on blur → "4.6666"
  assert.equal(clampGradeInput('4.6666', 'points', '5.0'), '4.6666');
  // Valid values (percentage "89", points "3.5") unaffected
  assert.equal(clampGradeInput('89', 'percentage', '4.0'), '89');
  assert.equal(clampGradeInput('3.5', 'points', '4.0'), '3.5');
});
