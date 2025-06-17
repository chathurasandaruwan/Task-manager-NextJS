import { v4 as uuidv4 } from "uuid";
import type { CreateTaskInput, Task } from "./types";

const STORAGE_KEY = "tasks";

//function to get tasks from localStorage
const getTasksFromStorage = (): Task[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const tasksJson = localStorage.getItem(STORAGE_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};
// Create a new task
export const createTask = async (taskData: CreateTaskInput): Promise<Task> => {
  // Get tasks from localStorage
  const tasks = getTasksFromStorage();

  const now = new Date().toISOString();
  const newTask: Task = {
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description || "",
    status: taskData.status,
    dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : null,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  // Save tasks to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  return newTask;
};

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const tasks = getTasksFromStorage()
  return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get a task by ID
export const getTaskById = async (id: string): Promise<Task | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const tasks = getTasksFromStorage()
  return tasks.find((task) => task.id === id) || null
}
