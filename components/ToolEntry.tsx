import { ToolEntry as ToolEntryType } from "@/lib/types";
import { AI_TOOLS, PLANS } from "@/lib/constants";

interface ToolEntryProps {
  entry: ToolEntryType;
  onUpdate: (entry: ToolEntryType) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

export default function ToolEntry({
  entry,
  onUpdate,
  onRemove,
  isRemovable,
}: ToolEntryProps) {
  const selectedTool = entry.tool;
  const availablePlans = selectedTool
    ? PLANS[selectedTool as keyof typeof PLANS] || []
    : [];

  const handleToolChange = (newTool: string) => {
    onUpdate({
      ...entry,
      tool: newTool,
      plan: "", // Reset plan when tool changes
    });
  };

  const handlePlanChange = (newPlan: string) => {
    onUpdate({
      ...entry,
      plan: newPlan,
    });
  };

  const handleSpendChange = (newSpend: string) => {
    onUpdate({
      ...entry,
      spend: parseFloat(newSpend) || 0,
    });
  };

  const handleSeatsChange = (newSeats: string) => {
    onUpdate({
      ...entry,
      seats: parseInt(newSeats) || 1,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-md items-end p-lg bg-surface border border-outline-variant/50 rounded-lg">
      {/* Tool Selection */}
      <div className="col-span-12 sm:col-span-4 space-y-xs">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
          AI Tool
        </label>
        <select
          value={selectedTool}
          onChange={(e) => handleToolChange(e.target.value)}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="">Select a tool...</option>
          {AI_TOOLS.map((tool) => (
            <option key={tool.value} value={tool.value}>
              {tool.label}
            </option>
          ))}
        </select>
      </div>

      {/* Plan Selection */}
      <div className="col-span-12 sm:col-span-3 space-y-xs">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
          Plan
        </label>
        <select
          value={entry.plan}
          onChange={(e) => handlePlanChange(e.target.value)}
          disabled={!selectedTool}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select plan...</option>
          {availablePlans.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Spend */}
      <div className="col-span-6 sm:col-span-3 space-y-xs">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
          Monthly Spend ($)
        </label>
        <input
          type="number"
          value={entry.spend || ""}
          onChange={(e) => handleSpendChange(e.target.value)}
          placeholder="0"
          min="0"
          step="0.01"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      {/* Seats */}
      <div className="col-span-6 sm:col-span-2 space-y-xs">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
          Seats
        </label>
        <input
          type="number"
          value={entry.seats || 1}
          onChange={(e) => handleSeatsChange(e.target.value)}
          placeholder="1"
          min="1"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      {/* Remove Button */}
      {isRemovable && (
        <div className="col-span-12 sm:col-span-12">
          <button
            type="button"
            onClick={onRemove}
            className="w-full flex items-center justify-center gap-sm font-body-sm text-error border border-error/20 bg-error/5 py-sm rounded hover:bg-error/10 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Remove Tool
          </button>
        </div>
      )}
    </div>
  );
}
