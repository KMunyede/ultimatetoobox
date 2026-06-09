import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class ThemeModeNotifier extends Notifier<ThemeMode> {
  @override
  // Force light mode as the default for new layout
  ThemeMode build() => ThemeMode.light;
  
  void toggle() {
    state = state == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
  }
}

final themeModeProvider = NotifierProvider<ThemeModeNotifier, ThemeMode>(ThemeModeNotifier.new);

class AppTheme {
  static const Color primaryPurple = Color(0xFFEADDFF);
  static const Color primaryPurpleDark = Color(0xFF4F378B);
  static const Color offWhite = Color(0xFFF5F5F0);
  
  // Layout 2 Dark Theme Colors
  static const Color darkBg = Color(0xFF1C1B1F);
  static const Color surfaceColor = Color(0xFF2C2B2F);
  static const Color surfaceHighlight = Color(0xFF38373D);
  static const Color outlineColor = Color(0xFF49454F);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryPurple,
        primary: primaryPurpleDark,
        secondary: primaryPurpleDark,
        surface: offWhite,
        brightness: Brightness.light,
      ),
      textTheme: GoogleFonts.dmSansTextTheme(),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: primaryPurpleDark,
        elevation: 0,
        titleTextStyle: GoogleFonts.sora(
          color: primaryPurpleDark,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      scaffoldBackgroundColor: offWhite,
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryPurple,
        primary: primaryPurple,
        secondary: primaryPurple,
        surface: surfaceColor,
        brightness: Brightness.dark,
        outline: outlineColor,
      ),
      cardTheme: CardThemeData(
        color: surfaceColor,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: outlineColor, width: 1),
        ),
      ),
      textTheme: GoogleFonts.dmSansTextTheme(ThemeData.dark().textTheme),
      appBarTheme: AppBarTheme(
        backgroundColor: darkBg,
        foregroundColor: Colors.white,
        elevation: 0,
        titleTextStyle: GoogleFonts.sora(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      scaffoldBackgroundColor: darkBg,
    );
  }
}
