import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Add .js extension for ES module
import authRoutes from "./routes/authRoutes.js"; // Add .js extension for ES module
import carRoutes from "./routes/carRoutes.js"; // Add .js extension for ES module

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
