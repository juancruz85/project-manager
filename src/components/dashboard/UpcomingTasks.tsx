import Link from "next/link";

import Card from "@/components/ui/Card";
import PriorityBadge, { TaskPriority } from "@/components/ui/PriorityBadge";

export interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
}

interface UpcomingTasksProps {
  tasks?: Task[];
}

function TaskRow({ task }: { task: Task }) {
  return (
    <div
      className="
        ios-list-row
        flex
        items-center
        justify-between
        gap-3
        rounded-[8px]
        p-3
        sm:p-4
      "
    >
      <div className="min-w-0">
        <h3 className="truncate font-bold text-[#26313d] drop-shadow-[0_1px_0_rgba(255,255,255,.9)]">
          {task.title}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#6d7884]">
          {task.project} - Due {task.dueDate}
        </p>
      </div>

      <PriorityBadge priority={task.priority} />
    </div>
  );
}

export default function UpcomingTasks({ tasks = [] }: UpcomingTasksProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="ios-panel-title text-xl font-bold sm:text-2xl">
          Upcoming Tasks
        </h2>

        <Link
          href="/dashboard/tasks"
          className="
            ios-button-gray
            rounded-[8px]
            px-3
            py-1.5
            text-sm
            font-semibold
            active:translate-y-px
          "
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-sm font-semibold text-[#6d7884]">
            No upcoming tasks. Use the + menu to create one.
          </p>
        )}
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}
