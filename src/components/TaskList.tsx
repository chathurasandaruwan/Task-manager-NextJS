"use client";
import { useEffect, useState } from "react";
import { Task } from "@/lib/types";
import { getTasks } from "@/lib/task-service";
import TaskCard from "./task-card";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchTasks = async () => {
    const tasksData = await getTasks();
    setTasks(tasksData);
    setLoading(false);
  };

  fetchTasks();

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "todo":
        return todoTasks;
      case "in-progress":
        return inProgressTasks;
      case "completed":
        return completedTasks;
      default:
        return tasks;
    }
  };
  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="h-40 flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 mb-2">No tasks found</p>
        <p className="text-sm text-gray-500">Create a new task to get started</p>
      </div>
    )
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );

}
