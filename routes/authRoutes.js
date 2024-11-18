import express from "express";
import { signup, login, logout, userDetails } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/userDetails",authMiddleware, userDetails);

export default router;
