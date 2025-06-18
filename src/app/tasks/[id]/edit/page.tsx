"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/lib/types";
import { getTaskById } from "@/lib/task-service";

export default function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //get id from params
  const { id } = use(params);
  const [task, setTask] = useState<Task | null | undefined>(null);
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
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center">
          <Home className="mr-2" />
          <span>Home</span>
        </Link>
        <Link href={`/tasks/${task.id}`} className="flex items-center">
          <ArrowLeft className="mr-2" />
          <span>Back</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Task</h1>
        <TaskForm task={task} />
      </div>
    </main>
  );
}
