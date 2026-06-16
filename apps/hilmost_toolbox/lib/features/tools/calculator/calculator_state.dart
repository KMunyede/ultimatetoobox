// ignore_for_file: deprecated_member_use
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:math_expressions/math_expressions.dart';
import '../../../shared/utils/number_formatter.dart';

enum CalculatorMode {
  standard,
  scientific,
  astroPhysics,
  scienceEquation,
}

class CalculatorState {
  final CalculatorMode mode;
  final String expression;
  final String result;
  final double memory;
  final List<String> history;
  final bool isRadians;
  final bool justEvaluated;
  final String? activeKey;

  const CalculatorState({
    this.mode = CalculatorMode.standard,
    this.expression = '',
    this.result = '0',
    this.memory = 0.0,
    this.history = const [],
    this.isRadians = true,
    this.justEvaluated = false,
    this.activeKey,
  });

  CalculatorState copyWith({
    CalculatorMode? mode,
    String? expression,
    String? result,
    double? memory,
    List<String>? history,
    bool? isRadians,
    bool? justEvaluated,
    String? activeKey,
  }) {
    return CalculatorState(
      mode: mode ?? this.mode,
      expression: expression ?? this.expression,
      result: result ?? this.result,
      memory: memory ?? this.memory,
      history: history ?? this.history,
      isRadians: isRadians ?? this.isRadians,
      justEvaluated: justEvaluated ?? this.justEvaluated,
      activeKey: activeKey ?? this.activeKey,
    );
  }
}

class CalculatorController extends Notifier<CalculatorState> {
  @override
  CalculatorState build() => const CalculatorState();

  void setMode(CalculatorMode mode) {
    state = state.copyWith(
      mode: mode,
      expression: '',
      result: '0',
      justEvaluated: false,
    );
  }

  void setActiveKey(String? key) {
    state = state.copyWith(activeKey: key);
  }

  void append(String val) {
    final bool isOperator = ['+', '−', '×', '÷', '*', '/'].contains(val);

    if (state.justEvaluated) {
      if (isOperator) {
        // Continue expression using previous result
        state = state.copyWith(
          expression: state.result + val,
          result: '0',
          justEvaluated: false,
        );
      } else {
        // Start a completely new expression
        state = state.copyWith(
          expression: val,
          result: '0',
          justEvaluated: false,
        );
      }
    } else {
      state = state.copyWith(expression: state.expression + val);
    }
    _evaluate();
  }

  void clear() {
    state = state.copyWith(expression: '', result: '0', justEvaluated: false);
  }

  void clearHistory() {
    state = state.copyWith(history: const []);
  }

  void clearEntry() {
    if (state.justEvaluated) {
      clear();
      return;
    }
    // Remove the last contiguous sequence of digits/decimals
    final match = RegExp(r'([\d.]+)$').firstMatch(state.expression);
    if (match != null) {
      state = state.copyWith(
        expression: state.expression.substring(
          0,
          state.expression.length - match.group(0)!.length,
        ),
      );
    } else {
      // If it ends in an operator or is empty, maybe just clear it all
      state = state.copyWith(expression: '');
    }
    _evaluate();
  }

  void backspace() {
    if (state.justEvaluated) {
      clear();
      return;
    }
    if (state.expression.isNotEmpty) {
      state = state.copyWith(
        expression: state.expression.substring(0, state.expression.length - 1),
      );
      _evaluate();
    }
  }

  void appendFunction(String funcPrefix) {
    if (state.justEvaluated) {
      state = state.copyWith(
        expression: '$funcPrefix${state.result})',
        result: '0',
        justEvaluated: false,
      );
      _evaluate();
      evaluateFinal();
    } else {
      final expr = state.expression;
      final match = RegExp(r'([\d.]+)$').firstMatch(expr);
      if (match != null) {
        final numStr = match.group(1)!;
        final prefix = expr.substring(0, expr.length - numStr.length);
        state = state.copyWith(expression: '$prefix$funcPrefix$numStr)');
      } else {
        state = state.copyWith(expression: '${state.expression}$funcPrefix');
      }
      _evaluate();
    }
  }

  void appendSuffix(String suffix) {
    if (state.justEvaluated) {
      state = state.copyWith(
        expression: '(${state.result})$suffix',
        result: '0',
        justEvaluated: false,
      );
      _evaluate();
      evaluateFinal();
    } else {
      final expr = state.expression;
      final match = RegExp(r'([\d.]+)$').firstMatch(expr);
      if (match != null) {
        final numStr = match.group(1)!;
        final prefix = expr.substring(0, expr.length - numStr.length);
        state = state.copyWith(expression: '$prefix$numStr$suffix');
      } else if (expr.endsWith(')')) {
        state = state.copyWith(expression: '${state.expression}$suffix');
      }
      _evaluate();
    }
  }

