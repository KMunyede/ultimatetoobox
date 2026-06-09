import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:math_expressions/math_expressions.dart' hide Stack;

class GraphPlotter extends StatefulWidget {
  const GraphPlotter({super.key});

  @override
  State<GraphPlotter> createState() => _GraphPlotterState();
}

class _GraphPlotterState extends State<GraphPlotter> {
  final TextEditingController _equationController = TextEditingController(text: 'sin(x)');
  final TextEditingController _equationController2 = TextEditingController(text: '');
  final TextEditingController _equationController3 = TextEditingController(text: '');
  
  final TextEditingController _minXController = TextEditingController(text: '-10');
  final TextEditingController _maxXController = TextEditingController(text: '10');
  final TextEditingController _minYController = TextEditingController(text: '-10');
  final TextEditingController _maxYController = TextEditingController(text: '10');

  List<FlSpot> _spots = [];
  List<FlSpot> _spots2 = [];
  List<FlSpot> _spots3 = [];
  List<FlSpot> _derivativeSpots = [];
  List<FlSpot> _rootSpots = [];
  List<FlSpot> _rootSpots2 = [];
  List<FlSpot> _rootSpots3 = [];

  String _errorMsg = '';
  int _activeEq = 1;
  bool _showDerivative = false;
  double? _yIntercept;
  
  bool _isRadians = true;
  double _minX = -10;
  double _maxX = 10;
  double _minY = -10;
  double _maxY = 10;

  void Function(void Function())? _dialogSetState;

  @override
  void initState() {
    super.initState();
    _plot();
  }

  void _plot() {
    setState(() {
      _errorMsg = '';
      _spots = [];
      _spots2 = [];
      _spots3 = [];
      _derivativeSpots = [];
      _rootSpots = [];
      _rootSpots2 = [];
      _rootSpots3 = [];
      _extremaSpots = [];
      _extremaSpots2 = [];
      _extremaSpots3 = [];
      _intersectionSpots = [];
      _yIntercept = null;
    });

    try {
      _minX = double.parse(_minXController.text);
      _maxX = double.parse(_maxXController.text);
      _minY = double.parse(_minYController.text);
      _maxY = double.parse(_maxYController.text);
    } catch (_) {}

    _spots = _calculateSpots(_equationController.text);
    _spots2 = _calculateSpots(_equationController2.text);
    _spots3 = _calculateSpots(_equationController3.text);

    _rootSpots = _findRoots(_spots);
    _rootSpots2 = _findRoots(_spots2);
    _rootSpots3 = _findRoots(_spots3);

    double rangeY = _maxY - _minY;
    double safeMinY = _minY - rangeY;
    double safeMaxY = _maxY + rangeY;

    if (_equationController.text.isNotEmpty) {
      _yIntercept = _evaluateAt(_equationController.text, 0.0);
      if (_yIntercept != null && _yIntercept! >= safeMinY && _yIntercept! <= safeMaxY) {
          _rootSpots.add(FlSpot(0.0, _yIntercept!));
      }
      List<FlSpot> dSpots = _calculateDerivativeSpots(_equationController.text);
      if (_showDerivative) _derivativeSpots = dSpots;
      _extremaSpots = _findExtrema(dSpots, _equationController.text);
    }
    
    if (_equationController2.text.isNotEmpty) {
      final y2 = _evaluateAt(_equationController2.text, 0.0);
      if (y2 != null && y2 >= safeMinY && y2 <= safeMaxY) _rootSpots2.add(FlSpot(0.0, y2));
      List<FlSpot> dSpots = _calculateDerivativeSpots(_equationController2.text);
      _extremaSpots2 = _findExtrema(dSpots, _equationController2.text);
    }
    
    if (_equationController3.text.isNotEmpty) {
      final y3 = _evaluateAt(_equationController3.text, 0.0);
      if (y3 != null && y3 >= safeMinY && y3 <= safeMaxY) _rootSpots3.add(FlSpot(0.0, y3));
      List<FlSpot> dSpots = _calculateDerivativeSpots(_equationController3.text);
      _extremaSpots3 = _findExtrema(dSpots, _equationController3.text);
    }

    _calculateIntersections();
    
    setState(() {});
    _dialogSetState?.call(() {});
  }

