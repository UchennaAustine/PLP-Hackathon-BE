import joi from "joi";
import { NextFunction, Request, Response } from "express";
import { HTTP } from "../error/error";

export default (Schema: joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "validator error",
      });
    } else {
      next();
    }
  };
};
