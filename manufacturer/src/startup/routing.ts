import { Router } from "express";
import indexRouter from "../routers/index-router";
import {shipmentRouterFactory} from "../routers/shipment-router";
import {ShipmentService, QueueService} from '../entities/iServices';

export function routing(shipmentService: ShipmentService, queueService: QueueService) {
    const routing = Router();
    
    routing.use("/shipment", shipmentRouterFactory(shipmentService, queueService));
    routing.use("/", indexRouter);
    return routing;
}

