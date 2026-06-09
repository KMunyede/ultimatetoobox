import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'physics_data.dart';
import 'physics_state.dart';

class PhysicsPage extends ConsumerWidget {
  const PhysicsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(physicsControllerProvider);
    final controller = ref.read(physicsControllerProvider.notifier);
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Physics Equation Solver', style: theme.textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: theme.cardColor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Select Formula', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<PhysicsFormula>(
                    isExpanded: true,
                    value: state.formula,
                    items: physicsFormulas.map((f) {
                      return DropdownMenuItem(
                        value: f,
                        child: Text('${f.name} (${f.formula})'),
                      );
                    }).toList(),
                    onChanged: (val) => controller.setFormula(val!),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              // Inputs grid
              Wrap(
                spacing: 16,
                runSpacing: 16,
                children: state.formula.variables.map((v) {
                  return SizedBox(
                    width: 250,
                    child: TextFormField(
                      key: ValueKey('${state.formula.name}_$v'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: v,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      onChanged: (val) {
                        final parsed = double.tryParse(val);
                        controller.setInput(v, parsed);
                      },
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 32),
              
              // Result
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: theme.colorScheme.secondary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: theme.colorScheme.secondary),
                ),
                child: Column(
                  children: [
                    Text(
                      state.formula.targetVariable,
                      style: TextStyle(color: theme.colorScheme.secondary, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      state.result != null ? state.result!.toStringAsFixed(4).replaceAll(RegExp(r'0*$'), '').replaceAll(RegExp(r'\.$'), '') : '---',
                      style: const TextStyle(fontFamily: 'JetBrains Mono', fontSize: 48, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
