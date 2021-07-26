import { Kafka } from 'kafkajs'

class KafkaInstance {
	public kafka: Kafka

	constructor(
		initial = new Kafka({
			brokers: ['localhost:9092', 'localhost:29092'],
		})
	) {
		this.kafka = initial
	}
}

export default new KafkaInstance().kafka
