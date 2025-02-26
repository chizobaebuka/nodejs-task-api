import request from "supertest";
import app from "../server";
import Task from "../models/Task";
import User from "../models/User";

let taskId: string;
let userId: string;
let token: string;

describe("Task Controller Tests", () => {
    beforeAll(async () => {
        await Task.deleteMany({});
        await User.deleteMany({});

        const userRes = await request(app).post("/api/users/signup").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        userId = userRes.body.data.user.id;
        token = userRes.body.data.token;
    });

    it("should create a new task", async () => {
        const res = await request(app)
            .post("/api/tasks/add")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test Task",
                description: "This is a test task",
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "Task created successfully");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("_id");
        expect(res.body.data).toHaveProperty("title", "Test Task");
        expect(res.body.data).toHaveProperty("description", "This is a test task");
        expect(res.body.data).toHaveProperty("user", userId);

        taskId = res.body.data._id; 
    });

    it("should get all tasks", async () => {
        const res = await request(app)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should get task by ID", async () => {
        const res = await request(app)
            .get(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "Task found");
        expect(res.body.data).toHaveProperty("_id", taskId);
        expect(res.body.data).toHaveProperty("title", "Test Task");
    });

    it("should update task by ID", async () => {
        const res = await request(app)
            .patch(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Updated Task",
                description: "Updated task description",
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "Task updated successfully");
        expect(res.body.data).toHaveProperty("title", "Updated Task");
        expect(res.body.data).toHaveProperty("description", "Updated task description");
    });

    it("should return 404 when updating a non-existent task", async () => {
        const res = await request(app)
            .patch("/api/tasks/666666666666666666666666") 
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "Non-existent Task" });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Task not found");
    });

    it("should delete task by ID", async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "Task deleted successfully");
    });

    it("should return 404 when deleting a non-existent task", async () => {
        const res = await request(app)
            .delete("/api/tasks/666666666666666666666666") 
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Task not found");
    });
});