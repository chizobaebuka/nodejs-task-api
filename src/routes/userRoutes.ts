import express from "express";
import { deleteUserById, getAllUsers, getUserById, login, register, updateUserById } from "../controllers/UserController";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.patch('/:id', updateUserById)
router.delete('/:id', deleteUserById)


export default router;