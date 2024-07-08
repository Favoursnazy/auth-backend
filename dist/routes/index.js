"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = exports.orgRoutes = exports.authRoutes = void 0;
const auth_route_1 = __importDefault(require("./auth.route"));
exports.authRoutes = auth_route_1.default;
const organisation_route_1 = __importDefault(require("./organisation.route"));
exports.orgRoutes = organisation_route_1.default;
const user_route_1 = __importDefault(require("./user.route"));
exports.usersRoutes = user_route_1.default;
