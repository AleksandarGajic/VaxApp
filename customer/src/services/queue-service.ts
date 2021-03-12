import {QueueNameShimpmentSent, QueueNameShimpentVerified} from '../common/constants';

export function queueService(queueProvider, messageService) {
    return {
        receiveMessages: () => {
            queueProvider.subscribe(QueueNameShimpmentSent, (message) => {
                messageService.addMessage(JSON.parse(message));
            })
        },
        sendMessage:(key: string, message: string) => {
            queueProvider.publish(QueueNameShimpentVerified, key, message);
        }
    }
}