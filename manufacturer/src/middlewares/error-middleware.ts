import { Request, Response, NextFunction, RequestHandler } from "express";
import { Exception } from "../common/exceptions";

export function errorMiddleware(err: Exception, request: Request, response: Response, next: NextFunction) {
    const error = {
        error: {
            name: err.name,
            message: err.message,
            errors: err.errors
        }
    };
    response.status(err.status || 500).send(error);
}

export function asyncErrorHandler(callback: RequestHandler) {
    return function (request: Request, response: Response, next: NextFunction) {
        return Promise.resolve(callback(request, response, next)).catch(next);
    }
}
