/**
 * Tool Categories Configuration
 * This is the single source of truth for all categories and tools across the monorepo.
 */

export interface Tool {
  name: string;
  href: string;
  description: string;
  tooltip: string;
  icon?: string;
}

export interface ToolCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
  color: string;
  icon: string;
  tools: Tool[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    name: "Developer Experience",
    slug: "dx",
    description: "JSON, Regex, and JWT utilities built for modern engineering workflows.",
    count: 7,
    color: "slate",
    icon: "Code2",
    tools: [
      { name: "JSON Formatter", href: "/dx/json-formatter", tooltip: "Pretty-print and validate JSON data.", description: "Pretty-print, validate, and minify JSON data instantly. Handles large payloads with ease and highlights syntax errors.", icon: "FileJson" },
      { name: "AI Token Calculator", href: "/dx/ai-token-calculator", tooltip: "Estimate LLM token count and API costs.", description: "Estimate token counts and API costs for LLM prompts. Supports custom rate entry to stay accurate as pricing changes.", icon: "Cpu" },
      { name: "QR Code Generator", href: "/dx/qr-code-generator", tooltip: "Create QR codes for URLs, Wi-Fi, and more.", description: "Create QR codes for URLs, Wi-Fi, email and more. Free, instant, no sign-up.", icon: "QrCode" },
      { name: "Password Generator", href: "/dx/password-generator", tooltip: "Generate secure random passwords with custom rules.", description: "Generate secure random passwords with custom length, character sets, and strength indicator.", icon: "Lock" },
      { name: "Regex Tester", href: "/dx/regex-tester", tooltip: "Real-time regular expression testing.", description: "Build and test regular expressions in real-time. Includes reference guides for common patterns and instant match highlighting.", icon: "Search" },
      { name: "JWT Decoder", href: "/dx/jwt-decoder", tooltip: "Decode JSON Web Tokens instantly.", description: "Inspect JSON Web Tokens (JWT) safely. Decode headers and payloads without ever sending your sensitive tokens to a server.", icon: "ShieldCheck" },
      { name: "Color Picker", href: "/dx/color-picker", tooltip: "Convert HEX, RGB & HSL instantly.", description: "Convert HEX, RGB & HSL instantly. Generate palettes, check WCAG contrast, and save your color history.", icon: "Palette" },
    ]
  },
  {
    name: "Money & Tax",
    slug: "finance",
    description: "Professional calculators for currency, loans, interest, and taxes.",
    count: 13,
    color: "amber",
    icon: "Banknote",
    tools: [
      { name: "Currency Converter", href: "/finance/currency", tooltip: "Real-time global currency exchange.", description: "Real-time exchange rates for global currencies. Convert USD, EUR, GBP, and more instantly." },
      { name: "Loan Calculator", href: "/finance/loan-calculator", tooltip: "Analyze monthly payments and interest.", description: "Estimate monthly payments, total interest, and payoff schedules for mortgages or personal loans." },
      { name: "Mortgage Calculator", href: "/finance/mortgage-calculator", tooltip: "PITI mortgage payment estimator.", description: "Estimate full PITI (Principal, Interest, Tax, Insurance) mortgage payment with precision." },
      { name: "Income Tax", href: "/finance/income-tax", tooltip: "Estimate your personal tax burden.", description: "Calculate your take-home pay after federal and local taxes. Supports multiple jurisdictions." },
      { name: "Compound Interest", href: "/finance/compound-interest", tooltip: "Project long-term savings growth.", description: "Visualize how your investments grow exponentially over time with reinvested earnings." },
      { name: "VAT & Tax Calculator", href: "/finance/vat-tax", tooltip: "Quick sales tax and VAT calculations.", description: "Quickly add or remove Value Added Tax (VAT) from prices with custom percentage rates." },
      { name: "Salary Converter", href: "/finance/salary-converter", tooltip: "Convert hourly pay to annual salary.", description: "Convert annual salary to hourly, weekly, or monthly rates to better understand your earnings." },
      { name: "Tip Calculator", href: "/finance/tip-calculator", tooltip: "Calculate gratuity and split bills.", description: "Calculate the perfect tip and split the bill easily between friends or colleagues." },
      { name: "Retirement Planner", href: "/finance/retirement-planner", tooltip: "Plan your financial independence.", description: "Estimate how much you need to save today to maintain your lifestyle in the future." },
      { name: "Inflation Calculator", href: "/finance/inflation", tooltip: "Check the buying power of your money.", description: "See how the purchasing power of your money has changed over time due to inflation." },
      { name: "Budget Planner", href: "/finance/budget-planner", tooltip: "Organize your monthly spending.", description: "Track income and expenses to create a balanced financial plan for your household." },
      { name: "EPS Calculator", href: "/finance/earnings-per-share-calculator", tooltip: "Calculate Earnings Per Share metrics.", description: "Analyze company profitability by calculating Basic and Diluted Earnings Per Share (EPS)." },
      { name: "WACC Calculator", href: "/finance/wacc-calculator", tooltip: "Professional Weighted Average Cost of Capital solver.", description: "Determine your company's hurdle rate and capital structure efficiency with integrated CAPM logic." },
    ]
  },
  {
    name: "PDF Tools",
    slug: "pdf-tools",
    description: "Securely merge, split, and manage PDF files 100% in your browser.",
    count: 4,
    color: "red",
    icon: "FileText",
    tools: [
      { name: "Merge PDF", href: "/pdf-tools/merge-pdf", tooltip: "Combine multiple PDFs into one.", description: "Combine multiple PDF files into a single document. Drag and drop to reorder files before merging." },
      { name: "Split PDF", href: "/pdf-tools/split-pdf", tooltip: "Extract pages into new files.", description: "Extract specific pages from your PDF or split a large document into multiple files by page range." },
      { name: "Rotate PDF", href: "/pdf-tools/rotate-pdf", tooltip: "Correct document orientation.", description: "Rotate individual pages or the entire document by 90, 180, or 270 degrees with visual previews." },
      { name: "Delete Pages", href: "/pdf-tools/delete-pages", tooltip: "Remove unwanted pages instantly.", description: "Remove unwanted pages from your PDF file and download the cleaned version instantly." },
    ]
  },
  {
    name: "Unit Converters",
    slug: "converters",
    description: "Quickly convert length, weight, temperature, and data storage units.",
    count: 11,
    color: "blue",
    icon: "Replace",
    tools: [
      { name: "Age Calculator", href: "/converters/age-calculator", tooltip: "Calculate precise age and milestones.", description: "Determine exact age in years, months, and days based on birth date." },
      { name: "Percentage Calculator", href: "/converters/percentage", tooltip: "Solve all percentage-based problems.", description: "Calculate percentage increases, decreases, and common math ratios." },
      { name: "Unix Time", href: "/converters/unix-time", tooltip: "Convert timestamps to readable dates.", description: "Convert between human-readable dates and Unix timestamps instantly." },
      { name: "Length Converter", href: "/converters/length", tooltip: "Switch between metric and imperial.", description: "Transform measurements between meters, feet, inches, miles, and kilometers." },
      { name: "Weight/Mass Converter", href: "/converters/weight-mass", tooltip: "Convert grams, pounds, and tons.", description: "Convert between grams, kilograms, pounds, ounces, and metric tons." },
      { name: "Temperature Converter", href: "/converters/temperature", tooltip: "Celsius, Fahrenheit, and Kelvin.", description: "Switch between Celsius, Fahrenheit, and Kelvin with precise calculations." },
      { name: "Time Converter", href: "/converters/time", tooltip: "Convert hours, days, and seconds.", description: "Convert between seconds, minutes, hours, days, and weeks easily." },
      { name: "Time Zone Converter", href: "/converters/time-zone", tooltip: "Global time zone synchronization.", description: "Compare times across global time zones and plan international meetings." },
      { name: "Aspect Ratio", href: "/converters/aspect-ratio", tooltip: "Calculate image and video proportions.", description: "Simplify image and video aspect ratios instantly. Supports common presets like 16:9, 9:16, 4:3, and 1:1." },
      { name: "Data Storage", href: "/converters/data-storage", tooltip: "MB, GB, TB, and Bit conversions.", description: "Convert between bits, bytes, kilobytes, megabytes, and gigabytes." },
      { name: "Area Converter", href: "/converters/area", tooltip: "Convert acres, meters, and miles.", description: "Calculate conversions for square meters, acres, hectares, and square feet." },
    ]
  },
  {
    name: "Text & Formatting",
    slug: "text-data",
    description: "Clean up text, count words, and encode data with ease.",
    count: 6,
    color: "brand-primary",
    icon: "Binary",
    tools: [
      { name: "Random Name/Number Generator", href: "/text-data/random-name-number-generator", tooltip: "Generate secure random numbers or names instantly.", description: "Generate cryptographically secure random numbers or random names from various categories entirely in your browser.", icon: "Hash" },
      { name: "Text Case Converter", href: "/text-data/text-case-converter", tooltip: "Convert text between camelCase, snake_case, and more.", description: "Convert text between camelCase, snake_case, Title Case, and 9 other formats instantly." },
      { name: "Word Unscrambler", href: "/text-data/word-unscrambler", tooltip: "Find words from scrambled letters.", description: "Instantly untangle any anagram and find hidden words for Scrabble or crossword puzzles." },
      { name: "Base64 Text Encoder", href: "/text-data/base64-encode", tooltip: "Securely encode text for data transfer.", description: "Safely encode and decode text strings into URL-friendly ASCII format." },
      { name: "MD5 Hash", href: "/text-data/md5-hash", tooltip: "Generate secure cryptographic hashes.", description: "Generate lightning-fast MD5 hashes to verify data integrity and confirm file authenticity." },
      { name: "Word Count", href: "/text-data/word-count", tooltip: "Analyze text length and statistics.", description: "Get real-time analytics on your text including word, character, and sentence counts." },
    ]
  },
  {
    name: "Math & Science",
    slug: "calculators",
    description: "From standard math to astrophysics and science equation solvers.",
    count: 4,
    color: "indigo",
    icon: "Calculator",
    tools: [
      { name: "Standard Calculator", href: "/calculators/standard", tooltip: "Quick everyday arithmetic.", description: "A fast, clean calculator for everyday arithmetic. Simple, responsive, and perfect for any device." },
      { name: "Scientific Calculator", href: "/calculators/scientific", tooltip: "Advanced engineering functions.", description: "Advanced math functions including trigonometry, logarithms, and exponentials." },
      { name: "Astrophysics", href: "/calculators/astrophysics", tooltip: "Celestial mechanics and physics.", description: "Explore the cosmos with specialized tools for escape velocity and orbital speed calculations." },
      { name: "Equation Solver", href: "/calculators/equation-solver", tooltip: "Solve linear and complex equations.", description: "Solve complex physics and chemistry equations instantly. Supports kinematics and gas laws." },
    ]
  },
  {
    name: "Health & Wellness",
    slug: "health",
    description: "Simple tools for BMI tracking and daily wellness check-ins.",
    count: 4,
    color: "rose",
    icon: "HeartPulse",
    tools: [
      { name: "Daily Wisdom", href: "/health/daily-wisdom", tooltip: "Stoic quotes and daily guidance.", description: "A private space for mental well-being. Access daily quotes, journaling tools, and library resources." },
      { name: "BMI Calculator", href: "/health/bmi-calculator", tooltip: "Calculate Body Mass Index safely.", description: "Calculate your Body Mass Index (BMI) instantly. Understand your weight category and trajectory." },
      { name: "Calorie & Macro", href: "/health/calorie-macro-calculator", tooltip: "Precision nutrition and macro ratios.", description: "Calculate your BMR, TDEE, and optimal macronutrient split for your fitness goals." },
      { name: "Sleep Cycle", href: "/health/sleep-cycle-calculator", tooltip: "Optimal wake-up and bed times.", description: "Find the best bedtime or wake-up time based on 90-minute sleep cycles. Wake up refreshed.", icon: "Moon" },
    ]
  },
  {
    name: "Education",
    slug: "education",
    description: "GPA calculators and professional academic tracking tools.",
    count: 1,
    color: "orange",
    icon: "GraduationCap",
    tools: [
      { name: "GPA Calculator", href: "/education/gpa-calculator", tooltip: "Calculate semester and cumulative GPA.", description: "Calculate semester and cumulative GPA with standard or weighted scales. Supports letter grades and points.", icon: "GraduationCap" },
    ]
  }
];
