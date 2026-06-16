import 'dart:math' as math;
import 'package:math_expressions/math_expressions.dart';
import 'package:fl_chart/fl_chart.dart';

enum PlotMode { standard, polar, parametric }

class GraphRequest {
  final String eq1;
  final String eq2;
  final String eq3;
  final String paramY1;
  final String paramY2;
  final String paramY3;
  final PlotMode mode1;
  final PlotMode mode2;
  final PlotMode mode3;
  final double minX;
  final double maxX;
  final double minY;
  final double maxY;
  final Map<String, double> parameters;
  final bool isRadians;
  final bool showDerivative1;
  final bool showDerivative2;
  final bool showDerivative3;

  GraphRequest({
    required this.eq1,
    required this.eq2,
    required this.eq3,
    required this.paramY1,
    required this.paramY2,
    required this.paramY3,
    required this.mode1,
    required this.mode2,
    required this.mode3,
    required this.minX,
    required this.maxX,
    required this.minY,
    required this.maxY,
    required this.parameters,
    required this.isRadians,
    required this.showDerivative1,
    required this.showDerivative2,
    required this.showDerivative3,
  });
}

class GraphResult {
  final List<FlSpot> spots1;
  final List<FlSpot> spots2;
  final List<FlSpot> spots3;
  final List<FlSpot> derivativeSpots1;
  final List<FlSpot> derivativeSpots2;
  final List<FlSpot> derivativeSpots3;
  final List<FlSpot> rootSpots1;
  final List<FlSpot> rootSpots2;
  final List<FlSpot> rootSpots3;
  final List<FlSpot> extremaSpots1;
  final List<FlSpot> extremaSpots2;
  final List<FlSpot> extremaSpots3;
  final List<FlSpot> intersectionSpots;
  final double? yIntercept1;
  final double? yIntercept2;
  final double? yIntercept3;

  GraphResult({
    required this.spots1,
    required this.spots2,
    required this.spots3,
    required this.derivativeSpots1,
    required this.derivativeSpots2,
    required this.derivativeSpots3,
    required this.rootSpots1,
    required this.rootSpots2,
    required this.rootSpots3,
    required this.extremaSpots1,
    required this.extremaSpots2,
    required this.extremaSpots3,
    required this.intersectionSpots,
    this.yIntercept1,
    this.yIntercept2,
    this.yIntercept3,
  });
}

class GraphEngine {
  static GraphResult computeGraph(GraphRequest request) {
    List<FlSpot> spots1 = _calculateSpots(
      request.eq1,
      request.mode1,
      request.paramY1,
      request,
    );
    List<FlSpot> spots2 = _calculateSpots(
      request.eq2,
      request.mode2,
      request.paramY2,
      request,
    );
    List<FlSpot> spots3 = _calculateSpots(
      request.eq3,
      request.mode3,
      request.paramY3,
      request,
    );

    List<FlSpot> rootSpots1 = _findRoots(spots1);
    List<FlSpot> rootSpots2 = _findRoots(spots2);
    List<FlSpot> rootSpots3 = _findRoots(spots3);

    double? yIntercept1 = _evaluateAt(request.eq1, 0.0, request);
    double? yIntercept2 = _evaluateAt(request.eq2, 0.0, request);
    double? yIntercept3 = _evaluateAt(request.eq3, 0.0, request);

    double rangeY = request.maxY - request.minY;
    double safeMinY = request.minY - rangeY;
    double safeMaxY = request.maxY + rangeY;

    if (yIntercept1 != null &&
        yIntercept1 >= safeMinY &&
        yIntercept1 <= safeMaxY) {
      rootSpots1.add(FlSpot(0.0, yIntercept1));
    }
    if (yIntercept2 != null &&
        yIntercept2 >= safeMinY &&
        yIntercept2 <= safeMaxY) {
      rootSpots2.add(FlSpot(0.0, yIntercept2));
    }
    if (yIntercept3 != null &&
        yIntercept3 >= safeMinY &&
        yIntercept3 <= safeMaxY) {
      rootSpots3.add(FlSpot(0.0, yIntercept3));
    }

    List<FlSpot> dSpots1 = [];
    List<FlSpot> dSpots2 = [];
    List<FlSpot> dSpots3 = [];
    List<FlSpot> extrema1 = [];
    List<FlSpot> extrema2 = [];
    List<FlSpot> extrema3 = [];

    if (request.eq1.isNotEmpty) {
      dSpots1 = _calculateDerivativeSpots(request.eq1, request);
      extrema1 = _findExtrema(dSpots1, request.eq1, request);
    }
    if (request.eq2.isNotEmpty) {
      dSpots2 = _calculateDerivativeSpots(request.eq2, request);
      extrema2 = _findExtrema(dSpots2, request.eq2, request);
    }
    if (request.eq3.isNotEmpty) {
      dSpots3 = _calculateDerivativeSpots(request.eq3, request);
      extrema3 = _findExtrema(dSpots3, request.eq3, request);
    }

    List<FlSpot> intersectionSpots = _calculateIntersections(request);

    return GraphResult(
      spots1: spots1,
      spots2: spots2,
      spots3: spots3,
      derivativeSpots1: request.showDerivative1 ? dSpots1 : [],
      derivativeSpots2: request.showDerivative2 ? dSpots2 : [],
      derivativeSpots3: request.showDerivative3 ? dSpots3 : [],
      rootSpots1: rootSpots1,
      rootSpots2: rootSpots2,
      rootSpots3: rootSpots3,
      extremaSpots1: extrema1,
      extremaSpots2: extrema2,
      extremaSpots3: extrema3,
      intersectionSpots: intersectionSpots,
      yIntercept1: yIntercept1,
      yIntercept2: yIntercept2,
      yIntercept3: yIntercept3,
    );
  }

