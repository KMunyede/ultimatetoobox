import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'tool_metadata_provider.g.dart';

class ToolMetadata {
  final String id;
  final String title;
  final String description;
  final String categoryRoute;
  final String seoCopyBlock;

  const ToolMetadata({
    required this.id,
    required this.title,
    required this.description,
    required this.categoryRoute,
    required this.seoCopyBlock,
  });
}

@riverpod
class ToolMetadataNotifier extends _$ToolMetadataNotifier {
  @override
  Map<String, ToolMetadata> build() {
    return {
      '/financial': const ToolMetadata(
        id: 'financial_hub',
        title: 'Financial Calculators & Tools | Hilmost Toolbox',
        description: 'Manage your money with our comprehensive suite of financial calculators including loans, interest, and budget planners.',
        categoryRoute: '/financial',
        seoCopyBlock: 'Hilmost Financial Tools provide expert-level precision for personal and professional finance management. From compound interest to salary conversion, we simplify complex calculations.',
      ),
      '/developer': const ToolMetadata(
        id: 'developer_hub',
        title: 'Developer Utilities & Data Tools | Hilmost Toolbox',
        description: 'Essential tools for developers: formatters, encoders, decoders, and data generators to streamline your workflow.',
        categoryRoute: '/developer',
        seoCopyBlock: 'Our Developer Toolkit is designed for speed and reliability. Whether you are debugging JSON, unscrambling words, or converting data formats, Hilmost has you covered.',
      ),
      '/wisdom-wellness': const ToolMetadata(
        id: 'wellness_hub',
        title: 'Wisdom & Wellness Health Tools | Hilmost Toolbox',
        description: 'Track your health and wellness goals with our BMI calculator, daily wisdom quotes, and health planners.',
        categoryRoute: '/wisdom-wellness',
        seoCopyBlock: 'Health and Wellness are the foundation of a productive life. Hilmost provides accessible tools like BMI tracking to help you maintain a balanced lifestyle.',
      ),
    };
  }

  /// Optimized search method to find tool metadata by its path
  ToolMetadata? findToolByPath(String path) {
    // Exact match lookup
    if (state.containsKey(path)) {
      return state[path];
    }
    
    // Fallback: Check if the path starts with a category route
    for (final entry in state.entries) {
      if (path.startsWith(entry.key)) {
        return entry.value;
      }
    }
    
    return null;
  }
}
