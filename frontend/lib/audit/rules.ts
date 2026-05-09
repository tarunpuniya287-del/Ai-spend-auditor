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
    // Calculate savings from consolidating duplicate tools
    // Find duplicate tools and sum their spend
    const toolNames = data.tools.map((t) => t.tool);
    const duplicates = new Set<string>();
    const seen = new Set<string>();
    
    toolNames.forEach((name) => {
      if (seen.has(name)) {
        duplicates.add(name);
      }
      seen.add(name);
    });

    // Sum spend of duplicate tools (keep one, eliminate others)
    let savingsFromDuplicates = 0;
    duplicates.forEach((toolName) => {
      const toolEntries = data.tools.filter((t) => t.tool === toolName);
      if (toolEntries.length > 1) {
        // Keep the first one, eliminate the rest
        savingsFromDuplicates += toolEntries.slice(1).reduce((sum, t) => sum + t.spend, 0);
      }
    });

    return savingsFromDuplicates;
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
    // Estimate savings by downgrading enterprise to pro/standard tier
    // Typical enterprise is 2-3x the cost of pro tier
    const enterpriseTools = data.tools.filter((t) => t.plan.toLowerCase().includes("enterprise"));
    
    // Rough estimate: enterprise is ~3x pro tier cost
    // So savings would be approximately 2/3 of the enterprise spend
    const estimatedSavings = enterpriseTools.reduce((sum, tool) => {
      // Assume enterprise is 3x the cost, so downgrading saves 2/3
      return sum + (tool.spend * 2) / 3;
    }, 0);

    return estimatedSavings;
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
    // Calculate savings from reducing excess seats
    const totalSeats = data.tools.reduce((sum, t) => sum + t.seats, 0);
    const teamSizeMap: { [key: string]: number } = {
      "1-5": 5,
      "6-20": 20,
      "21-50": 50,
      "51-100": 100,
      "100+": 150,
    };

    if (!data.teamSize || !teamSizeMap[data.teamSize]) return 0;
    const maxTeamSize = teamSizeMap[data.teamSize];
    const excessSeats = totalSeats - maxTeamSize;

    if (excessSeats <= 0) return 0;

    // Calculate average cost per seat across all tools
    const totalSpend = data.tools.reduce((sum, t) => sum + t.spend, 0);
    const costPerSeat = totalSeats > 0 ? totalSpend / totalSeats : 0;

    // Savings from removing excess seats
    return excessSeats * costPerSeat;
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
    // For now, no direct savings from diversification alone
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
    // No direct savings from adding tools
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
    // No direct savings from adding Copilot
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
 * Rule: Unusually High AI Spend Relative to Team Size
 * Detects when per-person AI spend is significantly higher than typical
 */
export const HIGH_SPEND_PER_PERSON_RULE: AuditRule = {
  id: "high-spend-per-person",
  name: "High Spend Per Person",
  category: "optimization",
  severity: "warning",
  description: "AI spend per team member is unusually high",
  evaluate: (data: AuditFormData) => {
    const totalSpend = data.tools.reduce((sum, t) => sum + t.spend, 0);
    const teamSizeMap: { [key: string]: number } = {
      "1-5": 3,
      "6-20": 13,
      "21-50": 35,
      "51-100": 75,
      "100+": 150,
    };

    if (!data.teamSize || !teamSizeMap[data.teamSize]) return false;
    const estimatedTeamSize = teamSizeMap[data.teamSize];
    const spendPerPerson = totalSpend / estimatedTeamSize;

    // Flag if spend per person exceeds $100/month
    return spendPerPerson > 100;
  },
  recommendation: "Review your AI tool spending - it's higher than typical for your team size",
  potentialSavings: (data: AuditFormData) => {
    const totalSpend = data.tools.reduce((sum, t) => sum + t.spend, 0);
    const teamSizeMap: { [key: string]: number } = {
      "1-5": 3,
      "6-20": 13,
      "21-50": 35,
      "51-100": 75,
      "100+": 150,
    };

    if (!data.teamSize || !teamSizeMap[data.teamSize]) return 0;
    const estimatedTeamSize = teamSizeMap[data.teamSize];
    const spendPerPerson = totalSpend / estimatedTeamSize;

    // Suggest reducing to $75/person as a reasonable target
    const targetSpend = estimatedTeamSize * 75;
    const potentialSavings = Math.max(0, totalSpend - targetSpend);

    return potentialSavings;
  },
};

