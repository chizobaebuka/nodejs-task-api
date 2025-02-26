import express from "express";
import { createTask, deleteTaskById, getTaskById, getAllTasks, updateTaskById } from "../controllers/TaskController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

/**
   * @swagger
   * tags:
   *   name: Tasks
   *   description: API endpoints to manage tasks 
*/

router.post("/add", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTasks);
router.get("/:id", authMiddleware, getTaskById);
router.patch("/:id", authMiddleware, updateTaskById);
router.delete("/:id", authMiddleware, deleteTaskById);

export default router;