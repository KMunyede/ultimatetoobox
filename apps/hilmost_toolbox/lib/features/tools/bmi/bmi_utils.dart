import 'package:flutter/material.dart';

enum BmiCategory {
  underweight,
  normal,
  overweight,
  obese
}

class BmiResult {
  final double bmi;
  final BmiCategory category;
  final String categoryLabel;
  final Color color;
  final String healthyRangeStr;

  BmiResult({
    required this.bmi,
    required this.category,
    required this.categoryLabel,
    required this.color,
    required this.healthyRangeStr,
  });
}

class BmiUtils {
  static BmiResult calculateMetric(double heightCm, double weightKg) {
    if (heightCm <= 0 || weightKg <= 0) return _emptyResult();
    final heightM = heightCm / 100;
    final bmi = weightKg / (heightM * heightM);
    
    final minHealthyKg = 18.5 * (heightM * heightM);
    final maxHealthyKg = 24.9 * (heightM * heightM);
    final rangeStr = '${minHealthyKg.toStringAsFixed(1)} - ${maxHealthyKg.toStringAsFixed(1)} kg';

    return _getResult(bmi, rangeStr);
  }

  static BmiResult calculateImperial(double feet, double inches, double lbs) {
    final totalInches = (feet * 12) + inches;
    if (totalInches <= 0 || lbs <= 0) return _emptyResult();
    final bmi = 703 * lbs / (totalInches * totalInches);

    final minHealthyLbs = 18.5 * (totalInches * totalInches) / 703;
    final maxHealthyLbs = 24.9 * (totalInches * totalInches) / 703;
    final rangeStr = '${minHealthyLbs.toStringAsFixed(1)} - ${maxHealthyLbs.toStringAsFixed(1)} lbs';

    return _getResult(bmi, rangeStr);
  }

  static BmiResult _emptyResult() {
    return BmiResult(bmi: 0, category: BmiCategory.normal, categoryLabel: '-', color: Colors.grey, healthyRangeStr: '-');
  }

  static BmiResult _getResult(double bmi, String rangeStr) {
    if (bmi < 18.5) {
      return BmiResult(bmi: bmi, category: BmiCategory.underweight, categoryLabel: 'Underweight', color: Colors.blue, healthyRangeStr: rangeStr);
    } else if (bmi < 25) {
      return BmiResult(bmi: bmi, category: BmiCategory.normal, categoryLabel: 'Normal', color: Colors.green, healthyRangeStr: rangeStr);
    } else if (bmi < 30) {
      return BmiResult(bmi: bmi, category: BmiCategory.overweight, categoryLabel: 'Overweight', color: Colors.orange, healthyRangeStr: rangeStr);
    } else {
      return BmiResult(bmi: bmi, category: BmiCategory.obese, categoryLabel: 'Obese', color: Colors.red, healthyRangeStr: rangeStr);
    }
  }
}
