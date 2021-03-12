import {QueueNameShimpmentSent, QueueNameShimpentVerified} from '../common/constants';
import {QueueService, ShipmentService, QueueProvider} from '../entities/iServices';

export function queueService(queueProvider: QueueProvider, shipmentService: ShipmentService): QueueService {
    return {
        receiveMessages: async():Promise<void> => {
            queueProvider.subscribe(QueueNameShimpentVerified, async (message) => {
                console.log('VERIFIED: ', message);
                const verification = JSON.parse(message);
                await shipmentService.updated(verification);
            })
        },
        sendMessage:(key: string, message: string): void => {
            queueProvider.publish(QueueNameShimpmentSent, key, message);
        }
    }
}