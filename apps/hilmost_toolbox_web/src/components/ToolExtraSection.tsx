import { TOOL_EXTRA } from "@/lib/tool-extra-content";

interface ToolExtraSectionProps {
  route: string;
}

export function ToolExtraSection({ route }: ToolExtraSectionProps) {
  const extra = TOOL_EXTRA[route];
  if (!extra) return null;

  return (
    <section className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-4xl mx-auto">
      <h2>How {extra.subject} works</h2>
      {extra.howItWorks.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}

      <h2>Worked examples</h2>
      {extra.examples.map((ex, idx) => (
        <div key={idx}>
          <h3>{ex.title}</h3>
          <ul>
            {ex.steps.map((step, sIdx) => (
              <li key={sIdx}>{step}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Tips and common mistakes</h2>
      <ul>
        {extra.tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
