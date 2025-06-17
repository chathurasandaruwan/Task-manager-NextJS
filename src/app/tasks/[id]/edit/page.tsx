"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/lib/types";
import { getTaskById } from "@/lib/task-service";

export default function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskById(id);
      setTask(taskData);
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-600">Task not found</p>
        </div>
      </div>
    );
  }
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href={`/tasks/${id}`}>
          <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Task
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Task</h1>
        <TaskForm task={task} />
      </div>
    </main>
  );
}
