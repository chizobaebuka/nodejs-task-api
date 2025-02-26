import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().optional(),
    status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
    user: z.string().optional()
});

export const taskUpdateSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
});

export const userRegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userUpdateSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
});