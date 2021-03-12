import { Request, Response, NextFunction } from "express";

export function requestLogMiddleware(request: Request, response: Response, next: NextFunction) {
    if (request.method === "OPTIONS")
        next();

    console.log(request.method, request.url, request.body);
    next();
}
