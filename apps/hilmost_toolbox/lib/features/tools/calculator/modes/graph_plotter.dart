import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../domain/graph_engine.dart';
import '../presentation/providers/graph_provider.dart';
import '../presentation/widgets/graph_chart_display.dart';

class GraphPlotter extends ConsumerStatefulWidget {
  const GraphPlotter({super.key});

  @override
  ConsumerState<GraphPlotter> createState() => _GraphPlotterState();
}

class _GraphPlotterState extends ConsumerState<GraphPlotter> {
  final TextEditingController _equationController = TextEditingController(
    text: '',
  );
  final TextEditingController _equationController2 = TextEditingController(
    text: '',
  );
  final TextEditingController _equationController3 = TextEditingController(
    text: '',
  );

  final TextEditingController _minXController = TextEditingController(
    text: '-10.0',
  );
  final TextEditingController _maxXController = TextEditingController(
    text: '10.0',
  );
  final TextEditingController _minYController = TextEditingController(
    text: '-10.0',
  );
  final TextEditingController _maxYController = TextEditingController(
    text: '10.0',
  );

  final TextEditingController _paramYController = TextEditingController(
    text: '',
  );
  final TextEditingController _paramYController2 = TextEditingController(
    text: '',
  );
  final TextEditingController _paramYController3 = TextEditingController(
    text: '',
  );

  final FocusNode _focus1 = FocusNode();
  final FocusNode _focus2 = FocusNode();
  final FocusNode _focus3 = FocusNode();
  final FocusNode _focus1Y = FocusNode();
  final FocusNode _focus2Y = FocusNode();
  final FocusNode _focus3Y = FocusNode();

  int _activeEq = 1;
  int _activeSubEq = 1;
  int _keypadMode = 0; // 0: std, 1: inv, 2: hyp

  void Function(void Function())? _dialogSetState;

