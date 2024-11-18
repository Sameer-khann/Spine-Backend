import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.log("API keys missing for cloudinary")
  throw new Error("Missing Cloudinary configuration in environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// cloudinary.uploader.upload("test_image.jpg", { folder: "test-folder" }, (error, result) => {
//   if (error) {
//     console.error("Cloudinary Error:", error.message);
//   } else {
//     console.log("Upload Success:", result);
//   }
// });












// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;