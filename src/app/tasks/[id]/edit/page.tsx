import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditTask({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href={`/tasks/${params.id}`}>
          <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Task
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Task</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Task ID: {params.id}
        </h2>
      </div>
    </main>
  );
}
