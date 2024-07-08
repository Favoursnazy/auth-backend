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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const errorHandler_1 = require("./middlewares/errorHandler");
const not_found_error_1 = require("./errors/not-found-error");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// **************** ROUTES ****************
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/auth", routes_1.authRoutes);
app.use("/api", routes_1.orgRoutes);
app.use("/api/users", routes_1.usersRoutes);
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new not_found_error_1.NotFoundError();
}));
app.use(errorHandler_1.errorHandler);
