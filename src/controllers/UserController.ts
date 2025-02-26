import { Request, Response } from "express";
import { getAll, getUserInfoById, loginUser, registerUser, removeUser, updateUserDetails } from "../services/UserService";
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from "../utils/validator";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = userRegisterSchema.parse(req.body);
        const { username, email, password } = validatedData;
        const info = await registerUser(username, email, password);
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: info
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = userLoginSchema.parse(req.body);
        const { email, password } = validatedData;
        const token = await loginUser(email, password);
        res.status(200).json({ 
            status: "success",
            message: "User logged in successfully",
            data: { token }
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserInfoById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "User found",
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAll();
        res.status(200).json({
            status: "success",
            message: "Successfully found all users",
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = userUpdateSchema.parse(req.body);
        const updatedUser = await updateUserDetails(req.params.id, validatedData);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await removeUser(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ 
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};