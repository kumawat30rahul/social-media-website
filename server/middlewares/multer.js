// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Create a storage engine for Multer that uses Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads", // Optional: specify a folder in Cloudinary
//     allowed_formats: ["jpg", "png"], // Optional: specify allowed formats
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
