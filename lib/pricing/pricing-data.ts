/**
 * Pricing Data for AI Tools
 * 
 * This file contains current pricing information for all supported AI tools.
 * Used by the audit engine to calculate costs and generate recommendations.
 * 
 * Update frequency: Monthly (when pricing changes)
 * Last updated: 2026-05-07
 */

export interface PricingTier {
  name: string;
  monthlyPrice: number;
  billingCycle: "monthly" | "annual" | "per-user" | "custom";
  description: string;
  features: string[];
  maxUsers?: number;
  minUsers?: number;
}

export interface ToolPricing {
  name: string;
  provider: string;
  website: string;
  tiers: PricingTier[];
  notes?: string;
}

/**
 * ChatGPT Pricing
 * https://openai.com/pricing
 */
export const CHATGPT_PRICING: ToolPricing = {
  name: "ChatGPT",
  provider: "OpenAI",
  website: "https://openai.com/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited access to GPT-3.5",
      features: ["GPT-3.5 access", "Limited messages", "No priority access"],
    },
    {
      name: "Plus",
      monthlyPrice: 20,
      billingCycle: "monthly",
      description: "Unlimited access to GPT-4",
      features: ["GPT-4 access", "Unlimited messages", "Priority access", "Advanced features"],
    },
    {
      name: "Pro",
      monthlyPrice: 200,
      billingCycle: "monthly",
      description: "Advanced features and higher limits",
      features: ["GPT-4 Turbo", "Advanced analysis", "Custom instructions", "Priority support"],
    },
    {
      name: "Enterprise",
      monthlyPrice: 0, // Custom pricing
      billingCycle: "custom",
      description: "Custom enterprise solution",
      features: ["Custom deployment", "Dedicated support", "SLA", "Custom models"],
    },
  ],
  notes: "Pricing as of May 2026. Enterprise pricing varies by contract.",
};

/**
 * Claude Pricing
 * https://www.anthropic.com/pricing
 */
export const CLAUDE_PRICING: ToolPricing = {
  name: "Claude",
  provider: "Anthropic",
  website: "https://www.anthropic.com/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited access to Claude",
      features: ["Claude 3 Haiku access", "Limited messages", "Community support"],
    },
    {
      name: "Pro",
      monthlyPrice: 20,
      billingCycle: "monthly",
      description: "Unlimited access to Claude 3 Opus",
      features: ["Claude 3 Opus access", "Unlimited messages", "Priority support", "Advanced features"],
    },
    {
      name: "Team",
      monthlyPrice: 30,
      billingCycle: "per-user",
      description: "Team collaboration features",
      features: ["Team workspace", "Shared conversations", "Admin controls", "Usage analytics"],
      minUsers: 2,
    },
    {
      name: "Enterprise",
      monthlyPrice: 0, // Custom pricing
      billingCycle: "custom",
      description: "Custom enterprise solution",
      features: ["Custom deployment", "Dedicated support", "SLA", "Custom models"],
    },
  ],
  notes: "Pricing as of May 2026. Team pricing is per user per month.",
};

/**
 * Cursor Pricing
 * https://www.cursor.sh/pricing
 */
export const CURSOR_PRICING: ToolPricing = {
  name: "Cursor",
  provider: "Cursor",
  website: "https://www.cursor.sh/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited AI features",
      features: ["Basic code completion", "Limited requests", "Community support"],
    },
    {
      name: "Pro",
      monthlyPrice: 20,
      billingCycle: "monthly",
      description: "Unlimited AI features",
      features: ["Unlimited code completion", "GPT-4 access", "Priority support", "Advanced features"],
    },
    {
      name: "Business",
      monthlyPrice: 120,
      billingCycle: "monthly",
      description: "Team collaboration",
      features: ["Team workspace", "Admin controls", "Usage analytics", "Dedicated support"],
      minUsers: 5,
    },
  ],
  notes: "Pricing as of May 2026. Business plan is for teams.",
};

/**
 * GitHub Copilot Pricing
 * https://github.com/features/copilot/pricing
 */
