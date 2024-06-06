import { Router } from "express";
import {
  createBoard,
  changeBoardName,
  deleteBoard,
  getBoardNames,
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/create-board").post(createBoard);
router.route("/get-board-names").get(getBoardNames);
router.route("/change-board-name").post(changeBoardName);
router.route("/delete-board").post(deleteBoard);

export default router;
