import 'package:flutter/foundation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'graph_state.dart';
import '../../domain/graph_engine.dart';
import 'dart:async';

part 'graph_provider.g.dart';

@riverpod
class GraphNotifier extends _$GraphNotifier {
  Timer? _debounceTimer;

  @override
  GraphState build() {
    return const GraphState();
  }

  void updateEquation(int index, String eq, {String? paramY}) {
    if (index == 1) {
      state = state.copyWith(eq1: eq, paramY1: paramY ?? state.paramY1);
    } else if (index == 2) {
      state = state.copyWith(eq2: eq, paramY2: paramY ?? state.paramY2);
    } else if (index == 3) {
      state = state.copyWith(eq3: eq, paramY3: paramY ?? state.paramY3);
    }
    _debouncedPlot();
  }

  void updateMode(int index, PlotMode mode) {
    if (index == 1) {
      state = state.copyWith(mode1: mode);
    } else if (index == 2) {
      state = state.copyWith(mode2: mode);
    } else if (index == 3) {
      state = state.copyWith(mode3: mode);
    }
    _debouncedPlot();
  }

  void updateRelation(int index, String relation) {
    if (index == 1) {
      state = state.copyWith(relation1: relation);
    } else if (index == 2) {
      state = state.copyWith(relation2: relation);
    } else if (index == 3) {
      state = state.copyWith(relation3: relation);
    }
  }

  void updateDerivative(int index, bool show) {
    if (index == 1) {
      state = state.copyWith(showDerivative1: show);
    } else if (index == 2) {
      state = state.copyWith(showDerivative2: show);
    } else if (index == 3) {
      state = state.copyWith(showDerivative3: show);
    }
    _debouncedPlot();
  }

  void updateBounds({
    required double minX,
    required double maxX,
    required double minY,
    required double maxY,
  }) {
    state = state.copyWith(minX: minX, maxX: maxX, minY: minY, maxY: maxY);
    _debouncedPlot();
  }

  void updateParameter(String key, double value) {
    final newParams = Map<String, double>.from(state.parameters);
    newParams[key] = value;
    state = state.copyWith(parameters: newParams);
    _debouncedPlot();
  }

  void toggleRadians() {
    state = state.copyWith(isRadians: !state.isRadians);
    _debouncedPlot();
  }

  void setVisibleEquations(int count) {
    state = state.copyWith(visibleEquations: count);
  }

  void _debouncedPlot() {
    _debounceTimer?.cancel();
    _debounceTimer = Timer(const Duration(milliseconds: 300), () {
      _plot();
    });
  }

  Future<void> _plot() async {
    state = state.copyWith(isLoading: true);

    // Update parameters map first to match extracted variables
    Set<String> allVars = {};
    allVars.addAll(_extractVariables(state.eq1));
    allVars.addAll(_extractVariables(state.eq2));
    allVars.addAll(_extractVariables(state.eq3));
    allVars.addAll(_extractVariables(state.paramY1));
    allVars.addAll(_extractVariables(state.paramY2));
    allVars.addAll(_extractVariables(state.paramY3));

    final newParams = Map<String, double>.from(state.parameters);
    for (String v in allVars) {
      newParams.putIfAbsent(v, () => 1.0);
    }
    newParams.removeWhere((key, value) => !allVars.contains(key));

    state = state.copyWith(parameters: newParams);

    final request = GraphRequest(
      eq1: state.eq1,
      eq2: state.eq2,
      eq3: state.eq3,
      paramY1: state.paramY1,
      paramY2: state.paramY2,
      paramY3: state.paramY3,
      mode1: state.mode1,
      mode2: state.mode2,
      mode3: state.mode3,
      minX: state.minX,
      maxX: state.maxX,
      minY: state.minY,
      maxY: state.maxY,
      parameters: newParams,
      isRadians: state.isRadians,
      showDerivative1: state.showDerivative1,
      showDerivative2: state.showDerivative2,
      showDerivative3: state.showDerivative3,
    );

    // Compute in background isolate
    final result = await compute(GraphEngine.computeGraph, request);

    state = state.copyWith(
      isLoading: false,
      result: result,
      hasError1: false, // You could add validation logic here if needed
      hasError2: false,
      hasError3: false,
    );
  }

  Set<String> _extractVariables(String eq) {
    if (eq.isEmpty) return {};
    String pEq = eq.replaceAll(
      RegExp(
        r'(sin|cos|tan|asin|acos|atan|sinh|cosh|tanh|log|ln|sqrt|abs|sgn)',
      ),
      '',
    );
    Set<String> vars = {};
    for (var match in RegExp(r'[a-zA-Z]+').allMatches(pEq)) {
      String word = match.group(0)!;
      if (word != 'x' &&
          word != 'e' &&
          word != 'pi' &&
          word != 't' &&
          word != 'theta') {
        vars.add(word);
      }
    }
    return vars;
  }
}
