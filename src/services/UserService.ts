import { createUser, deleteUser, findAll, findUserByEmail, findUserById, updateUser } from "../repositories/UserRepository";
import { generateToken, hashPassword, verifyPassword } from "../utils";

export const registerUser = async (username: string, email: string, password: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({ username, email, password: hashedPassword });

    const token = generateToken(newUser._id.toString());

    return {
        user: {
            id: newUser._id.toHexString(),
            username: newUser.username,
            email: newUser.email,
        },
        token
    };
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    return generateToken(user._id.toString());
};

export const getUserInfoById = async (id: string) => findUserById(id);

export const getAll = async () => findAll(); 

export const updateUserDetails = async (id: string, updateData: Partial<{ username: string; email: string }>) =>
    updateUser(id, updateData);

export const removeUser = async (id: string) => deleteUser(id);