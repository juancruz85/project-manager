import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }),
});

export const ProjectFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Project name is required." }),
});

export const TaskFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required." }),
  projectId: z.string().optional(),
  dueDate: z.string().min(1, { message: "Due date is required." }),
  priority: z.enum(["Low", "Medium", "High"]),
  kind: z.enum(["task", "assignment"]),
});
