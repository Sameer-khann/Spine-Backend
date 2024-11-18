import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Create token
        const token = createToken(user._id);

        // Set token in cookie
        res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "none" });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log("Email : ", email, " password : ", password);

        // console.log("Destructuring Done")
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log("User found through email")

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // console.log("password campared")
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // console.log("Password matched")

        // Create token
        const token = createToken(user._id);


        // console.log("Token Created")

        // Set token in cookie
        res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 });

        // console.log("Cookies set")

        res.status(200).json({ message: "Login successful" });

        // console.log("Response sent with 200")

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const userDetails = async (req, res) => {
    try {
      const id = req.userId;  // Assuming userId is available in the request (e.g., from authentication middleware)
      const user = await User.findOne({ _id: id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);  // Respond with user details
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Logout
export const logout = (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
};