  static List<FlSpot> _calculateSpots(
    String eq,
    PlotMode mode,
    String paramEq,
    GraphRequest request,
  ) {
    if (eq.isEmpty) return [];
    try {
      final input = _preprocessEquation(eq, request.isRadians);
      Parser p = Parser();
      Expression exp = p.parse(input);
      ContextModel cm = ContextModel();

      Expression? expParam;
      if (mode == PlotMode.parametric && paramEq.isNotEmpty) {
        expParam = p.parse(_preprocessEquation(paramEq, request.isRadians));
      }

      List<FlSpot> newSpots = [];
      double rangeY = request.maxY - request.minY;
      double safeMinY = request.minY - rangeY;
      double safeMaxY = request.maxY + rangeY;

      if (mode == PlotMode.standard) {
        double step = (request.maxX - request.minX) / 500;
        double? lastY;
        for (double x = request.minX; x <= request.maxX; x += step) {
          cm.bindVariable(Variable('x'), Number(x));
          for (var entry in request.parameters.entries) {
            cm.bindVariable(Variable(entry.key), Number(entry.value));
          }
          double y = exp.evaluate(EvaluationType.REAL, cm);
          if (!y.isNaN && !y.isInfinite && y >= safeMinY && y <= safeMaxY) {
            if (lastY != null && (y - lastY).abs() > rangeY * 0.8) {
              newSpots.add(FlSpot.nullSpot);
            }
            newSpots.add(FlSpot(x, y));
            lastY = y;
          } else {
            newSpots.add(FlSpot.nullSpot);
            lastY = null;
          }
        }
      } else if (mode == PlotMode.polar) {
        double step = 6.283185307 / 500;
        double? lastX, lastY;
        for (double theta = 0; theta <= 6.283185307; theta += step) {
          cm.bindVariable(Variable('θ'), Number(theta));
          cm.bindVariable(Variable('theta'), Number(theta));
          for (var entry in request.parameters.entries) {
            cm.bindVariable(Variable(entry.key), Number(entry.value));
          }
          double r = exp.evaluate(EvaluationType.REAL, cm);
          if (!r.isNaN && !r.isInfinite) {
            double x = r * math.cos(theta);
            double y = r * math.sin(theta);
            if (x >= request.minX - rangeY &&
                x <= request.maxX + rangeY &&
                y >= safeMinY &&
                y <= safeMaxY) {
              if (lastX != null &&
                  lastY != null &&
                  ((x - lastX).abs() > rangeY * 0.8 ||
                      (y - lastY).abs() > rangeY * 0.8)) {
                newSpots.add(FlSpot.nullSpot);
              }
              newSpots.add(FlSpot(x, y));
              lastX = x;
              lastY = y;
            } else {
              newSpots.add(FlSpot.nullSpot);
              lastX = null;
              lastY = null;
            }
          } else {
            newSpots.add(FlSpot.nullSpot);
            lastX = null;
            lastY = null;
          }
        }
      } else if (mode == PlotMode.parametric && expParam != null) {
        double step = 6.283185307 / 500;
        double? lastX, lastY;
        for (double t = 0; t <= 6.283185307; t += step) {
          cm.bindVariable(Variable('t'), Number(t));
          for (var entry in request.parameters.entries) {
            cm.bindVariable(Variable(entry.key), Number(entry.value));
          }
          double x = exp.evaluate(EvaluationType.REAL, cm);
          double y = expParam.evaluate(EvaluationType.REAL, cm);
          if (!x.isNaN && !x.isInfinite && !y.isNaN && !y.isInfinite) {
            if (x >= request.minX - rangeY &&
                x <= request.maxX + rangeY &&
                y >= safeMinY &&
                y <= safeMaxY) {
              if (lastX != null &&
                  lastY != null &&
                  ((x - lastX).abs() > rangeY * 0.8 ||
                      (y - lastY).abs() > rangeY * 0.8)) {
                newSpots.add(FlSpot.nullSpot);
              }
              newSpots.add(FlSpot(x, y));
              lastX = x;
              lastY = y;
            } else {
              newSpots.add(FlSpot.nullSpot);
              lastX = null;
              lastY = null;
            }
          } else {
            newSpots.add(FlSpot.nullSpot);
            lastX = null;
            lastY = null;
          }
        }
      }
      return newSpots;
    } catch (_) {
      return [];
    }
  }

