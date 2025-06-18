import type { CreateTaskInput, Task } from "./types";
import axios, { type AxiosError } from "axios"

const API_BASE_URL = "http://localhost:8000/Task"

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
})

// Create a new task
export const createTask = async (taskData: CreateTaskInput): Promise<Task | undefined> => {
   try {
    const payload = {
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status,
      dueDate: taskData.dueDate,
    }

    const response = await api.post("/create", payload)
    return response.data
  } catch (error) {
    console.log(error);
  }
};
// Get all tasks
export const getTasks = async (): Promise<Task[] | undefined> => {
   try {
    const response = await api.get("/all")
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.log(error);
    
  }
};

// Get a task by ID
export const getTaskById = async (id: string): Promise<Task | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const tasks = getTasksFromStorage();
  return tasks.find((task) => task.id === id) || null;
};
// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasksToStorage(updatedTasks);
};

// Update an existing task
export const updateTask = async (taskData: Task): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tasks = getTasksFromStorage();
  const taskIndex = tasks.findIndex((task) => task.id === taskData.id);

  if (taskIndex === -1) {
    throw new Error(`Task with ID ${taskData.id} not found`);
  }

  const updatedTask: Task = {
    ...taskData,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  saveTasksToStorage(tasks);

  return updatedTask;
};
