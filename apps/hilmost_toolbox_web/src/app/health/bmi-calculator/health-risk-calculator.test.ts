import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import {
  calculateBmi,
  getBmiCategory,
  calculateWhtr,
  calculateWhr,
  evaluateWaistRisk,
  clampCircumferenceInput,
  IDF_THRESHOLDS
} from './healthRiskCalculator.ts';

test('BMI Calculation & Categories Regression Check', () => {
  // Metric: 170cm, 70kg -> 70 / (1.7^2) = 24.22
  const bmiMetric = calculateBmi('metric', '170', '70', '5', '7', '154');
  assert.notEqual(bmiMetric, null);
  assert.equal(bmiMetric!.toFixed(1), '24.2');
  assert.equal(getBmiCategory(bmiMetric!).label, 'Normal weight');

  // Imperial: 5ft 7in (67 in), 154 lbs -> (154 / (67^2)) * 703 = 24.11
  const bmiImperial = calculateBmi('imperial', '170', '70', '5', '7', '154');
  assert.notEqual(bmiImperial, null);
  assert.equal(bmiImperial!.toFixed(1), '24.1');
  assert.equal(getBmiCategory(bmiImperial!).label, 'Normal weight');
});

test('Waist-to-Height Ratio (WHtR) Calculation & Thresholds', () => {
  // 90cm waist / 180cm height = 0.50 (Elevated)
  const res1 = calculateWhtr(90, 180);
  assert.notEqual(res1, null);
  assert.equal(res1!.whtr, 0.5);
  assert.equal(res1!.isElevated, true);

  // 75cm waist / 180cm height = 0.4167 (Normal)
  const res2 = calculateWhtr(75, 180);
  assert.notEqual(res2, null);
  assert.equal(res2!.isElevated, false);
});

test('Waist-to-Hip Ratio (WHR) Calculation & WHO Thresholds', () => {
  // Male: 95cm waist / 100cm hip = 0.95 (> 0.90 -> Elevated)
  const resMaleElevated = calculateWhr(95, 100, 'male');
  assert.notEqual(resMaleElevated, null);
  assert.equal(resMaleElevated!.whr, 0.95);
  assert.equal(resMaleElevated!.isElevated, true);

  // Male: 85cm waist / 100cm hip = 0.85 (<= 0.90 -> Normal)
  const resMaleNormal = calculateWhr(85, 100, 'male');
  assert.notEqual(resMaleNormal, null);
  assert.equal(resMaleNormal!.isElevated, false);

  // Female: 88cm waist / 100cm hip = 0.88 (> 0.85 -> Elevated)
  const resFemaleElevated = calculateWhr(88, 100, 'female');
  assert.notEqual(resFemaleElevated, null);
  assert.equal(resFemaleElevated!.isElevated, true);

  // Female: 80cm waist / 100cm hip = 0.80 (<= 0.85 -> Normal)
  const resFemaleNormal = calculateWhr(80, 100, 'female');
  assert.notEqual(resFemaleNormal, null);
  assert.equal(resFemaleNormal!.isElevated, false);
});

test('IDF Region-Specific Thresholds & Placeholder Flags', () => {
  // Europid: M 94, F 80, isPlaceholder: false
  assert.equal(IDF_THRESHOLDS.europid.maleCm, 94);
  assert.equal(IDF_THRESHOLDS.europid.femaleCm, 80);
  assert.equal(IDF_THRESHOLDS.europid.isPlaceholder, false);

  // South Asian: M 90, F 80, isPlaceholder: false
  assert.equal(IDF_THRESHOLDS.south_asian.maleCm, 90);
  assert.equal(IDF_THRESHOLDS.south_asian.femaleCm, 80);

  // Japanese: M 85, F 90, isPlaceholder: false
  assert.equal(IDF_THRESHOLDS.japanese.maleCm, 85);
  assert.equal(IDF_THRESHOLDS.japanese.femaleCm, 90);

  // Sub-Saharan African: M 94, F 80, isPlaceholder: true
  assert.equal(IDF_THRESHOLDS.sub_saharan_african.maleCm, 94);
  assert.equal(IDF_THRESHOLDS.sub_saharan_african.femaleCm, 80);
  assert.equal(IDF_THRESHOLDS.sub_saharan_african.isPlaceholder, true);

  // Middle East / Arab: M 94, F 80, isPlaceholder: true
  assert.equal(IDF_THRESHOLDS.middle_east.maleCm, 94);
  assert.equal(IDF_THRESHOLDS.middle_east.femaleCm, 80);
  assert.equal(IDF_THRESHOLDS.middle_east.isPlaceholder, true);
});

test('Red Warning Banner Condition Triggering', () => {
  const evalSubSaharan = evaluateWaistRisk(95, 'male', 'sub_saharan_african');
  assert.notEqual(evalSubSaharan, null);
  assert.equal(evalSubSaharan!.isPlaceholder, true); // Triggers RED warning banner

  const evalMiddleEast = evaluateWaistRisk(95, 'male', 'middle_east');
  assert.notEqual(evalMiddleEast, null);
  assert.equal(evalMiddleEast!.isPlaceholder, true); // Triggers RED warning banner

  const evalEuropid = evaluateWaistRisk(95, 'male', 'europid');
  assert.notEqual(evalEuropid, null);
  assert.equal(evalEuropid!.isPlaceholder, false); // Does NOT trigger RED warning banner
});

test('Circumference Input Clamping on Blur', () => {
  // Metric clamping (30cm - 250cm)
  assert.equal(clampCircumferenceInput('20', 'metric'), '30');
  assert.equal(clampCircumferenceInput('300', 'metric'), '250');
  assert.equal(clampCircumferenceInput('85.6', 'metric'), '85.6');

  // Imperial clamping (12in - 100in)
  assert.equal(clampCircumferenceInput('5', 'imperial'), '12');
  assert.equal(clampCircumferenceInput('150', 'imperial'), '100');
  assert.equal(clampCircumferenceInput('34.2', 'imperial'), '34.2');
});
