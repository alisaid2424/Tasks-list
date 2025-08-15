import AddTaskForm from "@/components/AddTaskForm";
import Link from "next/link";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";

const AddTaskPage = () => {
  return (
    <section className="min-h-[calc(100vh-105px)] flex flex-col items-center justify-center">
      <Link
        href="/"
        className="main-btn flex items-center gap-3 hover:underline"
      >
        <FiArrowLeftCircle size={30} /> Back to Tasks table
      </Link>
      <div className="w-full sm:w-2/3 mx-auto bg-slate-800 p-5 border-2 border-gray-300 rounded-md">
        <h1 className="text-3xl font-bold mb-7">Add a new task</h1>

        <AddTaskForm />
      </div>
    </section>
  );
};

export default AddTaskPage;
