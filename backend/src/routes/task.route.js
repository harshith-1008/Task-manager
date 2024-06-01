import Router from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  modifyTask,
  deleteTask,
  addTask,
} from "../controllers/task.controller.js";
const router = Router();

router.use(verifyJwt);

router.route("/add-task").post(addTask);
router.route("/:taskId/delete-task").delete(deleteTask);
router.route("/:taskId/change-task-status").post(modifyTask);

export default router;
