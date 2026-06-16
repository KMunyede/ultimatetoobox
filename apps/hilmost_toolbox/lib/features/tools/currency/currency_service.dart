import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CurrencyRates {
  final String base;
  final Map<String, double> rates;
  final DateTime timestamp;

  CurrencyRates({
    required this.base,
    required this.rates,
    required this.timestamp,
  });

  factory CurrencyRates.fromJson(Map<String, dynamic> json) {
    return CurrencyRates(
      base: json['base_code'] ?? 'USD',
      rates: Map<String, double>.from(
        (json['rates'] ?? json['conversion_rates'] ?? {}).map(
          (k, v) => MapEntry(k, (v as num).toDouble()),
        ),
      ),
      timestamp: DateTime.now(), // Store fetch time
    );
  }
}

class CurrencyService {
  final Dio _dio = Dio();
  static const String _cacheKeyPrefix = 'hsc_rates_';
  // Use a Dart define for API Key, default to demo key or throw if not set.
  static const String apiKey = String.fromEnvironment(
    'EXCHANGE_RATE_API_KEY',
    defaultValue: 'demo',
  );

  Future<CurrencyRates> fetchRates(String baseCurrency) async {
    final prefs = await SharedPreferences.getInstance();
    final cacheKey = '$_cacheKeyPrefix$baseCurrency';

    // Check cache
    final cachedStr = prefs.getString(cacheKey);
    if (cachedStr != null) {
      final data = jsonDecode(cachedStr);
      final timestamp = DateTime.fromMillisecondsSinceEpoch(data['timestamp']);
      if (DateTime.now().difference(timestamp).inHours < 24) {
        return CurrencyRates(
          base: baseCurrency,
          rates: Map<String, double>.from(data['rates']),
          timestamp: timestamp,
        );
      }
    }

    // Fetch from API
    try {
      final response = await _dio.get(
        'https://open.er-api.com/v6/latest/$baseCurrency',
      );
      final rates = CurrencyRates.fromJson(response.data);

      // Save to cache
      await prefs.setString(
        cacheKey,
        jsonEncode({
          'base': rates.base,
          'rates': rates.rates,
          'timestamp': rates.timestamp.millisecondsSinceEpoch,
        }),
      );

      return rates;
    } catch (e) {
      // Fallback to stale cache if API fails
      if (cachedStr != null) {
        final data = jsonDecode(cachedStr);
        return CurrencyRates(
          base: baseCurrency,
          rates: Map<String, double>.from(data['rates']),
          timestamp: DateTime.fromMillisecondsSinceEpoch(data['timestamp']),
        );
      }
      throw Exception('Failed to load exchange rates');
    }
  }
}
