import 'dart:convert';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'package:flutter/foundation.dart';
import 'package:meta_seo/meta_seo.dart';

class ToolSeoEngine {
  static void updateMetadata({
    required String title,
    required String description,
    required String toolUrl,
  }) {
    // Check if the app is running on the Web
    if (!kIsWeb) return;

    // Initialize MetaSEO
    final meta = MetaSEO();

    // Standard Meta Tags
    // Note: MetaSEO v3 does not have a title() method, use dart:html directly
    html.document.title = title;
    meta.description(description: description);

    // OpenGraph (Facebook) Tags
    meta.ogTitle(ogTitle: title);
    meta.ogDescription(ogDescription: description);
    meta.propertyContent(property: 'og:type', content: 'website');
    meta.propertyContent(property: 'og:url', content: toolUrl);

    // Twitter Tags
    meta.twitterTitle(twitterTitle: title);
    meta.twitterDescription(twitterDescription: description);
    meta.twitterCard(twitterCard: TwitterCard.summaryLargeImage);

    // JSON-LD Structured Schema (SoftwareApplication)
    final schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": title,
      "description": description,
      "url": toolUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    _injectJsonLd(schema);
  }

  static void _injectJsonLd(Map<String, dynamic> schema) {
    // Remove existing scripts of type ld+json to prevent duplication
    final existingScripts = html.document.head?.querySelectorAll('script[type="application/ld+json"]');
    existingScripts?.forEach((element) => element.remove());

    // Create new script tag
    final script = html.ScriptElement()
      ..type = 'application/ld+json'
      ..text = jsonEncode(schema);

    html.document.head?.append(script);
  }

  static void updateForPath(String path) {
    String title = "Hilmost Ultimate Toolbox";
    String description = "Discover the ultimate collection of free online tools for calculations, conversions, health, and more.";
    
    // Simple path-based lookup
    if (path == '/bmi') {
      title = "BMI Calculator - Track Your Health | Hilmost Toolbox";
      description = "Calculate your Body Mass Index (BMI) instantly with our easy-to-use health tool.";
    } else if (path == '/units') {
      title = "Unit Converter - Length, Mass, Volume | Hilmost Toolbox";
      description = "Convert between different measurement units quickly and accurately.";
    } else if (path == '/finance') {
      title = "Finance Calculator - Loans & Savings | Hilmost Toolbox";
      description = "Plan your budget, calculate loan repayments, and track your savings.";
    } else if (path == '/calculator') {
      title = "Scientific Calculator Online | Hilmost Toolbox";
      description = "Perform complex scientific calculations with our advanced online calculator.";
    } else if (path == '/physics') {
      title = "Physics Formulas & Calculators | Hilmost Toolbox";
      description = "Solve physics problems with our comprehensive suite of scientific tools.";
    } else if (path == '/text-and-data/word-unscrambler') {
      title = "Word Unscrambler - Solve Word Puzzles | Hilmost Toolbox";
      description = "Unscramble letters to find all possible words for puzzles and games.";
    }

    updateMetadata(
      title: title,
      description: description,
      toolUrl: 'https://hilmost-toolbox.hilmost.net$path',
    );
  }
}
