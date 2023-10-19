"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const envs_1 = require("../config/envs");
cloudinary_1.v2.config({
    cloud_name: envs_1.envs.cloud_name,
    api_key: envs_1.envs.api_key,
    api_secret: envs_1.envs.api_secret,
});
exports.default = cloudinary_1.v2;
