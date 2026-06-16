import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'retirement_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class RetirementCalculatorPage extends ConsumerWidget {
  const RetirementCalculatorPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(retirementControllerProvider);
    final controller = ref.read(retirementControllerProvider.notifier);
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
                  color: Colors.white,
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
                    Row(
                      children: [
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Current Age',
                            value: state.currentAge.toString(),
                            allowDecimal: false,
                            onChanged: (val) {
                              final v = int.tryParse(val);
                              if (v != null) controller.setCurrentAge(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Retirement Age',
                            value: state.retirementAge.toString(),
                            allowDecimal: false,
                            onChanged: (val) {
                              final v = int.tryParse(val);
                              if (v != null) controller.setRetirementAge(v);
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    _buildInputField(
                      context: context,
                      label: 'Current Savings (Principal)',
                      value: state.currentPrincipal.toString(),
                      suffix: ' \$',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setCurrentPrincipal(v);
                      },
                    ),
                    const SizedBox(height: 16),
                    _buildInputField(
                      context: context,
                      label: 'Annual Contribution',
                      value: state.annualContribution.toString(),
                      suffix: ' \$',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setAnnualContribution(v);
                      },
                    ),
                    const SizedBox(height: 24),
                    Row(
                      children: [
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Expected Return (%)',
                            value: state.expectedReturnRate.toString(),
                            suffix: ' %',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null)
                                controller.setExpectedReturnRate(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Inflation Rate (%)',
                            value: state.expectedInflationRate.toString(),
                            suffix: ' %',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null)
                                controller.setExpectedInflationRate(v);
                            },
                          ),
                        ),
                      ],
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
                      'Years to Retirement',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${state.yearsToRetirement} years',
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(height: 32),
                    Text(
                      'Projected Total Future Value',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '\$ ${NumberFormatter.format(state.futureValue, decimalPlaces: 2)}',
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        color: Colors.blueAccent,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Purchasing Power (Today\'s Value)',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '\$ ${NumberFormatter.format(state.purchasingPower, decimalPlaces: 2)}',
                      style: const TextStyle(
                        fontFamily: 'JetBrains Mono',
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                  ],
                ),
              );

              if (isDesktop) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 3, child: inputSection),
                    const SizedBox(width: 24),
                    Expanded(flex: 2, child: resultSection),
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
