export interface AIModelPricing {
  label: string;
  provider: string;
  inputCostPer1M: number;
  outputCostPer1M: number;
  isCustom?: boolean;
}

/**
 * Illustrative AI Model Pricing.
 * These values serve as reference benchmarks. Users should verify current
 * rates with providers (OpenAI, Anthropic, Google, etc.) before budgeting.
 */
export const AI_MODELS: AIModelPricing[] = [
  {
    label: "GPT-4o (Example)",
    provider: "OpenAI",
    inputCostPer1M: 5.00,
    outputCostPer1M: 15.00,
  },
  {
    label: "GPT-4o mini (Example)",
    provider: "OpenAI",
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
  },
  {
    label: "Claude 3.5 Sonnet (Example)",
    provider: "Anthropic",
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
  },
  {
    label: "Claude 3.5 Haiku (Example)",
    provider: "Anthropic",
    inputCostPer1M: 0.25,
    outputCostPer1M: 1.25,
  },
  {
    label: "Gemini 1.5 Pro (Example)",
    provider: "Google",
    inputCostPer1M: 3.50,
    outputCostPer1M: 10.50,
  },
  {
    label: "Gemini 1.5 Flash (Example)",
    provider: "Google",
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
  },
  {
    label: "Enter Custom Rates...",
    provider: "User Defined",
    inputCostPer1M: 0,
    outputCostPer1M: 0,
    isCustom: true
  }
];
