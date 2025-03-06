import { z } from "zod";

//create Task Schema
export const createTaskSchema = z.object({
    title: z.string({
    required_error: "title is required",
    invalid_type_error: "title should be of type string",
    })
    .min(2 , { message: "title should be at least 2 characters long" })
    .max(200 , { message: "title should be less 200 characters" }),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string",
    })
    .min(4 , { message: "description should be at least 4 characters long" }),
})


// update Task Schema
export const updateTaskSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string",
        })
        .min(2 , { message: "title should be at least 2 characters long" })
        .max(200 , { message: "title should be less 200 characters" })
        .optional(),
    description: z.string({
            required_error: "description is required",
            invalid_type_error: "description should be of type string",
        })
        .min(4 , { message: "description should be at least 4 characters long" })
        .optional(),
})