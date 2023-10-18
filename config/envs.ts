import dotenv from "dotenv";
dotenv.config();

export const envs = {
  PORT: parseInt(process.env.PORT!),
  MONGODB: process.env.MONGODB!,
  TOKEN_SECRET: process.env.TOKEN_SECRET!,

  cloud_name: process.env.cloud_name as string,
  api_key: process.env.api_key as string,
  api_secret: process.env.api_secret as string,
};
