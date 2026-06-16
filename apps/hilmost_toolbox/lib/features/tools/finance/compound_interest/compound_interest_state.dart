import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:math';

enum CompoundFrequency { annually, semiAnnually, quarterly, monthly, daily }

enum ContributionFrequency { none, monthly, annually }

class CompoundState {
  final double principal;
  final double monthlyContribution;
  final double interestRate; // Annual %
  final double years;
  final CompoundFrequency compoundFrequency;
  final ContributionFrequency contributionFrequency;

  CompoundState({
    this.principal = 10000,
    this.monthlyContribution = 500,
    this.interestRate = 7.0,
    this.years = 10,
    this.compoundFrequency = CompoundFrequency.annually,
    this.contributionFrequency = ContributionFrequency.monthly,
  });

  CompoundState copyWith({
    double? principal,
    double? monthlyContribution,
    double? interestRate,
    double? years,
    CompoundFrequency? compoundFrequency,
    ContributionFrequency? contributionFrequency,
  }) {
    return CompoundState(
      principal: principal ?? this.principal,
      monthlyContribution: monthlyContribution ?? this.monthlyContribution,
      interestRate: interestRate ?? this.interestRate,
      years: years ?? this.years,
      compoundFrequency: compoundFrequency ?? this.compoundFrequency,
      contributionFrequency:
          contributionFrequency ?? this.contributionFrequency,
    );
  }

  int get compoundingsPerYear {
    switch (compoundFrequency) {
      case CompoundFrequency.annually:
        return 1;
      case CompoundFrequency.semiAnnually:
        return 2;
      case CompoundFrequency.quarterly:
        return 4;
      case CompoundFrequency.monthly:
        return 12;
      case CompoundFrequency.daily:
        return 365;
    }
  }

  double get futureValue {
    if (principal < 0 || years < 0 || interestRate < 0) return 0;

    final r = interestRate / 100;
    final n = compoundingsPerYear;
    final t = years;

    // Standard formula: A = P(1 + r/n)^(nt)
    double amount = principal * pow(1 + r / n, n * t);

    // Add contributions
    if (contributionFrequency != ContributionFrequency.none &&
        monthlyContribution > 0) {
      // PMT = regular contribution
      final pmt = contributionFrequency == ContributionFrequency.monthly
          ? monthlyContribution
          : (monthlyContribution * 12);
      // Assuming contributions are made at the end of each period, and compounding matches contribution frequency for simplicity.
      // The general formula for future value of an annuity: PMT * (((1 + r/n)^(nt) - 1) / (r/n))

      int pmtsPerYear = contributionFrequency == ContributionFrequency.monthly
          ? 12
          : 1;
      double ratePerPmt = r / pmtsPerYear;

      if (ratePerPmt > 0) {
        double futureValueOfSeries =
            pmt * ((pow(1 + ratePerPmt, pmtsPerYear * t) - 1) / ratePerPmt);
        amount += futureValueOfSeries;
      } else {
        amount += pmt * pmtsPerYear * t;
      }
    }

    return amount;
  }

  double get totalContributions {
    double total = principal;
    if (contributionFrequency == ContributionFrequency.monthly) {
      total += monthlyContribution * 12 * years;
    } else if (contributionFrequency == ContributionFrequency.annually) {
      // we assume the user enters annual contribution in the monthly box if they picked annual. Actually, let's assume the box says "Contribution Amount"
      total += monthlyContribution * years;
    }
    return total;
  }

  double get totalInterestEarned {
    return futureValue - totalContributions;
  }
}

class CompoundController extends Notifier<CompoundState> {
  @override
  CompoundState build() => CompoundState();

  void setPrincipal(double val) => state = state.copyWith(principal: val);
  void setContribution(double val) =>
      state = state.copyWith(monthlyContribution: val);
  void setInterestRate(double val) => state = state.copyWith(interestRate: val);
  void setYears(double val) => state = state.copyWith(years: val);
  void setCompoundFrequency(CompoundFrequency freq) =>
      state = state.copyWith(compoundFrequency: freq);
  void setContributionFrequency(ContributionFrequency freq) =>
      state = state.copyWith(contributionFrequency: freq);

  void reset() {
    state = CompoundState(
      principal: 0,
      monthlyContribution: 0,
      interestRate: 0,
      years: 0,
    );
  }
}

final compoundControllerProvider =
    NotifierProvider<CompoundController, CompoundState>(CompoundController.new);
