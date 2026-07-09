import Card from "@/components/ui/Card";

type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  project: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
}

interface UpcomingTasksProps {
  tasks?: Task[];
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Finish History Essay",
    project: "School",
    dueDate: "Tomorrow",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Study for Chemistry Quiz",
    project: "School",
    dueDate: "Friday",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Update Portfolio Website",
    project: "Personal",
    dueDate: "Sunday",
    priority: "Low",
    completed: false,
  },
];

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const styles = {
    High:
      "bg-gradient-to-b from-[#dc6b61] to-[#b9473e] text-white border-[#9f3b34]",
    Medium:
      "bg-gradient-to-b from-[#7ba9d8] to-[#4d7fb6] text-white border-[#416f9d]",
    Low: "bg-gradient-to-b from-[#8bbf88] to-[#5f9860] text-white border-[#518453]",
  };

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
        ${styles[priority]}
      `}
    >
      {priority}
    </span>
  );
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

export default function UpcomingTasks({
  tasks = defaultTasks,
}: UpcomingTasksProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="ios-panel-title text-xl font-bold sm:text-2xl">
          Upcoming Tasks
        </h2>

        <button
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
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}
