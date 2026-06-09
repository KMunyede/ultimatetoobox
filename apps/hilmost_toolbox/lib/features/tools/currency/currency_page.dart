import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'currency_data.dart';
import 'currency_state.dart';
import '../../../shared/utils/number_formatter.dart';

class CurrencyPage extends ConsumerWidget {
  const CurrencyPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(currencyControllerProvider);
    final controller = ref.read(currencyControllerProvider.notifier);
    final theme = Theme.of(context);

    double result = 0.0;
    if (state.rates != null && state.rates!.rates.containsKey(state.toCode)) {
      result = state.amount * state.rates!.rates[state.toCode]!;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Currency Converter', style: theme.textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: theme.cardColor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: _buildCurrencyDropdown(
                      context,
                      label: 'From',
                      value: state.fromCode,
                      onChanged: (val) => controller.setFromCode(val!),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: IconButton(
                      icon: const Icon(Icons.swap_horiz, size: 32),
                      color: theme.colorScheme.secondary,
                      onPressed: () => controller.swap(),
                    ),
                  ),
                  Expanded(
                    child: _buildCurrencyDropdown(
                      context,
                      label: 'To',
                      value: state.toCode,
                      onChanged: (val) => controller.setToCode(val!),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      initialValue: state.amount.toString(),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      style: const TextStyle(fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: FontWeight.bold),
                      decoration: InputDecoration(
                        labelText: 'Amount',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      onChanged: (val) {
                        final v = double.tryParse(val);
                        if (v != null) controller.setAmount(v);
                      },
                    ),
                  ),
                  const SizedBox(width: 24),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.secondary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: theme.colorScheme.secondary),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          if (state.isLoading)
                            const LinearProgressIndicator()
                          else if (state.error != null)
                            Text('Error loading rates', style: const TextStyle(color: Colors.red))
                          else
                            Text(
                              NumberFormatter.format(result, decimalPlaces: 2),
                              style: const TextStyle(fontFamily: 'JetBrains Mono', fontSize: 32, fontWeight: FontWeight.bold),
                            ),
                          const SizedBox(height: 4),
                          Text(
                            '${NumberFormatter.format(state.amount, decimalPlaces: 2)} ${state.fromCode} = ${NumberFormatter.format(result, decimalPlaces: 2)} ${state.toCode}',
                            style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              if (state.rates != null)
                Text(
                  'Rates updated: ${state.rates!.timestamp.toString().split('.')[0]}',
                  style: TextStyle(color: Colors.grey.shade500, fontStyle: FontStyle.italic, fontSize: 12),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCurrencyDropdown(BuildContext context, {required String label, required String value, required ValueChanged<String?> onChanged}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
            borderRadius: BorderRadius.circular(8),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              isExpanded: true,
              value: value,
              items: currencies.map((c) {
                return DropdownMenuItem(
                  value: c.code,
                  child: Text('${c.flag} ${c.code} - ${c.name}'),
                );
              }).toList(),
              onChanged: onChanged,
            ),
          ),
        ),
      ],
    );
  }
}
