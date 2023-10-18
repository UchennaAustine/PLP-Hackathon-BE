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
import {registerValidator}  from "../utils/validator";

const router: Router = Router();

const imageUpload = multer().single("avatar");

router.route("/register").post(registerValidator,Register);
router.route("/:token/verify").post(Verification);
router.route("/sign-in").post(SignIn);
router.route("/view-users").get(Users);
router.route("/:userID/view-user").get(SingleUser);
router.route("/:userID/update-user-info").patch(imageUpload, UpdateUser);
router.route("/:userID/delete-user").delete(DeleteUser);

export default router;
