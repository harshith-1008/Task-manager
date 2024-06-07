import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.options("*", cors());

import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import taskRouter from "./routes/task.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/board", boardRouter);
app.use("/api/v1/board", taskRouter);

export { app };
