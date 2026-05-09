import { AuditFormData } from "@/lib/types";

interface RecommendationPreviewProps {
  formData: AuditFormData;
}

export default function RecommendationPreview({
  formData,
}: RecommendationPreviewProps) {
  const recommendations: string[] = [];

  // Check for overlapping subscriptions
  const toolNames = formData.tools.map((t) => t.tool);
  const hasOverlap =
    (toolNames.includes("ChatGPT") && toolNames.includes("Claude")) ||
    (toolNames.includes("Cursor") && toolNames.includes("GitHub Copilot"));

  if (hasOverlap) {
    recommendations.push("Detected overlapping AI subscriptions");
  }

  // Check for enterprise plans with small teams
  const hasEnterprisePlan = formData.tools.some(
    (t) => t.plan === "Enterprise"
  );
  if (hasEnterprisePlan && formData.teamSize === "1-5") {
    recommendations.push("Enterprise plan may be oversized for your team size");
  }

  // Check for redundant seat allocation
  const totalSeats = formData.tools.reduce((sum, t) => sum + t.seats, 0);
  const teamSizeNum = parseInt(formData.teamSize.split("-")[0]) || 0;
  if (totalSeats > teamSizeNum * 1.5 && teamSizeNum > 0) {
    recommendations.push("Potential redundant seat allocation detected");
  }

  // Check for high spend relative to team size
  const totalSpend = formData.tools.reduce((sum, t) => sum + t.spend, 0);
  if (totalSpend > 500 && formData.teamSize === "1-5") {
    recommendations.push("High AI spend relative to team size");
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-lg space-y-md">
      <div className="flex items-start gap-md">
        <span className="material-symbols-outlined text-primary flex-shrink-0 mt-xs">
          lightbulb
        </span>
        <div className="space-y-sm flex-1">
          <p className="text-label-caps font-bold text-primary">
            EARLY INSIGHTS
          </p>
          <ul className="space-y-xs">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="text-body-sm text-on-surface-variant">
                • {rec}
              </li>
            ))}
          </ul>
          <p className="text-xs text-on-surface-variant italic pt-sm">
            Full audit recommendations will appear after submission.
          </p>
        </div>
      </div>
    </div>
  );
}
