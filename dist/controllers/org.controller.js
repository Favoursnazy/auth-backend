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
exports.addUserToOrg = exports.createOrganisation = exports.getSingleOrganisation = exports.userOganisation = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const userOganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
        if (userId) {
            const organisation = yield prisma_1.default.organisation.findMany({
                where: {
                    OR: [
                        {
                            authorId: {
                                contains: userId,
                            },
                        },
                        {
                            users: {
                                hasEvery: [userId],
                            },
                        },
                    ],
                },
            });
            res.status(200).json({
                status: "success",
                message: "User Organisations fetched!",
                data: {
                    organisation,
                },
            });
        }
        else {
            res.status(404).json({
                message: "user not found!",
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userOganisation = userOganisation;
const getSingleOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orgId } = req.params;
        const getSingleOrg = yield prisma_1.default.organisation.findFirst({
            where: { orgId },
        });
        if (getSingleOrg) {
            res.status(200).json({
                status: "success",
                message: "Organisation fetched!",
                data: {
                    orgId: getSingleOrg.orgId,
                    name: getSingleOrg.name,
                    description: getSingleOrg.description,
                },
            });
        }
        res.send(getSingleOrg);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getSingleOrganisation = getSingleOrganisation;
const createOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description } = req.body;
    const authorId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!name || !description) {
            return res.status(400).json({
                mesage: "name and deription fields ae required!",
            });
        }
        const createOrg = yield prisma_1.default.organisation.create({
            data: {
                name,
                description,
                authorId,
            },
        });
        if (createOrg) {
            res.status(201).json({
                status: "success",
                message: "Organisation created successfully",
                data: {
                    orgId: createOrg.orgId,
                    name: createOrg.name,
                    description: createOrg.description,
                },
            });
        }
        else {
            res.status(400).json({
                status: "Bad Request",
                message: "Client error",
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.createOrganisation = createOrganisation;
const addUserToOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { orgId } = req.params;
    try {
        const user = yield prisma_1.default.user.findUnique({ where: { userId } });
        if (user) {
            const addUser = yield prisma_1.default.organisation.update({
                where: { orgId },
                data: {
                    users: {
                        push: userId,
                    },
                },
            });
            if (addUser) {
                res.status(200).json({
                    status: "success",
                    message: "User added to organisation successfully",
                });
            }
        }
        else {
            res.status(404).json({
                message: "User not found!",
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.addUserToOrg = addUserToOrg;
