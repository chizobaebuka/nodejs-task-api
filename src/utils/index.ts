import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";

dotenv.config();

interface TokenPayload {
    id: string;
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message || err);

    const statusCode = err.status ?? 500;
    const message = err.message ?? 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    } catch (error) {
        return null;
    }
};

export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

export const verifyPassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
};
