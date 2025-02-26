import request from "supertest";
import app from "../server";
import User from "../models/User";

let userId: string;
let token: string;

describe("User Controller Tests", () => {
    beforeAll(async () => {
        await User.deleteMany({}); 
        
        const res = await request(app).post("/api/users/signup").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        userId = res.body.data.user.id;
        token = res.body.data.token;
    });

    it("should register a new user", async () => {
        const res = await request(app).post("/api/users/signup").send({
            username: "testuser2",
            email: "test2@example.com",
            password: "password123",
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("status", "success"); 
        expect(res.body).toHaveProperty("message", "User registered successfully"); 
        expect(res.body).toHaveProperty("data"); 
        expect(res.body.data).toHaveProperty("token"); 
        expect(res.body.data).toHaveProperty("user"); 
        expect(res.body.data.user).toHaveProperty("email", "test2@example.com");
    });

    it("should log in a user", async () => {
        const res = await request(app).post("/api/users/login").send({
            email: "test@example.com",
            password: "password123",
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body.data).toHaveProperty("token");
    });

    it("should return all users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should get user by ID", async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "User found");
        expect(res.body.data).toHaveProperty("_id", userId);
        expect(res.body.data).toHaveProperty("email", "test@example.com");
    });

    it("should update user details", async () => {
        const res = await request(app)
            .patch(`/api/users/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                username: "updatedUser",
                email: "updated@example.com",
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "User updated successfully");
        expect(res.body.data).toHaveProperty("username", "updatedUser");
        expect(res.body.data).toHaveProperty("email", "updated@example.com");
    });

    it("should return 404 when updating a non-existent user", async () => {
        const res = await request(app)
            .patch("/api/users/666666666666666666666666") 
            .set("Authorization", `Bearer ${token}`)
            .send({ username: "nonexistent" });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should delete a user", async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "User deleted successfully");
    });

    it("should return 404 when deleting a non-existent user", async () => {
        const res = await request(app)
            .delete("/api/users/666666666666666666666666") 
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "User not found");
    });
});