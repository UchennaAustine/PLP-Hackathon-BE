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

const router: Router = Router();

const imageUpload = multer().single("avatar");

router.route("/register").post(Register);
router.route("/:token/verify").post(Verification);
router.route("/sign-in").post(SignIn);
router.route("/view-users").get(Users);
router.route("/:userID/view-user").get(SingleUser);
router.route("/:userID/update-user-info").patch(imageUpload, UpdateUser);
router.route("/:userID/delete-user").delete(DeleteUser);

export default router;
