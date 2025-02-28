import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    user: mongoose.Types.ObjectId;
}

const taskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);