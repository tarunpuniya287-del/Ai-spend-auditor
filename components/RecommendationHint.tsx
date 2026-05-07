interface RecommendationHintProps {
  message: string;
  type: "info" | "warning" | "insight";
}

export default function RecommendationHint({
  message,
  type,
}: RecommendationHintProps) {
  const styles = {
    info: {
      bg: "bg-primary/5",
      border: "border-primary/20",
      icon: "info",
      text: "text-primary",
    },
    warning: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: "warning",
      text: "text-orange-700",
    },
    insight: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "lightbulb",
      text: "text-blue-700",
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-md flex items-start gap-md`}>
      <span className={`material-symbols-outlined text-sm flex-shrink-0 ${style.text}`}>
        {style.icon}
      </span>
      <p className={`text-body-sm font-medium ${style.text}`}>{message}</p>
    </div>
  );
}
