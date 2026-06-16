import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hilmost-toolbox.hilmost.net';
  
  const lastModified = new Date();

  // Root & Legal
  const staticPages = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy'
  ];

  // Categories
  const categoryPages = [
    '/converters',
    '/calculators',
    '/finance',
    '/text-data',
    '/health'
  ];

  // Individual Tools
  const toolPages = [
    // Converters
    '/converters/age-calculator',
    '/converters/percentage',
    '/converters/unix-time',
    '/converters/length',
    '/converters/weight-mass',
    "/converters/temperature",
    "/converters/time",
    "/converters/time-zone",
    "/converters/data-storage",
    "/converters/area",
    
    // Calculators
    '/calculators/standard',
    '/calculators/scientific',
    '/calculators/astrophysics',
    '/calculators/equation-solver',

    // Finance
    '/finance/currency',
    '/finance/loan-calculator',
    '/finance/income-tax',
    '/finance/compound-interest',
    '/finance/vat-tax',
    '/finance/salary-converter',
    '/finance/tip-calculator',
    '/finance/retirement-planner',
    '/finance/inflation',
    '/finance/budget-planner',

    // Text & Data
    '/text-data/word-unscrambler',
    '/text-data/base64-encode',
    '/text-data/md5-hash',
    '/text-data/word-count',

    // Health
    '/health/bmi-calculator',
    '/health/daily-wisdom'
  ];

  const mapToSitemap = (paths: string[], priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'): MetadataRoute.Sitemap => 
    paths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }));

  const programmaticPages: string[] = [];
  
  // Length Programmatic
  const LENGTH_UNITS = ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"];
  for (const from of LENGTH_UNITS) {
    for (const to of LENGTH_UNITS) {
      if (from !== to) programmaticPages.push(`/converters/length/${from}-to-${to}`);
    }
  }

  // Weight Programmatic
  const WEIGHT_UNITS = ["kilograms", "grams", "milligrams", "metric tons", "pounds", "ounces", "stones"];
  for (const from of WEIGHT_UNITS) {
    for (const to of WEIGHT_UNITS) {
      if (from !== to) programmaticPages.push(`/converters/weight-mass/${from.replace(" ", "-")}-to-${to.replace(" ", "-")}`);
    }
  }

  // Temperature Programmatic
  const TEMP_UNITS = ["celsius", "fahrenheit", "kelvin"];
  for (const from of TEMP_UNITS) {
    for (const to of TEMP_UNITS) {
      if (from !== to) programmaticPages.push(`/converters/temperature/${from}-to-${to}`);
    }
  }

  // Area Programmatic
  const AREA_UNITS = ["square-meter", "square-kilometer", "square-centimeter", "square-millimeter", "hectare", "acre", "square-foot", "square-inch", "square-yard", "square-mile"];
  for (const from of AREA_UNITS) {
    for (const to of AREA_UNITS) {
      if (from !== to && (["acre", "hectare", "square-foot", "square-meter"].includes(from) || ["acre", "hectare", "square-foot", "square-meter"].includes(to))) {
        programmaticPages.push(`/converters/area/${from}-to-${to}`);
      }
    }
  }

  // Calculators - Equation Solver
  const EQUATION_SLUGS = ["kinematics", "force", "ideal-gas-law"];
  EQUATION_SLUGS.forEach(slug => programmaticPages.push(`/calculators/equation-solver/${slug}`));

  // Calculators - Astrophysics
  const ASTRO_SLUGS = ["escape-velocity", "schwarzschild-radius", "orbital-speed"];
  ASTRO_SLUGS.forEach(slug => programmaticPages.push(`/calculators/astrophysics/${slug}`));

  // Finance - Currency
  const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "ZAR", "NZD"];
  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from !== to) programmaticPages.push(`/finance/currency/${from.toLowerCase()}-to-${to.toLowerCase()}`);
    }
  }

  // Finance - Salary Converter
  const SALARY_SLUGS = ["hourly-to-salary", "salary-to-hourly", "monthly-to-hourly", "weekly-to-salary", "daily-rate-calculator"];
  SALARY_SLUGS.forEach(slug => programmaticPages.push(`/finance/salary-converter/${slug}`));

  // Text Data - Base64
  const BASE64_SLUGS = ["base64-encode", "base64-decode"];
  BASE64_SLUGS.forEach(slug => programmaticPages.push(`/text-data/base64-encode/${slug}`));

  return [
    ...mapToSitemap([''], 1.0, 'daily'),
    ...mapToSitemap(categoryPages, 0.9, 'weekly'),
    ...mapToSitemap(toolPages, 0.8, 'monthly'),
    ...mapToSitemap(programmaticPages, 0.7, 'monthly'),
    ...mapToSitemap(staticPages.filter(p => p !== ''), 0.3, 'yearly'),
  ];
}
