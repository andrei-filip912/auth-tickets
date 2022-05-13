import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    constructor(private errors: ValidationError[]) {
        super();

        // only has to be done when extending built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
}