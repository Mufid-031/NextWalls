import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.api
  .ping()
  .then((response) => console.log("Cloudinary Connected:", response))
  .catch((error) => console.error("Cloudinary Error:", error));

export default cloudinary;
