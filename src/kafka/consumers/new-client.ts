import ClientsController from '../../controllers/ClientsController'
import KafkaInstance from '../KafkaInstance'

const newUserConsumer = async () => {
	const consumer = KafkaInstance.consumer()

	await consumer.connect()

	await consumer.subscribe({ topic: 'new-client', fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ message }) => {
			const messageString = message.value?.toString()

			if (!messageString) {
				console.log('Client missing in message o new-client topic')
				return
			}

			const newClient = JSON.parse(messageString)

			new ClientsController().store(newClient)
		},
	})
}

export default newUserConsumer
