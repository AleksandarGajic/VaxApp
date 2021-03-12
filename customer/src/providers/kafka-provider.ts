import { KafkaClient as Client, Producer, ProduceRequest, KeyedMessage } from 'kafka-node';

const kafkaHost = (process.env.ENV_KAFKA_HOST || 'localhost:9093');

export function publish(topic: string, key: string, message: string): void {
    // The client connects to a Kafka broker
    const client = new Client({ kafkaHost });
    // The producer handles publishing messages over a topic
    const producer = new Producer(client);

    // First wait for the producer to be initialized
    producer.on(
        'ready',
        (): void => {
            // Update metadata for the topic we'd like to publish to
            client.refreshMetadata(
                [topic],
                (err: Error): void => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    const keyMessage = new KeyedMessage(key, message);
                    producer.send(
                        [{ topic, messages: [keyMessage] }],
                        (err: Error, result: ProduceRequest): void => {
                            if (err) console.log(err)
                        }
                    );
                }
            );
        }
    );
    
    // Handle errors
    producer.on(
        'error',
        (err: Error): void => {
            console.log('error', err);
        }
    );
}