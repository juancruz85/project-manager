"use client";

import { useActionState, useEffect } from "react";

import Card from "@/components/ui/Card";
import { createProjectAction, ProjectFormState } from "@/lib/actions/project-actions";
import { createTaskAction, TaskFormState } from "@/lib/actions/task-actions";

const inputClassName =
  "w-full rounded-[8px] border border-[#aeb8c4] bg-gradient-to-b from-[#eef2f6] to-white px-3 py-2 text-[#1f252c] shadow-[inset_0_1px_3px_rgba(25,32,40,.16),0_1px_0_rgba(255,255,255,.9)] outline-none transition-colors placeholder:text-[#8d98a5] focus:border-[#4f91ca]";

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <Card className="w-full max-w-sm">{children}</Card>
    </div>
  );
}

export function NewProjectModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState<ProjectFormState | undefined, FormData>(
    createProjectAction,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <ModalOverlay>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="ios-panel-title text-xl font-bold">New Project</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="ios-button-gray flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &times;
        </button>
      </div>

      <form action={formAction} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-[#44505d]">
            Project Name
          </span>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className={inputClassName}
            placeholder="e.g. School"
          />
        </label>

        {state?.error && (
          <p className="text-sm font-bold text-[#b9473e]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="ios-button-blue flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-bold text-white active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Creating..." : "Create Project"}
        </button>
      </form>
    </ModalOverlay>
  );
}

interface ProjectOption {
  id: string;
  name: string;
}

export function NewTaskModal({
  kind,
  projects,
  onClose,
}: {
  kind: "task" | "assignment";
  projects: ProjectOption[];
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState<TaskFormState | undefined, FormData>(
    createTaskAction,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const title = kind === "assignment" ? "New Assignment" : "New Task";

  return (
    <ModalOverlay>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="ios-panel-title text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="ios-button-gray flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &times;
        </button>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="kind" value={kind} />

        <label className="block">
          <span className="mb-1 block text-sm font-bold text-[#44505d]">
            Title
          </span>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className={inputClassName}
            placeholder={kind === "assignment" ? "e.g. History Essay" : "e.g. Buy groceries"}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-bold text-[#44505d]">
            Project
          </span>
          <select name="projectId" className={inputClassName} defaultValue="">
            <option value="">No Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="mb-1 block text-sm font-bold text-[#44505d]">
              Due Date
            </span>
            <input
              type="date"
              name="dueDate"
              required
              defaultValue={today}
              className={inputClassName}
            />
          </label>

          <label className="block flex-1">
            <span className="mb-1 block text-sm font-bold text-[#44505d]">
              Priority
            </span>
            <select name="priority" className={inputClassName} defaultValue="Medium">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        {state?.error && (
          <p className="text-sm font-bold text-[#b9473e]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="ios-button-blue flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-bold text-white active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Creating..." : `Create ${kind === "assignment" ? "Assignment" : "Task"}`}
        </button>
      </form>
    </ModalOverlay>
  );
}