  List<FlSpot> _extremaSpots = [];
  List<FlSpot> _extremaSpots2 = [];
  List<FlSpot> _extremaSpots3 = [];
  List<FlSpot> _intersectionSpots = [];

  List<FlSpot> _findExtrema(List<FlSpot> derivativeSpots, String eq) {
    List<FlSpot> extrema = [];
    List<FlSpot> roots = _findRoots(derivativeSpots);
    for (var root in roots) {
      double? y = _evaluateAt(eq, root.x);
      if (y != null && y >= _minY && y <= _maxY) {
        extrema.add(FlSpot(root.x, y));
      }
    }
    return extrema;
  }

  void _calculateIntersections() {
    _intersectionSpots = [];
    List<String> eqs = [];
    if (_equationController.text.isNotEmpty) eqs.add(_equationController.text);
    if (_equationController2.text.isNotEmpty) eqs.add(_equationController2.text);
    if (_equationController3.text.isNotEmpty) eqs.add(_equationController3.text);

    for (int i = 0; i < eqs.length; i++) {
      for (int j = i + 1; j < eqs.length; j++) {
        String eq1 = eqs[i];
        String eq2 = eqs[j];
        
        List<FlSpot> diffSpots = [];
        double step = (_maxX - _minX) / 200;
        for (double x = _minX; x <= _maxX; x += step) {
          double? y1 = _evaluateAt(eq1, x);
          double? y2 = _evaluateAt(eq2, x);
          if (y1 != null && y2 != null) {
            diffSpots.add(FlSpot(x, y1 - y2));
          }
        }
        
        List<FlSpot> roots = _findRoots(diffSpots);
        for (var root in roots) {
          double? y = _evaluateAt(eq1, root.x);
          if (y != null && y >= _minY && y <= _maxY) {
            _intersectionSpots.add(FlSpot(root.x, y));
          }
        }
      }
    }
  }

