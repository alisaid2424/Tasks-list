import StatusBadge from "@/components/StatusBadge";
import { deleteTask } from "@/utils/actions";
import prisma from "@/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface TaskDetailsPageProps {
  params: { id: string };
}

const TaskDetailsPage = async ({ params }: TaskDetailsPageProps) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <section>
      <div className="flex items-center justify-between pt-7">
        <Link href="/" className="underline">
          {"<<"} Back to tasks table
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/task/${task.id}/edit`}
            className="bg-green-700 hover:bg-green-600 py-1 px-2 transition-colors rounded-lg text-xl"
          >
            Edit
          </Link>
          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id} />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-600 py-1 px-2 transition-colors rounded-lg text-xl"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="mt-16 p-5 bg-gray-600 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold flex-1 capitalize">
            {task.title}
          </h2>
          <StatusBadge status={task.status} />
        </div>
        <small className="text-yellow-400">
          {new Date(task.createdAt).toDateString()}
        </small>
        <p className="mt-5 text-xl">{task.description}</p>
      </div>
    </section>
  );
};

export default TaskDetailsPage;