  void _evaluate() {
    if (state.expression.isEmpty) {
      state = state.copyWith(result: '0');
      return;
    }
    try {
      String expStr = state.expression
          .replaceAll('×', '*')
          .replaceAll('÷', '/')
          .replaceAll('−', '-')
          .replaceAll('√(', 'sqrt(')
          .replaceAll('√', 'sqrt');

      if (state.mode != CalculatorMode.standard) {
        // Summation pre-parsing: \sum_{x=1}^{10}(x)
        final sumRegex = RegExp(
          r'\\sum_\{([a-zA-Z])=([0-9]+)\}\^\{([0-9]+)\}\(([^)]+)\)',
        );
        if (sumRegex.hasMatch(expStr)) {
          expStr = expStr.replaceAllMapped(sumRegex, (match) {
            try {
              String varName = match.group(1)!;
              int start = int.parse(match.group(2)!);
              int end = int.parse(match.group(3)!);
              String subExpStr = match.group(4)!;

              Parser subP = Parser();
              Expression subExp = subP.parse(subExpStr);
              double sum = 0;

              for (int i = start; i <= end; i++) {
                ContextModel subCm = ContextModel();
                subCm.bindVariable(Variable(varName), Number(i.toDouble()));
                // Also bind pi and e just in case
                subCm.bindVariable(Variable('π'), Number(3.14159265359));
                subCm.bindVariable(Variable('e'), Number(2.71828182846));
                sum += subExp.evaluate(EvaluationType.REAL, subCm);
              }
              return NumberFormatter.format(sum);
            } catch (e) {
              return '0'; // Silently fail for partial/invalid summations during typing
            }
          });
        }

        // LaTeX strips for math_expressions fallback
        expStr = expStr
            .replaceAll('\\sinh(', 'sinh(')
            .replaceAll('\\cosh(', 'cosh(')
            .replaceAll('\\tanh(', 'tanh(')
            .replaceAll('\\sin(', 'sin(')
            .replaceAll('\\cos(', 'cos(')
            .replaceAll('\\tan(', 'tan(')
            .replaceAll('\\asin(', 'arcsin(')
            .replaceAll('\\acos(', 'arccos(')
            .replaceAll('\\atan(', 'arctan(')
            .replaceAll('\\ln(', 'ln(')
            .replaceAll('\\pi', '3.14159265359')
            .replaceAll('π', '3.14159265359')
            .replaceAll('e', '2.71828182846');

        // Handle \log(x) -> log(10, x) if closed
        expStr = expStr.replaceAllMapped(RegExp(r'\\log\(([^)]+)\)'), (match) {
          return 'log(10, ${match.group(1)})';
        });
        // Fallback for unclosed \log(
        expStr = expStr.replaceAll('\\log(', 'log(10, ');
      }

      // Factorial logic for digits
      expStr = expStr.replaceAllMapped(RegExp(r'(\d+)!'), (match) {
        int val = int.parse(match.group(1)!);
        if (val > 100) return '0'; // prevent massive lag
        double fact = 1;
        for (int i = 1; i <= val; i++) {
          fact *= i;
        }
        return fact.toString();
      });

      // Degree conversion for standard trig (only if not Radians)
      if (!state.isRadians) {
        expStr = expStr
            .replaceAll('sin(', 'sin((3.14159265359/180)*')
            .replaceAll('cos(', 'cos((3.14159265359/180)*')
            .replaceAll('tan(', 'tan((3.14159265359/180)*');
      }

      if (state.mode == CalculatorMode.standard) {
        // Standard mode fallback
        Parser p = Parser();
        Expression exp = p.parse(expStr);
        ContextModel cm = ContextModel();
        double eval = exp.evaluate(EvaluationType.REAL, cm);
        state = state.copyWith(result: NumberFormatter.format(eval));
      } else {
        Parser p = Parser();
        Expression exp = p.parse(expStr);
        ContextModel cm = ContextModel();
        cm.bindVariable(Variable('π'), Number(3.14159265359));
        cm.bindVariable(Variable('e'), Number(2.71828182846));

        double eval = exp.evaluate(EvaluationType.REAL, cm);
        state = state.copyWith(result: NumberFormatter.format(eval));
      }
    } catch (e) {
      // Ignored for partial expressions
    }
  }

  void evaluateFinal() {
    _evaluate();
    if (state.result.isNotEmpty &&
        state.expression != state.result &&
        state.expression.isNotEmpty) {
      List<String> newHistory = List.from(state.history)
        ..insert(0, '${state.expression} = ${state.result}');
      // Keep expression intact, result intact, mark justEvaluated
      state = state.copyWith(history: newHistory, justEvaluated: true);
    } else {
      state = state.copyWith(justEvaluated: true);
    }
  }

  void memoryAdd() {
    double currentVal =
        double.tryParse(state.result.replaceAll(',', '')) ?? 0.0;
    if (state.result.isEmpty)
      currentVal = double.tryParse(state.expression.replaceAll(',', '')) ?? 0.0;
    state = state.copyWith(memory: state.memory + currentVal);
  }

