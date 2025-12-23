// Думаю, знаешь откуда ветер подул

import { getDateTimeNow } from "@/utility/date";
import { TaskPatch } from "@/types/api";
import { apiJson } from "@/utility/utils";
import { Task, TaskComment } from "@/types/Task";

const TASK_API_URL = "http://localhost:3000/tasks"

export const getTasksFromDb = () => apiJson<Task[]>(TASK_API_URL);

export const addTaskToDb = (newTask: Task) => {
    const now = getDateTimeNow();
    const task: Task = { ...newTask, createdAt: now, updatedAt: now, completed: false };

    return apiJson<Task>(TASK_API_URL, {
        method: "POST",
        body: JSON.stringify(task),
    });
};

export const patchTaskFromDb = (taskId: string, fields: TaskPatch) =>
  apiJson<Task>(`${TASK_API_URL}/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
  });

export const deleteTaskFromDb = (taskId: string) =>
  apiJson<void>(`${TASK_API_URL}/${taskId}`, { method: "DELETE" });

export const deleteTasksFromDb = async () => {
    const tasks = await getTasksFromDb();
    await Promise.all(tasks.map(t => deleteTaskFromDb(t.id)));
};

/// ---- ////

export const addCommentToDb = async (taskId: string, currentComments: TaskComment[], text: string) => {
    const newComment: TaskComment = {
        id: crypto.randomUUID(),
        text: text.trim()
    };
    const updatedComments = [...currentComments, newComment];

    await patchTaskFromDb(taskId, { comments: updatedComments });
    return updatedComments;
};

export const deleteCommentFromDb = async (taskId: string, currentComments: TaskComment[], commentId: string) => {
    const updatedComments = currentComments.filter(c => c.id !== commentId);

    await patchTaskFromDb(taskId, { comments: updatedComments });
    return updatedComments;
};

export const deleteAllCommentsFromTask = async (taskId: string) => {
    await patchTaskFromDb(taskId, { comments: [] });
    return [];
};