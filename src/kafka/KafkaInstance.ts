import { Kafka, logLevel } from 'kafkajs'

class KafkaInstance {
	public kafka: Kafka

	constructor(
		initial = new Kafka({
			clientId: 'ms-clients',
			brokers: [
				`${process.env.KAFKA_HOST}:9092`,
				`${process.env.KAFKA_HOST}:29092`,
			],
			logLevel: logLevel.INFO,
		})
	) {
		this.kafka = initial
	}
}

export default new KafkaInstance().kafka
