import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database";
import app from "../server";

dotenv.config();

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
})

describe('Auth API Tests', () => {
    let userEmail = 'testuser@example.com';
    let userPassword = 'Qwertyuiop!23';

    it("should register a new user", async () => {
        const res = await request(app).post("/api/users/signup").send({
            username: "testuser",
            email: userEmail,
            password: userPassword,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "User Registered Successfully");
        expect(res.body.data).toHaveProperty("email", userEmail);
    });
})
