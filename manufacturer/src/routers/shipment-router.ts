import { Request, Response, Router, NextFunction } from "express";
import { HttpStatusCode } from "../common";
import { asyncErrorHandler,  requireBody } from "../middlewares";
import {ShipmentService, QueueService} from '../entities/iServices';
import {ShipmentEntity} from '../entities/iShipmentRepository';

export function shipmentRouterFactory(shipmentService: ShipmentService, queueService: QueueService) {
    const shipmentRouter = Router();

    shipmentRouter.route("/").get(
            async (request: Request, response: Response, next: NextFunction) => {
                response.send(await shipmentService.getAll())
            }
        );

    const shipmentSchema = {
        type: "object",
        properties: {
            id: { type: "string" },
            vaccineName: { type: "string" },
            quantity: { type: "number" },
            manufacturingDate: { type: "string" },
            manufacturerId: { type: "string" },
            authorityId: { type: "string" },
            customerId: { type: "string" },
        },
        required: ["vaccineName"]
    }

    shipmentRouter.route("/").post(requireBody(shipmentSchema), asyncErrorHandler(
        async (request: Request, response: Response, next: NextFunction) => {
            const { id, vaccineName, quantity, manufacturingDate, manufacturerId, authorityId, customerId } = request.body;

            let shimpment: ShipmentEntity = {
                id, vaccineName, quantity, manufacturingDate, manufacturerId, authorityId, customerId, authorityVerified: false, customerVerified: false
            }
            
            shimpment = await shipmentService.addShipment(shimpment);
            if (shimpment)
                queueService.sendMessage(id, JSON.stringify(shimpment));

            response.status(HttpStatusCode.Created).send(`Shipment ${vaccineName} added!`);
        }
    ));


    return shipmentRouter;
}
