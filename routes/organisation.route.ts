import express from "express";
import { protectRoutes } from "../middlewares/protected";
import {
  addUserToOrg,
  createOrganisation,
  getSingleOrganisation,
  userOganisation,
} from "../controllers/org.controller";

const router = express.Router();

// **************** PUBLIC ROUTES ****************
router.get("/organisations", protectRoutes, userOganisation);
router.get("/organisations/:orgId", protectRoutes, getSingleOrganisation);
router.post("/organisations", protectRoutes, createOrganisation);
router.post("/organisations/:orgId/users", protectRoutes, addUserToOrg);

export default router;
