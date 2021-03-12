
import {ShipmentEntity} from '../entities/iShipmentRepository';
export interface ShipmentService {
    getAll: () => Promise<ShipmentEntity[]>;
    addShipment: (shimpent: ShipmentEntity) => Promise<ShipmentEntity>;
    updated: (shimpent: ShipmentEntity) => Promise<ShipmentEntity>;
}

export interface QueueService {
    receiveMessages: () => Promise<void>;
    sendMessage: (key: string, message: string) => void;
}


export interface QueueProvider {
    subscribe: (topic: string, callback: (arg0: string) => void) => void;
    publish: (topic: string, key: string, message: string) => void;
}