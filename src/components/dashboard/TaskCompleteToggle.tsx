"use client";

import { useTransition } from "react";

import { toggleTaskCompleteAction } from "@/lib/actions/task-actions";

export default function TaskCompleteToggle({
  taskId,
  completed,
}: {
  taskId: string;
  completed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => toggleTaskCompleteAction(taskId, !completed))}
      aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      className={`
        flex
        h-6
        w-6
        shrink-0
        items-center
        justify-center
        rounded-[6px]
        border
        text-xs
        font-bold
        shadow-[inset_0_1px_0_rgba(255,255,255,.28)]
        transition-colors
        active:translate-y-px
        disabled:opacity-60
        ${
          completed
            ? "border-[#518453] bg-gradient-to-b from-[#8bbf88] to-[#5f9860] text-white"
            : "border-[#aeb8c4] bg-gradient-to-b from-[#eef2f6] to-white text-transparent hover:text-[#8d98a5]"
        }
      `}
    >
      &#10003;
     /* check what &#10003 means */
    </button>
  );
}
