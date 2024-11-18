import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String }], // URLs from Cloudinary
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
