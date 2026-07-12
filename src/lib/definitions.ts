import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters long." }).trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { error: "Password is required." }),
});

export const ProjectFormSchema = z.object({
  name: z.string().min(1, { error: "Project name is required." }).trim(),
});

export const TaskFormSchema = z.object({
  title: z.string().min(1, { error: "Title is required." }).trim(),
  projectId: z.string().optional(),
  dueDate: z.string().min(1, { error: "Due date is required." }),
  priority: z.enum(["Low", "Medium", "High"]),
  kind: z.enum(["task", "assignment"]),
});
