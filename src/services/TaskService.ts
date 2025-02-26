import { ITask } from "../models/Task";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../repositories/TaskRepository";

export const fetchAllTasks = async () => getAllTasks();

export const fetchTaskById = async (id: string) => getTaskById(id);

export const addTask = async ({ title, description, user }: Partial<ITask>) => {
    if (!title) {
        throw new Error("Title is required");
    }
    if (!user) {
        throw new Error("User ID is required for task creation");
    }

    return createTask({ title, description, status: "pending", user });
};

export const modifyTask = async (id: string, updateData: Partial<Omit<ITask, "_id">>) => {
    if (updateData.status && !["pending", "in-progress", "completed"].includes(updateData.status)) {
        throw new Error("Invalid status value. Allowed values: pending, in-progress, completed");
    }

    return updateTask(id, updateData);
};

export const removeTask = async (id: string) => deleteTask(id);