import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import connectDB from "./config/database";
import { errorHandler } from "./utils";

dotenv.config();

connectDB();

const PORT = process.env.PORT ?? 4006;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(errorHandler);

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV !== "test") {
    connectDB(); // ✅ Only connects to MongoDB in production/dev mode
    const PORT = process.env.PORT ?? 4006;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


export default app;