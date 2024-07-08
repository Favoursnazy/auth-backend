"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@desc Authenticated user & get token
const generateToken = (id, email, res) => {
    const token = jsonwebtoken_1.default.sign({ id, email }, process.env.JWT_KEY, {
        expiresIn: "30d",
    });
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS cross site scripting
        sameSite: "strict", // CSFR attack cross-site request fogery
        secure: process.env.NODE_ENV !== "development", //HTTPS
    });
};
exports.generateToken = generateToken;
