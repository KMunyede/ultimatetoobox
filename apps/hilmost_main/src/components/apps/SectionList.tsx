import { Section } from "@/content/apps/types";

interface SectionListProps {
  sections: Section[];
}

export function SectionList({ sections }: SectionListProps) {
  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <section key={idx} className="space-y-3">
          {section.heading && (
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {section.heading}
            </h2>
          )}
          {section.paragraphs && section.paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="text-text-secondary leading-relaxed">
              {p}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-text-secondary">
              {section.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
