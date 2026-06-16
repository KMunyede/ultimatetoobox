import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/seo_text_accordion.dart';
import '../../../shared/widgets/ad_slot_widget.dart';
import 'calculator_state.dart';
import '../../../shared/utils/keyboard_engine.dart';
import 'modes/scientific_keypad.dart';
import 'modes/astrophysics_calc.dart';
import 'modes/science_equation_calc.dart';
import '../../../../shared/widgets/ad_slot_widget.dart';

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
        } else if ([
          'sin',
          'cos',
          'tan',
          'sinh',
          'cosh',
          'tanh',
          'asin',
          'acos',
          'atan',
          'log',
          'ln',
        ].contains(btn)) {
          controller.appendFunction('$btn(');
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
          case CalculatorMode.standard:
            activeName = 'Standard Calculator';
            break;
          case CalculatorMode.scientific:
            activeName = 'Scientific Calculator';
            break;
          case CalculatorMode.astroPhysics:
            activeName = 'AstroPhysics';
            break;
          case CalculatorMode.scienceEquation:
            activeName = 'Science Equation';
            break;
        }

        Widget breadcrumbsAndTabs = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Breadcrumbs
            Row(
              children: [
                TextButton(
                  onPressed: () => context.go('/'),
                  child: Text(
                    'Home',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: Colors.blue,
                    ),
                  ),
                ),
                Text(' / ', style: theme.textTheme.bodySmall),
                Text(
                  'Calculators',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.grey,
                  ),
                ),
                Text(' / ', style: theme.textTheme.bodySmall),
                Text(
                  activeName,
                  style: theme.textTheme.bodySmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
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
                Text(
                  activeName,
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Mode Tabs
            Scrollbar(
              controller: _tabScrollController,
              thumbVisibility:
                  true, // Ensures it is visible on desktop platforms
              child: SingleChildScrollView(
                controller: _tabScrollController,
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Row(
                  children: CalculatorMode.values.map((mode) {
                    final isSelected = state.mode == mode;
                    String name;
                    switch (mode) {
                      case CalculatorMode.standard:
                        name = 'Standard';
                        break;
                      case CalculatorMode.scientific:
                        name = 'Scientific';
                        break;
                      case CalculatorMode.astroPhysics:
                        name = 'AstroPhysics';
                        break;
                      case CalculatorMode.scienceEquation:
                        name = 'Science Equation';
                        break;
                    }
                    return Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: ChoiceChip(
                        label: Text(name),
                        labelPadding: const EdgeInsets.symmetric(
                          horizontal: 12.0,
                          vertical: 2.0,
                        ),
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
            color: theme.colorScheme.surfaceContainerHighest.withValues(
              alpha: 0.5,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
            ),
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
                                      Clipboard.setData(
                                        ClipboardData(
                                          text: state.history.join('\n'),
                                        ),
                                      );
                                      ScaffoldMessenger.of(
                                        context,
                                      ).showSnackBar(
                                        const SnackBar(
                                          content: Text(
                                            'Tape copied to clipboard',
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                  IconButton(
                                    icon: const Icon(
                                      Icons.delete,
                                      color: Colors.red,
                                    ),
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
                                  style: const TextStyle(
                                    fontFamily: 'JetBrains Mono',
                                    fontSize: 16,
                                  ),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text('Close'),
                            ),
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
                                child: Text(
                                  'No history yet',
                                  style: TextStyle(
                                    color: Colors.grey.withAlpha(100),
                                  ),
                                ),
                              ),
                            ...state.history.reversed.map(
                              (h) => Padding(
                                padding: const EdgeInsets.only(bottom: 8.0),
                                child: Text(
                                  h,
                                  style: TextStyle(
                                    fontFamily: 'JetBrains Mono',
                                    fontSize: 16,
                                    color: Colors.grey.withAlpha(150),
                                  ),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                            ),
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
                          state.expression.isEmpty ||
                                  !RegExp(
                                    r'[+\-×÷^%sctl!√πe\(\)]',
                                  ).hasMatch(state.expression)
                              ? ' '
                              : state.expression,
                          style: TextStyle(
                            fontFamily: 'JetBrains Mono',
                            fontSize: 18,
                            color:
                                theme.textTheme.bodySmall?.color ?? Colors.grey,
                          ),
                          textAlign: TextAlign.right,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          state.result,
                          style: TextStyle(
                            fontFamily: 'JetBrains Mono',
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: theme.textTheme.bodyLarge?.color,
                          ),
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
                        Clipboard.setData(
                          ClipboardData(
                            text: state.result.isEmpty
                                ? state.expression
                                : state.result,
                          ),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Copied to clipboard')),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        );

        Widget keypad = _buildKeypad(state.mode);
        final bool showDisplay =
            state.mode == CalculatorMode.standard ||
            state.mode == CalculatorMode.scientific;

        Widget content;
        if (isLandscape) {
          content = Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(flex: 3, child: keypad),
              if (showDisplay) ...[
                const SizedBox(width: 24),
                Expanded(flex: 2, child: display),
              ],
            ],
          );
        } else {
          content = LayoutBuilder(
            builder: (context, constraints) {
              return SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    minHeight: constraints.maxHeight,
                  ),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        if (showDisplay) ...[display, const SizedBox(height: 8)],
                        Expanded(child: keypad),
                        const SizedBox(height: 16),
                        const Center(
                          child: AdSlotWidget(
                            slotId: 'ad_calculator_inline',
                            adUnitPath: '/1234567/toolbox_calculator_inline',
                            width: 320,
                            height: 50,
                          ),
                        ),
                        const SizedBox(height: 16),
                        _buildSeoText(state.mode),
                      ],
                    ),
                  ),
                ),
              );
            },
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
              constraints: const BoxConstraints(maxWidth: 1200),
              child: Padding(
                padding: const EdgeInsets.only(
                  left: 16.0,
                  right: 16.0,
                  top: 0.0,
                  bottom: 8.0,
                ),
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
      case CalculatorMode.astroPhysics:
        return const AstroPhysicsCalc();
      case CalculatorMode.scienceEquation:
        return const ScienceEquationCalc();
    }
  }

  Widget _buildSeoText(CalculatorMode mode) {
    String title = '';
    String text = '';

    switch (mode) {
      case CalculatorMode.standard:
        title = 'About the Standard Calculator';
        text = 'The Hilmost Standard Calculator is your reliable, go-to tool for everyday arithmetic. Designed with a clean, distraction-free interface, it allows you to perform addition, subtraction, multiplication, and division effortlessly. Whether you are balancing a checkbook, calculating grocery expenses, or solving basic homework problems, this free online utility provides instant and precise results. \n\nHow to use it: Simply tap or click the large, ergonomic number pad to enter your digits. Use the operator buttons (+, -, ×, ÷) to chain multiple calculations together. The real-time display shows your current input along with the running equation, ensuring you never lose track of your work. You can easily clear your last entry or wipe the entire board with a single tap. Designed to be lightweight and blazing fast, this tool requires no downloads or sign-ups, offering immediate utility directly from your web browser or mobile device.';
        break;
      case CalculatorMode.scientific:
        title = 'About the Scientific Calculator';
        text = 'Elevate your mathematical capabilities with the Hilmost Scientific Calculator, a comprehensive online tool engineered for students, engineers, and professionals. Going far beyond basic arithmetic, this calculator is fully equipped to handle advanced trigonometry, logarithmic functions, exponents, and complex algebraic equations. It is the perfect digital companion for solving high-level physics, calculus, or chemistry problems without the need for an expensive physical device.\n\nHow to use it: The expansive keypad reveals specialized functions such as sine (sin), cosine (cos), tangent (tan), square roots, and factorials. You can seamlessly switch between degrees and radians to match your specific academic or professional requirements. Use the parentheses buttons to dictate the exact order of operations for multi-step equations. The intuitive display continuously updates as you type, providing real-time feedback. Enjoy a premium, ad-free calculation experience that is instantly accessible on any device, completely free of charge.';
        break;
      case CalculatorMode.astroPhysics:
        title = 'About the Astrophysics Calculator';
        text = 'Explore the cosmos from your screen with the Hilmost Astrophysics Calculator, a highly specialized tool designed for astronomers, physics students, and space enthusiasts. This unique utility comes pre-loaded with critical astronomical constants and formulas, allowing you to seamlessly calculate orbital mechanics, gravitational forces, escape velocities, and planetary masses. It bridges the gap between theoretical physics and accessible digital computation.\n\nHow to use it: Select from a comprehensive menu of built-in astrophysical constants—such as the Gravitational Constant (G), the speed of light (c), or Solar Mass—to instantly inject precise values into your equations. The calculator handles massive scientific notation and exponential figures with ease, ensuring perfect accuracy when dealing with cosmic scales. By streamlining the retrieval of complex variables, you can focus purely on solving advanced orbital and stellar calculations. Completely free and browser-based, it is your ultimate pocket observatory.';
        break;
      case CalculatorMode.scienceEquation:
        title = 'About the Equation Solver';
        text = 'Tackle complex algebra instantly with the Hilmost Equation Solver. This powerful mathematical utility is built to demystify polynomials, linear formulas, and quadratic equations. It is an indispensable resource for students checking their homework, educators demonstrating algebraic principles, or professionals requiring rapid mathematical resolution. Why struggle with manual factoring when you can get precise, instantaneous roots directly from your browser?\n\nHow to use it: Simply input your mathematical formula using the dedicated algebraic keypad, which includes quick-access buttons for variables like "x" and "y", as well as exponents and coefficients. The solver engine analyzes your input in real-time, applying advanced algorithmic logic to isolate variables and calculate the exact roots or solutions. It supports multi-variable parsing and handles complex syntax effortlessly. Enjoy completely free, instantaneous algebraic problem-solving without any required software downloads or registration.';
        break;
    }

    return SeoTextAccordion(title: title, content: text);
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
          'MC',
          'MR',
          'M+',
          'M−',
          '%',
          'CE',
          'C',
          '⌫',
          '1/x',
          'x²',
          '√',
          '÷',
          '7',
          '8',
          '9',
          '×',
          '4',
          '5',
          '6',
          '−',
          '1',
          '2',
          '3',
          '+',
          '±',
          '0',
          '.',
          '=',
        ];

        // Dynamic aspect ratio: fill the full available height evenly
        final double safeHeight = height > 50 ? height : 350;
        final double itemWidth = (width - (4 - 1) * 6) / 4;
        final double itemHeight = (safeHeight - (7 - 1) * 6) / 7;
        final double ratio = (itemHeight > 0 && itemWidth > 0)
            ? itemWidth / itemHeight
            : 1.6;

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
            final isAction = [
              'C',
              'CE',
              '⌫',
              '±',
              '1/x',
              'x²',
              '√',
              '%',
              'MC',
              'MR',
              'M+',
              'M−',
            ].contains(btn);

            final isActive =
                ref.watch(
                  calculatorControllerProvider.select((s) => s.activeKey),
                ) ==
                btn;

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
              bgColor = bgColor.withValues(
                alpha: 0.5,
              ); // Depressed visual effect
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
                      fontSize: itemHeight > 0
                          ? (itemHeight * 0.35).clamp(12.0, 24.0)
                          : 16,
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
