import KafkaInstance from '../KafkaInstance'

const statusString = {
	pending: 'SOB AVALIAÇÃO',
	approved: 'APROVADO',
	denied: 'NEGADO',
}

const newClientEmail = async (status: StatusEnum) => {
	const producer = KafkaInstance.producer()

	await producer.connect()

	producer.send({
		topic: 'new-client-status',
		messages: [{ value: statusString[status] }],
	})

	await producer.disconnect()
}

export default newClientEmail
