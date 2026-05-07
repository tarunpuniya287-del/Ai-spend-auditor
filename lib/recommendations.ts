import { AuditFormData } from "./types";

export interface Recommendation {
  message: string;
  type: "info" | "warning" | "insight";
}

export function generateRecommendations(data: AuditFormData): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (data.tools.length === 0) {
    return recommendations;
  }

  // Check for overlapping tools
  const toolNames = data.tools.map((t) => t.tool);
  const hasOverlap = toolNames.length !== new Set(toolNames).size;
  if (hasOverlap) {
    recommendations.push({
      message: "Detected overlapping AI subscriptions. Consider consolidating duplicate tools.",
      type: "warning",
    });
  }

  // Check for enterprise plans with small teams
  const hasEnterprisePlan = data.tools.some((t) => t.plan.toLowerCase().includes("enterprise"));
  if (hasEnterprisePlan && data.teamSize && ["1-5", "6-20"].includes(data.teamSize)) {
    recommendations.push({
      message: "Enterprise plan may be oversized for your current team size. Review plan options.",
      type: "insight",
    });
  }

  // Check for potential redundant seat allocation
  const totalSeats = data.tools.reduce((sum, t) => sum + t.seats, 0);
  const teamSizeMap: { [key: string]: number } = {
    "1-5": 5,
    "6-20": 20,
    "21-50": 50,
    "51-100": 100,
    "100+": 150,
  };

  if (data.teamSize && teamSizeMap[data.teamSize]) {
    const maxTeamSize = teamSizeMap[data.teamSize];
    if (totalSeats > maxTeamSize * 1.5) {
      recommendations.push({
        message: `Potential redundant seat allocation detected. You have ${totalSeats} seats for a ${data.teamSize} team.`,
        type: "warning",
      });
    }
  }

  // Check for high spend with few tools
  const totalSpend = data.tools.reduce((sum, t) => sum + t.spend, 0);
  if (data.tools.length === 1 && totalSpend > 500) {
    recommendations.push({
      message: "High spend on a single tool. Consider diversifying your AI stack.",
      type: "insight",
    });
  }

  // Check for mixed usage with specialized tools
  if (data.useCase === "mixed" && data.tools.length < 3) {
    recommendations.push({
      message: "Mixed usage detected but limited tools. You may benefit from additional specialized tools.",
      type: "info",
    });
  }

  // Check for coding use case without GitHub Copilot
  if (data.useCase === "coding" && !toolNames.includes("GitHub Copilot")) {
    recommendations.push({
      message: "Development-focused team without GitHub Copilot. Consider evaluating for code completion.",
      type: "info",
    });
  }

  return recommendations;
}
