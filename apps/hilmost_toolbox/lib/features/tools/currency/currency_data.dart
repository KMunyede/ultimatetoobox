class Currency {
  final String code;
  final String name;
  final String flag;

  const Currency(this.code, this.name, this.flag);
}

const List<Currency> currencies = [
  Currency('USD', 'US Dollar', '🇺🇸'),
  Currency('EUR', 'Euro', '🇪🇺'),
  Currency('GBP', 'British Pound', '🇬🇧'),
  Currency('JPY', 'Japanese Yen', '🇯🇵'),
  Currency('AUD', 'Australian Dollar', '🇦🇺'),
  Currency('CAD', 'Canadian Dollar', '🇨🇦'),
  Currency('CHF', 'Swiss Franc', '🇨🇭'),
  Currency('CNY', 'Chinese Yuan', '🇨🇳'),
  Currency('ZAR', 'South African Rand', '🇿🇦'),
  Currency('ZWL', 'Zimbabwean Dollar', '🇿🇼'),
  Currency('INR', 'Indian Rupee', '🇮🇳'),
  Currency('SGD', 'Singapore Dollar', '🇸🇬'),
  Currency('NZD', 'New Zealand Dollar', '🇳🇿'),
  Currency('BRL', 'Brazilian Real', '🇧🇷'),
  Currency('RUB', 'Russian Ruble', '🇷🇺'),
];