  void memorySubtract() {
    double currentVal =
        double.tryParse(state.result.replaceAll(',', '')) ?? 0.0;
    if (state.result.isEmpty)
      currentVal = double.tryParse(state.expression.replaceAll(',', '')) ?? 0.0;
    state = state.copyWith(memory: state.memory - currentVal);
  }

  void memoryRecall() {
    String memStr = NumberFormatter.format(state.memory);
    if (state.justEvaluated) {
      state = state.copyWith(
        expression: memStr,
        result: '0',
        justEvaluated: false,
      );
    } else {
      // Insert a multiply if expression ends with digit/bracket
      if (state.expression.isNotEmpty) {
        final lastChar = state.expression.substring(
          state.expression.length - 1,
        );
        if (RegExp(r'[\d\)]').hasMatch(lastChar)) {
          memStr = '×$memStr';
        }
      }
      state = state.copyWith(expression: state.expression + memStr);
    }
    _evaluate();
  }

  void memoryClear() {
    state = state.copyWith(memory: 0.0);
  }

  void applyPercentage() {
    if (state.expression.isEmpty || state.justEvaluated) {
      double currentVal =
          double.tryParse(state.result.replaceAll(',', '')) ?? 0.0;
      if (currentVal == 0 && state.expression.isNotEmpty) {
        currentVal =
            double.tryParse(state.expression.replaceAll(',', '')) ?? 0.0;
      }
      String newStr = NumberFormatter.format(currentVal / 100);
      state = state.copyWith(
        result: newStr,
        expression: newStr,
        justEvaluated: true,
      );
      return;
    }

    // Context-sensitive percentage
    // Find the last operand
    final match = RegExp(r'([\d.]+)$').firstMatch(state.expression);
    if (match != null) {
      final lastOperandStr = match.group(1)!;
      final lastOperand = double.tryParse(lastOperandStr) ?? 0.0;

      // Get the expression before the last operand to evaluate it
      final prefixStr = state.expression.substring(
        0,
        state.expression.length - lastOperandStr.length,
      );

      // Evaluate prefix if it ends with an operator (e.g. "50 + ")
      if (prefixStr.trim().isNotEmpty &&
          RegExp(r'[+−×÷*/]$').hasMatch(prefixStr.trim())) {
        // Create a temporary state to evaluate prefix
        String cleanPrefix = prefixStr.trim();
        cleanPrefix = cleanPrefix.substring(
          0,
          cleanPrefix.length - 1,
        ); // remove trailing operator

        double prefixResult = 0;
        if (cleanPrefix.isNotEmpty) {
          try {
            String expStr = cleanPrefix
                .replaceAll('×', '*')
                .replaceAll('÷', '/')
                .replaceAll('−', '-');
            Parser p = Parser();
            Expression exp = p.parse(expStr);
            prefixResult = exp.evaluate(EvaluationType.REAL, ContextModel());
          } catch (e) {
            // Ignore
          }
        }

        // e.g. 50 + 10% -> prefixResult is 50, so 10% is 10/100 * 50 = 5
        double percentageValue = (lastOperand / 100) * prefixResult;
        state = state.copyWith(
          expression: prefixStr + NumberFormatter.format(percentageValue),
        );
      } else {
        // Just divide by 100 if there's no prefix (e.g. just "50%")
        state = state.copyWith(
          expression: prefixStr + NumberFormatter.format(lastOperand / 100),
        );
      }
    }
    _evaluate();
  }

  void toggleSign() {
    if (state.justEvaluated) {
      if (state.result.startsWith('-')) {
        state = state.copyWith(
          expression: state.result.substring(1),
          result: '0',
          justEvaluated: false,
        );
      } else if (state.result != '0') {
        state = state.copyWith(
          expression: '-${state.result}',
          result: '0',
          justEvaluated: false,
        );
      }
      _evaluate();
      return;
    }

    // Toggle only the last operand
    final match = RegExp(r'(-?[\d.]+)$').firstMatch(state.expression);
    if (match != null) {
      final lastOperand = match.group(1)!;
      final prefix = state.expression.substring(
        0,
        state.expression.length - lastOperand.length,
      );
      if (lastOperand.startsWith('-')) {
        state = state.copyWith(expression: prefix + lastOperand.substring(1));
      } else {
        state = state.copyWith(expression: '$prefix-$lastOperand');
      }
    } else {
      // If it ends with an operator, just append a minus sign
      if (state.expression.isEmpty ||
          RegExp(r'[+−×÷*/]$').hasMatch(state.expression.trim())) {
        state = state.copyWith(expression: '${state.expression}-');
      }
    }
    _evaluate();
  }

  void toggleAngleMode() {
    state = state.copyWith(isRadians: !state.isRadians);
    _evaluate();
  }
}

final calculatorControllerProvider =
    NotifierProvider<CalculatorController, CalculatorState>(
      CalculatorController.new,
    );
