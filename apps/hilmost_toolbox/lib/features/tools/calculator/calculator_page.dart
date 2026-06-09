import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'calculator_state.dart';
import 'keyboard_engine.dart';
import 'modes/scientific_keypad.dart';
import 'modes/graph_plotter.dart';
import 'modes/astrophysics_calc.dart';
import 'modes/science_equation_calc.dart';

class CalculatorPage extends ConsumerStatefulWidget {
  const CalculatorPage({super.key});

  @override
  ConsumerState<CalculatorPage> createState() => _CalculatorPageState();
}

class _CalculatorPageState extends ConsumerState<CalculatorPage> {
  final ScrollController _tabScrollController = ScrollController();
  final KeyboardMappingEngine _keyboardEngine = KeyboardMappingEngine();

  @override
  void dispose() {
    _tabScrollController.dispose();
    super.dispose();
  }

  void _handleKeyEvent(KeyEvent event, CalculatorController controller) {
    final btn = _keyboardEngine.mapKeyEvent(event);
    if (btn != null) {
      if (event is KeyDownEvent) {
        controller.setActiveKey(btn);
        if (btn == 'C') {
          controller.clear();
        } else if (btn == 'CE') {
          controller.clearEntry();
        } else if (btn == '⌫') {
          controller.backspace();
        } else if (btn == '=') {
          controller.evaluateFinal();
        } else if (btn == 'x²') {
          controller.appendSuffix('^2');
        } else if (btn == '1/x') {
          controller.appendFunction('1/(');
        } else if (btn == '√') {
          controller.appendFunction('√(');
        } else if (btn == 'n!') {
          controller.appendSuffix('!');
        } else if (btn == 'x^y') {
          controller.append('^');
        } else if (['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'asin', 'acos', 'atan', 'log', 'ln'].contains(btn)) {
          final mode = ref.read(calculatorControllerProvider).mode;
          controller.appendFunction(mode == CalculatorMode.standard ? '$btn(' : '\\$btn(');
        } else if (btn == '%') {
          controller.applyPercentage();
        } else {
          controller.append(btn);
        }
      } else if (event is KeyUpEvent) {
        // Unset active key on key up to remove visual depression
        controller.setActiveKey(null);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(calculatorControllerProvider);
    final controller = ref.read(calculatorControllerProvider.notifier);
    final theme = Theme.of(context);

    return LayoutBuilder(
      builder: (context, constraints) {
        final bool isLandscape = constraints.maxWidth > constraints.maxHeight;

        String activeName = '';
        switch (state.mode) {
          case CalculatorMode.standard: activeName = 'Standard Calculator'; break;
          case CalculatorMode.scientific: activeName = 'Scientific Calculator'; break;
          case CalculatorMode.graphPlotter: activeName = 'Graph Plotter'; break;
          case CalculatorMode.astroPhysics: activeName = 'AstroPhysics'; break;
          case CalculatorMode.scienceEquation: activeName = 'Science Equation'; break;
        }

        Widget breadcrumbsAndTabs = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Breadcrumbs
            Row(
              children: [
                TextButton(onPressed: () => context.go('/'), child: Text('Home', style: theme.textTheme.bodySmall?.copyWith(color: Colors.blue))),
                Text(' / ', style: theme.textTheme.bodySmall),
                Text('Calculators', style: theme.textTheme.bodySmall?.copyWith(color: Colors.grey)),
                Text(' / ', style: theme.textTheme.bodySmall),
                Text(activeName, style: theme.textTheme.bodySmall?.copyWith(fontWeight: FontWeight.bold)),
              ]
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => context.go('/'),
                  tooltip: 'Back to Home',
                ),
                const SizedBox(width: 8),
                Text(activeName, style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            
            // Mode Tabs
            Scrollbar(
              controller: _tabScrollController,
              thumbVisibility: true, // Ensures it is visible on desktop platforms
              child: SingleChildScrollView(
                controller: _tabScrollController,
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Row(
                  children: CalculatorMode.values.map((mode) {
                    final isSelected = state.mode == mode;
                    String name;
                    switch (mode) {
                      case CalculatorMode.standard: name = 'Standard'; break;
                      case CalculatorMode.scientific: name = 'Scientific'; break;
                      case CalculatorMode.graphPlotter: name = 'Graph Plotter'; break;
                      case CalculatorMode.astroPhysics: name = 'AstroPhysics'; break;
                      case CalculatorMode.scienceEquation: name = 'Science Equation'; break;
                    }
                    return Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: ChoiceChip(
                        label: Text(name),
                        labelPadding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 2.0),
                        labelStyle: const TextStyle(fontSize: 14),
                        selected: isSelected,
                        onSelected: (selected) {
                          if (selected) controller.setMode(mode);
                        },
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            const SizedBox(height: 16),
          ],
        );

        Widget display = Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Upper Portion: Scrollable Tape
              Expanded(
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(8),
                    onTap: () {
                      if (state.history.isEmpty) return;
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('History Tape'),
                              Row(
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.copy),
                                    tooltip: 'Copy Tape',
                                    onPressed: () {
                                      Clipboard.setData(ClipboardData(text: state.history.join('\n')));
                                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Tape copied to clipboard')));
                                    },
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.delete, color: Colors.red),
                                    tooltip: 'Clear Tape',
                                    onPressed: () {
                                      controller.clearHistory();
                                      Navigator.pop(context);
                                    },
                                  ),
                                ],
                              ),
                            ],
                          ),
                          content: SizedBox(
                            width: 350,
                            height: 400,
                            child: ListView.builder(
                              itemCount: state.history.length,
                              itemBuilder: (context, i) => ListTile(
                                title: Text(
                                  state.history[i], 
                                  style: const TextStyle(fontFamily: 'JetBrains Mono', fontSize: 16),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                            ),
                          ),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
                          ],
                        ),
                      );
                    },
                    child: Align(
                      alignment: Alignment.bottomRight,
                      child: SingleChildScrollView(
                        reverse: true,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          mainAxisAlignment: MainAxisAlignment.end,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            if (state.history.isEmpty)
                              Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Text('No history yet', style: TextStyle(color: Colors.grey.withAlpha(100))),
                              ),
                            ...state.history.reversed.map((h) => Padding(
                              padding: const EdgeInsets.only(bottom: 8.0),
                              child: Text(
                                h,
                                style: TextStyle(fontFamily: 'JetBrains Mono', fontSize: 16, color: Colors.grey.withAlpha(150)),
                                textAlign: TextAlign.right,
                              ),
                            )),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              
              // Lower Portion: Current Operation & Floating Actions
              Stack(
                children: [
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      mainAxisAlignment: MainAxisAlignment.end,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          state.expression.isEmpty || !RegExp(r'[+\-×÷^%sctl!√πe\(\)]').hasMatch(state.expression) 
                              ? ' ' 
                              : state.expression,
                          style: TextStyle(fontFamily: 'JetBrains Mono', fontSize: 18, color: theme.textTheme.bodySmall?.color ?? Colors.grey),
                          textAlign: TextAlign.right,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          state.result,
                          style: TextStyle(fontFamily: 'JetBrains Mono', fontSize: 36, fontWeight: FontWeight.bold, color: theme.textTheme.bodyLarge?.color),
                          textAlign: TextAlign.right,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    top: -8,
                    left: -8,
                    child: IconButton(
                      icon: const Icon(Icons.copy, color: Colors.grey),
                      tooltip: 'Copy Result',
                      onPressed: () {
                         Clipboard.setData(ClipboardData(text: state.result.isEmpty ? state.expression : state.result));
                         ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Copied to clipboard')));
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        );

        Widget keypad = _buildKeypad(state.mode);
        final bool showDisplay = state.mode == CalculatorMode.standard || state.mode == CalculatorMode.scientific;

        Widget content;
        if (isLandscape) {
          content = Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 3,
                child: keypad,
              ),
              if (showDisplay) ...[
                const SizedBox(width: 24),
                Expanded(
                  flex: 2,
                  child: display,
                ),
              ]
            ],
          );
        } else {
          content = Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.max,
            children: [
              if (showDisplay) ...[
                display,
                const SizedBox(height: 8),
              ],
              Expanded(child: keypad),
            ],
          );
        }

        return Center(
          child: Focus(
            autofocus: true,
            onKeyEvent: (node, event) {
              _handleKeyEvent(event, controller);
              return KeyEventResult.handled;
            },
            child: ConstrainedBox(
              constraints: const BoxConstraints(
                maxWidth: 1200, 
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 0.0, bottom: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    breadcrumbsAndTabs,
                    Expanded(child: content),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildKeypad(CalculatorMode mode) {
    switch (mode) {
      case CalculatorMode.standard:
        return const _StandardKeypad();
      case CalculatorMode.scientific:
        return const ScientificKeypad();
      case CalculatorMode.graphPlotter:
        return const GraphPlotter();
      case CalculatorMode.astroPhysics:
        return const AstroPhysicsCalc();
      case CalculatorMode.scienceEquation:
        return const ScienceEquationCalc();
    }
  }
}

class _StandardKeypad extends ConsumerWidget {
  const _StandardKeypad();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.read(calculatorControllerProvider.notifier);
    final theme = Theme.of(context);

    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;
        final double height = constraints.maxHeight;
        final buttons = [
          'MC', 'MR', 'M+', 'M−',
          '%', 'CE', 'C', '⌫',
          '1/x', 'x²', '√', '÷',
          '7', '8', '9', '×',
          '4', '5', '6', '−',
          '1', '2', '3', '+',
          '±', '0', '.', '=',
        ];
        
        // Dynamic aspect ratio: fill the full available height evenly
        final double safeHeight = height > 50 ? height : 350;
        final double itemWidth = (width - (4 - 1) * 6) / 4;
        final double itemHeight = (safeHeight - (7 - 1) * 6) / 7;
        final double ratio = (itemHeight > 0 && itemWidth > 0) ? itemWidth / itemHeight : 1.6;

        return GridView.builder(
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            crossAxisSpacing: 6,
            mainAxisSpacing: 6,
            childAspectRatio: ratio,
          ),
      itemCount: buttons.length,
      itemBuilder: (context, index) {
        final btn = buttons[index];
        final isOp = ['÷', '×', '−', '+', '='].contains(btn);
        final isAction = ['C', 'CE', '⌫', '±', '1/x', 'x²', '√', '%', 'MC', 'MR', 'M+', 'M−'].contains(btn);

        final isActive = ref.watch(calculatorControllerProvider.select((s) => s.activeKey)) == btn;

        Color bgColor = theme.cardColor;
        Color fgColor = theme.textTheme.bodyLarge!.color!;

        if (isOp) {
          bgColor = theme.colorScheme.primary;
          fgColor = theme.colorScheme.onPrimary;
        } else if (isAction) {
          bgColor = theme.colorScheme.secondary.withValues(alpha: 50 / 255);
          fgColor = theme.colorScheme.secondary;
        }
        
        if (isActive) {
          bgColor = bgColor.withValues(alpha: 0.5); // Depressed visual effect
        }

        return Material(
          color: bgColor,
          borderRadius: BorderRadius.circular(16),
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () {
              if (btn == 'C') {
                controller.clear();
              } else if (btn == 'CE') {
                controller.clearEntry();
              } else if (btn == '⌫') {
                controller.backspace();
              } else if (btn == '=') {
                controller.evaluateFinal();
              } else if (btn == '√') {
                controller.appendFunction('sqrt(');
              } else if (btn == 'x²') {
                controller.appendSuffix('^2');
              } else if (btn == '1/x') {
                controller.appendFunction('1/(');
              } else if (btn == '%') {
                controller.applyPercentage();
              } else if (btn == '±') {
                controller.toggleSign();
              } else if (btn == 'MC') {
                controller.memoryClear();
              } else if (btn == 'MR') {
                controller.memoryRecall();
              } else if (btn == 'M+') {
                controller.memoryAdd();
              } else if (btn == 'M−') {
                controller.memorySubtract();
              } else {
                controller.append(btn);
              }
            },
            child: Center(
              child: Text(
                btn,
                style: TextStyle(
                  fontSize: itemHeight > 0 ? (itemHeight * 0.35).clamp(12.0, 24.0) : 16,
                  fontWeight: FontWeight.bold,
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
}