  List<FlSpot> _findRoots(List<FlSpot> spots) {
    List<FlSpot> roots = [];
    for (int i = 1; i < spots.length; i++) {
      final p1 = spots[i - 1];
      final p2 = spots[i];
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

  String _preprocessEquation(String eq) {
    String processed = eq.replaceAll('π', '3.14159265359').replaceAll('e', '2.71828182846');
    if (!_isRadians) {
      processed = _insertDegreeConversion(processed);
    }
    return processed;
  }

  String _insertDegreeConversion(String eq) {
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
             eq = eq.substring(0, idx) + '(${func}_TEMP(' + eq.substring(openParen + 1, closeParen) + '))*(180/3.14159265359)' + eq.substring(closeParen + 1);
          } else {
             eq = eq.substring(0, idx) + '${func}_TEMP((' + eq.substring(openParen + 1, closeParen) + ')*(3.14159265359/180))' + eq.substring(closeParen + 1);
          }
        } else {
          searchIdx = openParen + 1;
        }
      }
    }
    return eq.replaceAll('_TEMP', '');
  }

  int _findMatchingParen(String s, int openIdx) {
    int count = 1;
    for (int i = openIdx + 1; i < s.length; i++) {
      if (s[i] == '(') count++;
      else if (s[i] == ')') count--;
      if (count == 0) return i;
    }
    return -1;
  }

  List<FlSpot> _calculateSpots(String eq) {
    if (eq.isEmpty) return [];
    try {
      final input = _preprocessEquation(eq);
      Parser p = Parser();
      Expression exp = p.parse(input);
      ContextModel cm = ContextModel();

      List<FlSpot> newSpots = [];
      double step = (_maxX - _minX) / 500;
      double rangeY = _maxY - _minY;
      double safeMinY = _minY - rangeY;
      double safeMaxY = _maxY + rangeY;
      for (double x = _minX; x <= _maxX; x += step) {
        cm.bindVariable(Variable('x'), Number(x));
        double y = exp.evaluate(EvaluationType.REAL, cm);
        if (!y.isNaN && !y.isInfinite && y >= safeMinY && y <= safeMaxY) {
          newSpots.add(FlSpot(x, y));
        }
      }
      return newSpots;
    } catch (_) {
      return [];
    }
  }

  double? _evaluateAt(String eq, double x) {
    try {
      final input = _preprocessEquation(eq);
      Parser p = Parser();
      Expression exp = p.parse(input);
      ContextModel cm = ContextModel();
      cm.bindVariable(Variable('x'), Number(x));
      double y = exp.evaluate(EvaluationType.REAL, cm);
      if (!y.isNaN && !y.isInfinite) return y;
    } catch (_) {}
    return null;
  }

  List<FlSpot> _calculateDerivativeSpots(String eq) {
      if (eq.isEmpty) return [];
      double h = 0.001; 
      List<FlSpot> newSpots = [];
      double step = (_maxX - _minX) / 500;
      double rangeY = _maxY - _minY;
      double safeMinY = _minY - rangeY;
      double safeMaxY = _maxY + rangeY;
      for (double x = _minX; x <= _maxX; x += step) {
        double? y1 = _evaluateAt(eq, x + h);
        double? y0 = _evaluateAt(eq, x - h);
        if (y1 != null && y0 != null) {
            double dy = (y1 - y0) / (2 * h);
            if (!dy.isNaN && !dy.isInfinite && dy >= safeMinY && dy <= safeMaxY) {
                newSpots.add(FlSpot(x, dy));
            }
        }
      }
      return newSpots;
  }

  void _syncControllers() {
    _minXController.text = _minX.toStringAsFixed(2);
    _maxXController.text = _maxX.toStringAsFixed(2);
    _minYController.text = _minY.toStringAsFixed(2);
    _maxYController.text = _maxY.toStringAsFixed(2);
  }

  void _resetView() {
    setState(() {
      _minX = -10;
      _maxX = 10;
      _minY = -10;
      _maxY = 10;
      _syncControllers();
    });
    _plot();
  }

  void _zoomIn() {
    final rangeX = _maxX - _minX;
    final rangeY = _maxY - _minY;
    setState(() {
      _minX += rangeX * 0.25;
      _maxX -= rangeX * 0.25;
      _minY += rangeY * 0.25;
      _maxY -= rangeY * 0.25;
      _syncControllers();
    });
    _plot();
  }

  void _zoomOut() {
    final rangeX = _maxX - _minX;
    final rangeY = _maxY - _minY;
    setState(() {
      _minX -= rangeX * 0.5;
      _maxX += rangeX * 0.5;
      _minY -= rangeY * 0.5;
      _maxY += rangeY * 0.5;
      _syncControllers();
    });
    _plot();
  }

  void _pan(double dx, double dy) {
    final rangeX = _maxX - _minX;
    final rangeY = _maxY - _minY;
    setState(() {
      _minX += dx * rangeX * 0.2;
      _maxX += dx * rangeX * 0.2;
      _minY += dy * rangeY * 0.2;
      _maxY += dy * rangeY * 0.2;
      _syncControllers();
    });
    _plot();
  }

  Widget _buildKeypad() {
    final buttons = [
      'sin', 'cos', 'tan', 'C', '⌫',
      'x²', '1/x', 'x', 'π', 'e',
      '√', '(', ')', 'n!', '÷',
      'x^y', '7', '8', '9', '×',
      '10^x', '4', '5', '6', '−',
      'log', '1', '2', '3', '+',
      'ln', '±', '0', '.', '=',
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;
        final double height = constraints.maxHeight;
        
        // Dynamic ratio: evenly distribute buttons top to bottom
        final double safeHeight = height > 50 ? height : 300;
        final double itemWidth = (width - (5 - 1) * 4) / 5;
        final double itemHeight = (safeHeight - (7 - 1) * 4) / 7;
        final double ratio = (itemHeight > 0 && itemWidth > 0) ? itemWidth / itemHeight : 1.6;

        return GridView.builder(
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 5,
            crossAxisSpacing: 4,
            mainAxisSpacing: 4,
            childAspectRatio: ratio,
          ),
      itemCount: buttons.length,
      itemBuilder: (context, index) {
        final btn = buttons[index];
        final isOp = ['÷', '×', '−', '+', '='].contains(btn);
        final isAction = ['C', '⌫', '±'].contains(btn);
        final isMath = !isOp && !isAction && double.tryParse(btn) == null && btn != '.';

        Color bgColor = Theme.of(context).cardColor;
        Color fgColor = Theme.of(context).textTheme.bodyLarge!.color!;

        if (isOp) {
          bgColor = Theme.of(context).colorScheme.primary;
          fgColor = Theme.of(context).colorScheme.onPrimary;
        } else if (isAction) {
          bgColor = Theme.of(context).colorScheme.secondary.withAlpha(50);
          fgColor = Theme.of(context).colorScheme.secondary;
        } else if (isMath) {
          bgColor = Theme.of(context).colorScheme.surfaceContainerHighest;
          fgColor = Theme.of(context).colorScheme.onSurfaceVariant;
        }

        return Material(
          color: bgColor,
          borderRadius: BorderRadius.circular(12),
          child: InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: () {
              TextEditingController activeCtrl = _equationController;
              if (_activeEq == 2) activeCtrl = _equationController2;
              if (_activeEq == 3) activeCtrl = _equationController3;

              if (btn == 'C') {
                activeCtrl.clear();
              } else if (btn == '⌫') {
                if (activeCtrl.text.isNotEmpty) {
                  activeCtrl.text = activeCtrl.text.substring(0, activeCtrl.text.length - 1);
                }
              } else if (btn == '=') {
                _plot();
              } else if (btn == '±') {
                activeCtrl.text += '-';
              } else {
                String output = btn;
                if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln'].contains(btn)) {
                  output = '$btn(';
                } else if (btn == '√') {
                  output = 'sqrt(';
                } else if (btn == 'π') {
                  output = '3.14159265';
                } else if (btn == 'e') {
                  output = '2.71828182';
                } else if (btn == 'x²') {
                  output = '^2';
                } else if (btn == '1/x') {
                  output = '1/';
                } else if (btn == 'x^y') {
                  output = '^';
                } else if (btn == '10^x') {
                  output = '10^';
                } else if (btn == 'n!') {
                  output = '!';
                } else if (btn == '×') {
                  output = '*';
                } else if (btn == '÷') {
                  output = '/';
                } else if (btn == '−') {
                  output = '-';
                }
                activeCtrl.text += output;
              }
              _plot();
            },
            child: Center(
              child: Text(
                btn,
                style: TextStyle(
                  fontSize: isMath ? 10 : 11,
                  fontWeight: isMath ? FontWeight.w600 : FontWeight.bold,
                  color: fgColor,
                ),
              ),
            ),
          ),
        );
      },
    );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget buildEqInput(int id, String label, TextEditingController ctrl, Color color) {
      return Padding(
        padding: const EdgeInsets.only(bottom: 8.0),
        child: TextField(
          controller: ctrl,
          readOnly: false,
          showCursor: true,
          onChanged: (_) => _plot(),
          onTap: () {
            setState(() { _activeEq = id; });
            _dialogSetState?.call(() {});
          },
          style: TextStyle(fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: FontWeight.bold, color: _activeEq == id ? color : Colors.grey),
          decoration: InputDecoration(
            isDense: true,
            contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            prefixText: '$label = ',
            prefixStyle: TextStyle(color: color, fontSize: 14, fontWeight: FontWeight.bold),
            filled: true,
            fillColor: Theme.of(context).colorScheme.surfaceContainerHighest,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: _activeEq == id ? BorderSide(color: color, width: 2) : BorderSide.none,
            ),
          ),
        ),
      );
    }

    Widget buildEquationInputs() {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
        buildEqInput(1, 'f(x)', _equationController, Theme.of(context).colorScheme.primary),
        buildEqInput(2, 'g(x)', _equationController2, Colors.orange),
        buildEqInput(3, 'h(x)', _equationController3, Colors.green),
        if (_errorMsg.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(_errorMsg, style: TextStyle(color: Theme.of(context).colorScheme.error)),
          ),
        Row(
          children: [
            Transform.scale(
              scale: 0.8,
              child: Checkbox(
                value: _showDerivative,
                onChanged: (v) {
                  setState(() { _showDerivative = v ?? false; });
                  _dialogSetState?.call(() {});
                  _plot();
                },
              ),
            ),
            const Text("f'(x)"),
            const SizedBox(width: 16),
            ActionChip(
              label: Text(_isRadians ? 'RAD' : 'DEG', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              visualDensity: VisualDensity.compact,
              backgroundColor: Theme.of(context).colorScheme.secondaryContainer,
              onPressed: () {
                setState(() { _isRadians = !_isRadians; });
                _dialogSetState?.call(() {});
                _plot();
              },
            ),
            if (_yIntercept != null) ...[
              const SizedBox(width: 16),
              Text("f(0)=${_yIntercept!.toStringAsFixed(2)}",
                  style: const TextStyle(fontWeight: FontWeight.bold)),
            ],
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.settings),
              tooltip: 'Window Bounds',
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Window Bounds'),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          children: [
                            Expanded(child: TextField(controller: _minXController, decoration: const InputDecoration(labelText: 'X Min'))),
                            const SizedBox(width: 8),
                            Expanded(child: TextField(controller: _maxXController, decoration: const InputDecoration(labelText: 'X Max'))),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Expanded(child: TextField(controller: _minYController, decoration: const InputDecoration(labelText: 'Y Min'))),
                            const SizedBox(width: 8),
                            Expanded(child: TextField(controller: _maxYController, decoration: const InputDecoration(labelText: 'Y Max'))),
                          ],
                        ),
                      ],
                    ),
                    actions: [
                      TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
                      FilledButton(
                        onPressed: () {
                          Navigator.pop(context);
                          _plot();
                        },
                        child: const Text('Apply'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ],
    );
  }

    return LayoutBuilder(
      builder: (context, constraints) {
        final bool isLandscape = constraints.maxWidth > constraints.maxHeight;

        Widget content;
        if (isLandscape) {
          content = Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 1,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    buildEquationInputs(),
                    const SizedBox(height: 8),
                    Expanded(child: _buildKeypad()),
                  ],
                ),
              ),
              const SizedBox(width: 24),
              Expanded(
                flex: 1,
                child: _buildChartDisplay(context, buildEqInputs: buildEquationInputs),
              ),
            ],
          );
        } else {
          content = Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.max,
            children: [
              buildEquationInputs(),
              const SizedBox(height: 4),
              Expanded(
                flex: 4,
                child: _buildChartDisplay(context, buildEqInputs: buildEquationInputs),
              ),
              const SizedBox(height: 4),
              Expanded(
                flex: 2,
                child: _buildKeypad(),
              ),
            ],
          );
        }

        return content;
      },
    );
  }

  Widget _buildChartDisplay(BuildContext context, {bool isFullscreen = false, Widget Function()? buildEqInputs}) {
    final btnStyle = FilledButton.styleFrom(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      padding: const EdgeInsets.symmetric(horizontal: 12),
      minimumSize: const Size(40, 40),
    );

    return Column(
      children: [
        if (isFullscreen && buildEqInputs != null)
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 0),
            child: buildEqInputs(),
          ),

        Expanded(
          child: ClipRect(
            child: Padding(
              padding: EdgeInsets.all(isFullscreen ? 32.0 : 24.0),
              child: LineChart(
              LineChartData(
                clipData: const FlClipData.all(),
                minX: _minX,
                maxX: _maxX,
                minY: _minY,
                maxY: _maxY,
                lineBarsData: [
                  if (_spots.isNotEmpty)
                    LineChartBarData(
                      spots: _spots,
                      isCurved: true,
                      color: Theme.of(context).colorScheme.primary,
                      barWidth: 3,
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                    ),
                  if (_spots2.isNotEmpty)
                    LineChartBarData(
                      spots: _spots2,
                      isCurved: true,
                      color: Colors.orange,
                      barWidth: 3,
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                    ),
                  if (_spots3.isNotEmpty)
                    LineChartBarData(
                      spots: _spots3,
                      isCurved: true,
                      color: Colors.green,
                      barWidth: 3,
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                    ),
                  if (_derivativeSpots.isNotEmpty)
                    LineChartBarData(
                      spots: _derivativeSpots,
                      isCurved: true,
                      color: Colors.redAccent,
                      barWidth: 2,
                      dashArray: [5, 5],
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                    ),
                  if (_rootSpots.isNotEmpty)
                    LineChartBarData(
                      spots: _rootSpots,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(radius: 4, color: Theme.of(context).colorScheme.primary, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_rootSpots2.isNotEmpty)
                    LineChartBarData(
                      spots: _rootSpots2,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(radius: 4, color: Colors.orange, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_rootSpots3.isNotEmpty)
                    LineChartBarData(
                      spots: _rootSpots3,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(radius: 4, color: Colors.green, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_extremaSpots.isNotEmpty)
                    LineChartBarData(
                      spots: _extremaSpots,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotSquarePainter(size: 8, color: Theme.of(context).colorScheme.primary, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_extremaSpots2.isNotEmpty)
                    LineChartBarData(
                      spots: _extremaSpots2,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotSquarePainter(size: 8, color: Colors.orange, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_extremaSpots3.isNotEmpty)
                    LineChartBarData(
                      spots: _extremaSpots3,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotSquarePainter(size: 8, color: Colors.green, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                  if (_intersectionSpots.isNotEmpty)
                    LineChartBarData(
                      spots: _intersectionSpots,
                      isCurved: false,
                      color: Colors.transparent,
                      barWidth: 0,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(radius: 5, color: Colors.cyan, strokeWidth: 1.5, strokeColor: Colors.white)),
                    ),
                ],
                lineTouchData: LineTouchData(
                  enabled: true,
                  touchTooltipData: LineTouchTooltipData(
                    getTooltipColor: (touchedSpot) => Theme.of(context).cardColor,
                    getTooltipItems: (touchedSpots) {
                      return touchedSpots.map((spot) {
                        return LineTooltipItem(
                          '(${spot.x.toStringAsFixed(2)}, ${spot.y.toStringAsFixed(2)})',
                          TextStyle(color: Theme.of(context).textTheme.bodyLarge?.color, fontWeight: FontWeight.bold),
                        );
                      }).toList();
                    },
                  ),
                ),
                titlesData: const FlTitlesData(
                  topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(showTitles: true, reservedSize: 30),
                  ),
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(showTitles: true, reservedSize: 40),
                  ),
                ),
                borderData: FlBorderData(
                  show: true,
                  border: Border.all(color: Colors.black12),
                ),
              ),
            ),
          ),
        ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          child: Wrap(
            alignment: WrapAlignment.center,
            spacing: 8,
            runSpacing: 8,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              if (!isFullscreen)
                Tooltip(
                  message: 'Fullscreen Graph',
                  child: FilledButton.tonal(
                    style: btnStyle,
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (context) => StatefulBuilder(
                          builder: (context, setDialogState) {
                            _dialogSetState = setDialogState;
                            return Dialog.fullscreen(
                              child: Scaffold(
                                body: SafeArea(child: _buildChartDisplay(context, isFullscreen: true, buildEqInputs: buildEqInputs)),
                              ),
                            );
                          },
                        ),
                      ).then((_) {
                        _dialogSetState = null;
                      });
                    },
                    child: const Icon(Icons.fullscreen),
                  ),
                )
              else
                Tooltip(
                  message: 'Minimize Graph',
                  child: FilledButton.tonal(
                    style: btnStyle,
                    onPressed: () => Navigator.pop(context),
                    child: const Icon(Icons.fullscreen_exit),
                  ),
                ),
              Container(width: 1, height: 24, color: Colors.grey.withOpacity(0.5)),
              Tooltip(
                message: 'Reset View',
                child: FilledButton.tonal(
                  style: btnStyle,
                  onPressed: _resetView,
                  child: const Icon(Icons.restore),
                ),
              ),
              Container(width: 1, height: 24, color: Colors.grey.withOpacity(0.5)),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: _zoomOut,
                child: const Icon(Icons.remove),
              ),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: _zoomIn,
                child: const Icon(Icons.add),
              ),
              Container(width: 1, height: 24, color: Colors.grey.withOpacity(0.5)),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: () => _pan(-1, 0),
                child: const Icon(Icons.arrow_left),
              ),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: () => _pan(0, -1),
                child: const Icon(Icons.arrow_drop_down),
              ),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: () => _pan(0, 1),
                child: const Icon(Icons.arrow_drop_up),
              ),
              FilledButton.tonal(
                style: btnStyle,
                onPressed: () => _pan(1, 0),
                child: const Icon(Icons.arrow_right),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
