import express from "express";
import { getUser } from "../controllers/user.controller";
import { protectRoutes } from "../middlewares/protected";

const router = express.Router();

// **************** PUBLIC ROUTES ****************
router.get("/:id", protectRoutes, getUser);
router.post("/login");

export default router;
