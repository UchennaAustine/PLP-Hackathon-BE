"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("./router/router"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    app.use("/api", router_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "api is live ❤❤❤...",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: `api error:${error}`,
            });
        }
    });
};
exports.mainApp = mainApp;
