import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema, AuthorBio } from "@utilitiessite/ui";
import { Metadata } from "next";
import { AITokenCalculatorClient } from "./AITokenCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "AI Token Calculator & Cost Estimator";
const TOOL_DESC = "Estimate LLM token counts and API costs for OpenAI GPT-4o, Claude, and Llama. Professional tool for developers to plan AI budgets and prompt efficiency.";
const PATH = "/dx/ai-token-calculator";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/dx.png", width: 1200, height: 630, alt: "Hilmost AI Token Calculator" }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/dx.png"],
    }
  };
}

const faqs = [
  {
    question: "What is a token in AI?",
    answer: "Tokens are the basic units of text that Large Language Models (LLMs) process. They can be as short as a single character or as long as a whole word. For English text, 1000 tokens is roughly equivalent to 750 words.",
  },
  {
    question: "How is AI pricing calculated?",
    answer: "Most AI providers (OpenAI, Anthropic, Google) charge based on the number of tokens processed. There are usually two rates: an 'input' rate for the prompt you send, and a higher 'output' rate for the text the AI generates.",
  },
  {
    question: "How many tokens is 1000 words?",
    answer: "As a general rule of thumb, 1000 English words will equate to approximately 1,300 to 1,400 tokens. This varies based on the complexity of the vocabulary and the specific tokenizer used by the model.",
  },
  {
    question: "Why does the output cost more than the input?",
    answer: "Generating text (output) is more computationally expensive for the model than reading text (input). This is why providers almost always charge 2x to 3x more for completion tokens than for prompt tokens.",
  },
];

export default function AITokenCalculatorPage() {
  const breadcrumbItems = [
    { label: "Developer Experience", href: "/dx" },
    { label: "AI Token Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/ai-token-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'textarea', popover: { title: '1. Input Text', description: 'Paste the content or prompt you want to analyze here.' } },
    { element: '.text-5xl', popover: { title: '2. Token Estimate', description: 'See an immediate heuristic estimate of the token count.' } },
    { element: 'select', popover: { title: '3. Cost Projection', description: 'Select a model and output ratio to estimate your API bill.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/dx.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="AI Token & Cost Analytics"
        subtitle="Optimize your prompts and plan your AI budget. Get high-precision estimates for major LLM providers."
        lastUpdated={lastUpdated}
        tourId="ai_token_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <AITokenCalculatorClient />

      <ToolArticle title="Mastering the Economy of AI: Tokens and Tensors">
        <p>
          In the era of Large Language Models (LLMs), text is no longer measured just in bytes or words—it is measured in <strong>tokens</strong>. For developers building AI-powered applications, understanding tokenization is the difference between a profitable product and a runaway API bill.
        </p>

        <h3>What exactly is a Token?</h3>
        <p>
          Large Language Models don&apos;t read words the way humans do. Instead, they break text down into chunks called tokens. A token can be a single character, a common prefix like &quot;pre-&quot;, or a full word like &quot;apple&quot;.
        </p>
        <p>
          Different models use different tokenizers. For example, OpenAI&apos;s latest models use the <strong>O200k-base</strong> tokenizer, which is much more efficient for non-English languages than older versions. Our calculator uses a standard heuristic of <strong>4 characters per token</strong>, which provides a reliable baseline for English-heavy prompts.
        </p>

        <h3>Prompt Engineering vs. Cost Efficiency</h3>
        <p>
          Every word you add to a prompt has a literal price tag. When building &quot;agentic&quot; workflows—where the AI might call itself multiple times—the input tokens (the prompt and the conversation history) can grow exponentially.
        </p>
        <ul>
          <li><strong>Input Tokens:</strong> Usually cheaper, these include your system instructions, few-shot examples, and the user query.</li>
          <li><strong>Output Tokens:</strong> More expensive, these are generated by the model in real-time.</li>
          <li><strong>Context Window:</strong> The total limit of tokens (Input + Output) the model can &quot;remember&quot; at once.</li>
        </ul>

        <h3>How to Optimize Your AI Budget</h3>
        <p>
          To keep costs low, focus on <strong>Prompt Compression</strong>. Remove redundant instructions, use efficient data formats (like JSON with short keys), and always estimate your &quot;Output Ratio&quot;—the expected length of the AI&quot;s response relative to your prompt. Our tool includes an Output Ratio selector to help you project these variable costs.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="generic" />
      <RelatedTools category="dx" currentPath={PATH} />
    </div>
  );
}
