import { WebApplicationSchema, Breadcrumbs, ToolHeader, ToolArticle, FAQAccordion, RelatedTools, FAQSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { SleepCycleCalculatorTool } from "./SleepCycleCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Free Sleep Cycle Calculator";
const TOOL_DESC = "Find the best times to wake up or go to sleep based on 90-minute sleep cycles. Avoid sleep inertia and wake up refreshed.";
const PATH = "/health/sleep-cycle-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

const faqs = [
  {
    question: "What is a sleep cycle?",
    answer: "A sleep cycle is a 90-minute progression through different stages of sleep: light sleep, deep sleep, and REM (Rapid Eye Movement). Waking up at the end of a cycle, rather than in the middle of deep sleep, helps you feel refreshed and avoids grogginess."
  },
  {
    question: "Why does the calculator add 14 minutes?",
    answer: "The average person takes about 14 minutes to fall asleep once they get into bed. This is known as 'sleep latency'. Our tool factors this in so your wake-up times align with your actual sleep onset rather than when you close your eyes."
  },
  {
    question: "How many hours of sleep do I really need?",
    answer: "Most adults need between 7.5 and 9 hours of sleep, which equates to 5 or 6 full 90-minute cycles. Consistently getting fewer than 4 cycles can lead to cognitive decline, weakened immunity, and chronic health issues."
  },
  {
    question: "What is sleep inertia?",
    answer: "Sleep inertia is the physiological state of grogginess and impaired cognitive performance that occurs immediately after waking up. It is most severe when you are woken during a deep sleep (N3) phase."
  },
  {
    question: "Is it better to sleep 6 hours or 7 hours?",
    answer: "Mathematically, 6 hours is better than 7 because 6 hours allows for exactly four 90-minute cycles. Waking up at 7 hours would likely interrupt a deep sleep phase in your fifth cycle, making you feel more tired than if you had slept less."
  }
];

export const metadata: Metadata = {
  title: 'Free Sleep Cycle Calculator — Best Wake Up Times | Hilmost',
  description: TOOL_DESC,
  alternates: {
    canonical: CANONICAL_URL
  }
}

export default function SleepCycleCalculatorPage() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "Sleep Cycle Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/sleep-cycle-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#mode-toggle', popover: { title: '1. Select Mode', description: 'Choose whether you want to calculate wake up times or bed times.' } },
    { element: '#time-input-section', popover: { title: '2. Input Time', description: 'Enter your desired time or use the current time.' } },
    { element: '#fall-asleep-section', popover: { title: '3. Fall Asleep Time', description: 'Estimate how long it takes you to fall asleep (average is 14 mins).' } },
    { element: '#calculate-btn', popover: { title: '4. Calculate', description: 'Get your optimal sleep schedule.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <FAQSchema items={faqs} />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Circadian Rhythm Lab"
        subtitle="Precision sleep timing. Calculate your 90-minute sleep cycles to wake up feeling refreshed and energized."
        lastUpdated={lastUpdated}
        tourId="sleep_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <SleepCycleCalculatorTool />

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Circadian Rhythm Lab: The Science of 90-Minute Sleep Cycles">
          <p>
            Understanding the architecture of sleep is essential for anyone looking to optimize their daily energy levels and cognitive performance. Sleep is not a uniform state of rest but rather a complex series of physiological transitions. Throughout the night, your brain moves through several distinct stages, including Light Sleep (N1 & N2), Deep Sleep (N3), and REM (Rapid Eye Movement). A complete progression through these stages is known as a <strong>Sleep Cycle</strong>, and for most healthy adults, one cycle lasts approximately 90 minutes.
          </p>

          <h3>The 90-Minute Rule</h3>
          <p>
            The cornerstone of our <strong>Circadian Rhythm Lab</strong> is the &quot;90-Minute Rule.&quot; This theory suggests that waking up at the end of a sleep cycle—when you are in the lightest stage of sleep—is the most effective way to avoid <strong>Sleep Inertia</strong>. Sleep inertia is that heavy, groggy, and disoriented feeling that occurs when you are jolted awake during a deep sleep phase. By timing your alarm to coincide with the natural transition between cycles, you can wake up feeling refreshed and mentally sharp, even if you&apos;ve had slightly less sleep than usual.
          </p>

          <h3>Understanding Circadian Rhythms</h3>
          <p>
            Your sleep cycles are governed by your circadian rhythm, often called the &quot;internal body clock.&quot; This 24-hour cycle responds primarily to light and darkness in your environment. When your sleep schedule is misaligned with this rhythm—such as when you stay up late or change time zones—you experience &quot;social jetlag.&quot; Our tool helps you realign your schedule by identifying optimal windows for both falling asleep and waking up based on your body&apos;s natural 90-minute cadence.
          </p>

          <h3>Practical Sleep Hygiene Tips</h3>
          <p>
            To get the most out of your sleep cycles, consider these evidence-based hygiene tips:
          </p>
          <ol>
            <li><strong>Consistency is King</strong>: Go to bed and wake up at the same time every day, even on weekends.</li>
            <li><strong>Limit Blue Light</strong>: Avoid screens at least 60 minutes before bed, as blue light suppresses melatonin production.</li>
            <li><strong>The 14-Minute Buffer</strong>: On average, it takes 14 minutes to fall asleep (sleep latency). Our calculator factors this in automatically.</li>
            <li><strong>Cool Environment</strong>: Keep your bedroom temperature around 18°C (65°F) for optimal deep sleep.</li>
          </ol>
          <p>
            By mastering your sleep cycles, you aren&apos;t just sleeping more; you&apos;re sleeping smarter.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="health" currentPath={PATH} />
      </div>
    </div>
  );
}
