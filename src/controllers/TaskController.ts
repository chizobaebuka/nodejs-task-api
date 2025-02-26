import { Request, Response } from "express";
import { addTask, fetchAllTasks, fetchTaskById, modifyTask, removeTask } from "../services/TaskService";
import { taskSchema, taskUpdateSchema } from "../utils/validator";

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user?.id; 
        console.log({ user });
        if (!user) {
            res.status(401).json({ message: "Unauthorized: User ID not found" });
            return;
        }
        const validatedData = taskSchema.parse(req.body); 
        const newTask = await addTask({ ...validatedData, user });
        res.status(201).json({
            status: "success",
            message: "Task created successfully",
            data: newTask,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.errors ?? error.message }); 
    }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await fetchAllTasks();
        res.status(200).json({
            status: "success",
            message: "Successfully found all tasks",
            data: tasks,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await fetchTaskById(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Task found",
            data: task,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = taskUpdateSchema.parse(req.body); 
        const updatedTask = await modifyTask(req.params.id, validatedData);
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.errors ?? error.message });
    }
};

export const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTask = await removeTask(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};