import express from "express";
import { createCar, getAllCars, getCarById, updateCar, deleteCar } from "../controllers/carController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.array("images", 10), createCar); // Add car
router.get("/", authMiddleware, getAllCars); // Get all cars
router.get("/:id", authMiddleware, getCarById); // Get car by ID
router.put("/:id", authMiddleware, upload.array("images", 10), updateCar); // Update car
router.delete("/:id", authMiddleware, deleteCar); // Delete car

export default router;
