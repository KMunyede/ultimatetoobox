import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'currency_service.dart';

class CurrencyState {
  final String fromCode;
  final String toCode;
  final double amount;
  final CurrencyRates? rates;
  final bool isLoading;
  final String? error;

  CurrencyState({
    this.fromCode = 'USD',
    this.toCode = 'EUR',
    this.amount = 1.0,
    this.rates,
    this.isLoading = false,
    this.error,
  });

  CurrencyState copyWith({
    String? fromCode,
    String? toCode,
    double? amount,
    CurrencyRates? rates,
    bool? isLoading,
    String? error,
  }) {
    return CurrencyState(
      fromCode: fromCode ?? this.fromCode,
      toCode: toCode ?? this.toCode,
      amount: amount ?? this.amount,
      rates: rates ?? this.rates,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

final currencyServiceProvider = Provider((ref) => CurrencyService());

class CurrencyController extends Notifier<CurrencyState> {
  @override
  CurrencyState build() {
    Future.microtask(() => _fetchRates('USD'));
    return CurrencyState();
  }

  Future<void> _fetchRates(String base) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final service = ref.read(currencyServiceProvider);
      final rates = await service.fetchRates(base);
      state = state.copyWith(isLoading: false, rates: rates);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  void setFromCode(String code) {
    if (code == state.fromCode) return;
    state = state.copyWith(fromCode: code);
    _fetchRates(code);
  }

  void setToCode(String code) {
    state = state.copyWith(toCode: code);
  }

  void setAmount(double val) {
    state = state.copyWith(amount: val);
  }

  void swap() {
    final oldFrom = state.fromCode;
    final oldTo = state.toCode;
    state = state.copyWith(fromCode: oldTo, toCode: oldFrom);
    _fetchRates(oldTo);
  }

  void reset() {
    state = CurrencyState(
      fromCode: state.fromCode,
      toCode: state.toCode,
      amount: 0.0,
    );
    _fetchRates(state.fromCode);
  }
}

final currencyControllerProvider =
    NotifierProvider<CurrencyController, CurrencyState>(CurrencyController.new);
