export const AI_TOOLS = [
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "Claude", label: "Claude" },
  { value: "Cursor", label: "Cursor" },
  { value: "GitHub Copilot", label: "GitHub Copilot" },
  { value: "Gemini", label: "Gemini" },
  { value: "Midjourney", label: "Midjourney" },
  { value: "Perplexity", label: "Perplexity" },
  { value: "Other", label: "Other" },
];

export const PLANS = {
  ChatGPT: [
    { value: "Free", label: "Free" },
    { value: "Plus", label: "Plus ($20/mo)" },
    { value: "Pro", label: "Pro ($200/mo)" },
    { value: "Enterprise", label: "Enterprise" },
  ],
  Claude: [
    { value: "Free", label: "Free" },
    { value: "Pro", label: "Pro ($20/mo)" },
    { value: "Team", label: "Team ($30/user/mo)" },
    { value: "Enterprise", label: "Enterprise" },
  ],
  Cursor: [
    { value: "Free", label: "Free" },
    { value: "Pro", label: "Pro ($20/mo)" },
    { value: "Business", label: "Business ($120/mo)" },
  ],
  "GitHub Copilot": [
    { value: "Free", label: "Free" },
    { value: "Individual", label: "Individual ($10/mo)" },
    { value: "Business", label: "Business ($21/user/mo)" },
    { value: "Enterprise", label: "Enterprise" },
  ],
  Gemini: [
    { value: "Free", label: "Free" },
    { value: "Pro", label: "Pro ($20/mo)" },
    { value: "Team", label: "Team ($30/user/mo)" },
  ],
  Midjourney: [
    { value: "Free", label: "Free" },
    { value: "Basic", label: "Basic ($10/mo)" },
    { value: "Standard", label: "Standard ($30/mo)" },
    { value: "Pro", label: "Pro ($60/mo)" },
  ],
  Perplexity: [
    { value: "Free", label: "Free" },
    { value: "Pro", label: "Pro ($20/mo)" },
  ],
  Other: [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid (Custom)" },
  ],
};

export const TEAM_SIZES = [
  { value: "1-5", label: "1-5 people" },
  { value: "6-20", label: "6-20 people" },
  { value: "21-50", label: "21-50 people" },
  { value: "51-100", label: "51-100 people" },
  { value: "100+", label: "100+ people" },
];

export const USE_CASES = [
  { value: "coding", label: "Development & Coding" },
  { value: "writing", label: "Content & Writing" },
  { value: "research", label: "Research & Analysis" },
  { value: "data", label: "Data & Analytics" },
  { value: "mixed", label: "Mixed Usage" },
];
