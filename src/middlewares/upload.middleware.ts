import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "uploads",
      resource_type: "raw",          // IMPORTANT
      use_filename: true,            // KEEP original name
      unique_filename: false,        // DO NOT randomize
      filename_override: file.originalname, //  keeps .pdf .zip .dwg
    };
  },
});


export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // ZIPs are bigger — be realistic
  },
});
