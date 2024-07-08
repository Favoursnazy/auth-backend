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
exports.loginUser = exports.regsiterUser = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
const token_1 = require("../utils/token");
const password_1 = require("../utils/password");
const prisma_1 = __importDefault(require("../db/prisma"));
const regsiterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new bad_request_error_1.BadRequestError("Email in use!");
        }
        const hashedPassword = yield password_1.Password.toHash(password);
        const newUser = yield prisma_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
            },
        });
        if (newUser) {
            yield prisma_1.default.organisation.create({
                data: {
                    name: `${firstName}'s Organisation`,
                    description: `${firstName}'s newly created organisation`,
                    authorId: newUser.userId,
                },
            });
            res.status(201).json({
                status: "success",
                message: "Registration successful",
                data: {
                    accessToken: (0, token_1.generateToken)(newUser.userId, newUser.email, res),
                    user: {
                        userId: newUser.userId,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        phone: newUser.phone,
                    },
                },
            });
        }
        else {
            res.status(400).json({
                status: "Bad request",
                message: "Registration unsuccessful",
                statusCode: 400,
            });
        }
    }
    catch (error) {
        console.log("Error in signup uer controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.regsiterUser = regsiterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser &&
            (yield password_1.Password.compare(existingUser.password, password))) {
            res.status(201).json({
                status: "success",
                message: "Login successful",
                data: {
                    accessToken: (0, token_1.generateToken)(existingUser.userId, existingUser.email, res),
                    userId: existingUser.userId,
                    fullName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    phone: existingUser.phone,
                },
            });
        }
        else {
            // if user was not found in database, send error message
            res.status(401).json({
                status: "Bad request",
                message: "Authentication failed",
                statusCode: 401,
            });
        }
    }
    catch (error) {
        console.log("Error in login uer controler", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
