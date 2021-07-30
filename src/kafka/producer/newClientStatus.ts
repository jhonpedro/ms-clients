import { StatusEnum } from '../../@types'
import newMessage from './'

const statusString = {
	pending: 'SOB AVALIAÇÃO',
	approved: 'APROVADO',
	denied: 'NEGADO',
}

const newClientEmail = async (
	clientName: string,
	email: string,
	status: StatusEnum
) => {
	const info = { name: clientName, email, status: statusString[status] }

	await newMessage('new-client-status', JSON.stringify(info))
}

export default newClientEmail
