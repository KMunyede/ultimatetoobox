import 'package:flutter_riverpod/flutter_riverpod.dart';

class VatState {
  final double baseAmount;
  final double taxRate;
  final bool isAddingTax;

  VatState({
    this.baseAmount = 0.0,
    this.taxRate = 20.0,
    this.isAddingTax = true,
  });

  VatState copyWith({double? baseAmount, double? taxRate, bool? isAddingTax}) {
    return VatState(
      baseAmount: baseAmount ?? this.baseAmount,
      taxRate: taxRate ?? this.taxRate,
      isAddingTax: isAddingTax ?? this.isAddingTax,
    );
  }

  double get netAmount {
    if (isAddingTax) {
      return baseAmount;
    } else {
      final divisor = 1 + (taxRate / 100);
      return divisor == 0 ? 0.0 : baseAmount / divisor;
    }
  }

  double get grossAmount {
    if (isAddingTax) {
      return baseAmount * (1 + (taxRate / 100));
    } else {
      return baseAmount;
    }
  }

  double get taxAmount {
    return grossAmount - netAmount;
  }
}

class VatController extends Notifier<VatState> {
  @override
  VatState build() => VatState();

  void setBaseAmount(double value) {
    state = state.copyWith(baseAmount: value);
  }

  void setTaxRate(double value) {
    state = state.copyWith(taxRate: value);
  }

  void setMode({required bool addTax}) {
    state = state.copyWith(isAddingTax: addTax);
  }

  void reset() {
    state = VatState();
  }
}

final vatControllerProvider = NotifierProvider<VatController, VatState>(
  VatController.new,
);
