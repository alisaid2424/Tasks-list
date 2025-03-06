import { Status } from "@prisma/client";

// create Task 
export interface createTaskDto {
    title: string;
    description: string;
}

// update Task
export interface updateTaskDto {
    id: string;
    title?: string;
    description?: string;
    status: Status;
}