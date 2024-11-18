import Car from "../models/Car.js";
import cloudinary from "../config/cloudinary.js";

// Create a Car
export const createCar = async (req, res) => {
    try {
        // console.log("Car Controller Started")

        const { title, description, tags } = req.body;

        // console.log("Destructuring Done")
        // Validate input
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // console.log("Title found")

        // Upload images to Cloudinary

        
        const imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
              console.log("Uploading file:", file.path);
              const result = await cloudinary.uploader.upload(file.path, {
                folder: "car-management",
              });
              console.log("Uploaded successfully:", result.secure_url);
              imageUrls.push(result.secure_url);
            }
          }
          

        // console.log("image files set")

        // Create new car document
        const car = new Car({
            userId: req.userId,
            title,
            description,
            tags: tags ? tags.split(",") : [],
            images: imageUrls,
        });

        // console.log("New car created")

        await car.save();
        // console.log("New car saved in DB")
        res.status(201).json({ message: "Car created successfully", car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get All Cars for Logged-in User
export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.userId });
        res.status(200).json({ cars });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get Car Details by ID
export const getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, userId: req.userId });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update a Car
export const updateCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        // Find the car to update
        const car = await Car.findOne({ _id: req.params.id, userId: req.userId });
        // console.log("ID: ", req.params.id,"UserID: ", req.userId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Update fields
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = tags.split(",");

        // Handle new images if provided
        if (req.files) {
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "car-management",
                });
                imageUrls.push(result.secure_url);
            }
            car.images = [...car.images, ...imageUrls].slice(0, 10); // Ensure max 10 images
        }

        await car.save();
        res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete a Car
export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, userId: req.userId });
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // Delete car images from Cloudinary
        for (const imageUrl of car.images) {
            const publicId = imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`car-management/${publicId}`);
        }

        await car.deleteOne();
        res.status(200).json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

