import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:math';

enum LoanTermUnit { years, months }

class LoanState {
  final double principal;
  final double interestRate; // Annual %
  final double term;
  final LoanTermUnit termUnit;

  LoanState({
    this.principal = 100000,
    this.interestRate = 5.0,
    this.term = 15,
    this.termUnit = LoanTermUnit.years,
  });

  LoanState copyWith({
    double? principal,
    double? interestRate,
    double? term,
    LoanTermUnit? termUnit,
  }) {
    return LoanState(
      principal: principal ?? this.principal,
      interestRate: interestRate ?? this.interestRate,
      term: term ?? this.term,
      termUnit: termUnit ?? this.termUnit,
    );
  }

  int get totalMonths =>
      termUnit == LoanTermUnit.years ? (term * 12).toInt() : term.toInt();

  double get monthlyInterestRate => (interestRate / 100) / 12;

  double get monthlyEMI {
    if (principal <= 0 || totalMonths <= 0) return 0;
    if (interestRate <= 0) return principal / totalMonths;

    final r = monthlyInterestRate;
    final n = totalMonths;
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    final num = principal * r * pow(1 + r, n);
    final den = pow(1 + r, n) - 1;
    return num / den;
  }

  double get totalPayment => monthlyEMI * totalMonths;
  double get totalInterest => totalPayment - principal;
}

class LoanController extends Notifier<LoanState> {
  @override
  LoanState build() => LoanState();

  void setPrincipal(double val) => state = state.copyWith(principal: val);
  void setInterestRate(double val) => state = state.copyWith(interestRate: val);
  void setTerm(double val) => state = state.copyWith(term: val);
  void setTermUnit(LoanTermUnit unit) => state = state.copyWith(termUnit: unit);

  void reset() {
    state = LoanState(principal: 0, interestRate: 0, term: 0);
  }
}

final loanControllerProvider = NotifierProvider<LoanController, LoanState>(
  LoanController.new,
);
