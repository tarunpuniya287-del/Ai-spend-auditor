"use client";

import { AuditReport } from "@/lib/audit/generate-audit";

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
}

export default function AuditResults({ report, onReset }: AuditResultsProps) {
  const severityColors = {
    critical: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  const severityIcons = {
    critical: "error",
    warning: "warning",
    info: "info",
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(report, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-${report.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const lines: string[] = [];

    // Header
    lines.push("AI Spend Audit Report");
    lines.push(`Generated: ${report.timestamp}`);
    lines.push("");

    // Summary
    lines.push("SUMMARY");
    lines.push(`Total Monthly Spend,${report.summary.totalMonthlySpend.toFixed(2)}`);
    lines.push(`Total Seats,${report.summary.totalSeats}`);
    lines.push(`Tools Analyzed,${report.summary.toolsAnalyzed}`);
    lines.push(`Findings,${report.summary.findingsCount}`);
    lines.push("");

    // Savings
    lines.push("SAVINGS POTENTIAL");
    lines.push(`Monthly Savings,${report.savings.monthlyPotentialSavings.toFixed(2)}`);
    lines.push(`Annual Savings,${report.savings.annualPotentialSavings.toFixed(2)}`);
    lines.push("");

    // Findings
    lines.push("FINDINGS");
    lines.push("Rule,Severity,Description,Recommendation,Potential Savings");
    report.findings.forEach((finding) => {
      lines.push(
        `"${finding.ruleName}","${finding.severity}","${finding.description}","${finding.recommendation}","${finding.potentialSavings.toFixed(2)}"`
      );
    });

    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-${report.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3xl">
      {/* Header with Report Info */}
      <div className="space-y-md pb-lg border-b border-outline-variant/20">
        <div className="flex items-start justify-between gap-lg">
          <div>
            <h1 className="font-h1 font-bold mb-md">AI Spend Audit Report</h1>
            <p className="text-body-sm text-on-surface-variant">
              Generated on {new Date(report.timestamp).toLocaleDateString()} at{" "}
              {new Date(report.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-xs text-on-surface-variant/70 mt-sm">
              Report ID: {report.id}
            </p>
          </div>
          <div className="text-right">
            <p className="text-label-caps text-on-surface-variant font-bold mb-md">
              AUDIT STATUS
            </p>
            <div className="flex items-center gap-sm justify-end">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-sm font-semibold text-green-700">Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* Current Spend */}
        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            CURRENT MONTHLY SPEND
          </p>
          <p className="text-3xl font-black text-on-surface">
            ${report.summary.totalMonthlySpend.toFixed(2)}
          </p>
          <p className="text-xs text-on-surface-variant mt-md">
            ${(report.summary.totalMonthlySpend * 12).toFixed(2)}/year
          </p>
        </div>

        {/* Potential Savings */}
        <div className="bg-green-50 rounded-lg p-2xl border border-green-200">
          <p className="text-label-caps text-green-900 font-bold mb-md">
            MONTHLY SAVINGS
          </p>
          <p className="text-3xl font-black text-green-700">
            ${report.savings.monthlyPotentialSavings.toFixed(2)}
          </p>
          <p className="text-xs text-green-700 mt-md">
            ${report.savings.annualPotentialSavings.toFixed(2)}/year
          </p>
        </div>

        {/* Savings Percentage */}
        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            SAVINGS POTENTIAL
          </p>
          <p className="text-3xl font-black text-primary">
            {report.savings.savingsPercentage.toFixed(1)}%
          </p>
          <p className="text-xs text-on-surface-variant mt-md">
            Of current spend
          </p>
        </div>

        {/* Optimized Spend */}
        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            OPTIMIZED MONTHLY SPEND
          </p>
          <p className="text-3xl font-black text-on-surface">
            ${report.savings.optimizedMonthlySpend.toFixed(2)}
          </p>
          <p className="text-xs text-on-surface-variant mt-md">
            After optimization
          </p>
        </div>
      </div>

      {/* Findings Section */}
      <div className="space-y-lg">
        <div>
          <h3 className="font-h3 font-bold mb-md">Audit Findings</h3>
          <p className="text-body-sm text-on-surface-variant">
            {report.summary.findingsCount} finding{report.summary.findingsCount !== 1 ? "s" : ""} detected
          </p>
        </div>

        {report.findings.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2xl text-center">
            <span className="material-symbols-outlined text-4xl text-green-700 block mb-md">
              check_circle
            </span>
            <p className="text-body-sm font-semibold text-green-900">
              No issues detected. Your AI spend appears optimized!
            </p>
          </div>
        ) : (
          <div className="space-y-md">
            {report.findings.map((finding, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-2xl space-y-md ${severityColors[finding.severity]}`}
              >
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined flex-shrink-0 mt-0.5">
                    {severityIcons[finding.severity]}
                  </span>
                  <div className="flex-1 space-y-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{finding.ruleName}</h4>
                      {finding.potentialSavings > 0 && (
                        <span className="text-xs font-semibold bg-white/50 px-md py-xs rounded">
                          ${finding.potentialSavings.toFixed(2)}/mo
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{finding.description}</p>
                    <p className="text-sm font-semibold">💡 {finding.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      {report.recommendations.length > 0 && (
        <div className="space-y-lg">
          <div>
            <h3 className="font-h3 font-bold mb-md">Top Recommendations</h3>
            <p className="text-body-sm text-on-surface-variant">
              Prioritized by impact and feasibility
            </p>
          </div>

          <div className="space-y-md">
            {report.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-lg p-2xl border border-outline-variant/50 flex gap-md"
              >
                <span className="text-2xl font-bold text-primary flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-body-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights Section */}
      {report.insights.length > 0 && (
        <div className="space-y-lg">
          <div>
            <h3 className="font-h3 font-bold mb-md">Key Insights</h3>
            <p className="text-body-sm text-on-surface-variant">
              Analysis of your AI tool usage and spending patterns
            </p>
          </div>

          <div className="space-y-md">
            {report.insights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-blue-50 rounded-lg p-2xl border border-blue-200 flex gap-md"
              >
                <span className="material-symbols-outlined text-blue-700 flex-shrink-0 mt-0.5">
                  lightbulb
                </span>
                <p className="text-body-sm text-blue-900">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-lg">
        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            TOOLS ANALYZED
          </p>
          <p className="text-2xl font-black text-on-surface">
            {report.summary.toolsAnalyzed}
          </p>
        </div>

        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            TOTAL SEATS
          </p>
          <p className="text-2xl font-black text-on-surface">
            {report.summary.totalSeats}
          </p>
        </div>

        <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50">
          <p className="text-label-caps text-on-surface-variant font-bold mb-md">
            CRITICAL ISSUES
          </p>
          <p className="text-2xl font-black text-red-600">
            {report.summary.criticalCount}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-md pt-lg border-t border-outline-variant/20">
        <button
          onClick={onReset}
          className="flex-1 bg-primary text-on-primary font-bold text-h3 py-lg rounded shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Run Another Audit
        </button>
        <button
          onClick={handleDownloadJSON}
          className="px-lg py-lg border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-sm"
          title="Download report as JSON"
        >
          <span className="material-symbols-outlined">download</span>
          <span className="hidden sm:inline">JSON</span>
        </button>
        <button
          onClick={handleDownloadCSV}
          className="px-lg py-lg border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-sm"
          title="Download report as CSV"
        >
          <span className="material-symbols-outlined">table_chart</span>
          <span className="hidden sm:inline">CSV</span>
        </button>
      </div>
    </div>
  );
}
