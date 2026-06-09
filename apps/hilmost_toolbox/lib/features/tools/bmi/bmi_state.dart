import 'package:flutter_riverpod/flutter_riverpod.dart';

enum BmiUnit { metric, imperial }

class BmiState {
  final BmiUnit unit;
  final double heightCm;
  final double weightKg;
  final double heightFeet;
  final double heightInches;
  final double weightLbs;

  const BmiState({
    this.unit = BmiUnit.metric,
    this.heightCm = 170.0,
    this.weightKg = 70.0,
    this.heightFeet = 5.0,
    this.heightInches = 7.0,
    this.weightLbs = 150.0,
  });

  BmiState copyWith({
    BmiUnit? unit,
    double? heightCm,
    double? weightKg,
    double? heightFeet,
    double? heightInches,
    double? weightLbs,
  }) {
    return BmiState(
      unit: unit ?? this.unit,
      heightCm: heightCm ?? this.heightCm,
      weightKg: weightKg ?? this.weightKg,
      heightFeet: heightFeet ?? this.heightFeet,
      heightInches: heightInches ?? this.heightInches,
      weightLbs: weightLbs ?? this.weightLbs,
    );
  }
}

class BmiController extends Notifier<BmiState> {
  @override
  BmiState build() => const BmiState();

  void setUnit(BmiUnit unit) => state = state.copyWith(unit: unit);
  void setMetricHeight(double cm) => state = state.copyWith(heightCm: cm);
  void setMetricWeight(double kg) => state = state.copyWith(weightKg: kg);
  void setImperialHeight(double feet, double inches) => state = state.copyWith(heightFeet: feet, heightInches: inches);
  void setImperialWeight(double lbs) => state = state.copyWith(weightLbs: lbs);
}

final bmiControllerProvider = NotifierProvider<BmiController, BmiState>(BmiController.new);
