"use server"

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTaskDto, updateTaskDto } from "./dtos";

// create Task
export async function createTask({ title, description } : createTaskDto) {

  if( typeof title !== "string" || title.length < 2  ) return;
  if( typeof description !== "string" || description.length < 4  ) return;

  try{
    await prisma.task.create({
      data: {title, description},
    });
  }catch{
    throw new Error('could not create the task , please try again')
  }
  

    //revalidatePath("/");
    redirect("/");
}

// delete task
export async function deleteTask(formData : FormData) {

  const id = formData.get('id')?.toString();
  if (!id) return;

  try{
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }catch{
    throw new Error('could not delete the task , please try again')
  }
  
    //revalidatePath("/");
    redirect("/");
}

// update task
export async function updateTask({ id, title, description, status } : updateTaskDto) {


  if( typeof title !== "string" || title.length < 2  ) return;
  if( typeof description !== "string" || description.length < 4  ) return;
  if(!status) return;
  if( typeof id !== "string") return;

  try{
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: {title, description , status},
    });
  }catch{
    throw new Error('could not update the task , please try again')
  }
  
    //revalidatePath("/");
    revalidatePath(`/task/${id}`);
    redirect(`/task/${id}`);
}
