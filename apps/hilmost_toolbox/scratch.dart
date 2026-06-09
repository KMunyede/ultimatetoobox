import 'package:math_expressions/math_expressions.dart';

void main() {
  Parser p = Parser();
  ContextModel cm = ContextModel();
  
  void test(String expr) {
    try {
      Expression exp = p.parse(expr);
      print('$expr = ${exp.evaluate(EvaluationType.REAL, cm)}');
    } catch (e) {
      print('$expr: $e');
    }
  }

  test('log10(100)');
}
