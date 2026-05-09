/**
 * Audit Generation Engine
 * 
 * Main entry point for generating comprehensive audit reports.
 * Orchestrates rule evaluation, savings calculation, and recommendation generation.
 * 
 * Process:
 * 1. Validate input data
 * 2. Evaluate all audit rules
 * 3. Calculate potential savings
 * 4. Generate recommendations
 * 5. Create audit report
 */

import { AuditFormData } from "@/lib/types";
import { evaluateAllRules, AuditRule } from "./rules";
import { calculateSavings, SavingsCalculation } from "./calculate-savings";

export interface AuditFinding {
  ruleId: string;
  ruleName: string;
  severity: "info" | "warning" | "critical";
  description: string;
  recommendation: string;
  potentialSavings: number;
}

export interface AuditReport {
  id: string;
  timestamp: string;
  formData: AuditFormData;
  findings: AuditFinding[];
  summary: {
    totalMonthlySpend: number;
    totalSeats: number;
    toolsAnalyzed: number;
    findingsCount: number;
    criticalCount: number;
    warningCount: number;
    infoCount: number;
  };
  savings: SavingsCalculation;
  recommendations: string[];
  insights: string[];
}

/**
 * Generate a complete audit report
 */
export function generateAudit(data: AuditFormData): AuditReport {
  // Validate input
  if (!data || data.tools.length === 0) {
    throw new Error("No tools provided for audit");
  }

  // Evaluate rules
  const triggeredRules = evaluateAllRules(data);

  // Convert rules to findings
  const findings: AuditFinding[] = triggeredRules.map((rule) => ({
    ruleId: rule.id,
    ruleName: rule.name,
    severity: rule.severity,
    description: rule.description,
    recommendation: rule.recommendation,
    potentialSavings: rule.potentialSavings ? rule.potentialSavings(data) : 0,
  }));

  // Calculate savings
  const savings = calculateSavings(data, findings);

  // Generate recommendations
  const recommendations = generateRecommendations(findings, data);

  // Generate insights
  const insights = generateInsights(data, findings, savings);

  // Calculate summary
  const totalMonthlySpend = data.tools.reduce((sum, tool) => sum + tool.spend, 0);
  const totalSeats = data.tools.reduce((sum, tool) => sum + tool.seats, 0);

  const summary = {
    totalMonthlySpend,
    totalSeats,
    toolsAnalyzed: data.tools.length,
    findingsCount: findings.length,
    criticalCount: findings.filter((f) => f.severity === "critical").length,
    warningCount: findings.filter((f) => f.severity === "warning").length,
    infoCount: findings.filter((f) => f.severity === "info").length,
  };

  // Create report
  const report: AuditReport = {
    id: generateReportId(),
    timestamp: new Date().toISOString(),
    formData: data,
    findings,
    summary,
    savings,
    recommendations,
    insights,
  };

  return report;
}

/**
 * Generate recommendations from findings
 */
function generateRecommendations(findings: AuditFinding[], data: AuditFormData): string[] {
  const recommendations: string[] = [];

  // Sort by severity and potential savings
  const sortedFindings = findings.sort((a, b) => {
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return b.potentialSavings - a.potentialSavings;
  });

  // Add top recommendations
  sortedFindings.slice(0, 5).forEach((finding) => {
    recommendations.push(finding.recommendation);
  });

  // Add general recommendations based on data
  if (data.tools.length === 1) {
    recommendations.push("Consider evaluating additional tools to diversify your AI stack");
  }

  if (data.teamSize && ["1-5", "6-20"].includes(data.teamSize) && data.tools.length > 3) {
    recommendations.push("Your team size may not require this many tools - consider consolidation");
  }

  return recommendations;
}

/**
 * Generate lightweight insights from audit data
 */
