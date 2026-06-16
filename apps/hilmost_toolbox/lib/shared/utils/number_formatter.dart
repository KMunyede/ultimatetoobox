class NumberFormatter {
  static bool useScientificNotation = false;

  /// Formats a number according to the global Sci-Fi toggle:
  /// - If Sci-Fi is ON, uses scientific notation.
  /// - If Sci-Fi is OFF, uses a standard decimal string, trimming trailing zeros.
  static String format(double value, {int decimalPlaces = 4}) {
    if (value.isNaN) return 'NaN';
    if (value.isInfinite) return 'Infinity';
    if (value == 0) return '0';

    if (useScientificNotation) {
      return value.toStringAsExponential(decimalPlaces);
    } else {
      String str = value.toStringAsFixed(decimalPlaces);
      if (str.contains('.')) {
        str = str.replaceAll(RegExp(r'0*$'), ''); // Remove trailing zeros
        if (str.endsWith('.')) {
          str = str.substring(0, str.length - 1); // Remove trailing dot
        }
      }
      return str;
    }
  }
}
