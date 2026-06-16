import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'physics_data.dart';

class PhysicsState {
  final PhysicsFormula formula;
  final Map<String, double> inputs;
  final double? result;

  PhysicsState({required this.formula, required this.inputs, this.result});

  PhysicsState copyWith({
    PhysicsFormula? formula,
    Map<String, double>? inputs,
    double? result,
    bool clearResult = false,
  }) {
    return PhysicsState(
      formula: formula ?? this.formula,
      inputs: inputs ?? this.inputs,
      result: clearResult ? null : (result ?? this.result),
    );
  }
}

class PhysicsController extends Notifier<PhysicsState> {
  @override
  PhysicsState build() {
    return PhysicsState(formula: physicsFormulas.first, inputs: {});
  }

  void setFormula(PhysicsFormula f) {
    state = PhysicsState(formula: f, inputs: {});
  }

  void setInput(String variable, double? value) {
    final newInputs = Map<String, double>.from(state.inputs);
    if (value == null) {
      newInputs.remove(variable);
    } else {
      newInputs[variable] = value;
    }

    double? res;
    if (newInputs.length == state.formula.variables.length) {
      res = state.formula.calculate(newInputs);
    }

    state = state.copyWith(
      inputs: newInputs,
      result: res,
      clearResult: res == null,
    );
  }
}

final physicsControllerProvider =
    NotifierProvider<PhysicsController, PhysicsState>(PhysicsController.new);
