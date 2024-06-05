import { Router } from "express";
import {
  createBoard,
  changeBoardName,
  getBoard,
  deleteBoard,
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/create-board").post(createBoard);
router.route("/change-board-name").post(changeBoardName);
router.route("/get-board/:boardId").get(getBoard);
router.route("/delete-board").delete(deleteBoard);

export default router;
