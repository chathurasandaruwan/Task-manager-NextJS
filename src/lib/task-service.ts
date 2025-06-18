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
    const response = await api.post("/create", taskData)
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
export const getTaskById = async (id: string): Promise<Task | undefined | null> => {
  try {
    const response = await api.get(`/get/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    console.log(error);
  }
};
// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`)
  } catch (error) {
    console.log(error);
  }
};

// Update an existing task
export const updateTask = async (taskData: Task): Promise<Task> => {
  const response = await api.put(`/${taskData.id}`, taskData)
  return response.data
};
