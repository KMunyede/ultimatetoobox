import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../currency/currency_state.dart';
import 'loan_calculator/loan_calculator_state.dart';
import 'compound_interest/compound_interest_state.dart';
import 'vat_calculator/vat_state.dart';
import 'salary_converter/salary_state.dart';
import 'tip_calculator/tip_state.dart';
import 'retirement_calculator/retirement_state.dart';
import 'income_tax_calculator/income_tax_state.dart';

enum FinanceMode {
  currency,
  loan,
  compound,
  vat,
  salary,
  tip,
  retirement,
  incomeTax,
}

class FinanceState {
  final FinanceMode mode;
  FinanceState({this.mode = FinanceMode.currency});
}

class FinanceController extends Notifier<FinanceState> {
  @override
  FinanceState build() => FinanceState();

  void setMode(FinanceMode mode) {
    if (state.mode != mode) {
      ref.read(currencyControllerProvider.notifier).reset();
      ref.read(loanControllerProvider.notifier).reset();
      ref.read(compoundControllerProvider.notifier).reset();
      ref.read(vatControllerProvider.notifier).reset();
      ref.read(salaryControllerProvider.notifier).reset();
      ref.read(tipControllerProvider.notifier).reset();
      ref.read(retirementControllerProvider.notifier).reset();
      ref.read(incomeTaxControllerProvider.notifier).reset();
      state = FinanceState(mode: mode);
    }
  }
}

final financeControllerProvider =
    NotifierProvider<FinanceController, FinanceState>(FinanceController.new);
