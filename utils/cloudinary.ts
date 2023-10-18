import { v2 as cloudinary } from "cloudinary";
import { envs } from "../config/envs";

cloudinary.config({
  cloud_name: envs.cloud_name,
  api_key: envs.api_key,
  api_secret: envs.api_secret,
});

export default cloudinary;
