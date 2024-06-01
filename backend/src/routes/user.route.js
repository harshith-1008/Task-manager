import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "./controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//verified routes
router.route("/logout").delete(verifyJWT, logoutUser);

export default router;
