import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NewClient, StatusEnum } from '../@types'
import ClientRepository from '../database/repositories/Client'
import ClientEvaluation from '../evaluation/Client'
import newClientEmail from '../kafka/producers/new-client'

class ClientsController {
	public async index(req: Request, res: Response) {
		const clientRepository = getCustomRepository(ClientRepository)

		const clients = await clientRepository.find()

		return res.json(clients)
	}

	public async store(newClient: NewClient) {
		await newClientEmail(StatusEnum.pending)

		const clientRepository = getCustomRepository(ClientRepository)

		const clientExists = await clientRepository.findOne({ cpf: newClient.cpf })

		if (clientExists) {
			await newClientEmail(StatusEnum[clientExists.status])
			return
		}

		const createdClient = clientRepository.create({
			name: newClient.name,
			adress: newClient.adress,
			cpf: newClient.cpf,
			email: newClient.email,
			income: newClient.income,
		})

		const clientEvaluation = new ClientEvaluation(createdClient)
		createdClient.status = await clientEvaluation.getEvaluation()

		await clientRepository.save(createdClient)

		await newClientEmail(createdClient.status)
	}
}

export default ClientsController
