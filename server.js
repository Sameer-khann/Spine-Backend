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
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors({ origin: "https://samirspineassignment.netlify.app", credentials: true }));



const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error("The CORS policy does not allow this origin."),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent
  })
);



// app.use(cors({
//     origin: "https://samirspineassignment.netlify.app", // Your frontend URL
//     credentials: true, // Allow cookies to be sent
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// }));

// app.options("*", cors({
//     origin: "https://samirspineassignment.netlify.app",
//     credentials: true,
// }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
