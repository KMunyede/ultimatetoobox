import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'salary_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class SalaryConverterPage extends ConsumerWidget {
  const SalaryConverterPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(salaryControllerProvider);
    final controller = ref.read(salaryControllerProvider.notifier);
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
                    Row(
                      children: [
                        Expanded(
                          flex: 2,
                          child: _buildInputField(
                            context: context,
                            label: 'Base Wage',
                            value: state.inputAmount.toString(),
                            suffix: ' \$',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setInputAmount(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          flex: 1,
                          child: _buildDropdown(
                            label: 'Period',
                            value: state.inputPeriod,
                            items: const [
                              DropdownMenuItem(
                                value: PayPeriod.hourly,
                                child: Text('Hourly'),
                              ),
                              DropdownMenuItem(
                                value: PayPeriod.daily,
                                child: Text('Daily'),
                              ),
                              DropdownMenuItem(
                                value: PayPeriod.weekly,
                                child: Text('Weekly'),
                              ),
                              DropdownMenuItem(
                                value: PayPeriod.monthly,
                                child: Text('Monthly'),
                              ),
                              DropdownMenuItem(
                                value: PayPeriod.annual,
                                child: Text('Annual'),
                              ),
                            ],
                            onChanged: (val) => controller.setInputPeriod(val!),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Assumptions',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Hours/Week',
                            value: state.hoursPerWeek.toString(),
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setHoursPerWeek(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Days/Week',
                            value: state.daysPerWeek.toString(),
                            allowDecimal: false,
                            onChanged: (val) {
                              final v = int.tryParse(val);
                              if (v != null) controller.setDaysPerWeek(v);
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
                    _buildResultRow(
                      'Annual Salary',
                      state.annual,
                      isPrimary: true,
                    ),
                    const Divider(height: 32),
                    _buildResultRow('Monthly', state.monthly),
                    const SizedBox(height: 16),
                    _buildResultRow('Weekly', state.weekly),
                    const SizedBox(height: 16),
                    _buildResultRow('Daily', state.daily),
                    const SizedBox(height: 16),
                    _buildResultRow('Hourly', state.hourly),
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

  Widget _buildResultRow(String label, double value, {bool isPrimary = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: isPrimary ? 20 : 16,
            color: isPrimary ? Colors.black87 : Colors.grey,
            fontWeight: isPrimary ? FontWeight.bold : FontWeight.normal,
          ),
        ),
        Text(
          '\$ ${NumberFormatter.format(value, decimalPlaces: 2)}',
          style: TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: isPrimary ? 32 : 18,
            fontWeight: FontWeight.bold,
            color: isPrimary ? Colors.green.shade700 : Colors.black87,
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

  Widget _buildDropdown<T>({
    required String label,
    required T value,
    required List<DropdownMenuItem<T>> items,
    required ValueChanged<T?> onChanged,
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
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
          height: 48,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey.withValues(alpha: 0.4)),
            borderRadius: BorderRadius.circular(8),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<T>(
              isExpanded: true,
              value: value,
              items: items,
              onChanged: onChanged,
              style: const TextStyle(
                fontSize: 16,
                color: Colors.black87,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