function generateInsights(data: AuditFormData, findings: AuditFinding[], savings: SavingsCalculation): string[] {
  const insights: string[] = [];

  // Insight 1: Overall spend analysis
  const totalSpend = data.tools.reduce((sum, tool) => sum + tool.spend, 0);
  if (totalSpend > 0) {
    insights.push(`Your team is spending $${totalSpend.toFixed(2)}/month on AI tools, which totals $${(totalSpend * 12).toFixed(2)}/year.`);
  }

  // Insight 2: Tool diversity
  if (data.tools.length === 1) {
    insights.push("You're currently using a single AI tool. Diversifying could provide better coverage for different use cases.");
  } else if (data.tools.length >= 5) {
    insights.push(`You're using ${data.tools.length} different AI tools. Consider if all are actively used to avoid tool sprawl.`);
  } else {
    insights.push(`Your team has a balanced set of ${data.tools.length} AI tools for different use cases.`);
  }

  // Insight 3: Seat efficiency
  const totalSeats = data.tools.reduce((sum, tool) => sum + tool.seats, 0);
  const teamSizeMap: { [key: string]: number } = {
    "1-5": 5,
    "6-20": 20,
    "21-50": 50,
    "51-100": 100,
    "100+": 150,
  };

  if (data.teamSize && teamSizeMap[data.teamSize]) {
    const maxTeamSize = teamSizeMap[data.teamSize];
    const seatUtilization = (maxTeamSize / totalSeats) * 100;
    if (seatUtilization > 100) {
      insights.push(`You have ${totalSeats} seats allocated for a ${data.teamSize} team, indicating good seat utilization.`);
    } else if (seatUtilization < 50) {
      insights.push(`You have ${totalSeats} seats for a ${data.teamSize} team. Consider optimizing seat allocation.`);
    }
  }

  // Insight 4: Savings potential
  if (savings.monthlyPotentialSavings > 0) {
    insights.push(`Potential savings of $${savings.monthlyPotentialSavings.toFixed(2)}/month (${savings.savingsPercentage.toFixed(1)}%) identified through optimization.`);
  } else {
    insights.push("Your current setup appears well-optimized with minimal savings opportunities.");
  }

  // Insight 5: Use case alignment
  if (data.useCase === "coding") {
    const hasCopilot = data.tools.some((t) => t.tool === "GitHub Copilot");
    if (hasCopilot) {
      insights.push("Your development team has GitHub Copilot, which is excellent for code completion and productivity.");
    } else {
      insights.push("Your development team might benefit from GitHub Copilot for enhanced code completion.");
    }
  } else if (data.useCase === "mixed") {
    insights.push("Your mixed-use team benefits from having multiple specialized tools for different tasks.");
  }

  // Insight 6: Critical issues
  const criticalFindings = findings.filter((f) => f.severity === "critical");
  if (criticalFindings.length > 0) {
    insights.push(`${criticalFindings.length} critical issue(s) detected that should be addressed immediately.`);
  }

  return insights;
}

/**
 * Generate unique report ID
 */
function generateReportId(): string {
  return `audit-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Validate audit data
 */
export function validateAuditData(data: AuditFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data) {
    errors.push("No data provided");
    return { valid: false, errors };
  }

  if (!data.tools || data.tools.length === 0) {
    errors.push("At least one tool must be added");
  }

  data.tools.forEach((tool, index) => {
    if (!tool.tool) {
      errors.push(`Tool ${index + 1}: Tool name is required`);
    }
    if (!tool.plan) {
      errors.push(`Tool ${index + 1}: Plan is required`);
    }
    if (tool.spend < 0) {
      errors.push(`Tool ${index + 1}: Spend cannot be negative`);
    }
    if (tool.seats < 1) {
      errors.push(`Tool ${index + 1}: At least 1 seat is required`);
    }
  });

  if (!data.teamSize) {
    errors.push("Team size is required");
  }

  if (!data.useCase) {
    errors.push("Use case is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Export audit report as JSON
 */
export function exportAuditAsJSON(report: AuditReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Export audit report as CSV
 */
export function exportAuditAsCSV(report: AuditReport): string {
  const lines: string[] = [];

  // Header
  lines.push("AI Spend Audit Report");
  lines.push(`Generated: ${report.timestamp}`);
  lines.push("");

  // Summary
  lines.push("SUMMARY");
  lines.push(`Total Monthly Spend,$${report.summary.totalMonthlySpend.toFixed(2)}`);
  lines.push(`Total Seats,${report.summary.totalSeats}`);
  lines.push(`Tools Analyzed,${report.summary.toolsAnalyzed}`);
  lines.push(`Findings,${report.summary.findingsCount}`);
  lines.push("");

  // Savings
  lines.push("SAVINGS POTENTIAL");
  lines.push(`Monthly Savings,$${report.savings.monthlyPotentialSavings.toFixed(2)}`);
  lines.push(`Annual Savings,$${report.savings.annualPotentialSavings.toFixed(2)}`);
  lines.push("");

  // Findings
  lines.push("FINDINGS");
  lines.push("Rule,Severity,Description,Recommendation,Potential Savings");
  report.findings.forEach((finding) => {
    lines.push(
      `"${finding.ruleName}","${finding.severity}","${finding.description}","${finding.recommendation}","$${finding.potentialSavings.toFixed(2)}"`
    );
  });

  return lines.join("\n");
}
