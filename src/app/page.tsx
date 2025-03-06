import StatusBadge from "@/components/StatusBadge";
import prisma from "@/utils/db";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
//export const revalidate = 10;

const HomePage = async () => {
  const tasks = await prisma.task.findMany();
  return (
    <section>
      <h1 className="text-4xl font-semibold pt-7">Tasks List App</h1>
      <div className="flex items-center justify-end mb-10">
        <Link
          href="/task/add"
          className="bg-cyan-300 hover:bg-cyan-400 transition-colors py-1 px-2 rounded-sm font-semibold text-xl text-black"
        >
          Add Task
        </Link>
      </div>
      <table className="table text-center w-full mt-5">
        <thead className="border-t-2 border-b-2 border-gray-300 text-xl">
          <tr>
            <th className="p-3">#</th>
            <th>Task title</th>
            <th>Task Status</th>
            <th>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="border-b border-gray-500">
              <td className="p-3">{index + 1}</td>
              <td>{task.title}</td>
              <td>
                <StatusBadge status={task.status} />
              </td>
              <td>
                <Link
                  href={`/task/${task.id}`}
                  className="bg-blue-600 hover:bg-blue-800 transition-colors rounded-md p-2 text-white"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default HomePage;
