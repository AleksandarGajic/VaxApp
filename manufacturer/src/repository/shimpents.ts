import {ShipmentEntity, ShipmentRepository} from '../entities/iShipmentRepository';
import {v4 as uuidv4} from 'uuid';

const shipments = [] as ShipmentEntity[];

async function getAll(): Promise<ShipmentEntity[]> {
    return shipments;
}

async function addShipment(shipment: Omit<ShipmentEntity, "id">): Promise<ShipmentEntity> {
    const newShipment = {...shipment, id: uuidv4()}
    shipments.push(newShipment);
    return newShipment;
}

async function updateShipment(shipment: ShipmentEntity): Promise<ShipmentEntity> {
    let existingShipment = shipments.find(s => s.id === shipment.id);

    if(!existingShipment) throw Error("Entity not found");

    existingShipment = {
        ...existingShipment,
        ...shipment
    }
    
    const index = shipments.findIndex(s => s.id == shipment.id)
    shipments[index] = existingShipment;
    return existingShipment;
}

async function removeShipment(shipment: Pick<ShipmentEntity, "id">): Promise<void> {
    const filtered = shipments.filter(s => s.id !== shipment.id);
    shipments.length = 0;
    shipments.push(...filtered);
}

export const shipmentRepository: ShipmentRepository = {
    getAll,
    addShipment,
    updateShipment,
    removeShipment
}