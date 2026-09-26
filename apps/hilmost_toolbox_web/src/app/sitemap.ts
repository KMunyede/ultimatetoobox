import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { KNOWLEDGE_BASE, GUIDES } from '@utilitiessite/config';
import { getProgrammaticCurrencyPairs } from '@/lib/currencies';

export const dynamic = "force-static";

/**
 * Optimized Sitemap Generator for Hilmost Ecosystem.
 * Next.js App Router (app/sitemap.ts)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const toolboxUrl = 'https://hilmost-toolbox.hilmost.net';
  const lastModified = new Date();

  // Load per-route last-modified dates
  let routeDates: { tools?: Record<string, string>; currencyPairs?: string; unitAndFixedProgrammatic?: string } = {};
  try {
    const routeDatesPath = path.resolve(process.cwd(), '../../packages/config/src/scripts/route-dates.json');
    if (fs.existsSync(routeDatesPath)) {
      routeDates = JSON.parse(fs.readFileSync(routeDatesPath, 'utf8'));
    }
  } catch {
    // Fallback if missing
  }

  // 2. TOOLBOX CORE & CATEGORIES
  const CATEGORIES = ['calculators', 'converters', 'finance', 'text-data', 'pdf-tools', 'health', 'dx', 'education'];

  const toolboxHome: MetadataRoute.Sitemap = [
    { url: `${toolboxUrl}`, lastModified, changeFrequency: 'daily', priority: 1.0 }
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${toolboxUrl}/${cat}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.8
  }));

  // 3. DYNAMIC TOOL DISCOVERY (Filesystem based)
  const getToolRoutes = (category: string): string[] => {
    try {
      const dirPath = path.join(process.cwd(), 'src/app', category);
      if (!fs.existsSync(dirPath)) return [];

      return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_') && !dirent.name.startsWith('[') && dirent.name !== 'api')
        .map(dirent => `/${category}/${dirent.name}`);
    } catch {
      return [];
    }
  };

  const discoveredTools = CATEGORIES.flatMap(getToolRoutes);
  const toolPages: MetadataRoute.Sitemap = discoveredTools.map(route => {
    const key = route.slice(1);
    const dateStr = routeDates.tools?.[key];
    return {
      url: `${toolboxUrl}${route}`,
      lastModified: dateStr ? new Date(dateStr) : lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    };
  });

  // 4. KNOWLEDGE BASE ARTICLES
  const kbPages: MetadataRoute.Sitemap = KNOWLEDGE_BASE.map(article => ({
    url: `${toolboxUrl}/knowledge-base/${article.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5
  }));

  // 5. PROGRAMMATIC ROUTES (e.g., meters-to-kilometers)
  const unitAndFixedPages: string[] = [];
  const UNITS_CONFIG: Record<string, string[]> = {
    'converters/length': ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"],
    'converters/weight-mass': ["kilograms", "grams", "milligrams", "metric-tons", "pounds", "ounces", "stones"],
    'converters/temperature': ["celsius", "fahrenheit", "kelvin"],
    'converters/area': ["square-meter", "square-kilometer", "hectare", "acre"],
  };

  const HUB_UNITS: Record<string, string[]> = {
    'converters/length': ["meters", "kilometers", "miles", "feet", "inches"],
    'converters/weight-mass': ["kilograms", "pounds", "ounces"],
    'converters/temperature': ["celsius", "fahrenheit"],
    'converters/area': ["square-meter", "hectare", "acre"],
  };

  Object.entries(UNITS_CONFIG).forEach(([pathPrefix, units]) => {
    const hubs = HUB_UNITS[pathPrefix] || [];
    for (const from of units) {
      for (const to of units) {
        if (from !== to) {
          if (hubs.includes(from) || hubs.includes(to)) {
            unitAndFixedPages.push(`/${pathPrefix}/${from.toLowerCase()}-to-${to.toLowerCase()}`);
          }
        }
      }
    }
  });

  const FIXED_PROGRAMMATIC: Record<string, string[]> = {
    'calculators/equation-solver': ["newtons-second-law", "kinetic-energy", "ideal-gas-law", "ohms-law"],
    'calculators/astrophysics': ["gravitational-force", "orbital-velocity", "escape-velocity", "luminosity-calculator", "hubble-distance"],
    'finance/salary-converter': ["hourly-to-salary", "salary-to-hourly", "monthly-to-hourly", "weekly-to-salary"],
    'text-data/base64-encode': ["base64-encode", "base64-decode"],
  };

  Object.entries(FIXED_PROGRAMMATIC).forEach(([pathPrefix, slugs]) => {
    slugs.forEach(slug => unitAndFixedPages.push(`/${pathPrefix}/${slug}`));
  });

  const unitAndFixedSitemap: MetadataRoute.Sitemap = unitAndFixedPages.map(route => ({
    url: `${toolboxUrl}${route}`,
    lastModified: routeDates.unitAndFixedProgrammatic ? new Date(routeDates.unitAndFixedProgrammatic) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.4
  }));

  // Hub-and-Spoke Currency Pairs
  const currencyPairPages: string[] = [];
  getProgrammaticCurrencyPairs().forEach(pair => {
    currencyPairPages.push(`/finance/currency/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`);
  });

  const currencyPairSitemap: MetadataRoute.Sitemap = currencyPairPages.map(route => ({
    url: `${toolboxUrl}${route}`,
    lastModified: routeDates.currencyPairs ? new Date(routeDates.currencyPairs) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.4
  }));

  // 6. LEGAL & MISC
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${toolboxUrl}/privacy-policy`, lastModified, changeFrequency: 'monthly', priority: 0.1 },
    { url: `${toolboxUrl}/terms-of-service`, lastModified, changeFrequency: 'monthly', priority: 0.1 },
    { url: `${toolboxUrl}/cookie-policy`, lastModified, changeFrequency: 'monthly', priority: 0.1 },
    { url: `${toolboxUrl}/knowledge-base`, lastModified, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // 1.5 GUIDES ARTICLES
  const guidePages: MetadataRoute.Sitemap = [
    { url: `${toolboxUrl}/guides`, lastModified, changeFrequency: 'daily' as const, priority: 0.9 },
    ...GUIDES.map(guide => ({
      url: `${toolboxUrl}/guides/${guide.slug}`,
      lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ];

  return [
    ...toolboxHome,
    ...categoryPages,
    ...guidePages,
    ...toolPages,
    ...kbPages,
    ...unitAndFixedSitemap,
    ...currencyPairSitemap,
    ...legalPages,
  ];
}
