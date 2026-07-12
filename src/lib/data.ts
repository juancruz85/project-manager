import "server-only";

import { ObjectId } from "mongodb";

import { getProjectsCollection, getTasksCollection, TaskDoc } from "@/lib/db";
import {
  formatDueDate,
  formatMonthParam,
  getCurrentWeekRange,
  getMonthInfo,
  parseMonthParam,
} from "@/lib/date-utils";

export interface DashboardStatData {
  title: string;
  value: string;
  subtitle: string;
}

export interface TaskListItem {
  id: string;
  title: string;
  project: string;
  projectId: string | null;
  dueDate: string;
  priority: TaskDoc["priority"];
  kind: TaskDoc["kind"];
  completed: boolean;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  day: number;
  color: "blue" | "red" | "green";
}

export interface ProjectOption {
  id: string;
  name: string;
}

const PRIORITY_COLOR: Record<TaskDoc["priority"], "blue" | "red" | "green"> = {
  High: "red",
  Medium: "blue",
  Low: "green",
};

export async function getProjectsForUser(userId: string): Promise<ProjectOption[]> {
  const projects = await getProjectsCollection();
  const docs = await projects
    .find({ userId: new ObjectId(userId) })
    .sort({ name: 1 })
    .toArray();

  return docs.map((doc) => ({ id: doc._id.toString(), name: doc.name }));
}

export async function getDashboardData(userId: string, monthParam: string | undefined) {
  const now = new Date();
  const userObjectId = new ObjectId(userId);

  const [projectDocs, taskDocs] = await Promise.all([
    (await getProjectsCollection()).find({ userId: userObjectId }).sort({ name: 1 }).toArray(),
    (await getTasksCollection()).find({ userId: userObjectId }).sort({ dueDate: 1 }).toArray(),
  ]);

  const projectNameById = new Map(projectDocs.map((p) => [p._id.toString(), p.name]));

  const upcomingTasks: TaskListItem[] = taskDocs
    .filter((task) => !task.completed)
    .slice(0, 5)
    .map((task) => taskDocToListItem(task, projectNameById, now));

  const { year, month } = parseMonthParam(monthParam, now);
  const monthInfo = getMonthInfo(year, month, now);

  const events: CalendarEventItem[] = taskDocs
    .filter(
      (task) =>
        task.dueDate.getFullYear() === year && task.dueDate.getMonth() === month,
    )
    .map((task) => ({
      id: task._id.toString(),
      title: task.title,
      day: task.dueDate.getDate(),
      color: PRIORITY_COLOR[task.priority],
    }));

  const { start: weekStart, end: weekEnd } = getCurrentWeekRange(now);
  const tasksThisWeek = taskDocs.filter(
    (task) => task.dueDate >= weekStart && task.dueDate < weekEnd,
  );
  const completedThisWeek = tasksThisWeek.filter((task) => task.completed).length;
  const completedPercent =
    tasksThisWeek.length === 0
      ? 0
      : Math.round((completedThisWeek / tasksThisWeek.length) * 100);

  const dueToday = taskDocs.filter(
    (task) => !task.completed && formatDueDate(task.dueDate, now) === "Today",
  ).length;

  const stats: DashboardStatData[] = [
    {
      title: "Tasks",
      value: String(taskDocs.filter((t) => t.kind === "task").length),
      subtitle: `${dueToday} Due Today`,
    },
    {
      title: "Projects",
      value: String(projectDocs.length),
      subtitle: "Active",
    },
    {
      title: "Assignments",
      value: String(taskDocs.filter((t) => t.kind === "assignment").length),
      subtitle: "School",
    },
    {
      title: "Completed",
      value: `${completedPercent}%`,
      subtitle: "This Week",
    },
  ];

  return {
    stats,
    upcomingTasks,
    projects: projectDocs.map((p) => ({ id: p._id.toString(), name: p.name })),
    calendar: {
      monthLabel: monthInfo.label,
      today: monthInfo.today,
      days: monthInfo.days,
      events,
      prevMonthParam: monthInfo.prevMonthParam,
      nextMonthParam: monthInfo.nextMonthParam,
    },
  };
}

export async function getAllTasksForUser(userId: string): Promise<TaskListItem[]> {
  const now = new Date();
  const userObjectId = new ObjectId(userId);

  const [projectDocs, taskDocs] = await Promise.all([
    (await getProjectsCollection()).find({ userId: userObjectId }).toArray(),
    (await getTasksCollection())
      .find({ userId: userObjectId })
      .sort({ completed: 1, dueDate: 1 })
      .toArray(),
  ]);

  const projectNameById = new Map(projectDocs.map((p) => [p._id.toString(), p.name]));

  return taskDocs.map((task) => taskDocToListItem(task, projectNameById, now));
}

function taskDocToListItem(
  task: TaskDoc,
  projectNameById: Map<string, string>,
  now: Date,
): TaskListItem {
  return {
    id: task._id.toString(),
    title: task.title,
    project: task.projectId
      ? (projectNameById.get(task.projectId.toString()) ?? "Unknown Project")
      : "No Project",
    projectId: task.projectId ? task.projectId.toString() : null,
    dueDate: formatDueDate(task.dueDate, now),
    priority: task.priority,
    kind: task.kind,
    completed: task.completed,
  };
}

export { formatMonthParam };
