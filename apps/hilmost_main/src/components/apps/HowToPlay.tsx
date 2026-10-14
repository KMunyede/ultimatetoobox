import { HowToPlaySection } from "@/content/apps/types";

interface HowToPlayProps {
  howToPlay?: HowToPlaySection[];
}

export function HowToPlay({ howToPlay }: HowToPlayProps) {
  if (!howToPlay || howToPlay.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-text-primary tracking-tight">How to play</h2>
      <div className="space-y-6">
        {howToPlay.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary">
              {section.heading}
            </h3>
            {section.paragraphs && section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-text-secondary leading-relaxed">
                {p}
              </p>
            ))}
            {section.items && section.items.length > 0 && (
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
