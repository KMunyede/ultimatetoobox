import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../calculator_state.dart';

class ScientificKeypad extends ConsumerWidget {
  const ScientificKeypad({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(calculatorControllerProvider);
    final controller = ref.read(calculatorControllerProvider.notifier);
    final theme = Theme.of(context);

    final isRad = state.isRadians;
    final buttons = [
      'MC', 'MR', 'M+', 'M−', '%',
      isRad ? 'RAD' : 'DEG', 'CONST', '∑', 'C', '⌫',
      'sinh', 'cosh', 'tanh', 'π', 'e',
      'sin', 'cos', 'tan', '(', ')',
      'x²', '1/x', '√', 'n!', '÷',
      'x^y', '7', '8', '9', '×',
      '10^x', '4', '5', '6', '−',
      'log', '1', '2', '3', '+',
      'ln', '±', '0', '.', '=',
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;
        final double height = constraints.maxHeight;
        
        final double safeHeight = height > 50 ? height : 350;
        final double itemWidth = (width - (5 - 1) * 4) / 5;
        final double itemHeight = (safeHeight - (9 - 1) * 4) / 9;
        final double ratio = (itemHeight > 0 && itemWidth > 0) ? itemWidth / itemHeight : 1.6;

        Widget grid = GridView.builder(
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
        final isAction = ['C', '⌫', '±', 'MC', 'MR', 'M+', 'M−', '%'].contains(btn);
        final isMath = !isOp && !isAction && double.tryParse(btn) == null && btn != '.';

        final isActive = state.activeKey == btn;

        Color bgColor = theme.cardColor;
        Color fgColor = theme.textTheme.bodyLarge!.color!;

        if (isOp) {
          bgColor = theme.colorScheme.primary;
          fgColor = theme.colorScheme.onPrimary;
        } else if (isAction) {
          bgColor = theme.colorScheme.secondary.withAlpha(50);
          fgColor = theme.colorScheme.secondary;
        } else if (isMath) {
          bgColor = theme.colorScheme.surfaceContainerHighest;
          fgColor = theme.colorScheme.onSurfaceVariant;
        }

        if (isActive) {
          bgColor = bgColor.withValues(alpha: 0.5);
        }

        return Material(
          color: bgColor,
          borderRadius: BorderRadius.circular(8),
          child: InkWell(
            borderRadius: BorderRadius.circular(8),
            onTap: () {
              if (btn == 'C') {
                controller.clear();
              } else if (btn == '⌫') {
                controller.backspace();
              } else if (btn == '=') {
                controller.evaluateFinal();
              } else if (btn == '±') {
                controller.toggleSign();
              } else if (btn == 'RAD' || btn == 'DEG') {
                controller.toggleAngleMode();
              } else if (btn == 'MC') {
                controller.memoryClear();
              } else if (btn == 'MR') {
                controller.memoryRecall();
              } else if (btn == 'M+') {
                controller.memoryAdd();
              } else if (btn == 'M−') {
                controller.memorySubtract();
              } else if (btn == '%') {
                controller.applyPercentage();
              } else if (btn == 'CONST') {
                showMenu(
                  context: context,
                  position: const RelativeRect.fromLTRB(100, 100, 0, 0),
                  items: [
                    const PopupMenuItem(value: '3.14159265359', child: Text('π (Pi)')),
                    const PopupMenuItem(value: '2.71828182846', child: Text('e (Euler)')),
                    const PopupMenuItem(value: '1.989e30', child: Text('1 Solar Mass (kg)')),
                    const PopupMenuItem(value: '5.972e24', child: Text('1 Earth Mass (kg)')),
                    const PopupMenuItem(value: '1.898e27', child: Text('1 Jupiter Mass (kg)')),
                    const PopupMenuItem(value: '9.461e15', child: Text('1 Light Year (m)')),
                    const PopupMenuItem(value: '3.086e16', child: Text('1 Parsec (m)')),
                    const PopupMenuItem(value: '1.496e11', child: Text('1 AU (m)')),
                    const PopupMenuItem(value: '6.371e6', child: Text('Earth Radius (m)')),
                    const PopupMenuItem(value: '6.957e8', child: Text('Solar Radius (m)')),
                    const PopupMenuItem(value: '299792458', child: Text('c (Light Speed)')),
                    const PopupMenuItem(value: '6.6743e-11', child: Text('G (Gravitational)')),
                    const PopupMenuItem(value: '6.62607e-34', child: Text('h (Planck)')),
                    const PopupMenuItem(value: '6.02214e23', child: Text('N_A (Avogadro)')),
                    const PopupMenuItem(value: '8.31446', child: Text('R (Gas Constant)')),
                    const PopupMenuItem(value: '1.38065e-23', child: Text('k_B (Boltzmann)')),
                    const PopupMenuItem(value: '1.60218e-19', child: Text('e (Elem Charge)')),
                  ],
                ).then((value) {
                  if (value != null) controller.append(value);
                });
              } else {
                if (['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'asin', 'acos', 'atan', 'log', 'ln'].contains(btn)) {
                  controller.appendFunction('\\$btn(');
                } else if (btn == '√') {
                  controller.appendFunction('√(');
                } else if (btn == '1/x') {
                  controller.appendFunction('1/(');
                } else if (btn == '10^x') {
                  controller.appendFunction('10^(');
                } else if (btn == 'x²') {
                  controller.appendSuffix('^2');
                } else if (btn == 'n!') {
                  controller.appendSuffix('!');
                } else if (btn == 'π') {
                  controller.append('\\pi');
                } else if (btn == '∑') {
                  controller.append('\\sum_{x=1}^{10}(x)');
                } else if (btn == 'x^y') {
                  controller.append('^');
                } else {
                  controller.append(btn);
                }
              }
            },
            child: Center(
              child: Text(
                btn,
                style: TextStyle(
                  fontSize: itemHeight > 0 ? (itemHeight * 0.35).clamp(12.0, 24.0) : 16,
                  fontWeight: isMath ? FontWeight.w600 : FontWeight.bold,
                  color: fgColor,
                ),
              ),
            ),
          ),
        );
      },
    );
        
    return grid;
      },
    );
  }
}
