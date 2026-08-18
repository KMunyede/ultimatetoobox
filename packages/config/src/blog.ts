/**
 * Blog Post Metadata Configuration
 * Single source of truth for all blog articles on hilmost.net
 */

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  dateValue: string; // YYYY-MM-DD for sorting
  category: "Tool Deep-Dives" | "Founder's Notes" | "Engineering Log";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Why Our Currency Converter Has 50 Currencies, Not 10",
    slug: "why-our-currency-converter-has-50-currencies",
    excerpt: "The architectural decision behind a 1,260-route currency converter, and why every currency deserves the same treatment as the major ones.",
    date: "August 2026",
    dateValue: "2026-08-17",
    category: "Tool Deep-Dives"
  },
  {
    title: "The Real Cost of a Bad Password",
    slug: "the-real-cost-of-a-bad-password",
    excerpt: "What our Password Generator actually checks for, and why we show crack-time estimates instead of vague strength labels.",
    date: "August 2026",
    dateValue: "2026-08-16",
    category: "Tool Deep-Dives"
  },
  {
    title: "Time Zones Are Harder Than They Look",
    slug: "time-zones-are-harder-than-they-look",
    excerpt: "Why we rebuilt our Time Zone Converter on boring, correct fundamentals instead of a fragile custom component.",
    date: "August 2026",
    dateValue: "2026-08-15",
    category: "Tool Deep-Dives"
  },
  {
    title: "Building Software as a Quiet Practice",
    slug: "building-software-as-a-quiet-practice",
    excerpt: "What Stoicism and Hermeticism actually teach about disciplined work, and how they shape the daily rhythm behind Hilmost.",
    date: "August 2026",
    dateValue: "2026-08-14",
    category: "Founder's Notes"
  },
  {
    title: "The Question I Can't Stop Asking",
    slug: "the-question-i-cant-stop-asking",
    excerpt: "What quantum decoherence actually says, why the observer-effect myth misses the point, and what chasing an unresolved question taught me about building a company.",
    date: "August 2026",
    dateValue: "2026-08-13",
    category: "Founder's Notes"
  },
  {
    title: "Why I Still Think Like a Gamer When I Build Tools",
    slug: "why-i-still-think-like-a-gamer-when-i-build-tools",
    excerpt: "How reading game systems fast taught me to design faster, friction-free tools for Hilmost Toolbox.",
    date: "August 2026",
    dateValue: "2026-08-12",
    category: "Founder's Notes"
  },
  {
    title: "What Music Taught Me About Debugging",
    slug: "what-music-taught-me-about-debugging",
    excerpt: "A founder's note on how a musician's ear for timing and feel trained the same instinct now used to catch bugs no error log shows.",
    date: "August 2026",
    dateValue: "2026-08-11",
    category: "Founder's Notes"
  },
  {
    title: "The Six-Month War With a Date Picker",
    slug: "six-month-war-with-a-date-picker",
    excerpt: "A honest dev-log on rebuilding Hilmost's date/time picker three times and the decision to stop patching and start over.",
    date: "August 2026",
    dateValue: "2026-08-10",
    category: "Engineering Log"
  },
  {
    title: "What a Six-Week Indexing Stall Taught Me About Thinking Like Google",
    slug: "six-week-indexing-stall",
    excerpt: "How a bloated sitemap and parameterized URLs silenced our new tools in Google Search for over a month.",
    date: "July 2026",
    dateValue: "2026-07-04",
    category: "Engineering Log"
  },
  {
    title: "Building an Actually Private Password Generator",
    slug: "building-a-private-password-generator",
    excerpt: "Why we built our Password Generator around crypto.getRandomValues() instead of Math.random(), and what zero-server architecture actually means.",
    date: "July 2026",
    dateValue: "2026-07-03",
    category: "Tool Deep-Dives"
  },
  {
    title: "Why We Built the Hilmost Toolbox",
    slug: "why-we-built-the-toolbox",
    excerpt: "The Hilmost Toolbox started as a simple idea: what if a calculator, converter, or PDF tool just worked, instantly, without friction?",
    date: "July 2026",
    dateValue: "2026-07-02",
    category: "Founder's Notes"
  },
  {
    title: "Building Software for Self-Improvement in a Distracted World",
    slug: "self-improvement-distracted-world",
    excerpt: "At Hilmost, we're interested in how you build technology that helps people focus, reflect, and actually improve their lives.",
    date: "July 2026",
    dateValue: "2026-07-01",
    category: "Founder's Notes"
  }
];

export function getLatestBlogPosts(count: number = 4): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => b.dateValue.localeCompare(a.dateValue))
    .slice(0, count);
}
