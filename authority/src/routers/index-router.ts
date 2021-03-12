import { Request, Response, Router, NextFunction } from "express";

const indexRouter = Router();

indexRouter.route("/").get(
    (request: Request, response: Response, next: NextFunction) => {
        response.send(`Authority!`)
    }
);

export default indexRouter;
