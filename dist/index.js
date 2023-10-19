"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./database/dbConfig");
const envs_1 = require("./config/envs");
const port = envs_1.envs.PORT;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log("");
    (0, dbConfig_1.DataBase)();
    console.log(`server is listening to port${port}`);
});
process.on("uncaughtException", (error) => {
    console.log(`server is shutting down due to uncaughtException: ${error}`);
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.log(`server is shutting down due to unhandledRejection: ${error}`);
    server.close(() => {
        process.exit(1);
    });
});
