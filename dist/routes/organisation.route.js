"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protected_1 = require("../middlewares/protected");
const org_controller_1 = require("../controllers/org.controller");
const router = express_1.default.Router();
// **************** PUBLIC ROUTES ****************
router.get("/organisations", protected_1.protectRoutes, org_controller_1.userOganisation);
router.get("/organisations/:orgId", protected_1.protectRoutes, org_controller_1.getSingleOrganisation);
router.post("/organisations", protected_1.protectRoutes, org_controller_1.createOrganisation);
router.post("/organisations/:orgId/users", protected_1.protectRoutes, org_controller_1.addUserToOrg);
exports.default = router;
