import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'vat_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class VatCalculatorPage extends ConsumerWidget {
  const VatCalculatorPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(vatControllerProvider);
    final controller = ref.read(vatControllerProvider.notifier);
    final theme = Theme.of(context);

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LayoutBuilder(
            builder: (context, constraints) {
              final isDesktop = constraints.maxWidth > 768;

              Widget inputSection = Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: theme.cardColor,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.04),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SegmentedButton<bool>(
                      segments: const [
                        ButtonSegment(value: true, label: Text('Add Tax')),
                        ButtonSegment(value: false, label: Text('Remove Tax')),
                      ],
                      selected: {state.isAddingTax},
                      onSelectionChanged: (Set<bool> newSelection) {
                        controller.setMode(addTax: newSelection.first);
                      },
                    ),
                    const SizedBox(height: 24),
                    _buildInputField(
                      context: context,
                      label: state.isAddingTax
                          ? 'Net Amount (Before Tax)'
                          : 'Gross Amount (After Tax)',
                      value: state.baseAmount.toString(),
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setBaseAmount(v);
                      },
                    ),
                    const SizedBox(height: 16),
                    _buildInputField(
                      context: context,
                      label: 'Tax Rate (%)',
                      value: state.taxRate.toString(),
                      suffix: ' %',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setTaxRate(v);
                      },
                    ),
                  ],
                ),
              );

              Widget resultSection = Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.primary.withValues(alpha: 0.08),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                  border: Border.all(
                    color: theme.colorScheme.primary.withValues(alpha: 0.1),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Net Amount (Before Tax)',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      NumberFormatter.format(state.netAmount, decimalPlaces: 2),
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Tax Amount',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      NumberFormatter.format(state.taxAmount, decimalPlaces: 2),
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.redAccent,
                      ),
                    ),
                    const Divider(height: 32),
                    Text(
                      'Gross Amount (After Tax)',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      NumberFormatter.format(
                        state.grossAmount,
                        decimalPlaces: 2,
                      ),
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              );

              if (isDesktop) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: inputSection),
                    const SizedBox(width: 24),
                    Expanded(child: resultSection),
                  ],
                );
              } else {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    inputSection,
                    const SizedBox(height: 24),
                    resultSection,
                  ],
                );
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildInputField({
    required BuildContext context,
    required String label,
    required String value,
    required ValueChanged<String> onChanged,
    String? suffix,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: value,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            suffixText: suffix,
          ),
          onChanged: onChanged,
        ),
      ],
    );
  }
}
