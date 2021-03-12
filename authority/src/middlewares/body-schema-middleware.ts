import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../common";
import Ajv from "ajv"

const ajv = new Ajv();

function getValidationErrors(data: any, schema: any) {
    const isDataValid = ajv.compile(schema);
    const validated = isDataValid(data);

    if (validated)
        return;

    const errors = isDataValid.errors.map((err: any) => ({
        message: err.message
    }));

    return errors;
}

export const requireBody = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
    if (request.method === "OPTIONS")
        next();

    const { body } = request;
    const errors = getValidationErrors(body, schema);

    if (errors)
        next(new BadRequestException("Validation failed", errors));

    next();
}
