"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middlewares/validateRequest");
const auth_conroller_1 = require("../controllers/auth.conroller");
// **************** AUTH PUBLIC ROUTES ****************
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    (0, express_validator_1.body)("firstName").isString().withMessage("first name is required"),
    (0, express_validator_1.body)("lastName").isString().withMessage("last name is required"),
    (0, express_validator_1.body)("phone").isString().withMessage("phone is required"),
], validateRequest_1.validateRequest, auth_conroller_1.regsiterUser);
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password!"),
], validateRequest_1.validateRequest, auth_conroller_1.loginUser);
exports.default = router;
