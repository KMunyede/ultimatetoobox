import 'package:flutter/services.dart';

class KeyboardMappingEngine {
  final Map<LogicalKeyboardKey, String> defaultKeyMap = {
    LogicalKeyboardKey.numpad0: '0', LogicalKeyboardKey.digit0: '0',
    LogicalKeyboardKey.numpad1: '1', LogicalKeyboardKey.digit1: '1',
    LogicalKeyboardKey.numpad2: '2', LogicalKeyboardKey.digit2: '2',
    LogicalKeyboardKey.numpad3: '3', LogicalKeyboardKey.digit3: '3',
    LogicalKeyboardKey.numpad4: '4', LogicalKeyboardKey.digit4: '4',
    LogicalKeyboardKey.numpad5: '5', LogicalKeyboardKey.digit5: '5',
    LogicalKeyboardKey.numpad6: '6', LogicalKeyboardKey.digit6: '6',
    LogicalKeyboardKey.numpad7: '7', LogicalKeyboardKey.digit7: '7',
    LogicalKeyboardKey.numpad8: '8', LogicalKeyboardKey.digit8: '8',
    LogicalKeyboardKey.numpad9: '9', LogicalKeyboardKey.digit9: '9',
    LogicalKeyboardKey.numpadAdd: '+',
    LogicalKeyboardKey.numpadSubtract: '-',
    LogicalKeyboardKey.numpadMultiply: '×',
    LogicalKeyboardKey.numpadDivide: '÷',
    LogicalKeyboardKey.numpadEnter: '=',
    LogicalKeyboardKey.enter: '=',
    LogicalKeyboardKey.equal: '=',
    LogicalKeyboardKey.backspace: '⌫',
    LogicalKeyboardKey.delete: '⌫',
    LogicalKeyboardKey.escape: 'C',
    LogicalKeyboardKey.numpadDecimal: '.',
  };

  final Map<String, String> defaultLabelMap = {
    '+': '+', '-': '−', '*': '×', '/': '÷', '.': '.',
    '(': '(', ')': ')', '^': 'x^y', '%': '%',
    's': 'sin', 'c': 'cos', 't': 'tan',
    'S': 'sinh', 'C': 'cosh', 'T': 'tanh',
    'l': 'log', 'n': 'ln', 'r': '√', 'R': '1/x',
    'p': 'π', 'e': 'e', '!': 'n!',
  };

  String? mapKeyEvent(KeyEvent event, {Map<String, String>? customOverrides}) {
    if (event is KeyDownEvent || event is KeyUpEvent) {
      final key = event.logicalKey;
      
      // 1. Check exact logical key mapping (e.g. Numpad or structural keys)
      if (defaultKeyMap.containsKey(key)) {
        return defaultKeyMap[key];
      }

      // 2. Check label mapping (character keys)
      final label = key.keyLabel;
      if (label.isNotEmpty) {
        // Custom overrides first (e.g. Astrophysics might override 'c' to mean Speed of Light instead of cos)
        if (customOverrides != null && customOverrides.containsKey(label)) {
          return customOverrides[label];
        }

        // Default label map
        if (defaultLabelMap.containsKey(label)) {
          return defaultLabelMap[label];
        }
      }
    }
    return null;
  }
}
