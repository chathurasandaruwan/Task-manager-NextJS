export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "completed"
  dueDate: Date | null
  createdAt: string
  updatedAt: string
}


export interface CreateTaskInput {
  title: string
  description?: string
  status: "todo" | "in-progress" | "completed"
  dueDate?: Date | null
}