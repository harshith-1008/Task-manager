import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boardName: {
      type: String,
      default: "untitled",
    },
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);
