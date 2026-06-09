import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../shared/utils/number_formatter.dart';

class SciFiNotifier extends Notifier<bool> {
  @override
  bool build() {
    return false;
  }

  void toggle() {
    state = !state;
    NumberFormatter.useScientificNotation = state;
  }
}

final sciFiProvider = NotifierProvider<SciFiNotifier, bool>(SciFiNotifier.new);
