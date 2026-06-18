const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const filesToFix = [
  'apps/hilmost_toolbox_web/src/app/calculators/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/budget-planner/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/currency/CurrencyPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/page.tsx',
  'apps/hilmost_toolbox_web/src/app/health/daily-wisdom/page.tsx',
  'apps/hilmost_toolbox_web/src/app/health/page.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/page.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/word-unscrambler/page.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/astrophysics/AstrophysicsPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/equation-solver/EquationSolverPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/scientific/page.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/standard/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/age-calculator/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/data-storage/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/length/LengthPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/percentage/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/temperature/TemperaturePageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/time/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/unix-time/page.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/weight-mass/WeightMassPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/income-tax/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/inflation/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/loan-calculator/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/salary-converter/SalaryConverterPageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/tip-calculator/page.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/vat-tax/page.tsx',
  'apps/hilmost_toolbox_web/src/app/health/bmi-calculator/page.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/base64-encode/Base64PageUI.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/md5-hash/page.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/word-count/page.tsx'
];

filesToFix.forEach(relPath => {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Move up (Reduce vertical padding)
  content = content.replace(/py-4 md:py-6/g, 'py-1');
  content = content.replace(/py-12 md:py-24/g, 'py-1');

  // 2. Shrink Tool Title (H1) to ~28px (text-2xl md:text-[28px])
  content = content.replace(/text-3xl sm:text-4xl/g, 'text-2xl md:text-[28px]');

  // 3. Reduce Header Margin
  content = content.replace(/mb-6/g, 'mb-3');
  content = content.replace(/mb-4/g, 'mb-2');

  fs.writeFileSync(fullPath, content);
});

console.log('Finished updating page templates.');
