"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditFormData, ToolEntry as ToolEntryType, DEFAULT_AUDIT_DATA } from "@/lib/types";
import { getStoredAuditData, saveAuditData, saveAuditReport } from "@/lib/storage";
import { TEAM_SIZES, USE_CASES } from "@/lib/constants";
import { generateRecommendations, Recommendation } from "@/lib/recommendations";
import { generateAudit, validateAuditData } from "@/lib/audit/generate-audit";
import ToolEntry from "./ToolEntry";
import RecommendationHint from "./RecommendationHint";

// Simple ID generator
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export default function AuditForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuditFormData>(DEFAULT_AUDIT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = getStoredAuditData();
    setFormData(stored);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    if (isLoaded) {
      saveAuditData(formData);
      // Generate recommendations
      const recs = generateRecommendations(formData);
      setRecommendations(recs);
    }
  }, [formData, isLoaded]);

  const addTool = () => {
    const newTool: ToolEntryType = {
      id: generateId(),
      tool: "",
      plan: "",
      spend: 0,
      seats: 1,
    };
    setFormData({
      ...formData,
      tools: [...formData.tools, newTool],
    });
  };

  const updateTool = (updatedTool: ToolEntryType) => {
    setFormData({
      ...formData,
      tools: formData.tools.map((tool) =>
        tool.id === updatedTool.id ? updatedTool : tool
      ),
    });
  };

  const removeTool = (toolId: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((tool) => tool.id !== toolId),
    });
  };

  const handleTeamSizeChange = (newSize: string) => {
    setFormData({
      ...formData,
      teamSize: newSize,
    });
  };

  const handleUseCaseChange = (newUseCase: string) => {
    setFormData({
      ...formData,
      useCase: newUseCase,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsGenerating(true);

    try {
      // Validate form data
      const validation = validateAuditData(formData);
      if (!validation.valid) {
        setError(validation.errors.join(", "));
        setIsGenerating(false);
        return;
      }

      // Generate audit report
      const report = generateAudit(formData);
      
      // Save report to localStorage (always)
      saveAuditReport(report);
      
      // Try to save to MongoDB (non-blocking)
      try {
        const { saveAuditReportToDatabase } = await import("@/lib/mongodb");
        await saveAuditReportToDatabase(report);
      } catch (dbErr) {
        console.warn("Failed to save to database, but continuing with local storage:", dbErr);
      }
      
      // Redirect to results page
      router.push(`/audit/${report.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate audit report";
      setError(errorMessage);
      console.error("Audit generation error:", err);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_AUDIT_DATA);
    setError(null);
  };

  // Calculate totals for display
  const totalMonthlySpend = formData.tools.reduce(
    (sum, tool) => sum + tool.spend,
    0
  );
  const totalSeats = formData.tools.reduce((sum, tool) => sum + tool.seats, 0);

  if (!isLoaded) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <section id="audit-form-section" className="py-32 px-gutter bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-3 gap-3xl">
        {/* Left Column - Summary */}
        <div className="lg:col-span-1 space-y-3xl">
          <div>
            <h3 className="font-h3 font-bold mb-md">Audit Summary</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Track your AI tool spending and identify optimization opportunities.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="space-y-xl">
            {/* Total Monthly Spend Card */}
            <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50 hover:border-primary/30 transition-all hover:shadow-md">
              <p className="text-label-caps text-on-surface-variant font-bold mb-lg">
                TOTAL MONTHLY SPEND
              </p>
              <div className="space-y-md">
                <p className="text-4xl font-black text-primary">
                  ${totalMonthlySpend.toFixed(2)}
                </p>
                <div className="pt-md border-t border-outline-variant/30 space-y-xs">
                  <p className="text-xs text-on-surface-variant">
                    {formData.tools.length} tool{formData.tools.length !== 1 ? "s" : ""} tracked
                  </p>
                  {totalMonthlySpend > 0 && (
                    <p className="text-xs font-semibold text-primary">
                      ${(totalMonthlySpend * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Total Seats Card */}
            <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50 hover:border-primary/30 transition-all hover:shadow-md">
              <p className="text-label-caps text-on-surface-variant font-bold mb-lg">
                TOTAL SEATS
              </p>
              <div className="space-y-md">
                <p className="text-4xl font-black text-on-surface">
                  {totalSeats}
                </p>
                <div className="pt-md border-t border-outline-variant/30">
                  <p className="text-xs text-on-surface-variant">
                    Across all tools
                  </p>
                </div>
              </div>
            </div>

            {/* Tools Added Card */}
            <div className="bg-surface rounded-lg p-2xl border border-outline-variant/50 hover:border-primary/30 transition-all hover:shadow-md">
              <p className="text-label-caps text-on-surface-variant font-bold mb-lg">
                TOOLS ADDED
              </p>
              <div className="space-y-md">
                <p className="text-4xl font-black text-on-surface">
                  {formData.tools.length}
                </p>
                <div className="pt-md border-t border-outline-variant/30">
                  <p className="text-xs text-on-surface-variant">
                    {formData.tools.length === 0
                      ? "Add your first tool to get started"
                      : "Click 'Add Another Tool' to expand"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Persistence Notice - Enhanced */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-2xl">
            <div className="flex items-start gap-md">
              <span className="material-symbols-outlined text-sm text-primary flex-shrink-0 mt-0.5">
                lock
              </span>
              <div className="space-y-xs">
                <p className="text-body-sm font-semibold text-primary">
                  🔒 Data Saved Locally
                </p>
                <p className="text-xs text-primary/80 leading-relaxed">
                  Your audit data is encrypted and saved to your browser. It never leaves your device until you submit.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations Preview */}
          {recommendations.length > 0 && (
            <div className="space-y-lg">
              <div>
                <p className="text-label-caps font-bold text-on-surface-variant mb-md">
                  💡 EARLY INSIGHTS
                </p>
                <p className="text-xs text-on-surface-variant">
                  Based on your current setup
                </p>
              </div>
              <div className="space-y-md">
                {recommendations.slice(0, 2).map((rec, idx) => (
                  <RecommendationHint
                    key={idx}
                    message={rec.message}
                    type={rec.type}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-3xl">
            {/* Tools Section */}
            <div className="bg-surface-container-lowest p-3xl rounded-lg border-2 border-outline-variant space-y-2xl">
              <div>
                <h3 className="font-h3 font-bold mb-md">Your AI Tools</h3>
                <p className="text-xs text-outline font-medium">
                  Add each tool your team uses with its current plan and spending.
                </p>
              </div>

              <div className="space-y-xl">
                {formData.tools.length === 0 ? (
                  <div className="text-center py-20 bg-surface-container-low rounded-lg border border-dashed border-outline-variant/50">
                    <span className="material-symbols-outlined text-6xl text-outline mb-lg block">
                      add_circle
                    </span>
                    <p className="text-body-sm text-on-surface-variant font-medium">
                      No tools added yet. Click "Add Tool" to get started.
                    </p>
                  </div>
                ) : (
                  formData.tools.map((tool) => (
                    <ToolEntry
                      key={tool.id}
                      entry={tool}
                      onUpdate={updateTool}
                      onRemove={() => removeTool(tool.id)}
                      isRemovable={formData.tools.length > 1}
                    />
                  ))
                )}

                <button
                  type="button"
                  onClick={addTool}
                  className="w-full flex items-center justify-center gap-sm font-label-caps text-primary border border-primary/20 bg-primary/5 py-md rounded hover:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Another Tool
                </button>
              </div>
            </div>

            {/* Global Fields Section */}
            <div className="bg-surface-container-lowest p-3xl rounded-lg border-2 border-outline-variant space-y-2xl">
              <div>
                <h3 className="font-h3 font-bold mb-md">Team Information</h3>
                <p className="text-xs text-outline font-medium">
                  Help us understand your team's context for better recommendations.
                </p>
              </div>

              <div className="space-y-2xl">
                {/* Team Size */}
                <div className="space-y-md">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => handleTeamSizeChange(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded px-md py-md text-sm focus:ring-1 focus:ring-primary outline-none transition-colors hover:border-outline-variant/70"
                  >
                    <option value="">Select team size...</option>
                    {TEAM_SIZES.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Use Case */}
                <div className="space-y-md">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Primary Use Case
                  </label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => handleUseCaseChange(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded px-md py-md text-sm focus:ring-1 focus:ring-primary outline-none transition-colors hover:border-outline-variant/70"
                  >
                    <option value="">Select use case...</option>
                    {USE_CASES.map((useCase) => (
                      <option key={useCase.value} value={useCase.value}>
                        {useCase.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-md">
              <button
                type="submit"
                disabled={isGenerating}
                className="flex-1 bg-primary text-on-primary font-bold text-h3 py-lg rounded shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "Generating..." : "Generate Audit Report"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-lg py-lg border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container transition-colors"
                title="Reset form"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2xl">
                <p className="text-sm text-red-800 font-semibold">Error: {error}</p>
              </div>
            )}

            {/* Info Text */}
            <p className="text-center text-xs text-outline font-medium">
              Your data is saved locally and never sent to our servers until you submit.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
