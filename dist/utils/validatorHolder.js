"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error/error");
exports.default = (Schema) => {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(error_1.HTTP.BAD_REQUEST).json({
                message: "validator error",
            });
        }
        else {
            next();
        }
    };
};
