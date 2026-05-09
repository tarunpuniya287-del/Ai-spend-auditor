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
    <div className="bg-surface border border-outline-variant/50 rounded-lg p-2xl space-y-2xl">
      {/* First Row: Tool and Plan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-xl">
        {/* Tool Selection */}
        <div className="space-y-md">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
            AI Tool
          </label>
          <select
            value={selectedTool}
            onChange={(e) => handleToolChange(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-md text-sm focus:ring-1 focus:ring-primary outline-none transition-colors hover:border-outline-variant/70"
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
        <div className="space-y-md">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
            Plan
          </label>
          <select
            value={entry.plan}
            onChange={(e) => handlePlanChange(e.target.value)}
            disabled={!selectedTool}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-md text-sm focus:ring-1 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:border-outline-variant/70"
          >
            <option value="">Select plan...</option>
            {availablePlans.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Spend and Seats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-xl">
        {/* Monthly Spend */}
        <div className="space-y-md">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
            Monthly Spend
          </label>
          <div className="relative">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant font-semibold pointer-events-none">
              $
            </span>
            <input
              type="number"
              value={entry.spend || ""}
              onChange={(e) => handleSpendChange(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-md pl-2xl text-sm focus:ring-1 focus:ring-primary outline-none transition-colors hover:border-outline-variant/70 font-mono"
            />
          </div>
          {entry.spend > 0 && (
            <p className="text-xs text-on-surface-variant">
              ${(entry.spend * 12).toFixed(2)}/year
            </p>
          )}
        </div>

        {/* Seats */}
        <div className="space-y-md">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
            Number of Seats
          </label>
          <input
            type="number"
            value={entry.seats || 1}
            onChange={(e) => handleSeatsChange(e.target.value)}
            placeholder="1"
            min="1"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-md text-sm focus:ring-1 focus:ring-primary outline-none transition-colors hover:border-outline-variant/70 font-mono"
          />
          {entry.spend > 0 && entry.seats > 0 && (
            <p className="text-xs text-on-surface-variant">
              ${(entry.spend / entry.seats).toFixed(2)}/seat/mo
            </p>
          )}
        </div>
      </div>

      {/* Remove Button */}
      {isRemovable && (
        <button
          type="button"
          onClick={onRemove}
          className="w-full flex items-center justify-center gap-sm font-body-sm text-error border border-error/20 bg-error/5 py-md rounded hover:bg-error/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Remove Tool
        </button>
      )}
    </div>
  );
}
