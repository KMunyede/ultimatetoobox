/**
 * Currency configuration for the Hilmost Toolbox.
 * Single source of truth for tool UI, route generation, and sitemaps.
 */

export const HUB_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "NZD", "ZAR", "NGN", "KES", "GHS", "AED"];

export const SPOKE_CURRENCIES = ["EGP", "MAD", "BWP", "ZMW", "MZN", "TZS", "UGX", "SGD", "HKD", "SAR", "THB", "MYR", "IDR", "PHP", "VND", "KRW", "BRL", "MXN", "ARS", "CLP", "COP", "PLN", "SEK", "NOK", "DKK", "CZK", "HUF", "RON", "TRY", "RUB", "ILS", "PKR", "BDT", "LKR", "XOF"];

export const CURRENCIES = [...HUB_CURRENCIES, ...SPOKE_CURRENCIES];

export const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", AUD: "Australian Dollar",
  CAD: "Canadian Dollar", CHF: "Swiss Franc", CNY: "Chinese Yuan", INR: "Indian Rupee", NZD: "New Zealand Dollar",
  ZAR: "South African Rand", NGN: "Nigerian Naira", KES: "Kenyan Shilling", GHS: "Ghanaian Cedi", AED: "UAE Dirham",
  EGP: "Egyptian Pound", MAD: "Moroccan Dirham", BWP: "Botswana Pula", ZMW: "Zambian Kwacha", MZN: "Mozambican Metical",
  TZS: "Tanzanian Shilling", UGX: "Ugandan Shilling", SGD: "Singapore Dollar", HKD: "Hong Kong Dollar", SAR: "Saudi Riyal",
  THB: "Thai Baht", MYR: "Malaysian Ringgit", IDR: "Indonesian Rupiah", PHP: "Philippine Peso", VND: "Vietnamese Dong",
  KRW: "South Korean Won", BRL: "Brazilian Real", MXN: "Mexican Peso", ARS: "Argentine Peso", CLP: "Chilean Peso",
  COP: "Colombian Peso", PLN: "Polish Zloty", SEK: "Swedish Krona", NOK: "Norwegian Krone", DKK: "Danish Krone",
  CZK: "Czech Koruna", HUF: "Hungarian Forint", RON: "Romanian Leu", TRY: "Turkish Lira", RUB: "Russian Ruble",
  ILS: "Israeli New Shekel", PKR: "Pakistani Rupee", BDT: "Bangladeshi Taka", LKR: "Sri Lankan Rupee", XOF: "West African CFA Franc"
};

/**
 * Generates the currency pairs for static page generation and sitemaps
 * using a Hub-and-Spoke model to optimize build time and SEO value.
 */
export function getProgrammaticCurrencyPairs() {
  const pairs: { from: string; to: string }[] = [];

  // 1. Hub-to-Hub: Full bidirectional cross-product (15 * 14 = 210 pairs)
  for (const from of HUB_CURRENCIES) {
    for (const to of HUB_CURRENCIES) {
      if (from !== to) {
        pairs.push({ from, to });
      }
    }
  }

  // 2. Spoke-to-Hub: Each spoke paired bidirectionally with each hub (2 * 35 * 15 = 1050 pairs)
  for (const spoke of SPOKE_CURRENCIES) {
    for (const hub of HUB_CURRENCIES) {
      pairs.push({ from: spoke, to: hub });
      pairs.push({ from: hub, to: spoke });
    }
  }

  return pairs;
}
