import { FAQItem } from "@/content/apps/types";

interface AppFaqProps {
  faq?: FAQItem[];
}

export function AppFaq({ faq }: AppFaqProps) {
  if (!faq || faq.length === 0) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl font-bold text-text-primary tracking-tight">FAQ</h2>
      <div className="space-y-4">
        {faq.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="font-semibold text-text-primary">{item.q}</h3>
            <p className="text-text-secondary leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
