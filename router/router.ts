import { Router } from "express";
import {
  DeleteUser,
  Register,
  SignIn,
  SingleUser,
  UpdateUser,
  Users,
  Verification,
} from "../controller/controller";

import multer from "multer";
import validatorHolder from "../utils/validatorHolder";
import { registerValidator, signInValidator } from "../utils/validator";

const router: Router = Router();

const imageUpload = multer().single("avatar");

router.route("/register").post(validatorHolder(registerValidator), Register);
router.route("/:token/verify").get(Verification);
router.route("/sign-in").post(validatorHolder(signInValidator), SignIn);
router.route("/view-users").get(Users);
router.route("/:userID/view-user").get(SingleUser);
router.route("/:userID/update-user-info").patch(imageUpload, UpdateUser);
router.route("/:userID/delete-user").delete(DeleteUser);

export default router;
