import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TaskForm from "@/components/TaskForm";

export default function CreateTask() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/">
          <button className="bg-gray-600 hover:bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Create New Task
        </h1>
        <TaskForm />
      </div>
    </main>
  );
}
