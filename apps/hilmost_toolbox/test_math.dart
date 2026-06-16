import 'package:math_expressions/math_expressions.dart'; void main() { try { print(Parser().parse('sinh(x)')); } catch (e) { print(e); } }
