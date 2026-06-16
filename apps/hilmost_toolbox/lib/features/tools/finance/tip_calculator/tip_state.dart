import 'package:flutter_riverpod/flutter_riverpod.dart';

class TipState {
  final double billAmount;
  final double tipPercentage;
  final int peopleCount;

  TipState({
    this.billAmount = 0.0,
    this.tipPercentage = 15.0,
    this.peopleCount = 1,
  });

  TipState copyWith({
    double? billAmount,
    double? tipPercentage,
    int? peopleCount,
  }) {
    return TipState(
      billAmount: billAmount ?? this.billAmount,
      tipPercentage: tipPercentage ?? this.tipPercentage,
      peopleCount: peopleCount ?? this.peopleCount,
    );
  }

  double get tipAmount => billAmount * (tipPercentage / 100);
  double get totalBill => billAmount + tipAmount;
  double get tipPerPerson => peopleCount > 0 ? tipAmount / peopleCount : 0.0;
  double get totalPerPerson => peopleCount > 0 ? totalBill / peopleCount : 0.0;
}

class TipController extends Notifier<TipState> {
  @override
  TipState build() => TipState();

  void setBillAmount(double value) {
    state = state.copyWith(billAmount: value);
  }

  void setTipPercentage(double value) {
    state = state.copyWith(tipPercentage: value);
  }

  void setPeopleCount(int value) {
    if (value < 1) value = 1;
    state = state.copyWith(peopleCount: value);
  }

  void reset() {
    state = TipState();
  }
}

final tipControllerProvider = NotifierProvider<TipController, TipState>(
  TipController.new,
);
