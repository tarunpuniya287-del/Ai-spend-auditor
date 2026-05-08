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
