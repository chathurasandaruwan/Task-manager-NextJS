"use client";
import { useEffect, useState } from "react";
import { Task } from "@/lib/types";
import { getTasks } from "@/lib/task-service";
import TaskCard from "./task-card";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    //fetch tasks from API
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  //filter tasks based on status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  //function to get filtered tasks based on active tab
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
  //loading state
  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }
  //if no tasks
  if (tasks.length === 0) {
    return (
      <div className="h-40 flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 mb-2">No tasks found</p>
        <p className="text-sm text-gray-500">
          Create a new task to get started
        </p>
      </div>
    );
  }
  const tabs = [
    { id: "all", label: "All", count: tasks.length },
    { id: "todo", label: "To Do", count: todoTasks.length },
    { id: "in-progress", label: "In Progress", count: inProgressTasks.length },
    { id: "completed", label: "Completed", count: completedTasks.length },
  ];
  //get filtered tasks
  const filteredTasks = getFilteredTasks();

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-center text-gray-500 py-8">
            No {activeTab === "all" ? "" : activeTab.replace("-", " ")} tasks
          </p>
        )}
      </div>
    </div>
  );
}
