export interface KBArticle {
  slug: string;
  title: string;
  category: "finance" | "health" | "physics" | "data-science";
  excerpt: string;
  relatedTools: string[]; // paths like /finance/compound-interest
  content: string; // Markdown or simple HTML
}

export const KNOWLEDGE_BASE: KBArticle[] = [
  {
    slug: "understanding-compound-interest",
    title: "The Mechanics of Compound Interest: A Deep Dive",
    category: "finance",
    excerpt: "Learn how the 'Snowball Effect' works and why time is your greatest asset in wealth accumulation.",
    relatedTools: ["/finance/compound-interest"],
    content: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Originating from the Italian word 'interesse', it is the fundamental engine of modern wealth creation..."
  },
  {
    slug: "what-is-body-mass-index",
    title: "Body Mass Index (BMI): Accuracy, Limitations, and Use Cases",
    category: "health",
    excerpt: "An investigation into BMI as a health metric and why it correlates with long-term wellness outcomes.",
    relatedTools: ["/health/bmi-calculator"],
    content: "The Body Mass Index (BMI) was developed in the 1830s by Adolphe Quetelet. It is a simple mathematical ratio of mass to height, used to categorize human weight into tiers..."
  },
  {
    slug: "unix-epoch-time-explained",
    title: "The Unix Epoch: How Computers Track Time",
    category: "data-science",
    excerpt: "Everything you need to know about 10-digit timestamps and the impending Year 2038 problem.",
    relatedTools: ["/converters/unix-time"],
    content: "In the digital world, time is often represented as a single integer: the number of seconds elapsed since January 1st, 1970. This system, known as Unix Time, provides a universal standard..."
  },
  {
    slug: "universal-law-of-gravitation",
    title: "Newton's Universal Law of Gravitation: Beyond the Apple",
    category: "physics",
    excerpt: "Understanding the force that binds the cosmos, from falling objects to orbiting planets.",
    relatedTools: ["/calculators/astrophysics/gravitational-force", "/calculators/equation-solver/newtons-second-law"],
    content: "Sir Isaac Newton's law of universal gravitation states that every particle attracts every other particle in the universe with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers. This 'inverse-square law' was revolutionary because it unified the physics of Earth with the physics of the stars..."
  },
  {
    slug: "cryptographic-hashing-md5",
    title: "Cryptographic Hashing: The Role and Risks of MD5",
    category: "data-science",
    excerpt: "A technical look at how data integrity is verified and why collision resistance matters.",
    relatedTools: ["/text-data/md5-hash", "/text-data/base64-encode"],
    content: "Hashing is a process that transforms any given block of data into a fixed-size string of characters, which is usually a hexadecimal representation. The MD5 (Message-Digest algorithm 5) was designed by Ronald Rivest in 1991. While it is no longer considered secure for cryptographic signatures due to collision vulnerabilities, it remains a high-performance choice for non-security critical checksums and file integrity verification..."
  },
  {
    slug: "percentage-math-in-economics",
    title: "Percentage Mathematics: The Language of Economic Change",
    category: "finance",
    excerpt: "Why understanding percentage increase and decrease is vital for tracking inflation and market growth.",
    relatedTools: ["/converters/percentage", "/finance/inflation"],
    content: "Percentages allow us to standardize comparisons across different scales. In economics, the ability to calculate percentage change is the difference between understanding growth and being misled by raw numbers. Whether tracking the Consumer Price Index (CPI) for inflation or evaluating the yield of a bond, percentage math provides the relative context needed for sound financial decision-making..."
  },
  {
    slug: "earnings-per-share-basic-vs-diluted",
    title: "Earnings Per Share (EPS): Basic vs. Diluted Explained",
    category: "finance",
    excerpt: "Understand how company profitability is measured and why dilution matters for shareholders.",
    relatedTools: ["/finance/earnings-per-share-calculator"],
    content: "Earnings Per Share (EPS) is a critical indicator of a company's profitability, representing the portion of profit allocated to each outstanding share of common stock. **Basic EPS** is calculated by subtracting preferred dividends from net income and dividing by the weighted average of shares outstanding. **Diluted EPS** goes further by including 'convertible' securities—such as stock options, warrants, and convertible bonds—that could become shares in the future. Dilution is vital for investors to track because it reveals the 'worst-case' scenario for their ownership stake if all potential shares were issued."
  },
  {
    slug: "weighted-average-cost-of-capital-guide",
    title: "Weighted Average Cost of Capital (WACC): A Beginner's Guide",
    category: "finance",
    excerpt: "Learn how to calculate your company's hurdle rate and why it determines which projects are worth your time.",
    relatedTools: ["/finance/wacc-calculator"],
    content: "The Weighted Average Cost of Capital (WACC) is the average rate a company expects to pay to finance its assets. It is calculated by weighting the cost of each capital component (equity and debt) by its proportion in the company's total capital structure. For business owners, WACC acts as the 'Hurdle Rate'—if a new project doesn't earn a return higher than the WACC, it is actually destroying value. Understanding your WACC helps you make smarter decisions about taking on debt, issuing stock, or expanding your operations."
  }
];
