export type TaskPriority = "Low" | "Medium" | "High";

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  High: "bg-gradient-to-b from-[#dc6b61] to-[#b9473e] text-white border-[#9f3b34]",
  Medium: "bg-gradient-to-b from-[#7ba9d8] to-[#4d7fb6] text-white border-[#416f9d]",
  Low: "bg-gradient-to-b from-[#8bbf88] to-[#5f9860] text-white border-[#518453]",
};

export default function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={`
        rounded-[8px]
        border
        px-3
        py-1
        text-xs
        font-semibold
        shadow-[inset_0_1px_0_rgba(255,255,255,.28)]
        ${PRIORITY_STYLES[priority]}
      `}
    >
      {priority}
    </span>
  );
}
