"use client";

import { createTask } from "@/utils/actions";
import { createTaskDto } from "@/utils/dtos";
import { createTaskSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";

const AddTaskForm = () => {
  const clientAction = async (formData: FormData) => {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    const validation = createTaskSchema.safeParse({ title, description });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    await createTask({ title, description } as createTaskDto);
  };

  return (
    <form action={clientAction} className="flex flex-col gap-6">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        className="p-2 text-xl text-gray-950  rounded-md "
      />
      <textarea
        name="description"
        rows={5}
        placeholder="Task description"
        className="p-2 text-xl text-gray-950  rounded-md resize-none"
      />
      <button
        type="submit"
        className=" bg-cyan-300 hover:bg-cyan-400 text-black font-semibold p-3 text-xl rounded-md transition-colors"
      >
        Add task
      </button>
    </form>
  );
};

export default AddTaskForm;
