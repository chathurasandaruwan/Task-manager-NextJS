import Link from "next/link";
import { Circle, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <Circle className="w-4 h-4 text-blue-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              task.status
            )}`}
          >
            {getStatusIcon(task.status)}
            {getStatusText(task.status)}
          </span>
        </div>

        <p className="text-gray-600 mb-3 line-clamp-2">
          {task.description || "No description provided."}
        </p>

        {task.dueDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
