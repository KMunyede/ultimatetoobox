import React from "react";

export function WebApplicationSchema({
  name,
  description,
  url,
  image,
  category = "UtilitiesApplication",
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name,
    description: description,
    url: url,
    image: image,
    applicationCategory: category,
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
