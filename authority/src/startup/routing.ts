import { Router } from "express";
import indexRouter from "../routers/index-router";
import {shipmentRouterFactory} from "../routers/shipment-router";

export function routing(messageService, queueService) {
    const routing = Router();
    routing.use("/shipment", shipmentRouterFactory(messageService, queueService));
    routing.use("/", indexRouter);
    return routing;
}

