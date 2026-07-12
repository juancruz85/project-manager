import Link from "next/link";
import { redirect } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import Card from "@/components/ui/Card";
import PriorityBadge from "@/components/ui/PriorityBadge";
import TaskCompleteToggle from "@/components/dashboard/TaskCompleteToggle";
import { auth } from "@/auth";
import { getAllTasksForUser, getProjectsForUser } from "@/lib/data";

export default async function AllTasksPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const [tasks, projects] = await Promise.all([
    getAllTasksForUser(session.user.id),
    getProjectsForUser(session.user.id),
  ]);

  return (
    <main className="ios-page min-h-screen">
      <Navbar projects={projects} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-[8px] border border-[#b8c0ca] bg-gradient-to-b from-white to-[#e3e8ee] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_2px_5px_rgba(25,32,40,.1)] sm:px-5">
          <h1 className="ios-panel-title text-3xl font-bold sm:text-4xl">
            All Tasks
          </h1>

          <Link
            href="/dashboard"
            className="ios-button-gray rounded-[8px] px-3 py-1.5 text-sm font-semibold active:translate-y-px"
          >
            Back to Dashboard
          </Link>
        </div>

        <Card>
          <div className="space-y-4">
            {tasks.length === 0 && (
              <p className="text-sm font-semibold text-[#6d7884]">
                No tasks yet. Use the + menu to create one.
              </p>
            )}

            {tasks.map((task) => (
              <div
                key={task.id}
                className={`ios-list-row flex items-center justify-between gap-3 rounded-[8px] p-3 sm:p-4 ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <TaskCompleteToggle taskId={task.id} completed={task.completed} />

                  <div className="min-w-0">
                    <h3
                      className={`truncate font-bold text-[#26313d] drop-shadow-[0_1px_0_rgba(255,255,255,.9)] ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-[#6d7884]">
                      {task.project} · {task.kind === "assignment" ? "Assignment" : "Task"} - Due{" "}
                      {task.dueDate}
                    </p>
                  </div>
                </div>

                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
