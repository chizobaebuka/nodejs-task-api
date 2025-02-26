import { FilterQuery } from "mongoose";
import User, { IUser } from "../models/User";

export const findUserByEmail = async (email: string) => User.findOne({ email });

export const findUserById = async (id: string) => User.findById(id);

export const findAll = async (filter: FilterQuery<IUser> = {}): Promise<IUser[]> => {
    return User.find(filter);
};

export const createUser = async (userData: Partial<IUser>) => {
    const user = new User(userData);
    return user.save();
};

export const updateUser = async (id: string, updateData: Partial<IUser>) =>
    User.findByIdAndUpdate(id, updateData, { new: true });

export const deleteUser = async (id: string) => User.findByIdAndDelete(id);