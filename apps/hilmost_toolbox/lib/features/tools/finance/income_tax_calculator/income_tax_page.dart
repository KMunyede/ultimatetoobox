import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'income_tax_state.dart';
import '../../../../shared/utils/number_formatter.dart';

class IncomeTaxCalculatorPage extends ConsumerWidget {
  const IncomeTaxCalculatorPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(incomeTaxControllerProvider);
    final controller = ref.read(incomeTaxControllerProvider.notifier);
    final theme = Theme.of(context);

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LayoutBuilder(
            builder: (context, constraints) {
              final isDesktop = constraints.maxWidth > 800;

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
                            label: 'Gross Annual Income',
                            value: state.grossAnnualIncome.toString(),
                            suffix: ' \$',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setGrossIncome(v);
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildInputField(
                            context: context,
                            label: 'Pre-Tax Deductions',
                            value: state.preTaxDeductions.toString(),
                            suffix: ' \$',
                            onChanged: (val) {
                              final v = double.tryParse(val);
                              if (v != null) controller.setDeductions(v);
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 32),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Tax Brackets',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        TextButton.icon(
                          onPressed: () => controller.addBracket(),
                          icon: const Icon(Icons.add, size: 16),
                          label: const Text('Add Bracket'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: Colors.grey.withValues(alpha: 0.2),
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: state.brackets.length,
                        separatorBuilder: (context, index) =>
                            const Divider(height: 1),
                        itemBuilder: (context, index) {
                          final bracket = state.brackets[index];
                          final isLast = index == state.brackets.length - 1;

                          return Padding(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  flex: 3,
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'From',
                                        style: TextStyle(
                                          fontSize: 10,
                                          color: Colors.grey,
                                        ),
                                      ),
                                      Text(
                                        '\$ ${NumberFormatter.format(bracket.minIncome, decimalPlaces: 0)}',
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const Padding(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 8.0,
                                  ),
                                  child: Text(
                                    'to',
                                    style: TextStyle(color: Colors.grey),
                                  ),
                                ),
                                Expanded(
                                  flex: 4,
                                  child: isLast
                                      ? const Text(
                                          ' Infinity',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontStyle: FontStyle.italic,
                                            color: Colors.grey,
                                          ),
                                        )
                                      : TextFormField(
                                          initialValue: bracket.maxIncome?.toString() ?? '',
                                          keyboardType: const TextInputType.numberWithOptions(decimal: true),
                                          style: const TextStyle(fontWeight: FontWeight.bold),
                                          decoration: InputDecoration(
                                            prefixText: '\$ ',
                                            isDense: true,
                                            contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(4)),
                                          ),
                                          onChanged: (val) {
                                            final v = double.tryParse(val);
                                            if (v != null) controller.updateBracketMax(index, v);
                                          },
                                        ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  flex: 2,
                                  child: TextFormField(
                                    initialValue: bracket.rate.toString(),
                                    keyboardType: const TextInputType.numberWithOptions(decimal: true),
                                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.blue),
                                    decoration: InputDecoration(
                                      suffixText: '%',
                                      isDense: true,
                                      contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(4)),
                                    ),
                                    onChanged: (val) {
                                      final v = double.tryParse(val);
                                      if (v != null) controller.updateBracketRate(index, v);
                                    },
                                  ),
                                ),
                                IconButton(
                                  icon: const Icon(
                                    Icons.close,
                                    size: 16,
                                    color: Colors.red,
                                  ),
                                  onPressed: () =>
                                      controller.removeBracket(index),
                                  padding: EdgeInsets.zero,
                                  constraints: const BoxConstraints(),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
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
                      'Net Annual Income',
                      state.netAnnualIncome,
                      isPrimary: true,
                    ),
                    const Divider(height: 32),
                    _buildResultRow(
                      'Net Monthly Income',
                      state.netMonthlyIncome,
                    ),
                    const SizedBox(height: 16),
                    _buildResultRow('Total Tax Paid', state.totalTaxPaid),
                    const SizedBox(height: 16),
                    _buildResultRow(
                      'Effective Tax Rate',
                      state.effectiveTaxRate,
                      isPercent: true,
                    ),
                    const SizedBox(height: 16),
                    _buildResultRow('Taxable Income', state.taxableIncome),
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

  Widget _buildResultRow(
    String label,
    double value, {
    bool isPrimary = false,
    bool isPercent = false,
  }) {
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
          isPercent
              ? '${NumberFormatter.format(value, decimalPlaces: 2)}%'
              : '\$ ${NumberFormatter.format(value, decimalPlaces: 2)}',
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
}
