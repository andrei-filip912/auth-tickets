import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    private _errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super();
        this._errors = errors;

        // only has to be done when extending built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
    public get errors() : ValidationError[] {
        return this._errors;
    }
    
}