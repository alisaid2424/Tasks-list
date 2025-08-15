import LottieHandler from "@/components/LottieHandler";
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
      {tasks.length ? (
        <>
          <h2 className="main-btn">Tasks List App</h2>

          <table className="table text-center w-full mt-5">
            <thead className="border-t-2 border-b-2 border-gray-300 text-xl bg-cyan-300 text-black">
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
        </>
      ) : (
        <div className="min-h-[calc(100vh-105px)] flex items-center justify-center">
          <LottieHandler type="empty" message="Table Tasks Empty" />
        </div>
      )}
    </section>
  );
};

export default HomePage;
