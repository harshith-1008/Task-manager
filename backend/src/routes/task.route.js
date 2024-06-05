import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  modifyTask,
  deleteTask,
  addTask,
} from "../controllers/task.controller.js";
const router = Router();

router.use(verifyJWT);

router.route("/:boardId/tasks/add-task").post(addTask);
router.route("/:boardId/tasks/:taskId/delete-task").delete(deleteTask);
router.route("/:boardId/tasks/:taskId/change-task-status").post(modifyTask);

export default router;
