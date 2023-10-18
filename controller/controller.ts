import { Response, Request } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userModel } from "../model/model";
import { envs } from "../config/envs";
import { HTTP } from "../error/error";
import { streamUpload } from "../utils/stream";

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const lock = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, lock);
    const value = crypto.randomBytes(10).toString("hex");
    const token = jwt.sign(value, envs.TOKEN_SECRET);

    const user = await userModel.create({
      email,
      password: encrypt,
      name,
      token,
      verified: false,
      avatar: await email.charAt().toUpperCase(),
    });
    return res.status(HTTP.CREATE).json({
      message: `User Registration SuccessFul:`,
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `User Registration Error: ${error.message}`,
      info: error,
    });
  }
};
