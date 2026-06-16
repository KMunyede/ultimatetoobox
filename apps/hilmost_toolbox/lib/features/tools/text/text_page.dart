import 'package:flutter/material.dart';
import 'word_unscrambler_page.dart';

class TextPage extends StatefulWidget {
  const TextPage({super.key});

  @override
  State<TextPage> createState() => _TextPageState();
}

class _TextPageState extends State<TextPage> {
  int _selectedIndex = 0;

  final List<Map<String, dynamic>> _tools = [
    {
      'name': 'Word Unscrambler',
      'icon': Icons.sort_by_alpha,
      'widget': const WordUnscramblerPage(),
    },
    // Future tools like PDF converters, JSON to HTML converters can be added here
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final selectedTool = _tools[_selectedIndex];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Text, Data & Files Tools',
          style: theme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 24),

        // Tool Selection Tabs
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: List.generate(_tools.length, (index) {
              final tool = _tools[index];
              final isSelected = _selectedIndex == index;
              return Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: ChoiceChip(
                  label: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        tool['icon'] as IconData,
                        size: 16,
                        color: isSelected ? Colors.white : Colors.black87,
                      ),
                      const SizedBox(width: 8),
                      Text(tool['name'] as String),
                    ],
                  ),
                  selected: isSelected,
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _selectedIndex = index;
                      });
                    }
                  },
                ),
              );
            }),
          ),
        ),
        const SizedBox(height: 32),

        // Display Selected Tool
        selectedTool['widget'] as Widget,
      ],
    );
  }
}
