import { FilterQuery, Types } from "mongoose";
import Task, { ITask } from "../models/Task";

export const getAllTasks = async () => {
    return Task.find();
};

export const getAllTasksFromDB = async (userId?: string) => {
    const query: FilterQuery<ITask> = {};

    if (userId) {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }
        query.user = new Types.ObjectId(userId);
    }

    return Task.find(query);
};

export const getTaskById = async (id: string) => Task.findById(id);

export const createTask = async (taskData: Partial<Omit<ITask, "_id">>) => {
    if (!taskData.user) {
        throw new Error("Task must be associated with a user.");
    }

    return Task.create({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status ?? "pending",
        user: taskData.user,
    });
};


export const updateTask = async (id: string, updateData: Partial<Omit<ITask, "_id">>) =>
    Task.findByIdAndUpdate(id, updateData, { new: true });


export const deleteTask = async (id: string) => Task.findByIdAndDelete(id);