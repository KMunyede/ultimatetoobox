const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const clients = [
  'apps/hilmost_toolbox_web/src/app/calculators/astrophysics/AstrophysicsClient.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/equation-solver/EquationSolverClient.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/scientific/ScientificCalculatorClient.tsx',
  'apps/hilmost_toolbox_web/src/app/calculators/standard/StandardCalculatorClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/age-calculator/AgeCalculatorClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/area/AreaClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/length/LengthConverterClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/temperature/TemperatureConverterClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/unix-time/UnixTimeClient.tsx',
  'apps/hilmost_toolbox_web/src/app/converters/weight-mass/WeightConverterClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/budget-planner/BudgetClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/compound-interest/CompoundInterestClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/currency/CurrencyClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/income-tax/IncomeTaxClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/inflation/InflationClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/loan-calculator/LoanCalculatorClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/retirement-planner/RetirementPlannerClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/salary-converter/SalaryConverterClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/tip-calculator/TipCalculatorClient.tsx',
  'apps/hilmost_toolbox_web/src/app/finance/vat-tax/VatTaxClient.tsx',
  'apps/hilmost_toolbox_web/src/app/health/bmi-calculator/BMIClient.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/base64-encode/Base64Client.tsx',
  'apps/hilmost_toolbox_web/src/app/text-data/word-unscrambler/WordUnscramblerClient.tsx'
];

clients.forEach(relPath => {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Shrink Inputs/Buttons (~10% from h-14 to h-12, h-16 to h-14)
  content = content.replace(/h-14/g, 'h-12');
  content = content.replace(/h-16/g, 'h-14');
  content = content.replace(/h-20/g, 'h-16');

  // 2. Shrink Paddings
  content = content.replace(/p-8/g, 'p-6');
  content = content.replace(/p-6/g, 'p-5');
  content = content.replace(/p-10/g, 'p-8');

  // 3. Shrink Radii
  content = content.replace(/rounded-3xl/g, 'rounded-2xl');

  // 4. Icon Sizes
  content = content.replace(/size=\{32\}/g, 'size={28}');
  content = content.replace(/size=\{28\}/g, 'size={24}');
  content = content.replace(/size=\{24\}/g, 'size={20}');

  // 5. Font Size Fixes (Enforce 12px min for labels, 16px for buttons)
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-\[9px\]/g, 'text-xs');
  content = content.replace(/text-xs/g, 'text-xs'); // Already 12px

  // Note: Buttons were mostly text-sm/text-base.
  // I will check specific button instances in the clients if needed.

  fs.writeFileSync(fullPath, content);
});

console.log('Finished shrinking tool components.');
