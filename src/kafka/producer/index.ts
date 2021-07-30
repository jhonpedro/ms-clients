import KafkaInstance from '../KafkaInstance'

const newMessage = async (topic: string, message: string) => {
	const producer = KafkaInstance.producer()

	await producer.connect()

	await producer.send({
		topic,
		messages: [{ value: message }],
	})

	await producer.disconnect()
}

export default newMessage
