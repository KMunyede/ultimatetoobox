import 'package:flutter_riverpod/flutter_riverpod.dart';

class TaxBracket {
  final double minIncome;
  final double? maxIncome;
  final double rate;

  TaxBracket({required this.minIncome, this.maxIncome, required this.rate});

  TaxBracket copyWith({
    double? minIncome,
    double? maxIncome,
    bool clearMaxIncome = false,
    double? rate,
  }) {
    return TaxBracket(
      minIncome: minIncome ?? this.minIncome,
      maxIncome: clearMaxIncome ? null : (maxIncome ?? this.maxIncome),
      rate: rate ?? this.rate,
    );
  }
}

class IncomeTaxState {
  final double grossAnnualIncome;
  final double preTaxDeductions;
  final List<TaxBracket> brackets;

  IncomeTaxState({
    this.grossAnnualIncome = 60000.0,
    this.preTaxDeductions = 0.0,
    this.brackets = const [],
  });

  IncomeTaxState copyWith({
    double? grossAnnualIncome,
    double? preTaxDeductions,
    List<TaxBracket>? brackets,
  }) {
    return IncomeTaxState(
      grossAnnualIncome: grossAnnualIncome ?? this.grossAnnualIncome,
      preTaxDeductions: preTaxDeductions ?? this.preTaxDeductions,
      brackets: brackets ?? this.brackets,
    );
  }

  double get taxableIncome {
    final t = grossAnnualIncome - preTaxDeductions;
    return t < 0 ? 0.0 : t;
  }

  double get totalTaxPaid {
    if (brackets.isEmpty) return 0.0;

    double tax = 0.0;
    double incomeToTax = taxableIncome;

    for (final bracket in brackets) {
      if (incomeToTax <= bracket.minIncome) continue;

      double taxableInThisBracket = 0.0;
      if (bracket.maxIncome == null) {
        taxableInThisBracket = incomeToTax - bracket.minIncome;
      } else {
        final upperLimit = bracket.maxIncome! < incomeToTax
            ? bracket.maxIncome!
            : incomeToTax;
        taxableInThisBracket = upperLimit - bracket.minIncome;
      }

      if (taxableInThisBracket > 0) {
        tax += taxableInThisBracket * (bracket.rate / 100.0);
      }
    }
    return tax;
  }

  double get effectiveTaxRate {
    if (grossAnnualIncome == 0) return 0.0;
    return (totalTaxPaid / grossAnnualIncome) * 100.0;
  }

  double get netAnnualIncome => grossAnnualIncome - totalTaxPaid;
  double get netMonthlyIncome => netAnnualIncome / 12.0;
}

class IncomeTaxController extends Notifier<IncomeTaxState> {
  @override
  IncomeTaxState build() {
    return IncomeTaxState(
      brackets: [
        TaxBracket(minIncome: 0, maxIncome: 11600, rate: 10),
        TaxBracket(minIncome: 11600, maxIncome: 47150, rate: 12),
        TaxBracket(minIncome: 47150, maxIncome: 100525, rate: 22),
        TaxBracket(minIncome: 100525, maxIncome: 191950, rate: 24),
        TaxBracket(minIncome: 191950, maxIncome: 243725, rate: 32),
        TaxBracket(minIncome: 243725, maxIncome: 609350, rate: 35),
        TaxBracket(minIncome: 609350, maxIncome: null, rate: 37),
      ],
    );
  }

  void setGrossIncome(double value) =>
      state = state.copyWith(grossAnnualIncome: value);
  void setDeductions(double value) =>
      state = state.copyWith(preTaxDeductions: value);

  void addBracket() {
    final currentBrackets = List<TaxBracket>.from(state.brackets);
    double lastMax = 0.0;
    if (currentBrackets.isNotEmpty) {
      final lastBracket = currentBrackets.last;
      lastMax = lastBracket.maxIncome ?? lastBracket.minIncome + 50000;
      currentBrackets[currentBrackets.length - 1] = lastBracket.copyWith(
        maxIncome: lastMax,
      );
    }
    currentBrackets.add(TaxBracket(minIncome: lastMax, rate: 0.0));
    state = state.copyWith(brackets: currentBrackets);
  }

  void removeBracket(int index) {
    if (index >= 0 && index < state.brackets.length) {
      final currentBrackets = List<TaxBracket>.from(state.brackets);
      currentBrackets.removeAt(index);

      // Fix bounds of previous bracket if we removed the last one
      if (index == currentBrackets.length && currentBrackets.isNotEmpty) {
        currentBrackets[currentBrackets.length - 1] = currentBrackets.last
            .copyWith(clearMaxIncome: true);
      }

      state = state.copyWith(brackets: currentBrackets);
    }
  }

  void updateBracketRate(int index, double rate) {
    final currentBrackets = List<TaxBracket>.from(state.brackets);
    currentBrackets[index] = currentBrackets[index].copyWith(rate: rate);
    state = state.copyWith(brackets: currentBrackets);
  }

  void updateBracketMax(int index, double? maxInc) {
    final currentBrackets = List<TaxBracket>.from(state.brackets);
    currentBrackets[index] = currentBrackets[index].copyWith(
      maxIncome: maxInc,
      clearMaxIncome: maxInc == null,
    );
    // Update next bracket's minIncome
    if (index + 1 < currentBrackets.length && maxInc != null) {
      currentBrackets[index + 1] = currentBrackets[index + 1].copyWith(
        minIncome: maxInc,
      );
    }
    state = state.copyWith(brackets: currentBrackets);
  }

  void reset() {
    state = build();
  }
}

final incomeTaxControllerProvider =
    NotifierProvider<IncomeTaxController, IncomeTaxState>(
      IncomeTaxController.new,
    );
