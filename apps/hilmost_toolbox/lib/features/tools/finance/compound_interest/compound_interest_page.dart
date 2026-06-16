import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'compound_interest_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class CompoundInterestPage extends ConsumerWidget {
  const CompoundInterestPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(compoundControllerProvider);
    final controller = ref.read(compoundControllerProvider.notifier);
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
                  border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildInputField(
                      context: context,
                      label: 'Initial Principal',
                      value: state.principal.toString(),
                      suffix: ' \$',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setPrincipal(v);
                      },
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          flex: 2,
                          child: _buildInputField(
                            context: context,
                            label: 'Contribution Amount',
                            value: state.monthlyContribution.toString(),
                            suffix: ' \$',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setContribution(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          flex: 1,
                          child: _buildDropdown(
                            label: 'Frequency',
                            value: state.contributionFrequency,
                            items: const [
                              DropdownMenuItem(
                                value: ContributionFrequency.monthly,
                                child: Text('Monthly'),
                              ),
                              DropdownMenuItem(
                                value: ContributionFrequency.annually,
                                child: Text('Annually'),
                              ),
                              DropdownMenuItem(
                                value: ContributionFrequency.none,
                                child: Text('None'),
                              ),
                            ],
                            onChanged: (val) =>
                                controller.setContributionFrequency(val!),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    _buildInputField(
                      context: context,
                      label: 'Annual Interest Rate',
                      value: state.interestRate.toString(),
                      suffix: ' %',
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setInterestRate(v);
                      },
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          flex: 2,
                          child: _buildInputField(
                            context: context,
                            label: 'Time Duration',
                            value: state.years.toString(),
                            allowDecimal: true,
                            suffix: ' Yrs',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setYears(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          flex: 2,
                          child: _buildDropdown(
                            label: 'Compound',
                            value: state.compoundFrequency,
                            items: const [
                              DropdownMenuItem(
                                value: CompoundFrequency.annually,
                                child: Text('Annually'),
                              ),
                              DropdownMenuItem(
                                value: CompoundFrequency.semiAnnually,
                                child: Text('Semi-Annually'),
                              ),
                              DropdownMenuItem(
                                value: CompoundFrequency.quarterly,
                                child: Text('Quarterly'),
                              ),
                              DropdownMenuItem(
                                value: CompoundFrequency.monthly,
                                child: Text('Monthly'),
                              ),
                              DropdownMenuItem(
                                value: CompoundFrequency.daily,
                                child: Text('Daily'),
                              ),
                            ],
                            onChanged: (val) =>
                                controller.setCompoundFrequency(val!),
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
                  color: theme.colorScheme.secondary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: theme.colorScheme.secondary),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Future Investment Value',
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
                      ),
                    ),
                    const Divider(height: 32),
                    _buildResultRow(
                      'Total Contributions',
                      '\$ ${NumberFormatter.format(state.totalContributions, decimalPlaces: 2)}',
                    ),
                    const SizedBox(height: 12),
                    _buildResultRow(
                      'Total Interest Earned',
                      '\$ ${NumberFormatter.format(state.totalInterestEarned, decimalPlaces: 2)}',
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

  Widget _buildResultRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(fontSize: 16, color: Colors.grey)),
        Text(
          value,
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 18,
            fontWeight: FontWeight.bold,
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
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: value,
          keyboardType: TextInputType.numberWithOptions(decimal: allowDecimal),
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
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
            borderRadius: BorderRadius.circular(8),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<T>(
              isExpanded: true,
              value: value,
              items: items,
              onChanged: onChanged,
            ),
          ),
        ),
      ],
    );
  }
}
