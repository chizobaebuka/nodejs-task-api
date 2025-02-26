import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            user?: { id: mongoose.Types.ObjectId };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return; 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = { id: new mongoose.Types.ObjectId(decoded.id) };
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};