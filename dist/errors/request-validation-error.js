"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid parameters");
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in a class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.type === "field" ? err.path : "" };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
