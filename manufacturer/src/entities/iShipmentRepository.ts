
export interface ShipmentEntity {
    id: string;
    vaccineName: string;
    quantity: number;
    manufacturingDate: string;
    manufacturerId: string;
    authorityId: string;
    customerId: string;
    customerVerified: boolean,
    authorityVerified: boolean
}

export interface ShipmentRepository {

    getAll: () => Promise<ShipmentEntity[]>,
    addShipment: (shipment: Omit<ShipmentEntity, "id">) => Promise<ShipmentEntity>,
    updateShipment: (shipment: ShipmentEntity) => Promise<ShipmentEntity>,
    removeShipment: (shipmentId: Pick<ShipmentEntity, "id">) => Promise<void>,
}