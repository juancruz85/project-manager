"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { getProjectsCollection } from "@/lib/db";
import { ProjectFormSchema } from "@/lib/definitions";

export interface ProjectFormState {
  error?: string;
  success?: boolean;
}

export async function createProjectAction(
  _prevState: ProjectFormState | undefined,
  formData: FormData,
): Promise<ProjectFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const validatedFields = ProjectFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message ?? "Invalid project name." };
  }

  const projects = await getProjectsCollection();
  await projects.insertOne({
    userId: new ObjectId(session.user.id),
    name: validatedFields.data.name,
    createdAt: new Date(),
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");

  return { success: true };
}
