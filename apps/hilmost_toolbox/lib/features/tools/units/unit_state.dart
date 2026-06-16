import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'unit_data.dart';

class UnitState {
  final UnitCategory category;
  final String fromUnit;
  final String toUnit;
  final double fromValue;
  final double toValue;

  const UnitState({
    required this.category,
    required this.fromUnit,
    required this.toUnit,
    required this.fromValue,
    required this.toValue,
  });

  UnitState copyWith({
    UnitCategory? category,
    String? fromUnit,
    String? toUnit,
    double? fromValue,
    double? toValue,
  }) {
    return UnitState(
      category: category ?? this.category,
      fromUnit: fromUnit ?? this.fromUnit,
      toUnit: toUnit ?? this.toUnit,
      fromValue: fromValue ?? this.fromValue,
      toValue: toValue ?? this.toValue,
    );
  }
}

class UnitController extends Notifier<UnitState> {
  @override
  UnitState build() {
    final defaultCat = unitCategories.first;
    final units = defaultCat.units.keys.toList();
    return UnitState(
      category: defaultCat,
      fromUnit: units[0],
      toUnit: units[1],
      fromValue: 1.0,
      toValue: _convert(
        1.0,
        defaultCat.units[units[0]]!,
        defaultCat.units[units[1]]!,
      ),
    );
  }

  double _convert(double val, UnitDef from, UnitDef to) {
    final baseVal = (val * from.scale) + from.offset;
    return (baseVal - to.offset) / to.scale;
  }

  void setCategory(UnitCategory category) {
    if (state.category != category) {
      final units = category.units.keys.toList();
      state = state.copyWith(
        category: category,
        fromUnit: units[0],
        toUnit: units[1],
        fromValue: 0.0,
        toValue: 0.0,
      );
    }
  }

  void setFromUnit(String unit) {
    final toVal = _convert(
      state.fromValue,
      state.category.units[unit]!,
      state.category.units[state.toUnit]!,
    );
    state = state.copyWith(fromUnit: unit, toValue: toVal);
  }

  void setToUnit(String unit) {
    final toVal = _convert(
      state.fromValue,
      state.category.units[state.fromUnit]!,
      state.category.units[unit]!,
    );
    state = state.copyWith(toUnit: unit, toValue: toVal);
  }

  void setFromValue(double val) {
    final toVal = _convert(
      val,
      state.category.units[state.fromUnit]!,
      state.category.units[state.toUnit]!,
    );
    state = state.copyWith(fromValue: val, toValue: toVal);
  }

  void setToValue(double val) {
    final fromVal = _convert(
      val,
      state.category.units[state.toUnit]!,
      state.category.units[state.fromUnit]!,
    );
    state = state.copyWith(fromValue: fromVal, toValue: val);
  }

  void swap() {
    final oldFrom = state.fromUnit;
    final oldTo = state.toUnit;
    state = state.copyWith(fromUnit: oldTo, toUnit: oldFrom);
    setFromValue(state.fromValue);
  }
}

final unitControllerProvider = NotifierProvider<UnitController, UnitState>(
  UnitController.new,
);
