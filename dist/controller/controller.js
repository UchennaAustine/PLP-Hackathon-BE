"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.SingleUser = exports.Users = exports.SignIn = exports.Verification = exports.Register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../model/model");
const envs_1 = require("../config/envs");
const error_1 = require("../error/error");
const stream_1 = require("../utils/stream");
const emails_1 = require("../utils/emails");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const lock = yield bcrypt_1.default.genSalt(10);
        const encrypt = yield bcrypt_1.default.hash(password, lock);
        const value = crypto_1.default.randomBytes(10).toString("hex");
        const token = jsonwebtoken_1.default.sign(value, envs_1.envs.TOKEN_SECRET);
        const user = yield model_1.userModel.create({
            email,
            password: encrypt,
            name,
            token,
            verified: false,
            avatar: yield email.charAt().toUpperCase(),
        });
        const tokenID = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, envs_1.envs.TOKEN_SECRET);
        (0, emails_1.verify)(user, tokenID).then(() => {
            console.log("sent");
        });
        return res.status(error_1.HTTP.CREATE).json({
            message: `User Registration SuccessFul:`,
            data: user,
        });
    }
    catch (error) {
        return res.status(error_1.HTTP.BAD_REQUEST).json({
            message: `User Registration Error: ${error.message}`,
            info: error,
        });
    }
});
exports.Register = Register;
const Verification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const user = jsonwebtoken_1.default.verify(token, envs_1.envs.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return err;
            }
            else {
                return payload;
            }
        });
        // if (user?.id) {
        yield model_1.userModel.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, { token: "", verified: true }, { new: true });
        return res.status(error_1.HTTP.CREATE).json({
            message: "Congratulations your account has been Verified!!!",
            data: user,
        });
        // } else {
        //   return res.status(HTTP.BAD_REQUEST).json({
        //     message: "Error with your ID",
        //   });
        // }
    }
    catch (error) {
        return res.status(error_1.HTTP.BAD_REQUEST).json({
            message: `User Registration Error: ${error.message}`,
            info: error,
        });
    }
});
exports.Verification = Verification;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield model_1.userModel.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkPassword) {
                if (user.verified && user.token === "") {
                    const userdata = yield jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, envs_1.envs.TOKEN_SECRET);
                    return res.status(error_1.HTTP.CREATE).json({
                        message: "Welcome back",
                        data: userdata,
                    });
                }
                else {
                    return res.status(error_1.HTTP.BAD_REQUEST).json({
                        message: "Restricted Access, Please Check Your Mail to Verify Your Account",
                    });
                }
            }
            else {
                return res.status(error_1.HTTP.BAD_REQUEST).json({
                    message: "Invalid Passsword",
                });
            }
        }
        else {
            return res.status(error_1.HTTP.NOT_FOUND).json({
                message: "Invalid User",
            });
        }
    }
    catch (error) {
        return res.status(error_1.HTTP.BAD_REQUEST).json({
            message: `Error Occured while signing user in:${error.message}`,
            info: error,
        });
    }
});
exports.SignIn = SignIn;
const Users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.userModel.find();
        return res.status(error_1.HTTP.OK).json({
            message: "success viewAllUser",
            data: users,
        });
    }
    catch (error) {
        return res.status(error_1.HTTP.NOT_FOUND).json({
            message: `Error occured viewing all users: ${error.message}`,
            info: error,
        });
    }
});
exports.Users = Users;
const SingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield model_1.userModel.findById(userID);
        return res.status(error_1.HTTP.OK).json({
            message: "User",
            data: user,
        });
    }
    catch (error) {
        return res.status(error_1.HTTP.NOT_FOUND).json({
            message: `Error occured viewing user: ${error.message}`,
            info: error,
        });
    }
});
exports.SingleUser = SingleUser;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield model_1.userModel.findById(userID);
        const { secure_url, public_id } = yield (0, stream_1.streamUpload)(req);
        const userInfo = yield model_1.userModel.findByIdAndUpdate(userID, {
            avatar: secure_url,
            avatarID: public_id,
        }, { new: true });
        return res.status(error_1.HTTP.CREATE).json({
            message: "User",
            data: userInfo,
        });
    }
    catch (error) {
        return res.status(error_1.HTTP.BAD_REQUEST).json({
            message: `Error occured updating user: ${error.message}`,
            info: error,
        });
    }
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const remove = yield model_1.userModel.findByIdAndDelete(userID);
        return res.status(error_1.HTTP.OK).json({
            message: "Deleted",
        });
    }
    catch (error) {
        return res.status(error_1.HTTP.NOT_FOUND).json({
            message: `Error occured deleting users: ${error.message}`,
            info: error,
        });
    }
});
exports.DeleteUser = DeleteUser;
