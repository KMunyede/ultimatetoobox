export interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface AppContent {
  slug: string;
  name: string;
  packageId: string;
  developer: string;
  contactEmail: string;
  status: "coming-soon" | "live";
  storeUrl: string;
  videoUrl?: string;
  tagline: string;
  summary: string[];
  features: string[];
  howToPlay: string[];
  faq: FAQItem[];
  effectiveDate: string;
  privacy: Section[];
  terms: Section[];
  deletion: Section[];
}
