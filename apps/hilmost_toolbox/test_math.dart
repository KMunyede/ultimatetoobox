import 'package:math_expressions/math_expressions.dart';

void main() {
  String input = "5.972e24 + 1.2e-3";
  // replace scientific notation e.g. 5.972e24 to 5.972*10^24
  String clean = input.replaceAllMapped(RegExp(r'(\d+(?:\.\d+)?)e([+-]?\d+)'), (match) {
    return '${match.group(1)}*10^${match.group(2)}';
  });
  print("Cleaned: $clean");
  
  try {
    Parser p = Parser();
    Expression exp = p.parse(clean);
    ContextModel cm = ContextModel();
    double result = exp.evaluate(EvaluationType.REAL, cm);
    print("Result: $result");
  } catch (e) {
    print("Error: $e");
  }
}
