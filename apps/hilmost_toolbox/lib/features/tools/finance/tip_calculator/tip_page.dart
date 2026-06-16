import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'tip_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class TipCalculatorPage extends ConsumerWidget {
  const TipCalculatorPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(tipControllerProvider);
    final controller = ref.read(tipControllerProvider.notifier);
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
                    _buildInputField(
                      context: context,
                      label: 'Bill Amount',
                      value: state.billAmount.toString(),
                      suffix: ' \$',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setBillAmount(v);
                      },
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Tip Percentage',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8.0,
                      runSpacing: 8.0,
                      children: [10.0, 15.0, 18.0, 20.0].map((percent) {
                        return ChoiceChip(
                          label: Text('${percent.toInt()}%'),
                          selected: state.tipPercentage == percent,
                          onSelected: (selected) {
                            if (selected) controller.setTipPercentage(percent);
                          },
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 12),
                    _buildInputField(
                      context: context,
                      label: 'Custom Tip (%)',
                      value: state.tipPercentage.toString(),
                      suffix: ' %',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setTipPercentage(v);
                      },
                    ),
                    const SizedBox(height: 24),
                    _buildInputField(
                      context: context,
                      label: 'Split among (People)',
                      value: state.peopleCount.toString(),
                      allowDecimal: false,
                      onChanged: (val) {
                        final v = int.tryParse(val);
                        if (v != null) controller.setPeopleCount(v);
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
                      'Total Per Person',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '\$ ${NumberFormatter.format(state.totalPerPerson, decimalPlaces: 2)}',
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 42,
                        fontWeight: FontWeight.bold,
                        color: Colors.blueAccent,
                      ),
                    ),
                    const Divider(height: 32),
                    _buildResultRow('Tip Per Person', state.tipPerPerson),
                    const SizedBox(height: 16),
                    _buildResultRow('Total Tip', state.tipAmount),
                    const SizedBox(height: 16),
                    _buildResultRow('Total Bill', state.totalBill),
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

  Widget _buildResultRow(String label, double value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(fontSize: 16, color: Colors.grey)),
        Text(
          '\$ ${NumberFormatter.format(value, decimalPlaces: 2)}',
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
      ],
    );
  }

  Widget _buildInputField({
    required BuildContext context,
    required String label,
    required String value,
    required ValueChanged<String> onChanged,
    String? suffix,
    bool allowDecimal = true,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.grey,
            fontSize: 12,
          ),
        ),
        const SizedBox(height: 4),
        TextFormField(
          initialValue: value,
          keyboardType: TextInputType.numberWithOptions(decimal: allowDecimal),
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            suffixText: suffix,
            isDense: true,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 12,
            ),
          ),
          onChanged: onChanged,
        ),
      ],
    );
  }
}