/**
 * Rule: Overlapping Coding Assistants
 * Detects when multiple coding assistant tools are subscribed
 */
export const OVERLAPPING_CODING_ASSISTANTS_RULE: AuditRule = {
  id: "overlapping-coding-assistants",
  name: "Overlapping Coding Assistants",
  category: "redundancy",
  severity: "warning",
  description: "Multiple coding assistant subscriptions detected",
  evaluate: (data: AuditFormData) => {
    const codingTools = ["GitHub Copilot", "Codeium", "Tabnine", "Amazon CodeWhisperer"];
    const userCodingTools = data.tools.filter((t) =>
      codingTools.some((ct) => t.tool.toLowerCase().includes(ct.toLowerCase()))
    );
    return userCodingTools.length > 1;
  },
  recommendation: "Consider consolidating to a single coding assistant - most teams only need one",
  potentialSavings: (data: AuditFormData) => {
    const codingTools = ["GitHub Copilot", "Codeium", "Tabnine", "Amazon CodeWhisperer"];
    const userCodingTools = data.tools.filter((t) =>
      codingTools.some((ct) => t.tool.toLowerCase().includes(ct.toLowerCase()))
    );

    if (userCodingTools.length <= 1) return 0;

    // Keep the most expensive one (likely the best), eliminate others
    const sorted = userCodingTools.sort((a, b) => b.spend - a.spend);
    const savingsFromConsolidation = sorted.slice(1).reduce((sum, t) => sum + t.spend, 0);

    return savingsFromConsolidation;
  },
};

/**
 * Rule: Small Team with Enterprise Seats
 * Detects when seat allocation is excessive for team size
 */
export const SMALL_TEAM_ENTERPRISE_SEATS_RULE: AuditRule = {
  id: "small-team-enterprise-seats",
  name: "Small Team Enterprise Seats",
  category: "oversizing",
  severity: "critical",
  description: "Enterprise seat allocation for small team",
  evaluate: (data: AuditFormData) => {
    const totalSeats = data.tools.reduce((sum, t) => sum + t.seats, 0);
    const isSmallTeam = data.teamSize && ["1-5", "6-20"].includes(data.teamSize);
    const hasExcessSeats = totalSeats > 50;

    return !!(isSmallTeam && hasExcessSeats);
  },
  recommendation: "Reduce seat allocation to match your team size - you're paying for unused licenses",
  potentialSavings: (data: AuditFormData) => {
    const totalSeats = data.tools.reduce((sum, t) => sum + t.seats, 0);
    const teamSizeMap: { [key: string]: number } = {
      "1-5": 5,
      "6-20": 20,
      "21-50": 50,
      "51-100": 100,
      "100+": 150,
    };

    if (!data.teamSize || !teamSizeMap[data.teamSize]) return 0;
    const maxTeamSize = teamSizeMap[data.teamSize];
    const excessSeats = Math.max(0, totalSeats - maxTeamSize);

    if (excessSeats === 0) return 0;

    // Calculate average cost per seat
    const totalSpend = data.tools.reduce((sum, t) => sum + t.spend, 0);
    const costPerSeat = totalSeats > 0 ? totalSpend / totalSeats : 0;

    return excessSeats * costPerSeat;
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
  HIGH_SPEND_PER_PERSON_RULE,
  OVERLAPPING_CODING_ASSISTANTS_RULE,
  SMALL_TEAM_ENTERPRISE_SEATS_RULE,
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