  @override
  void dispose() {
    _focus1.dispose();
    _focus2.dispose();
    _focus3.dispose();
    _focus1Y.dispose();
    _focus2Y.dispose();
    _focus3Y.dispose();
    _equationController.dispose();
    _equationController2.dispose();
    _equationController3.dispose();
    _minXController.dispose();
    _maxXController.dispose();
    _minYController.dispose();
    _maxYController.dispose();
    _paramYController.dispose();
    _paramYController2.dispose();
    _paramYController3.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    // Initial plot
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref
          .read(graphProvider.notifier)
          .updateBounds(minX: -10, maxX: 10, minY: -10, maxY: 10);
    });
  }

  void _syncControllersFromState() {
    final state = ref.read(graphProvider);
    _minXController.text = state.minX.toStringAsFixed(2);
    _maxXController.text = state.maxX.toStringAsFixed(2);
    _minYController.text = state.minY.toStringAsFixed(2);
    _maxYController.text = state.maxY.toStringAsFixed(2);
  }

  void _onKeypadPressed(String btn) {
    HapticFeedback.lightImpact();
    TextEditingController activeCtrl = _equationController;
    if (_activeEq == 1)
      activeCtrl = _activeSubEq == 1 ? _equationController : _paramYController;
    if (_activeEq == 2)
      activeCtrl = _activeSubEq == 1
          ? _equationController2
          : _paramYController2;
    if (_activeEq == 3)
      activeCtrl = _activeSubEq == 1
          ? _equationController3
          : _paramYController3;

    if (btn == 'C') {
      activeCtrl.clear();
    } else if (btn == '⌫') {
      if (activeCtrl.text.isNotEmpty) {
        activeCtrl.text = activeCtrl.text.substring(
          0,
          activeCtrl.text.length - 1,
        );
      }
    } else if (btn == 'INV') {
      setState(() {
        _keypadMode = _keypadMode == 1 ? 0 : 1;
      });
      return;
    } else if (btn == 'HYP') {
      setState(() {
        _keypadMode = _keypadMode == 2 ? 0 : 2;
      });
      return;
    } else if (btn == '=') {
      return;
    } else if (btn == '±') {
      activeCtrl.text += '-';
    } else {
      String output = btn;
      if ([
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'sinh',
        'cosh',
        'tanh',
        'asinh',
        'acosh',
        'atanh',
        'log',
        'ln',
      ].contains(btn)) {
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
      final sel = activeCtrl.selection;
      if (sel.isValid && sel.start >= 0) {
        activeCtrl.text = activeCtrl.text.replaceRange(
          sel.start,
          sel.end,
          output,
        );
        activeCtrl.selection = TextSelection.collapsed(
          offset: sel.start + output.length,
        );
      } else {
        activeCtrl.text += output;
      }
    }

    // Notify provider of text change
    final paramYText = _activeSubEq == 2 ? activeCtrl.text : null;
    final eqText = _activeSubEq == 1 ? activeCtrl.text : null;

    ref
        .read(graphProvider.notifier)
        .updateEquation(
          _activeEq,
          eqText ??
              (_activeEq == 1
                  ? _equationController.text
                  : (_activeEq == 2
                        ? _equationController2.text
                        : _equationController3.text)),
          paramY: paramYText,
        );
  }

  Widget _buildKeypad() {
    final buttons = [
      'INV',
      'HYP',
      't',
      'θ',
      '⌫',
      'sin',
      'cos',
      'tan',
      'C',
      'log',
      'x²',
      '1/x',
      '√',
      'π',
      'e',
      'x^y',
      '10^x',
      'n!',
      'ln',
      '±',
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;
        final double height = constraints.maxHeight;

        final double safeHeight = height > 50 ? height : 150;
        final double itemWidth = (width - (5 - 1) * 4) / 5;
        final double itemHeight = (safeHeight - (4 - 1) * 4) / 4;
        final double ratio = (itemHeight > 0 && itemWidth > 0)
            ? itemWidth / itemHeight
            : 1.6;

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
            String btn = buttons[index];
            if (btn == ' ') return const SizedBox();

            if (btn == 'sin') {
              if (_keypadMode == 1)
                btn = 'asin';
              else if (_keypadMode == 2)
                btn = 'sinh';
            } else if (btn == 'cos') {
              if (_keypadMode == 1)
                btn = 'acos';
              else if (_keypadMode == 2)
                btn = 'cosh';
            } else if (btn == 'tan') {
              if (_keypadMode == 1)
                btn = 'atan';
              else if (_keypadMode == 2)
                btn = 'tanh';
            }

            final isOp = ['÷', '×', '−', '+', '='].contains(btn);
            final isAction = ['C', '⌫', '±', 'INV', 'HYP'].contains(btn);
            final isMath =
                !isOp &&
                !isAction &&
                double.tryParse(btn) == null &&
                btn != '.';

            Color bgColor = Theme.of(context).cardColor;
            Color fgColor = Theme.of(context).textTheme.bodyLarge!.color!;

            if (isOp) {
              bgColor = Theme.of(context).colorScheme.primary;
              fgColor = Theme.of(context).colorScheme.onPrimary;
            } else if (isAction) {
              bgColor = Theme.of(
                context,
              ).colorScheme.secondary.withValues(alpha: 0.2);
              fgColor = Theme.of(context).colorScheme.secondary;
              if ((btn == 'INV' && _keypadMode == 1) ||
                  (btn == 'HYP' && _keypadMode == 2)) {
                bgColor = Theme.of(context).colorScheme.secondary;
                fgColor = Theme.of(context).colorScheme.onSecondary;
              }
            } else if (isMath) {
              bgColor = Theme.of(context).colorScheme.surfaceContainerHighest;
              fgColor = Theme.of(context).colorScheme.onSurfaceVariant;
            }

            return Material(
              color: bgColor,
              borderRadius: BorderRadius.circular(12),
              child: InkWell(
                borderRadius: BorderRadius.circular(12),
                onTap: () => _onKeypadPressed(btn),
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

  Widget _buildEqInput(int id, Color color, bool hasError) {
    final state = ref.watch(graphProvider);
    final notifier = ref.read(graphProvider.notifier);

    TextEditingController ctrlX = id == 1
        ? _equationController
        : (id == 2 ? _equationController2 : _equationController3);
    TextEditingController ctrlY = id == 1
        ? _paramYController
        : (id == 2 ? _paramYController2 : _paramYController3);
    FocusNode focusX = id == 1 ? _focus1 : (id == 2 ? _focus2 : _focus3);
    FocusNode focusY = id == 1 ? _focus1Y : (id == 2 ? _focus2Y : _focus3Y);
    PlotMode mode = id == 1
        ? state.mode1
        : (id == 2 ? state.mode2 : state.mode3);
    String relation = id == 1
        ? state.relation1
        : (id == 2 ? state.relation2 : state.relation3);
    bool showDerivative = id == 1
        ? state.showDerivative1
        : (id == 2 ? state.showDerivative2 : state.showDerivative3);
    String baseLabel = id == 1 ? 'f' : (id == 2 ? 'g' : 'h');

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: hasError
            ? BorderSide(color: Theme.of(context).colorScheme.error, width: 2)
            : BorderSide.none,
      ),
      margin: const EdgeInsets.symmetric(vertical: 4),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Wrap(
          spacing: 8,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            DropdownButton<PlotMode>(
              value: mode,
              isDense: true,
              style: TextStyle(
                fontSize: 12,
                color: Theme.of(context).colorScheme.onSurface,
              ),
              items: const [
                DropdownMenuItem(value: PlotMode.standard, child: Text('y(x)')),
                DropdownMenuItem(value: PlotMode.polar, child: Text('r(θ)')),
                DropdownMenuItem(
                  value: PlotMode.parametric,
                  child: Text('x(t),y(t)'),
                ),
              ],
              onChanged: (v) {
                if (v != null) notifier.updateMode(id, v);
              },
            ),
            if (mode == PlotMode.standard) ...[
              Text(
                '$baseLabel(x)',
                style: TextStyle(fontWeight: FontWeight.bold, color: color),
              ),
              DropdownButton<String>(
                value: relation,
                isDense: true,
                style: TextStyle(
                  fontSize: 12,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
                items: const [
                  DropdownMenuItem(value: '=', child: Text('=')),
                  DropdownMenuItem(value: '>', child: Text('>')),
                  DropdownMenuItem(value: '<', child: Text('<')),
                  DropdownMenuItem(value: '>=', child: Text('>=')),
                  DropdownMenuItem(value: '<=', child: Text('<=')),
                ],
                onChanged: (v) {
                  if (v != null) notifier.updateRelation(id, v);
                },
              ),
            ],
            if (mode == PlotMode.polar)
              Text(
                'r(θ) =',
                style: TextStyle(fontWeight: FontWeight.bold, color: color),
              ),
            if (mode == PlotMode.parametric)
              Text(
                'x(t) =',
                style: TextStyle(fontWeight: FontWeight.bold, color: color),
              ),
            SizedBox(
              width: 180,
              child: TextField(
                controller: ctrlX,
                focusNode: focusX,
                readOnly: false,
                showCursor: true,
                onChanged: (text) => notifier.updateEquation(id, text),
                onTap: () {
                  setState(() {
                    _activeEq = id;
                    _activeSubEq = 1;
                  });
                },
                style: TextStyle(
                  fontFamily: 'JetBrains Mono',
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: _activeEq == id ? color : Colors.grey,
                ),
                decoration: InputDecoration(
                  isDense: true,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  filled: true,
                  fillColor: Theme.of(
                    context,
                  ).colorScheme.surfaceContainerHighest,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
            if (mode == PlotMode.parametric) ...[
              Text(
                'y(t) =',
                style: TextStyle(fontWeight: FontWeight.bold, color: color),
              ),
              SizedBox(
                width: 180,
                child: TextField(
                  controller: ctrlY,
                  focusNode: focusY,
                  readOnly: false,
                  showCursor: true,
                  onChanged: (text) =>
                      notifier.updateEquation(id, ctrlX.text, paramY: text),
                  onTap: () {
                    setState(() {
                      _activeEq = id;
                      _activeSubEq = 2;
                    });
                  },
                  style: TextStyle(
                    fontFamily: 'JetBrains Mono',
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: _activeEq == id ? color : Colors.grey,
                  ),
                  decoration: InputDecoration(
                    isDense: true,
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    filled: true,
                    fillColor: Theme.of(
                      context,
                    ).colorScheme.surfaceContainerHighest,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ],
            if (mode == PlotMode.standard) ...[
              Transform.scale(
                scale: 0.8,
                child: Checkbox(
                  value: showDerivative,
                  onChanged: (v) {
                    if (v != null) notifier.updateDerivative(id, v);
                  },
                  activeColor: color,
                ),
              ),
              Text(
                "${baseLabel}'(x)",
                style: TextStyle(
                  color: color,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ],
        ),
      ),
    ).animate().fadeIn().slideX();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(graphProvider);
    final notifier = ref.read(graphProvider.notifier);

    Widget buildEquationInputs() {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (state.visibleEquations >= 1)
            Row(
              children: [
                Expanded(
                  child: _buildEqInput(
                    1,
                    Theme.of(context).colorScheme.primary,
                    state.hasError1,
                  ),
                ),
                if (state.visibleEquations == 1)
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () {
                      _equationController.clear();
                      _paramYController.clear();
                      notifier.updateEquation(1, '');
                    },
                  ),
              ],
            ),
          if (state.visibleEquations >= 2)
            Row(
              children: [
                Expanded(
                  child: _buildEqInput(2, Colors.orange, state.hasError2),
                ),
                if (state.visibleEquations == 2)
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () {
                      _equationController2.clear();
                      _paramYController2.clear();
                      notifier.updateEquation(2, '');
                      notifier.setVisibleEquations(1);
                    },
                  ),
              ],
            ),
          if (state.visibleEquations >= 3)
            Row(
              children: [
                Expanded(
                  child: _buildEqInput(3, Colors.green, state.hasError3),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () {
                    _equationController3.clear();
                    _paramYController3.clear();
                    notifier.updateEquation(3, '');
                    notifier.setVisibleEquations(2);
                  },
                ),
              ],
            ),
          if (state.visibleEquations < 3)
            Align(
              alignment: Alignment.centerLeft,
              child: TextButton.icon(
                onPressed: () {
                  notifier.setVisibleEquations(state.visibleEquations + 1);
                },
                icon: const Icon(Icons.add),
                label: const Text('Add Function'),
              ),
            ),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            children: [
              ActionChip(
                label: Text(
                  state.isRadians ? 'RAD' : 'DEG',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
                visualDensity: VisualDensity.compact,
                backgroundColor: Theme.of(
                  context,
                ).colorScheme.secondaryContainer,
                onPressed: () {
                  notifier.toggleRadians();
                  _dialogSetState?.call(() {});
                },
              ),
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
                              Expanded(
                                child: TextField(
                                  controller: _minXController,
                                  decoration: const InputDecoration(
                                    labelText: 'X Min',
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: TextField(
                                  controller: _maxXController,
                                  decoration: const InputDecoration(
                                    labelText: 'X Max',
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Expanded(
                                child: TextField(
                                  controller: _minYController,
                                  decoration: const InputDecoration(
                                    labelText: 'Y Min',
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: TextField(
                                  controller: _maxYController,
                                  decoration: const InputDecoration(
                                    labelText: 'Y Max',
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const Text('Cancel'),
                        ),
                        FilledButton(
                          onPressed: () {
                            notifier.updateBounds(
                              minX:
                                  double.tryParse(_minXController.text) ?? -10,
                              maxX: double.tryParse(_maxXController.text) ?? 10,
                              minY:
                                  double.tryParse(_minYController.text) ?? -10,
                              maxY: double.tryParse(_maxYController.text) ?? 10,
                            );
                            Navigator.pop(context);
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
          if (state.parameters.isNotEmpty)
            Column(
              children: state.parameters.entries.map((entry) {
                return Row(
                  children: [
                    SizedBox(
                      width: 60,
                      child: Text(
                        '${entry.key} = ${entry.value.toStringAsFixed(1)}',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Expanded(
                      child: Slider(
                        value: entry.value,
                        min: -10,
                        max: 10,
                        divisions: 200,
                        onChanged: (val) {
                          notifier.updateParameter(entry.key, val);
                          _dialogSetState?.call(() {});
                        },
                      ),
                    ),
                  ],
                );
              }).toList(),
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
                child: GraphChartDisplay(
                  buildEqInputs: buildEquationInputs,
                  onResetView: () {},
                  onZoomIn: () {},
                  onZoomOut: () {},
                  onPan: (dx, dy) {},
                  onToggleFullscreen: () {},
                ),
              ),
            ],
          );
        } else {
          content = Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.max,
            children: [
              Expanded(
                flex: 4,
                child: GraphChartDisplay(
                  buildEqInputs: buildEquationInputs,
                  onResetView: () {},
                  onZoomIn: () {},
                  onZoomOut: () {},
                  onPan: (dx, dy) {},
                  onToggleFullscreen: () {},
                ),
              ),
              Expanded(
                flex: 4,
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black12,
                        blurRadius: 4,
                        spreadRadius: 1,
                      ),
                    ],
                  ),
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16.0,
                        vertical: 8.0,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Center(
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 12),
                              width: 40,
                              height: 4,
                              decoration: BoxDecoration(
                                color: Colors.grey[400],
                                borderRadius: BorderRadius.circular(2),
                              ),
                            ),
                          ),
                          buildEquationInputs(),
                          const SizedBox(height: 8),
                          SizedBox(height: 280, child: _buildKeypad()),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        }

        return content;
      },
    );
  }
}
