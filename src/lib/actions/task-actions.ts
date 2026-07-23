"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { getProjectsCollection, getTasksCollection } from "@/lib/db";
import { TaskFormSchema } from "@/lib/definitions";

export interface TaskFormState {
  error?: string;
  success?: boolean;
}

export async function createTaskAction(
  _prevState: TaskFormState | undefined,
  formData: FormData,
): Promise<TaskFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const validatedFields = TaskFormSchema.safeParse({
    title: formData.get("title"),
    projectId: formData.get("projectId") || undefined,
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
    kind: formData.get("kind"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const { title, projectId, dueDate, priority, kind } = validatedFields.data;

  const parsedDueDate = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(parsedDueDate.getTime())) {
    return { error: "Please enter a valid due date." };
  }

  if (projectId) {
    const projects = await getProjectsCollection();
    const project = await projects.findOne({
      _id: new ObjectId(projectId),
      userId: new ObjectId(session.user.id),
    });
    if (!project) {
      return { error: "Invalid project selected." };
    }
  }

  const tasks = await getTasksCollection();
  await tasks.insertOne({
    userId: new ObjectId(session.user.id),
    projectId: projectId ? new ObjectId(projectId) : null,
    title,
    dueDate: parsedDueDate,
    priority,
    kind,
    completed: false,
    createdAt: new Date(),
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");

  return { success: true };
}

export async function toggleTaskCompleteAction(taskId: string, completed: boolean) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const tasks = await getTasksCollection();
  await tasks.updateOne(
    { _id: new ObjectId(taskId), userId: new ObjectId(session.user.id) },
    { $set: { completed } },
  );

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
}
