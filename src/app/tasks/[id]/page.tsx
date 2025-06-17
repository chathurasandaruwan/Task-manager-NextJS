"use client";

import { useEffect, useState, use } from "react";
import type { Task } from "@/lib/types";
import { deleteTask, getTaskById } from "@/lib/task-service";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

export default function TaskDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const router = useRouter()
  //get id from params
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  //fetch task by id
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskById(id);
      setTask(taskData);
      setLoading(false);
    };

    fetchTask();
  }, [id]);
  //set loading
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }
  //if task not found
  if (!task) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-600">Task not found</p>
        </div>
      </div>
    );
  }
  //set status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  //set status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };
  //handle delete
  const handleDelete = async (id: string) => {
    if (task) {
      await deleteTask(task.id)
      router.push("/")
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/">
          <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {task.title}
              </h1>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  task.status
                )}`}
              >
                {getStatusText(task.status)}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href={`/tasks/${task.id}/edit`}>
                <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="p-2 text-red-600 hover:text-red-800 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Description:
            </p>
            <p className="text-gray-900 whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Due Date:</p>
            <p className="text-gray-900">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <p className="text-sm text-gray-600">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}
