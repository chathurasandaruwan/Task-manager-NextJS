import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Link href="/create">
          <button className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:cursor-pointer">
            <PlusCircle className="w-5 h-5" />
            New Task
          </button>
        </Link>
      </div>
    </main>
  );
}
