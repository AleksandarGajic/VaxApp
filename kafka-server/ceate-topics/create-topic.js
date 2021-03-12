const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    brokers: ['localhost:9093']
});

const topicShimpmentSent = 'shipment-sent';
const topicShimpentVerified = 'shipment-verified';

const process = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{
            topic: topicShimpmentSent,
            numPartitions: 2,
            replicationFactor: 1
        }, {
            topic: topicShimpentVerified,
            numPartitions: 2,
            replicationFactor: 1
        }
        ],
});
    await admin.disconnect();
};

process().then(() => console.log('Success, topics are created!'));