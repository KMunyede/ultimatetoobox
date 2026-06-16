import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'unit_data.dart';
import 'unit_state.dart';
import '../../../shared/widgets/ad_slot_widget.dart';
import '../../../shared/widgets/seo_text_accordion.dart';
import '../../../shared/utils/number_formatter.dart';

class UnitPage extends ConsumerWidget {
  const UnitPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(unitControllerProvider);
    final controller = ref.read(unitControllerProvider.notifier);
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Unit Converter',
          style: theme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 24),

        // Category Tabs
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: unitCategories.map((cat) {
              final isSelected = state.category.name == cat.name;
              return Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: ChoiceChip(
                  label: Text(cat.name),
                  selected: isSelected,
                  onSelected: (selected) {
                    if (selected) controller.setCategory(cat);
                  },
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 24),

        // Conversion Card
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
                    child: _UnitInputPanel(
                      label: 'From',
                      value: NumberFormatter.format(state.fromValue),
                      unit: state.fromUnit,
                      units: state.category.units.keys.toList(),
                      onUnitChanged: (u) => controller.setFromUnit(u!),
                      onValueChanged: (v) {
                        final val = double.tryParse(v);
                        controller.setFromValue(val ?? 0);
                      },
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
                    child: _UnitInputPanel(
                      label: 'To',
                      value: NumberFormatter.format(state.toValue),
                      unit: state.toUnit,
                      units: state.category.units.keys.toList(),
                      onUnitChanged: (u) => controller.setToUnit(u!),
                      onValueChanged: (v) {
                        final val = double.tryParse(v);
                        controller.setToValue(val ?? 0);
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Text(
                'Formula: multiply base by scale and add offset',
                style: TextStyle(
                  color: Colors.grey.shade500,
                  fontStyle: FontStyle.italic,
                ),
              ),
              const SizedBox(height: 24),
              AdSlotWidget(
                slotId: 'ad_units_inline',
                adUnitPath: '/1234567/toolbox_units_inline',
                width: 300,
                height: 250,
              ),
              const SizedBox(height: 24),
              _buildSeoText(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSeoText() {
    return const SeoTextAccordion(
      title: 'About the Unit Converter',
      content: 'Instantly bridge the gap between different measurement systems with the Hilmost Unit Converter. Whether you are baking a recipe using the metric system, calculating travel distances in miles, or working on an engineering schematic requiring precise temperature shifts, this tool guarantees flawless conversions every time. With comprehensive support for Length, Weight, Temperature, Area, Volume, and Speed, it is an essential utility for daily life.\n\nHow to use it: First, select your desired measurement category from the dropdown menu at the top. Next, choose your starting unit ("From") and your target unit ("To"). As soon as you type a numerical value into either input box, the opposite box instantly updates with the precise converted value. This bi-directional calculation means you never have to guess which way to convert. The tool easily handles vast numbers and microscopic decimals, making it perfect for both casual use in the kitchen and professional use in the field.',
    );
  }
}

class _UnitInputPanel extends StatefulWidget {
  final String label;
  final String value;
  final String unit;
  final List<String> units;
  final ValueChanged<String?> onUnitChanged;
  final ValueChanged<String> onValueChanged;

  const _UnitInputPanel({
    required this.label,
    required this.value,
    required this.unit,
    required this.units,
    required this.onUnitChanged,
    required this.onValueChanged,
  });

  @override
  _UnitInputPanelState createState() => _UnitInputPanelState();
}

class _UnitInputPanelState extends State<_UnitInputPanel> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value);
  }

  @override
  void didUpdateWidget(_UnitInputPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != oldWidget.value && widget.value != _controller.text) {
      _controller.text = widget.value;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey.withValues(alpha: 0.3)),
            borderRadius: BorderRadius.circular(8),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              isExpanded: true,
              value: widget.unit,
              items: widget.units
                  .map((u) => DropdownMenuItem(value: u, child: Text(u)))
                  .toList(),
              onChanged: widget.onUnitChanged,
            ),
          ),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _controller,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
          decoration: InputDecoration(
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            filled: true,
            fillColor: Colors.transparent,
          ),
          onChanged: widget.onValueChanged,
        ),
      ],
    );
  }
}