  static double? _evaluateAt(String eq, double x, GraphRequest request) {
    if (eq.isEmpty) return null;
    try {
      final input = _preprocessEquation(eq, request.isRadians);
      Parser p = Parser();
      Expression exp = p.parse(input);
      ContextModel cm = ContextModel();
      cm.bindVariable(Variable('x'), Number(x));
      for (var entry in request.parameters.entries) {
        cm.bindVariable(Variable(entry.key), Number(entry.value));
      }
      double y = exp.evaluate(EvaluationType.REAL, cm);
      if (!y.isNaN && !y.isInfinite) return y;
    } catch (_) {}
    return null;
  }

  static List<FlSpot> _calculateDerivativeSpots(
    String eq,
    GraphRequest request,
  ) {
    if (eq.isEmpty) return [];
    double h = 0.001;
    List<FlSpot> newSpots = [];
    double step = (request.maxX - request.minX) / 500;
    double rangeY = request.maxY - request.minY;
    double safeMinY = request.minY - rangeY;
    double safeMaxY = request.maxY + rangeY;
    for (double x = request.minX; x <= request.maxX; x += step) {
      double? y1 = _evaluateAt(eq, x + h, request);
      double? y0 = _evaluateAt(eq, x - h, request);
      if (y1 != null && y0 != null) {
        double dy = (y1 - y0) / (2 * h);
        if (!dy.isNaN && !dy.isInfinite && dy >= safeMinY && dy <= safeMaxY) {
          newSpots.add(FlSpot(x, dy));
        }
      }
    }
    return newSpots;
  }

  static List<FlSpot> _findExtrema(
    List<FlSpot> derivativeSpots,
    String eq,
    GraphRequest request,
  ) {
    List<FlSpot> extrema = [];
    List<FlSpot> roots = _findRoots(derivativeSpots);
    for (var root in roots) {
      double? y = _evaluateAt(eq, root.x, request);
      if (y != null && y >= request.minY && y <= request.maxY) {
        extrema.add(FlSpot(root.x, y));
      }
    }
    return extrema;
  }

