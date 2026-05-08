/**
 * Audit Rules Engine
 * 
 * Defines all rules used to analyze AI tool spending and generate recommendations.
 * Rules are evaluated against user data to identify optimization opportunities.
 * 
 * Rule Categories:
 * - Redundancy: Duplicate or overlapping tools
 * - Oversizing: Plans too large for team size
 * - Underutilization: Unused seats or features
 * - Cost Optimization: Cheaper alternatives available
 * - Usage Patterns: Based on team size and use case
 */

import { AuditFormData } from "@/lib/types";

export interface AuditRule {
  id: string;
  name: string;
  category: "redundancy" | "oversizing" | "underutilization" | "optimization" | "pattern";
  severity: "info" | "warning" | "critical";
  description: string;
  evaluate: (data: AuditFormData) => boolean;
  recommendation: string;
  potentialSavings?: (data: AuditFormData) => number;
}

/**
 * Rule: Overlapping AI Subscriptions
 * Detects when user has multiple tools that serve similar purposes
 */
export const OVERLAPPING_SUBSCRIPTIONS_RULE: AuditRule = {
  id: "overlapping-subscriptions",
  name: "Overlapping Subscriptions",
  category: "redundancy",
  severity: "warning",
  description: "Multiple tools with similar functionality detected",
  evaluate: (data: AuditFormData) => {
    const toolNames = data.tools.map((t) => t.tool);
    return toolNames.length !== new Set(toolNames).size;
  },
  recommendation: "Consider consolidating duplicate tools to reduce costs",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on duplicate tools
    return 0;
  },
};

/**
 * Rule: Enterprise Plan Oversizing
 * Detects when enterprise plans are used for small teams
 */
export const ENTERPRISE_OVERSIZING_RULE: AuditRule = {
  id: "enterprise-oversizing",
  name: "Enterprise Plan Oversizing",
  category: "oversizing",
  severity: "warning",
  description: "Enterprise plan detected for small team",
  evaluate: (data: AuditFormData): boolean => {
    const hasEnterprise = data.tools.some((t) => t.plan.toLowerCase().includes("enterprise"));
    const isSmallTeam = data.teamSize && ["1-5", "6-20"].includes(data.teamSize);
    return !!(hasEnterprise && isSmallTeam);
  },
  recommendation: "Review plan options - enterprise plans may be oversized for your team",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on enterprise tools
    return 0;
  },
};

/**
 * Rule: Redundant Seat Allocation
 * Detects when total seats exceed team size significantly
 */
export const REDUNDANT_SEATS_RULE: AuditRule = {
  id: "redundant-seats",
  name: "Redundant Seat Allocation",
  category: "underutilization",
  severity: "warning",
  description: "Seat count exceeds team size",
  evaluate: (data: AuditFormData) => {
    const totalSeats = data.tools.reduce((sum, t) => sum + t.seats, 0);
    const teamSizeMap: { [key: string]: number } = {
      "1-5": 5,
      "6-20": 20,
      "21-50": 50,
      "51-100": 100,
      "100+": 150,
    };

    if (!data.teamSize || !teamSizeMap[data.teamSize]) return false;
    const maxTeamSize = teamSizeMap[data.teamSize];
    return totalSeats > maxTeamSize * 1.5;
  },
  recommendation: "Review seat allocation - you may have unused licenses",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on excess seats
    return 0;
  },
};

/**
 * Rule: High Single Tool Spend
 * Detects when spending is concentrated on one tool
 */
export const HIGH_SINGLE_TOOL_SPEND_RULE: AuditRule = {
  id: "high-single-tool-spend",
  name: "High Single Tool Spend",
  category: "optimization",
  severity: "info",
  description: "High spend on single tool",
  evaluate: (data: AuditFormData) => {
    return data.tools.length === 1 && data.tools[0].spend > 500;
  },
  recommendation: "Consider diversifying your AI stack for better coverage",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on diversification
    return 0;
  },
};

/**
 * Rule: Mixed Usage Without Specialized Tools
 * Detects mixed usage teams without enough tool diversity
 */
export const MIXED_USAGE_LIMITED_TOOLS_RULE: AuditRule = {
  id: "mixed-usage-limited-tools",
  name: "Mixed Usage Limited Tools",
  category: "pattern",
  severity: "info",
  description: "Mixed usage detected but limited tool diversity",
  evaluate: (data: AuditFormData) => {
    return data.useCase === "mixed" && data.tools.length < 3;
  },
  recommendation: "Mixed usage teams may benefit from additional specialized tools",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on tool gaps
    return 0;
  },
};

/**
 * Rule: Development Without GitHub Copilot
 * Detects development teams without GitHub Copilot
 */
export const DEVELOPMENT_WITHOUT_COPILOT_RULE: AuditRule = {
  id: "development-without-copilot",
  name: "Development Without Copilot",
  category: "pattern",
  severity: "info",
  description: "Development team without GitHub Copilot",
  evaluate: (data: AuditFormData) => {
    const toolNames = data.tools.map((t) => t.tool);
    return data.useCase === "coding" && !toolNames.includes("GitHub Copilot");
  },
  recommendation: "Development teams often benefit from GitHub Copilot for code completion",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on Copilot pricing
    return 0;
  },
};

/**
 * Rule: Free Tier Underutilization
 * Detects when users pay for tools with free alternatives
 */
export const FREE_TIER_UNDERUTILIZATION_RULE: AuditRule = {
  id: "free-tier-underutilization",
  name: "Free Tier Underutilization",
  category: "optimization",
  severity: "info",
  description: "Paid tier when free tier may suffice",
  evaluate: (data: AuditFormData) => {
    // Placeholder: Check if any tool has free tier that might work
    return false;
  },
  recommendation: "Review if free tiers of current tools meet your needs",
  potentialSavings: (data: AuditFormData) => {
    // Placeholder: Calculate based on free tier availability
    return 0;
  },
};

/**
 * All audit rules
 */
export const ALL_AUDIT_RULES: AuditRule[] = [
  OVERLAPPING_SUBSCRIPTIONS_RULE,
  ENTERPRISE_OVERSIZING_RULE,
  REDUNDANT_SEATS_RULE,
  HIGH_SINGLE_TOOL_SPEND_RULE,
  MIXED_USAGE_LIMITED_TOOLS_RULE,
  DEVELOPMENT_WITHOUT_COPILOT_RULE,
  FREE_TIER_UNDERUTILIZATION_RULE,
];

/**
 * Get rules by category
 */
export function getRulesByCategory(category: AuditRule["category"]): AuditRule[] {
  return ALL_AUDIT_RULES.filter((rule) => rule.category === category);
}

/**
 * Get rules by severity
 */
export function getRulesBySeverity(severity: AuditRule["severity"]): AuditRule[] {
  return ALL_AUDIT_RULES.filter((rule) => rule.severity === severity);
}

/**
 * Evaluate all rules against data
 */
export function evaluateAllRules(data: AuditFormData): AuditRule[] {
  return ALL_AUDIT_RULES.filter((rule) => rule.evaluate(data));
}
