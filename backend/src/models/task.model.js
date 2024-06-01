import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "doing", "done"],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
