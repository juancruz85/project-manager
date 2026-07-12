import "server-only";

import { ObjectId, WithId } from "mongodb";
import getMongoClientPromise from "@/lib/mongodb";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskKind = "task" | "assignment";

export interface User {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Project {
  userId: ObjectId;
  name: string;
  createdAt: Date;
}

export interface Task {
  userId: ObjectId;
  projectId: ObjectId | null;
  title: string;
  dueDate: Date;
  priority: TaskPriority;
  kind: TaskKind;
  completed: boolean;
  createdAt: Date;
}

export type UserDoc = WithId<User>;
export type ProjectDoc = WithId<Project>;
export type TaskDoc = WithId<Task>;

async function getDb() {
  const client = await getMongoClientPromise();
  return client.db(process.env.MONGODB_DB || "project_manager");
}

export async function getUsersCollection() {
  const db = await getDb();
  return db.collection<User>("users");
}

export async function getProjectsCollection() {
  const db = await getDb();
  return db.collection<Project>("projects");
}

export async function getTasksCollection() {
  const db = await getDb();
  return db.collection<Task>("tasks");
}
