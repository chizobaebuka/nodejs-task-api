import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import connectDB from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { errorHandler } from "./utils";

dotenv.config();

// Connect to database only once
if (process.env.NODE_ENV !== "test") {
    connectDB();
}

const PORT = process.env.PORT ?? 4006;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(errorHandler);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Start server (Only in non-test environments)
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;