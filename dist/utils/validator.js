"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidator = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
exports.registerValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().lowercase().trim(),
    password: joi_1.default.string().pattern(new RegExp(regex)).required()
});
exports.signInValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim(),
    password: joi_1.default.string().pattern(new RegExp(regex)).required()
});
