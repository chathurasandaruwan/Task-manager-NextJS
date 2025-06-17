"use client";
import { Task } from "@/app/lib/types";
import { log } from "console";
import { Calendar } from "lucide-react"
import { useState } from "react";

interface TaskFormProps {
  task?: Task;
}

export default function TaskForm({ task }: TaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo",
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });
  // errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  //validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    //validate title
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  //set form data on change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate form
    if (!validateForm()) {
      return
    }
    setIsSubmitting(true);
    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status as "todo" | "in-progress" | "completed",
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    };

    if (task) {
      // Update existing task
      
    } else {
      // Create new task
      console.log(taskData);
      
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Optional due date for the task
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
