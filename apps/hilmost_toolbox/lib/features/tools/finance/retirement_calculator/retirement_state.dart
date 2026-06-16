import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:math';

class RetirementState {
  final int currentAge;
  final int retirementAge;
  final double currentPrincipal;
  final double annualContribution;
  final double expectedReturnRate; // percentage
  final double expectedInflationRate; // percentage

  RetirementState({
    this.currentAge = 30,
    this.retirementAge = 65,
    this.currentPrincipal = 10000.0,
    this.annualContribution = 6000.0,
    this.expectedReturnRate = 7.0,
    this.expectedInflationRate = 2.5,
  });

  RetirementState copyWith({
    int? currentAge,
    int? retirementAge,
    double? currentPrincipal,
    double? annualContribution,
    double? expectedReturnRate,
    double? expectedInflationRate,
  }) {
    return RetirementState(
      currentAge: currentAge ?? this.currentAge,
      retirementAge: retirementAge ?? this.retirementAge,
      currentPrincipal: currentPrincipal ?? this.currentPrincipal,
      annualContribution: annualContribution ?? this.annualContribution,
      expectedReturnRate: expectedReturnRate ?? this.expectedReturnRate,
      expectedInflationRate:
          expectedInflationRate ?? this.expectedInflationRate,
    );
  }

  int get yearsToRetirement => max(0, retirementAge - currentAge);

  double get futureValue {
    if (yearsToRetirement == 0) return currentPrincipal;
    final r = expectedReturnRate / 100.0;
    final n = yearsToRetirement.toDouble();

    if (r == 0) {
      return currentPrincipal + (annualContribution * n);
    }

    final fvPrincipal = currentPrincipal * pow(1 + r, n);
    final fvContributions = annualContribution * ((pow(1 + r, n) - 1) / r);
    return fvPrincipal + fvContributions;
  }

  double get purchasingPower {
    if (yearsToRetirement == 0) return currentPrincipal;
    final i = expectedInflationRate / 100.0;
    final n = yearsToRetirement.toDouble();

    // To avoid division by zero or negative infinite scaling if i is exactly -100%
    if (i <= -1.0) return futureValue;

    return futureValue / pow(1 + i, n);
  }
}

class RetirementController extends Notifier<RetirementState> {
  @override
  RetirementState build() => RetirementState();

  void setCurrentAge(int value) => state = state.copyWith(currentAge: value);
  void setRetirementAge(int value) =>
      state = state.copyWith(retirementAge: value);
  void setCurrentPrincipal(double value) =>
      state = state.copyWith(currentPrincipal: value);
  void setAnnualContribution(double value) =>
      state = state.copyWith(annualContribution: value);
  void setExpectedReturnRate(double value) =>
      state = state.copyWith(expectedReturnRate: value);
  void setExpectedInflationRate(double value) =>
      state = state.copyWith(expectedInflationRate: value);

  void reset() {
    state = RetirementState();
  }
}

final retirementControllerProvider =
    NotifierProvider<RetirementController, RetirementState>(
      RetirementController.new,
    );
