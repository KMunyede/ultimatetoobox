import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { KNOWLEDGE_BASE } from '@utilitiessite/config';

export const dynamic = "force-static";

/**
 * Automated Sitemap Generator for Hilmost Toolbox.
 * Dynamically discovers static tools and generates programmatic conversion routes.
 * Updated to reflect 264+ tool inventory and Knowledge Base articles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hilmost-toolbox.hilmost.net';
  const lastModified = new Date();

  // 1. Root & Legal Pages
  const staticPages = ['', '/privacy-policy', '/terms-of-service', '/cookie-policy', '/knowledge-base'];

  // 2. Main Categories
  const CATEGORIES = ['converters', 'calculators', 'finance', 'text-data', 'health', 'pdf-tools'];
  const categoryPages = CATEGORIES.map(cat => `/${cat}`);

  // 3. Discover Individual Tools (Filesystem based)
  const discoverToolRoutes = (category: string): string[] => {
    try {
      const dirPath = path.join(process.cwd(), 'src/app', category);
      if (!fs.existsSync(dirPath)) return [];

      return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_') && !dirent.name.startsWith('[') && dirent.name !== 'api')
        .map(dirent => `/${category}/${dirent.name}`);
    } catch (error) {
      console.error(`Error discovering tools in ${category}:`, error);
      return [];
    }
  };

  const discoveredToolPages = CATEGORIES.flatMap(discoverToolRoutes);

  // 4. Knowledge Base Articles
  const kbPages = KNOWLEDGE_BASE.map(article => `/knowledge-base/${article.slug}`);

  // 5. Programmatic Conversion Routes
  const programmaticPages: string[] = [];
  
  const UNITS_CONFIG: Record<string, string[]> = {
    'converters/length': ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"],
    'converters/weight-mass': ["kilograms", "grams", "milligrams", "metric-tons", "pounds", "ounces", "stones"],
    'converters/temperature': ["celsius", "fahrenheit", "kelvin"],
    'converters/area': ["square-meter", "square-kilometer", "square-centimeter", "square-millimeter", "hectare", "acre", "square-foot", "square-inch", "square-yard", "square-mile"],
    'finance/currency': ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "ZAR", "NZD"],
  };

  Object.entries(UNITS_CONFIG).forEach(([pathPrefix, units]) => {
    for (const from of units) {
      for (const to of units) {
        if (from !== to) {
          // Special filtering for Area to keep build times sane
          if (pathPrefix === 'converters/area') {
             if (!(["acre", "hectare", "square-foot", "square-meter"].includes(from) || ["acre", "hectare", "square-foot", "square-meter"].includes(to))) {
               continue;
             }
          }
          programmaticPages.push(`/${pathPrefix}/${from.toLowerCase()}-to-${to.toLowerCase()}`);
        }
      }
    }
  });

  // 6. Fixed Programmatic Slugs (Calculators, Text-Data, Finance)
  const FIXED_PROGRAMMATIC: Record<string, string[]> = {
    'calculators/equation-solver': ["kinematics", "force", "ideal-gas-law"],
    'calculators/astrophysics': ["escape-velocity", "schwarzschild-radius", "orbital-speed"],
    'finance/salary-converter': ["hourly-to-salary", "salary-to-hourly", "monthly-to-hourly", "weekly-to-salary", "daily-rate-calculator"],
    'text-data/base64-encode': ["base64-encode", "base64-decode"],
  };

  Object.entries(FIXED_PROGRAMMATIC).forEach(([pathPrefix, slugs]) => {
    slugs.forEach(slug => programmaticPages.push(`/${pathPrefix}/${slug}`));
  });

  // Helper to map paths to Sitemap format
  const mapToSitemap = (paths: string[], priority: number, changeFrequency: any): MetadataRoute.Sitemap =>
    paths.map((p) => ({
      url: `${baseUrl}${p}`,
      lastModified,
      changeFrequency,
      priority,
    }));

  return [
    ...mapToSitemap([''], 1.0, 'daily'),
    ...mapToSitemap(categoryPages, 0.9, 'weekly'),
    ...mapToSitemap(kbPages, 0.8, 'monthly'),
    ...mapToSitemap(discoveredToolPages, 0.8, 'monthly'),
    ...mapToSitemap(programmaticPages, 0.7, 'monthly'),
    ...mapToSitemap(staticPages.filter(p => p !== '' && p !== '/knowledge-base'), 0.3, 'yearly'),
  ];
}