export const GITHUB_COPILOT_PRICING: ToolPricing = {
  name: "GitHub Copilot",
  provider: "GitHub",
  website: "https://github.com/features/copilot/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited access for students",
      features: ["Limited completions", "Student only", "Community support"],
    },
    {
      name: "Individual",
      monthlyPrice: 10,
      billingCycle: "monthly",
      description: "Individual developer",
      features: ["Unlimited completions", "IDE integration", "Priority support"],
    },
    {
      name: "Business",
      monthlyPrice: 21,
      billingCycle: "per-user",
      description: "Team collaboration",
      features: ["Team workspace", "Admin controls", "Usage analytics", "Dedicated support"],
      minUsers: 1,
    },
    {
      name: "Enterprise",
      monthlyPrice: 0, // Custom pricing
      billingCycle: "custom",
      description: "Custom enterprise solution",
      features: ["Custom deployment", "Dedicated support", "SLA", "Custom models"],
    },
  ],
  notes: "Pricing as of May 2026. Business pricing is per user per month.",
};

/**
 * Google Gemini Pricing
 * https://ai.google.dev/pricing
 */
export const GEMINI_PRICING: ToolPricing = {
  name: "Gemini",
  provider: "Google",
  website: "https://ai.google.dev/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited access",
      features: ["Gemini 1.5 Flash", "Limited requests", "Community support"],
    },
    {
      name: "Pro",
      monthlyPrice: 20,
      billingCycle: "monthly",
      description: "Unlimited access",
      features: ["Gemini 1.5 Pro", "Unlimited requests", "Priority support", "Advanced features"],
    },
    {
      name: "Team",
      monthlyPrice: 30,
      billingCycle: "per-user",
      description: "Team collaboration",
      features: ["Team workspace", "Shared conversations", "Admin controls", "Usage analytics"],
      minUsers: 2,
    },
    {
      name: "Enterprise",
      monthlyPrice: 0, // Custom pricing
      billingCycle: "custom",
      description: "Custom enterprise solution",
      features: ["Custom deployment", "Dedicated support", "SLA", "Custom models"],
    },
  ],
  notes: "Pricing as of May 2026. Team pricing is per user per month.",
};

/**
 * Midjourney Pricing
 * https://www.midjourney.com/pricing
 */
export const MIDJOURNEY_PRICING: ToolPricing = {
  name: "Midjourney",
  provider: "Midjourney",
  website: "https://www.midjourney.com/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited trial",
      features: ["25 free generations", "Community support"],
    },
    {
      name: "Basic",
      monthlyPrice: 10,
      billingCycle: "monthly",
      description: "Casual use",
      features: ["3.33 hours GPU", "Relax mode", "Community support"],
    },
    {
      name: "Standard",
      monthlyPrice: 30,
      billingCycle: "monthly",
      description: "Regular use",
      features: ["15 hours GPU", "Relax mode", "Fast mode", "Priority support"],
    },
    {
      name: "Pro",
      monthlyPrice: 60,
      billingCycle: "monthly",
      description: "Professional use",
      features: ["30 hours GPU", "Relax mode", "Fast mode", "Stealth mode", "Priority support"],
    },
  ],
  notes: "Pricing as of May 2026. GPU hours reset monthly.",
};

/**
 * Perplexity Pricing
 * https://www.perplexity.ai/pricing
 */
export const PERPLEXITY_PRICING: ToolPricing = {
  name: "Perplexity",
  provider: "Perplexity AI",
  website: "https://www.perplexity.ai/pricing",
  tiers: [
    {
      name: "Free",
      monthlyPrice: 0,
      billingCycle: "monthly",
      description: "Limited access",
      features: ["Limited queries", "Community support"],
    },
    {
      name: "Pro",
      monthlyPrice: 20,
      billingCycle: "monthly",
      description: "Unlimited access",
      features: ["Unlimited queries", "Advanced models", "Priority support", "API access"],
    },
  ],
  notes: "Pricing as of May 2026.",
};

/**
 * All tool pricing combined
 */
export const ALL_TOOL_PRICING: Record<string, ToolPricing> = {
  ChatGPT: CHATGPT_PRICING,
  Claude: CLAUDE_PRICING,
  Cursor: CURSOR_PRICING,
  "GitHub Copilot": GITHUB_COPILOT_PRICING,
  Gemini: GEMINI_PRICING,
  Midjourney: MIDJOURNEY_PRICING,
  Perplexity: PERPLEXITY_PRICING,
};

/**
 * Get pricing for a specific tool
 */
export function getToolPricing(toolName: string): ToolPricing | undefined {
  return ALL_TOOL_PRICING[toolName];
}

/**
 * Get all available tools
 */
export function getAllTools(): string[] {
  return Object.keys(ALL_TOOL_PRICING);
}

/**
 * Get pricing tier for a tool
 */
export function getToolTier(toolName: string, tierName: string): PricingTier | undefined {
  const tool = getToolPricing(toolName);
  if (!tool) return undefined;
  return tool.tiers.find((tier) => tier.name === tierName);
}
