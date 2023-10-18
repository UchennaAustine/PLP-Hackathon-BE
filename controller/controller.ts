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

export const Verification = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user: any = jwt.verify(
      token,
      envs.TOKEN_SECRET,
      (err: any, payload: any) => {
        if (err) {
          return err;
        } else {
          return payload;
        }
      }
    );

    if (user) {
      await userModel.findByIdAndUpdate(
        user?.id,
        { token: "", verify: true },
        { new: true }
      );

      return res.status(HTTP.CREATE).json({
        message: "Congratulations your account has been Verified!!!",
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Error with your ID",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `User Registration Error: ${error.message}`,
      info: error,
    });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user?.password!);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          return res.status(HTTP.CREATE).json({
            message: "Welcome back",
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message:
              "Restricted Access, Please Check Your Mail to Verify Your Account",
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Invalid Passsword",
        });
      }
    } else {
      return res.status(HTTP.NOT_FOUND).json({
        message: "Invalid User",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `Error Occured while signing user in:${error.message}`,
      info: error,
    });
  }
};

export const Users = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    return res.status(HTTP.OK).json({
      message: "success viewAllUser",
      data: users,
    });
  } catch (error: any) {
    return res.status(HTTP.NOT_FOUND).json({
      message: `Error occured viewing all users: ${error.message}`,
      info: error,
    });
  }
};

export const SingleUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "User",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.NOT_FOUND).json({
      message: `Error occured viewing user: ${error.message}`,
      info: error,
    });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);
    const { secure_url, public_id }: any = await streamUpload(req);

    const userInfo = await userModel.findByIdAndUpdate(
      userID,
      {
        avatar: secure_url,
        avatarID: public_id,
      },
      { new: true }
    );

    return res.status(HTTP.CREATE).json({
      message: "User",
      data: userInfo,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `Error occured updating user: ${error.message}`,
      info: error,
    });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const remove = await userModel.findByIdAndDelete(userID);

    return res.status(HTTP.OK).json({
      message: "Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.NOT_FOUND).json({
      message: `Error occured deleting users: ${error.message}`,
      info: error,
    });
  }
};
