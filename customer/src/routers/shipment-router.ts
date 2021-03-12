import { Request, Response, Router, NextFunction } from "express";
import { asyncErrorHandler } from "../middlewares";
import { HttpStatusCode } from "../common/constants"

export function shipmentRouterFactory(messageService, queueService) {
    const shipmentRouter = Router();

    shipmentRouter.route("/").get(
            (request: Request, response: Response, next: NextFunction) => {
                response.send(messageService.getAll())
            }
        );

    shipmentRouter.route("/:id/verify").post(asyncErrorHandler(
        async (request: Request, response: Response, next: NextFunction) => {
            const { id } = request.params;
            const message = messageService.getAll().filter(m => m.id == id);
            if (!(message && message.length)) {
                return response.status(HttpStatusCode.BadRequest).send(`Shimpment with id: ${id}, doesn't exist!`);
            }

            //verify shipment to manufacturer 
            queueService.sendMessage(id, JSON.stringify({id, customerId: 'uuid-customer-1', customerVerified: true}));
            //remove it from list
            messageService.delete(id);
            /* todo send veriry message through kafka */
            response.send(`Shimpment ${id}, verified!`)
        }
    ));

    return shipmentRouter;
}
