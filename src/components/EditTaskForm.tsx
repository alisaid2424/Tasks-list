"use client";

import { updateTask } from "@/utils/actions";
import { updateTaskDto } from "@/utils/dtos";
import { updateTaskSchema } from "@/utils/validationSchema";
import { Status, Task } from "@prisma/client";
import { toast } from "react-toastify";

interface EditTaskFormProps {
  task: Task;
}

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const clientAction = async (formdata: FormData) => {
    const id = formdata.get("id")?.toString();
    const title = formdata.get("title")?.toString();
    const description = formdata.get("description")?.toString();
    const status = formdata.get("status") as Status;

    const validation = updateTaskSchema.safeParse({ title, description });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    await updateTask({ id, title, description, status } as updateTaskDto);
  };

  return (
    <form action={clientAction} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={task.id} />

      <input
        type="text"
        name="title"
        placeholder="Task title"
        defaultValue={task.title}
        className="p-2 text-xl text-gray-950  rounded-md"
      />
      <select
        name="status"
        className="p-2 text-xl text-gray-950 rounded-md"
        defaultValue={task.status}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <textarea
        name="description"
        rows={5}
        placeholder="Task description"
        defaultValue={task.description}
        className="p-2 text-xl text-gray-950 rounded-md resize-none"
      />

      <button
        type="submit"
        className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold p-3 text-xl rounded-md transition-colors"
      >
        Edit Task
      </button>
    </form>
  );
};

export default EditTaskForm;
