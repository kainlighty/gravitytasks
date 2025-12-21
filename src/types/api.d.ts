import { Task } from "@/components/AddTaskForm/AddTaskForm";

export type TaskPatch = Partial<Omit<Task, "id" | "createdAt">>;