  static List<FlSpot> _calculateIntersections(GraphRequest request) {
    List<FlSpot> intersectionSpots = [];
    List<String> eqs = [];
    if (request.eq1.isNotEmpty) eqs.add(request.eq1);
    if (request.eq2.isNotEmpty) eqs.add(request.eq2);
    if (request.eq3.isNotEmpty) eqs.add(request.eq3);

    for (int i = 0; i < eqs.length; i++) {
      for (int j = i + 1; j < eqs.length; j++) {
        String eq1 = eqs[i];
        String eq2 = eqs[j];

        List<FlSpot> diffSpots = [];
        double step = (request.maxX - request.minX) / 200;
        for (double x = request.minX; x <= request.maxX; x += step) {
          double? y1 = _evaluateAt(eq1, x, request);
          double? y2 = _evaluateAt(eq2, x, request);
          if (y1 != null && y2 != null) {
            diffSpots.add(FlSpot(x, y1 - y2));
          }
        }

        List<FlSpot> roots = _findRoots(diffSpots);
        for (var root in roots) {
          double? y = _evaluateAt(eq1, root.x, request);
          if (y != null && y >= request.minY && y <= request.maxY) {
            intersectionSpots.add(FlSpot(root.x, y));
          }
        }
      }
    }
    return intersectionSpots;
  }

  static List<FlSpot> _findRoots(List<FlSpot> spots) {
    List<FlSpot> roots = [];
    for (int i = 1; i < spots.length; i++) {
      final p1 = spots[i - 1];
      final p2 = spots[i];
      if (p1 == FlSpot.nullSpot || p2 == FlSpot.nullSpot) continue;

      if (p1.y == 0) {
        if (i == 1 || spots[i - 2].y != 0) {
          roots.add(p1);
        }
      } else if (p1.y.sign != p2.y.sign && p1.y.isFinite && p2.y.isFinite) {
        double x = p1.x - p1.y * (p2.x - p1.x) / (p2.y - p1.y);
        roots.add(FlSpot(x, 0));
      }
    }
    return roots;
  }

  static String _preprocessEquation(String eq, bool isRadians) {
    String processed = eq
        .replaceAll('π', '3.14159265359')
        .replaceAll('e', '2.71828182846');
    processed = _expandHyperbolic(processed);
    if (!isRadians) {
      processed = _insertDegreeConversion(processed);
    }
    return processed;
  }

  static String _expandHyperbolic(String eq) {
    Map<String, String> funcs = {
      'sinh': '((2.71828182846^(X)) - (2.71828182846^(-(X)))) / 2',
      'cosh': '((2.71828182846^(X)) + (2.71828182846^(-(X)))) / 2',
      'tanh': '((2.71828182846^(2*(X))) - 1) / ((2.71828182846^(2*(X))) + 1)',
      'asinh': 'ln((X)+sqrt((X)^2+1))',
      'acosh': 'ln((X)+sqrt((X)^2-1))',
      'atanh': '0.5*ln((1+(X))/(1-(X)))',
    };
    for (String func in funcs.keys) {
      int searchIdx = 0;
      while (true) {
        int idx = eq.indexOf('$func(', searchIdx);
        if (idx == -1) break;
        int openParen = idx + func.length;
        int closeParen = _findMatchingParen(eq, openParen);
        if (closeParen != -1) {
          String inner = eq.substring(openParen + 1, closeParen);
          String replacement = funcs[func]!.replaceAll('X', '($inner)');
          eq =
              eq.substring(0, idx) + replacement + eq.substring(closeParen + 1);
        } else {
          searchIdx = openParen + 1;
        }
      }
    }
    return eq;
  }

  static String _insertDegreeConversion(String eq) {
    List<String> funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    for (String func in funcs) {
      int searchIdx = 0;
      while (true) {
        int idx = eq.indexOf('$func(', searchIdx);
        if (idx == -1) break;
        int openParen = idx + func.length;
        int closeParen = _findMatchingParen(eq, openParen);
        if (closeParen != -1) {
          if (func.startsWith('a')) {
            eq =
                eq.substring(0, idx) +
                '(${func}_TEMP(' +
                eq.substring(openParen + 1, closeParen) +
                '))*(180/3.14159265359)' +
                eq.substring(closeParen + 1);
          } else {
            eq =
                eq.substring(0, idx) +
                '${func}_TEMP((' +
                eq.substring(openParen + 1, closeParen) +
                ')*(3.14159265359/180))' +
                eq.substring(closeParen + 1);
          }
        } else {
          searchIdx = openParen + 1;
        }
      }
    }
    return eq.replaceAll('_TEMP', '');
  }

  static int _findMatchingParen(String s, int openIdx) {
    int count = 1;
    for (int i = openIdx + 1; i < s.length; i++) {
      if (s[i] == '(')
        count++;
      else if (s[i] == ')')
        count--;
      if (count == 0) return i;
    }
    return -1;
  }
}
