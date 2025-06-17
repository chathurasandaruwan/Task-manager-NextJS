"use client"

import { useEffect, useState } from "react"
import type { Task } from "@/lib/types"
import { getTaskById } from "@/lib/task-service"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TaskDetail({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  //fetch task by id
    useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskById(params.id)
      setTask(taskData)
      setLoading(false)
    }

    fetchTask()
  }, [params.id])
  //set loading
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-600">Loading task...</p>
        </div>
      </div>
    )
  }

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

      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          {task?.title}
        </h1>
        <p className="text-gray-600">{task?.description}</p>
      </div>
    </main>
  );
}
