import 'package:flutter_riverpod/flutter_riverpod.dart';

enum PayPeriod { hourly, daily, weekly, monthly, annual }

class SalaryState {
  final double inputAmount;
  final PayPeriod inputPeriod;
  final double hoursPerWeek;
  final int daysPerWeek;

  SalaryState({
    this.inputAmount = 0.0,
    this.inputPeriod = PayPeriod.annual,
    this.hoursPerWeek = 40.0,
    this.daysPerWeek = 5,
  });

  SalaryState copyWith({
    double? inputAmount,
    PayPeriod? inputPeriod,
    double? hoursPerWeek,
    int? daysPerWeek,
  }) {
    return SalaryState(
      inputAmount: inputAmount ?? this.inputAmount,
      inputPeriod: inputPeriod ?? this.inputPeriod,
      hoursPerWeek: hoursPerWeek ?? this.hoursPerWeek,
      daysPerWeek: daysPerWeek ?? this.daysPerWeek,
    );
  }

  double get annual {
    switch (inputPeriod) {
      case PayPeriod.hourly:
        return inputAmount * hoursPerWeek * 52;
      case PayPeriod.daily:
        return inputAmount * daysPerWeek * 52;
      case PayPeriod.weekly:
        return inputAmount * 52;
      case PayPeriod.monthly:
        return inputAmount * 12;
      case PayPeriod.annual:
        return inputAmount;
    }
  }

  double get monthly => annual / 12;
  double get weekly => annual / 52;
  double get daily => daysPerWeek > 0 ? weekly / daysPerWeek : 0.0;
  double get hourly => hoursPerWeek > 0 ? weekly / hoursPerWeek : 0.0;
}

class SalaryController extends Notifier<SalaryState> {
  @override
  SalaryState build() => SalaryState();

  void setInputAmount(double value) {
    state = state.copyWith(inputAmount: value);
  }

  void setInputPeriod(PayPeriod period) {
    state = state.copyWith(inputPeriod: period);
  }

  void setHoursPerWeek(double value) {
    state = state.copyWith(hoursPerWeek: value);
  }

  void setDaysPerWeek(int value) {
    state = state.copyWith(daysPerWeek: value);
  }

  void reset() {
    state = SalaryState();
  }
}

final salaryControllerProvider =
    NotifierProvider<SalaryController, SalaryState>(SalaryController.new);
