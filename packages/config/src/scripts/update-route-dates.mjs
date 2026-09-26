import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../../../');

const CATEGORIES = ['calculators', 'converters', 'finance', 'text-data', 'pdf-tools', 'health', 'dx', 'education'];
const APP_DIR = path.resolve(ROOT_DIR, 'apps/hilmost_toolbox_web/src/app');
const CURRENCIES_FILE = path.resolve(ROOT_DIR, 'apps/hilmost_toolbox_web/src/lib/currencies.ts');
const SITEMAP_FILE = path.resolve(ROOT_DIR, 'apps/hilmost_toolbox_web/src/app/sitemap.ts');
const OUTPUT_FILE = path.resolve(ROOT_DIR, 'packages/config/src/scripts/route-dates.json');

function getGitDate(filePath) {
  try {
    const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    const cmd = `git log -1 --format=%cd --date=short -- "${relativePath}"`;
    const result = execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
    if (result) return result;
  } catch (err) {
    // Fallback if git fails
  }
  return new Date().toISOString().split('T')[0];
}

export function updateRouteDates() {
  const toolDates = {};
  const noGitHistoryTools = [];

  // 1. Discover all core tool page.tsx files across 8 categories
  CATEGORIES.forEach(category => {
    const categoryDir = path.join(APP_DIR, category);
    if (!fs.existsSync(categoryDir)) return;

    const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
    entries.forEach(entry => {
      if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('[') && entry.name !== 'api') {
        const pagePath = path.join(categoryDir, entry.name, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          const routeKey = `${category}/${entry.name}`;
          const date = getGitDate(pagePath);
          toolDates[routeKey] = date;

          // Check if git history was found or used fallback
          try {
            const relativePath = path.relative(ROOT_DIR, pagePath).replace(/\\/g, '/');
            const check = execSync(`git log -1 --format=%cd --date=short -- "${relativePath}"`, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
            if (!check) noGitHistoryTools.push(routeKey);
          } catch {
            noGitHistoryTools.push(routeKey);
          }
        }
      }
    });
  });

  // 2. Currency pairs last-commit date (from currencies.ts)
  const currencyPairsDate = getGitDate(CURRENCIES_FILE);

  // 3. Unit-pair & fixed-programmatic last-commit date (from sitemap.ts)
  // NOTE: This is an approximation since unit-pair and fixed-programmatic routes are inline-configured in sitemap.ts.
  const unitAndFixedProgrammaticDate = getGitDate(SITEMAP_FILE);

  const routeDates = {
    tools: toolDates,
    currencyPairs: currencyPairsDate,
    unitAndFixedProgrammatic: unitAndFixedProgrammaticDate
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(routeDates, null, 2), 'utf8');

  return { routeDates, noGitHistoryTools };
}

if (process.argv[1].endsWith('update-route-dates.mjs')) {
  const { routeDates, noGitHistoryTools } = updateRouteDates();
  console.log('--- Route Dates Update Complete ---');
  console.log(`Core Tools Count: ${Object.keys(routeDates.tools).length}`);
  console.log(`Currency Pairs Date: ${routeDates.currencyPairs}`);
  console.log(`Unit/Fixed Programmatic Date: ${routeDates.unitAndFixedProgrammatic}`);
  console.log(`Tools with No Git History: ${noGitHistoryTools.length > 0 ? noGitHistoryTools.join(', ') : 'None'}`);
}
