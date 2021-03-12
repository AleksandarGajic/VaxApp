import {ShipmentRepository, ShipmentEntity} from '../entities/iShipmentRepository';
import {ShipmentService} from '../entities/iServices';

export function shipmentService(shipmentRepository: ShipmentRepository): ShipmentService {
    return {
        getAll: async (): Promise<ShipmentEntity[]> => {
            return await shipmentRepository.getAll();
        },
        addShipment: async(shipment): Promise<ShipmentEntity> => {
            const existingShipment = (await shipmentRepository.getAll()).filter(s => s.id === shipment.id)[0];
            if (!existingShipment) {
                return await shipmentRepository.addShipment(shipment);
            } 

            return null;
        },
        updated: async(shipment): Promise<ShipmentEntity> => {
            const shimpentExists = (await shipmentRepository.getAll()).filter(s => s.id === shipment.id)[0];
            console.log(shimpentExists);
            if (shimpentExists) {
                return await shipmentRepository.updateShipment(shipment);
            }

            return null;
        }
    }
}