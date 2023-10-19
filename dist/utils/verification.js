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
exports.Verification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../error/error");
const Verification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (token) {
            const realValue = token.split(" ")[1];
            if (realValue) {
                jsonwebtoken_1.default.verify(realValue, "decode", (err, payload) => {
                    if (err) {
                        return res.status(error_1.HTTP.BAD_REQUEST).json({
                            message: "jwt encountered an error"
                        });
                    }
                    else {
                        const userID = payload;
                        console.log(userID);
                    }
                });
            }
            else {
                return res.status(error_1.HTTP.BAD_REQUEST).json({
                    message: "invalid token"
                });
            }
        }
        else {
            return res.status(error_1.HTTP.BAD_REQUEST).json({
                message: "Token not found!"
            });
        }
    }
    catch (error) {
        return res.status(error_1.HTTP.BAD_REQUEST).json({
            message: "An error occurred"
        });
    }
});
exports.Verification = Verification;
