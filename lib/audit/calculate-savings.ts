/**
 * Savings Calculation Engine
 * 
 * Calculates potential savings based on audit findings.
 * Provides detailed breakdown of cost optimization opportunities.
 * 
 * Calculation Methods:
 * - Redundancy elimination
 * - Plan downgrade opportunities
 * - Seat optimization
 * - Tool consolidation
 */

import { AuditFormData } from "@/lib/types";
import { AuditFinding } from "./generate-audit";

export interface SavingsBreakdown {
  category: string;
  description: string;
  monthlyAmount: number;
  annualAmount: number;
  confidence: "high" | "medium" | "low";
}

export interface SavingsCalculation {
  monthlyPotentialSavings: number;
  annualPotentialSavings: number;
  savingsPercentage: number;
  breakdown: SavingsBreakdown[];
  optimizedMonthlySpend: number;
  optimizedAnnualSpend: number;
}

/**
 * Calculate total potential savings
 */
export function calculateSavings(
  data: AuditFormData,
  findings: AuditFinding[]
): SavingsCalculation {
  const breakdown: SavingsBreakdown[] = [];

  // Calculate current spend
  const currentMonthlySpend = data.tools.reduce((sum, tool) => sum + tool.spend, 0);
  const currentAnnualSpend = currentMonthlySpend * 12;

  // Calculate savings from each finding
  findings.forEach((finding) => {
    if (finding.potentialSavings > 0) {
      breakdown.push({
        category: finding.ruleName,
        description: finding.recommendation,
        monthlyAmount: finding.potentialSavings,
        annualAmount: finding.potentialSavings * 12,
        confidence: finding.severity === "critical" ? "high" : "medium",
      });
    }
  });

  // Calculate totals
  const totalMonthlySavings = breakdown.reduce((sum, item) => sum + item.monthlyAmount, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const savingsPercentage = currentMonthlySpend > 0 ? (totalMonthlySavings / currentMonthlySpend) * 100 : 0;

  // Calculate optimized spend
  const optimizedMonthlySpend = Math.max(0, currentMonthlySpend - totalMonthlySavings);
  const optimizedAnnualSpend = optimizedMonthlySpend * 12;

  return {
    monthlyPotentialSavings: totalMonthlySavings,
    annualPotentialSavings: totalAnnualSavings,
    savingsPercentage,
    breakdown,
    optimizedMonthlySpend,
    optimizedAnnualSpend,
  };
}

/**
 * Calculate savings from redundancy elimination
 */
export function calculateRedundancySavings(data: AuditFormData): number {
  // Placeholder: Implement redundancy detection and savings calculation
  // This would identify duplicate tools and calculate savings from consolidation
  return 0;
}

/**
 * Calculate savings from plan optimization
 */
export function calculatePlanOptimizationSavings(data: AuditFormData): number {
  // Placeholder: Implement plan optimization logic
  // This would identify oversized plans and calculate savings from downgrades
  return 0;
}

/**
 * Calculate savings from seat optimization
 */
export function calculateSeatOptimizationSavings(data: AuditFormData): number {
  // Placeholder: Implement seat optimization logic
  // This would identify unused seats and calculate savings from reduction
  return 0;
}

/**
 * Calculate savings from tool consolidation
 */
export function calculateConsolidationSavings(data: AuditFormData): number {
  // Placeholder: Implement consolidation logic
  // This would identify tools that can be consolidated and calculate savings
  return 0;
}

/**
 * Format savings amount as currency
 */
export function formatSavings(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Format savings percentage
 */
export function formatSavingsPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}

/**
 * Get savings recommendation based on amount
 */
export function getSavingsRecommendation(savings: SavingsCalculation): string {
  if (savings.monthlyPotentialSavings === 0) {
    return "Your current setup appears optimized. No immediate savings opportunities detected.";
  }

  if (savings.savingsPercentage < 10) {
    return "Minor optimization opportunities available. Consider reviewing tool usage patterns.";
  }

  if (savings.savingsPercentage < 25) {
    return "Moderate savings potential identified. Review recommendations for quick wins.";
  }

  if (savings.savingsPercentage < 50) {
    return "Significant savings potential identified. Prioritize high-impact recommendations.";
  }

  return "Major savings opportunity. Immediate action recommended on critical findings.";
}

/**
 * Calculate ROI of implementing recommendations
 */
export function calculateROI(
  implementationCost: number,
  monthlySavings: number,
  months: number = 12
): number {
  const totalSavings = monthlySavings * months;
  const roi = ((totalSavings - implementationCost) / implementationCost) * 100;
  return Math.max(0, roi);
}

/**
 * Calculate payback period in months
 */
export function calculatePaybackPeriod(implementationCost: number, monthlySavings: number): number {
  if (monthlySavings === 0) return Infinity;
  return implementationCost / monthlySavings;
}

/**
 * Generate savings summary
 */
export function generateSavingsSummary(savings: SavingsCalculation): string {
  const lines: string[] = [];

  lines.push("SAVINGS SUMMARY");
  lines.push(`Current Monthly Spend: ${formatSavings(savings.optimizedMonthlySpend + savings.monthlyPotentialSavings)}`);
  lines.push(`Potential Monthly Savings: ${formatSavings(savings.monthlyPotentialSavings)}`);
  lines.push(`Potential Annual Savings: ${formatSavings(savings.annualPotentialSavings)}`);
  lines.push(`Savings Percentage: ${formatSavingsPercentage(savings.savingsPercentage)}`);
  lines.push(`Optimized Monthly Spend: ${formatSavings(savings.optimizedMonthlySpend)}`);
  lines.push(`Optimized Annual Spend: ${formatSavings(savings.optimizedAnnualSpend)}`);

  return lines.join("\n");
}
