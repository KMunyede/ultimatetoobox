import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'bmi_state.dart';
import 'bmi_utils.dart';
import 'bmi_gauge.dart';
import '../../../shared/widgets/ad_slot_widget.dart';

class BmiPage extends ConsumerWidget {
  const BmiPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(bmiControllerProvider);
    final controller = ref.read(bmiControllerProvider.notifier);

    final BmiResult result = state.unit == BmiUnit.metric
        ? BmiUtils.calculateMetric(state.heightCm, state.weightKg)
        : BmiUtils.calculateImperial(state.heightFeet, state.heightInches, state.weightLbs);

    final inputColumn = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SegmentedButton<BmiUnit>(
          segments: const [
            ButtonSegment(value: BmiUnit.metric, label: Text('Metric')),
            ButtonSegment(value: BmiUnit.imperial, label: Text('Imperial')),
          ],
          selected: {state.unit},
          onSelectionChanged: (Set<BmiUnit> newSelection) {
            controller.setUnit(newSelection.first);
          },
        ),
        const SizedBox(height: 24),
        if (state.unit == BmiUnit.metric) ...[
          _buildSlider('Height (cm)', state.heightCm, 100, 250, (val) => controller.setMetricHeight(val)),
          const SizedBox(height: 16),
          _buildSlider('Weight (kg)', state.weightKg, 30, 200, (val) => controller.setMetricWeight(val)),
        ] else ...[
          _buildSlider('Height (feet)', state.heightFeet, 3, 8, (val) => controller.setImperialHeight(val, state.heightInches), divisions: 5),
          const SizedBox(height: 16),
          _buildSlider('Height (inches)', state.heightInches, 0, 11, (val) => controller.setImperialHeight(state.heightFeet, val), divisions: 11),
          const SizedBox(height: 16),
          _buildSlider('Weight (lbs)', state.weightLbs, 60, 400, (val) => controller.setImperialWeight(val)),
        ],
      ],
    );

    final outputColumn = Column(
      children: [
        BmiGauge(bmi: result.bmi),
        const SizedBox(height: 24),
        Text(
          result.bmi.toStringAsFixed(1),
          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, fontFamily: 'JetBrains Mono'),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: result.color.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: result.color),
          ),
          child: Text(
            result.categoryLabel,
            style: TextStyle(color: result.color, fontWeight: FontWeight.bold, fontSize: 18),
          ),
        ),
        const SizedBox(height: 16),
        Text('Healthy Weight Range: ${result.healthyRangeStr}', style: const TextStyle(color: Colors.grey)),
        const SizedBox(height: 24),
        AdSlotWidget(
          slotId: 'ad_bmi_inline',
          adUnitPath: '/1234567/toolbox_bmi_inline',
          width: 300,
          height: 250,
        ),
      ],
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('BMI Calculator', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 24),
        Container(
          decoration: BoxDecoration(
            color: Theme.of(context).cardColor,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          padding: const EdgeInsets.all(24),
          child: LayoutBuilder(
            builder: (context, constraints) {
              if (constraints.maxWidth > 700) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: inputColumn),
                    const SizedBox(width: 48),
                    Expanded(child: outputColumn),
                  ],
                );
              } else {
                return Column(
                  children: [
                    inputColumn,
                    const SizedBox(height: 48),
                    outputColumn,
                  ],
                );
              }
            },
          ),
        ),
        const SizedBox(height: 24),
        const Text(
          'For informational purposes only. Consult a healthcare professional.',
          style: TextStyle(color: Colors.grey, fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildSlider(String label, double value, double min, double max, Function(double) onChanged, {int? divisions}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
            Text(value.toStringAsFixed(1), style: const TextStyle(fontFamily: 'JetBrains Mono')),
          ],
        ),
        Slider(
          value: value,
          min: min,
          max: max,
          divisions: divisions,
          onChanged: onChanged,
        ),
      ],
    );
  }
}
