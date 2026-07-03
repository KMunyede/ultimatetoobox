export const CURRENT_TAX_YEAR = "2025-26";

export interface TaxBracket {
  upTo: number | null;
  rate: number;
}

export interface YearConfig {
  taxYear: string;
  lastVerified: string;
  source: string;
  standardDeduction: number;
  brackets: TaxBracket[];
  additionalLevy?: {
    name: string;
    rate: number;
    description: string;
  };
  disclaimer?: string;
}

export interface CountryConfig {
  id: string;
  name: string;
  currency: string;
  symbol: string;
  years: Record<string, YearConfig>;
}

export const TAX_DATA: Record<string, CountryConfig> = {
  usa: {
    id: "usa",
    name: "USA",
    currency: "USD",
    symbol: "$",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "IRS.gov",
        standardDeduction: 15750,
        brackets: [
          { upTo: 11925, rate: 10 },
          { upTo: 48475, rate: 12 },
          { upTo: 103350, rate: 22 },
          { upTo: 197300, rate: 24 },
          { upTo: 250525, rate: 32 },
          { upTo: 626350, rate: 35 },
          { upTo: null, rate: 37 },
        ],
      }
    }
  },
  uk: {
    id: "uk",
    name: "UK",
    currency: "GBP",
    symbol: "£",
    years: {
      "2025-26": {
        taxYear: "2025/26",
        lastVerified: "2026-07-03",
        source: "GOV.UK",
        standardDeduction: 12570,
        brackets: [
          { upTo: 12570, rate: 0 },
          { upTo: 50270, rate: 20 },
          { upTo: 125140, rate: 40 },
          { upTo: null, rate: 45 },
        ],
      }
    }
  },
  canada: {
    id: "canada",
    name: "Canada",
    currency: "CAD",
    symbol: "$",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "CRA (Federal)",
        standardDeduction: 16129,
        brackets: [
          { upTo: 57375, rate: 14.5 },
          { upTo: 114750, rate: 20.5 },
          { upTo: 177882, rate: 26 },
          { upTo: 253414, rate: 29 },
          { upTo: null, rate: 33 },
        ],
        disclaimer: "Federal tax only. Provincial taxes add significantly to this total.",
      }
    }
  },
  australia: {
    id: "australia",
    name: "Australia",
    currency: "AUD",
    symbol: "$",
    years: {
      "2025-26": {
        taxYear: "2025-26",
        lastVerified: "2026-07-03",
        source: "ATO",
        standardDeduction: 18200,
        brackets: [
          { upTo: 18200, rate: 0 },
          { upTo: 45000, rate: 16 },
          { upTo: 135000, rate: 30 },
          { upTo: 190000, rate: 37 },
          { upTo: null, rate: 45 },
        ],
        disclaimer: "Excludes 2% Medicare Levy.",
      }
    }
  },
  germany: {
    id: "germany",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "BMF",
        standardDeduction: 12096,
        brackets: [
          { upTo: 12096, rate: 0 },
          { upTo: 68430, rate: 28 },
          { upTo: 277825, rate: 42 },
          { upTo: null, rate: 45 },
        ],
      }
    }
  },
  france: {
    id: "france",
    name: "France",
    currency: "EUR",
    symbol: "€",
    years: {
      "2025-26": {
        taxYear: "2025/26",
        lastVerified: "2026-07-03",
        source: "Service-Public.fr",
        standardDeduction: 0,
        brackets: [
          { upTo: 11600, rate: 0 },
          { upTo: 29600, rate: 11 },
          { upTo: 84600, rate: 30 },
          { upTo: 180650, rate: 41 },
          { upTo: null, rate: 45 },
        ],
        disclaimer: "Simplified single-person estimate. France uses household quotient splitting.",
      }
    }
  },
  south_africa: {
    id: "south_africa",
    name: "South Africa",
    currency: "ZAR",
    symbol: "R",
    years: {
      "2025-26": {
        taxYear: "2025/26",
        lastVerified: "2026-07-03",
        source: "SARS",
        standardDeduction: 95750,
        brackets: [
          { upTo: 237100, rate: 18 },
          { upTo: 370500, rate: 26 },
          { upTo: 512800, rate: 31 },
          { upTo: 673000, rate: 36 },
          { upTo: 857900, rate: 39 },
          { upTo: 1817000, rate: 41 },
          { upTo: null, rate: 45 },
        ],
      }
    }
  },
  zimbabwe: {
    id: "zimbabwe",
    name: "Zimbabwe",
    currency: "USD",
    symbol: "$",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "ZIMRA",
        standardDeduction: 1200,
        brackets: [
          { upTo: 1200, rate: 0 },
          { upTo: 3600, rate: 20 },
          { upTo: 36000, rate: 25 },
          { upTo: null, rate: 40 },
        ],
        additionalLevy: {
          name: "AIDS Levy",
          rate: 0.03,
          description: "3% of calculated income tax.",
        },
      }
    }
  },
  japan: {
    id: "japan",
    name: "Japan",
    currency: "JPY",
    symbol: "¥",
    years: {
      "2025-26": {
        taxYear: "National",
        lastVerified: "2026-07-03",
        source: "NTA Japan",
        standardDeduction: 480000,
        brackets: [
          { upTo: 1950000, rate: 5 },
          { upTo: 3300000, rate: 10 },
          { upTo: 6950000, rate: 20 },
          { upTo: 9000000, rate: 23 },
          { upTo: 18000000, rate: 33 },
          { upTo: 40000000, rate: 40 },
          { upTo: null, rate: 45 },
        ],
        disclaimer: "Excludes ~10% local inhabitant tax.",
      }
    }
  },
  china: {
    id: "china",
    name: "China",
    currency: "CNY",
    symbol: "¥",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "STA China",
        standardDeduction: 60000,
        brackets: [
          { upTo: 36000, rate: 3 },
          { upTo: 144000, rate: 10 },
          { upTo: 300000, rate: 20 },
          { upTo: 420000, rate: 25 },
          { upTo: 660000, rate: 30 },
          { upTo: 960000, rate: 35 },
          { upTo: null, rate: 45 },
        ],
      }
    }
  },
  india: {
    id: "india",
    name: "India",
    currency: "INR",
    symbol: "₹",
    years: {
      "2025-26": {
        taxYear: "New Regime FY25-26",
        lastVerified: "2026-07-03",
        source: "Income Tax Dept",
        standardDeduction: 75000,
        brackets: [
          { upTo: 400000, rate: 0 },
          { upTo: 800000, rate: 5 },
          { upTo: 1200000, rate: 10 },
          { upTo: 1600000, rate: 15 },
          { upTo: 2000000, rate: 20 },
          { upTo: 2400000, rate: 25 },
          { upTo: null, rate: 30 },
        ],
      }
    }
  },
  brazil: {
    id: "brazil",
    name: "Brazil",
    currency: "BRL",
    symbol: "R$",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "Receita Federal",
        standardDeduction: 0,
        brackets: [
          { upTo: 29145.6, rate: 0 },
          { upTo: 33919.8, rate: 7.5 },
          { upTo: 45012.6, rate: 15 },
          { upTo: 55976.16, rate: 22.5 },
          { upTo: null, rate: 27.5 },
        ],
      }
    }
  },
  uae: {
    id: "uae",
    name: "UAE",
    currency: "AED",
    symbol: "د.إ",
    years: {
      "2025-26": {
        taxYear: "2025",
        lastVerified: "2026-07-03",
        source: "Federal Tax Authority",
        standardDeduction: 0,
        brackets: [
          { upTo: null, rate: 0 },
        ],
      }
    }
  },
  singapore: {
    id: "singapore",
    name: "Singapore",
    currency: "SGD",
    symbol: "$",
    years: {
      "2025-26": {
        taxYear: "YA2024",
        lastVerified: "2026-07-03",
        source: "IRAS",
        standardDeduction: 0,
        brackets: [
          { upTo: 20000, rate: 0 },
          { upTo: 30000, rate: 2 },
          { upTo: 40000, rate: 3.5 },
          { upTo: 80000, rate: 7 },
          { upTo: 120000, rate: 11.5 },
          { upTo: 160000, rate: 15 },
          { upTo: 200000, rate: 18 },
          { upTo: 320000, rate: 19 },
          { upTo: 500000, rate: 22 },
          { upTo: 1000000, rate: 23 },
          { upTo: null, rate: 24 },
        ],
      }
    }
  },
  switzerland: {
    id: "switzerland",
    name: "Switzerland",
    currency: "CHF",
    symbol: "CHF",
    years: {
      "2025-26": {
        taxYear: "Federal Only",
        lastVerified: "2026-07-03",
        source: "FTA",
        standardDeduction: 14500,
        brackets: [
          { upTo: 14500, rate: 0 },
          { upTo: 31600, rate: 0.77 },
          { upTo: 41400, rate: 0.88 },
          { upTo: 55200, rate: 2.64 },
          { upTo: 72900, rate: 2.97 },
          { upTo: 78100, rate: 5.94 },
          { upTo: 103600, rate: 6.6 },
          { upTo: 134600, rate: 8.8 },
          { upTo: 176000, rate: 11 },
          { upTo: 755200, rate: 13.2 },
          { upTo: null, rate: 11.5 },
        ],
        disclaimer: "Cantonal/municipal tax varies significantly and is not included.",
      }
    }
  },
  netherlands: {
    id: "netherlands",
    name: "Netherlands",
    currency: "EUR",
    symbol: "€",
    years: {
      "2025-26": {
        taxYear: "2025 Box 1",
        lastVerified: "2026-07-03",
        source: "Belastingdienst",
        standardDeduction: 0,
        brackets: [
          { upTo: 38441, rate: 36.97 },
          { upTo: 76817, rate: 37.48 },
          { upTo: null, rate: 49.50 },
        ],
      }
    }
  },
};
