"use client";

import { useEffect, useState } from "react";
import { AuditFormData, ToolEntry as ToolEntryType, DEFAULT_AUDIT_DATA } from "@/lib/types";
import { getStoredAuditData, saveAuditData } from "@/lib/storage";
import { TEAM_SIZES, USE_CASES } from "@/lib/constants";
import ToolEntry from "./ToolEntry";

// Simple ID generator
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export default function AuditForm() {
  const [formData, setFormData] = useState<AuditFormData>(DEFAULT_AUDIT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Send to backend for audit generation
  };

  const handleReset = () => {
    setFormData(DEFAULT_AUDIT_DATA);
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
    <section className="py-24 px-gutter bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-3 gap-2xl">
        {/* Left Column - Summary */}
        <div className="lg:col-span-1 space-y-lg">
          <div>
            <h3 className="font-h3 font-bold mb-md">Audit Summary</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Track your AI tool spending and identify optimization opportunities.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="space-y-md">
            <div className="bg-surface rounded-lg p-lg border border-outline-variant/50">
              <p className="text-label-caps text-on-surface-variant font-bold mb-sm">
                TOTAL MONTHLY SPEND
              </p>
              <p className="text-h1 font-black text-primary">
                ${totalMonthlySpend.toFixed(2)}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-lg border border-outline-variant/50">
              <p className="text-label-caps text-on-surface-variant font-bold mb-sm">
                TOTAL SEATS
              </p>
              <p className="text-h1 font-black text-on-surface">
                {totalSeats}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-lg border border-outline-variant/50">
              <p className="text-label-caps text-on-surface-variant font-bold mb-sm">
                TOOLS ADDED
              </p>
              <p className="text-h1 font-black text-on-surface">
                {formData.tools.length}
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-lg">
            <p className="text-body-sm font-semibold text-primary">
              💡 Tip: Add all your AI tools to get the most accurate audit recommendations.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Tools Section */}
            <div className="bg-surface-container-lowest p-xl rounded-lg border-2 border-outline-variant">
              <div className="mb-lg border-b border-outline-variant pb-md">
                <h3 className="font-h3 font-bold">Your AI Tools</h3>
                <p className="text-xs text-outline font-medium">
                  Add each tool your team uses with its current plan and spending.
                </p>
              </div>

              <div className="space-y-md">
                {formData.tools.length === 0 ? (
                  <div className="text-center py-12 bg-surface-container-low rounded-lg border border-dashed border-outline-variant/50">
                    <span className="material-symbols-outlined text-4xl text-outline mb-md block">
                      add_circle
                    </span>
                    <p className="text-body-sm text-on-surface-variant font-medium">
                      No tools added yet. Click "Add Tool" to get started.
                    </p>
                  </div>
                ) : (
                  formData.tools.map((tool, index) => (
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
                  className="w-full flex items-center justify-center gap-sm font-label-caps text-primary border border-primary/20 bg-primary/5 py-sm rounded hover:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Another Tool
                </button>
              </div>
            </div>

            {/* Global Fields Section */}
            <div className="bg-surface-container-lowest p-xl rounded-lg border-2 border-outline-variant space-y-lg">
              <div>
                <h3 className="font-h3 font-bold mb-md">Team Information</h3>
                <p className="text-xs text-outline font-medium">
                  Help us understand your team's context for better recommendations.
                </p>
              </div>

              {/* Team Size */}
              <div className="space-y-xs">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                  Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
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
              <div className="space-y-xs">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                  Primary Use Case
                </label>
                <select
                  value={formData.useCase}
                  onChange={(e) => handleUseCaseChange(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
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

            {/* Action Buttons */}
            <div className="flex gap-md">
              <button
                type="submit"
                className="flex-1 bg-primary text-on-primary font-bold text-h3 py-md rounded shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Generate Audit Report
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-lg py-md border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

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
