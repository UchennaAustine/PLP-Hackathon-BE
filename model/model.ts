import mongoose from "mongoose";

interface iUser {
  name?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  token?: string;
  avatar: string;
  avatarID: string;
}

interface iUserData extends iUser, mongoose.Document {}

const userSchema = new mongoose.Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      toLowerCase: true,
      required: [true, "Enter your email address"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<iUserData>("users", userSchema);
