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
  }
];
