import AddTaskForm from "@/components/AddTaskForm";
import Link from "next/link";
import React from "react";

const AddTaskPage = () => {
  return (
    <section>
      <Link href="/" className="underline block mb-10 text-center pt-10">
        {"<<"} Back to Tasks table
      </Link>
      <div className="w-2/3 mx-auto bg-slate-800 p-5 border-2 border-gray-300 rounded-md">
        <h1 className="text-3xl font-bold mb-7">Add a new task</h1>

        <AddTaskForm />
      </div>
    </section>
  );
};

export default AddTaskPage;
