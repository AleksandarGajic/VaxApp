import { HttpStatusCode } from "./constants";

export class Exception extends Error {
    constructor(
        public message: string,
        public status: number = HttpStatusCode.InternalServerError,
        public errors?: any[]
    ) {
        super(message);
    }
}

export class UnauthorizedException extends Exception {
    constructor(message?: string) {
        super(message || "Unauthorized request", HttpStatusCode.Unathorized);
    }
}

export class BadRequestException extends Exception {
    constructor(message?: string, errors?: any[]) {
        super(message || "Bad request", HttpStatusCode.BadRequest, errors);
    }
}
