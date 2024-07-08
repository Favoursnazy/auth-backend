import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { loginUser, regsiterUser } from "../controllers/auth.conroller";

// **************** AUTH PUBLIC ROUTES ****************
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName").isString().withMessage("first name is required"),
    body("lastName").isString().withMessage("last name is required"),
    body("phone").isString().withMessage("phone is required"),
  ],
  validateRequest,
  regsiterUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password!"),
  ],
  validateRequest,
  loginUser
);

export default router;
