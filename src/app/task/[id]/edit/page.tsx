import EditTaskForm from "@/components/EditTaskForm";
import prisma from "@/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditTaskPage {
  params: { id: string };
}

const EditTaskPage = async ({ params }: EditTaskPage) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <section>
      <Link
        href={`/task/${task.id}`}
        className="underline block mb-10 text-center pt-10"
      >
        {"<<"} Back to Task Details
      </Link>
      <div className="w-2/3 mx-auto bg-slate-800 p-5 border-2 border-gray-300 rounded-md">
        <h1 className="text-3xl font-bold mb-7">Edit task #{task.id}</h1>

        <EditTaskForm task={task} />
      </div>
    </section>
  );
};

export default EditTaskPage;
