// GPT

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Task } from "@/types/Task";
import { TaskPatch } from "@/types/api";
import {
    addCommentToDb,
    addTaskToDb,
    deleteAllCommentsFromTask,
    deleteCommentFromDb,
    deleteTaskFromDb,
    deleteTasksFromDb,
    getTasksFromDb,
    patchTaskFromDb
} from "@/api/tasks";
import { getDateTimeNow } from "@/utility/date";

interface TaskState {
    tasks: Task[];
    selectedTaskId: string | null;
    isLoading: boolean;
}

interface TaskActions {
    selectTask: (id: string | null) => void;
    fetchTasks: () => Promise<void>;
    addTask: (taskProto: Task) => Promise<void>;
    updateTask: (id: string, patch: TaskPatch) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    deleteAllTasks: () => Promise<void>;
    addComment: (taskId: string, text: string) => Promise<void>;
    deleteComment: (taskId: string, commentId: string) => Promise<void>;
    deleteAllComments: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState & TaskActions>()(
  devtools((set, get) => ({
      tasks: [],
      selectedTaskId: null,
      isLoading: false,

      selectTask: (id) => set({ selectedTaskId: id }),

      fetchTasks: async () => {
          set({ isLoading: true });
          try {
              const tasks = await getTasksFromDb();
              set({
                  tasks: tasks.map(t => ({
                      ...t,
                      id: String(t.id) ,
                      comments: t.comments ?? [],
                  })),
                  isLoading: false
              });
          } catch (e) {
              set({ isLoading: false });
          }
      },

      addTask: async (taskProto) => {
          const { tasks } = get();

          const maxId = tasks.reduce((max, t) => {
              const idNum = parseInt(t.id, 10);
              return isNaN(idNum) ? max : Math.max(max, idNum);
          }, 0);

          const nextId = String(maxId + 1);
          const now = getDateTimeNow();

          const optimisticTask: Task = {
              ...taskProto,
              id: nextId,
              createdAt: now,
              updatedAt: now,
              completed: false,
              comments: taskProto.comments ?? [],
              tags: taskProto.tags ?? []
          };

          set({ tasks: [...tasks, optimisticTask] });

          try {
              const created = await addTaskToDb(optimisticTask);
              set(state => ({
                  tasks: state.tasks.map(t => t.id === nextId ? { ...created, id: String(created.id) } : t)
              }));
          } catch (e) {
              set(state => ({ tasks: state.tasks.filter(t => t.id !== nextId) }));
          }
      },

      updateTask: async (id, patch) => {
          const { tasks } = get();
          const now = getDateTimeNow();
          const optimisticPatch = { ...patch, updatedAt: now };

          set({ tasks: tasks.map(t => t.id === id ? {
              ...t,
                  ...optimisticPatch
          } : t) });

          try {
              const updated = await patchTaskFromDb(id, optimisticPatch);
              set(state => ({
                  tasks: state.tasks.map(t => t.id === id ? { ...updated, id: String(updated.id) } : t)
              }));
          } catch (e) {
              get().fetchTasks();
          }
      },

      deleteTask: async (id) => {
          const { tasks, selectedTaskId } = get();
          set({
              tasks: tasks.filter(t => t.id !== id),
              selectedTaskId: selectedTaskId === id ? null : selectedTaskId
          });
          try {
              await deleteTaskFromDb(id);
          } catch (e) {
              get().fetchTasks();
          }
      },

      deleteAllTasks: async () => {
          if (!confirm("Удалить все задачи?")) return;
          set({ tasks: [], selectedTaskId: null });
          try {
              await deleteTasksFromDb();
          } catch (e) {
              get().fetchTasks();
          }
      },

      addComment: async (taskId, text) => {
          const task = get().tasks.find(t => t.id === taskId);
          if (!task) return;
          const newComments = await addCommentToDb(taskId, task.comments || [], text);
          set(state => ({
              tasks: state.tasks.map(t => t.id === taskId ? { ...t, comments: newComments } : t)
          }));
      },

      deleteComment: async (taskId, commentId) => {
          const task = get().tasks.find(t => t.id === taskId);
          if (!task) return;
          const newComments = await deleteCommentFromDb(taskId, task.comments || [], commentId);
          set(state => ({
              tasks: state.tasks.map(t => t.id === taskId ? { ...t, comments: newComments } : t)
          }));
      },

      deleteAllComments: async (taskId) => {
          await deleteAllCommentsFromTask(taskId);
          set(state => ({
              tasks: state.tasks.map(t => t.id === taskId ? { ...t, comments: [] } : t)
          }));
      }
  }))
);