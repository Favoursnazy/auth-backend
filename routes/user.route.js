"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const protected_1 = require("../middlewares/protected");
const router = express_1.default.Router();
// **************** PUBLIC ROUTES ****************
router.get("/:id", protected_1.protectRoutes, user_controller_1.getUser);
router.post("/login");
exports.default = router;
