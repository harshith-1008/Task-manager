import { Router } from "express";
import {
  createBoard,
  changeBoardName,
  getBoard,
  deleteBoard,
} from "../controllers/board.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt);
router.route("/create-board").post(createBoard);
router.route("/change-board-name").post(changeBoardName);
router.route("/get-board/:boardName").get(getBoard);
router.route("/delete-board").delete(deleteBoard);

export default router;
