import { Request, Response } from 'express'
import { Between, FindConditions, getCustomRepository } from 'typeorm'
import { NewClient, StatusEnum } from '../@types'
import Client from '../database/models/Client.entity'
import ClientRepository from '../database/repositories/Client'
import ClientEvaluation from '../evaluation/Client'
import newClientEmail from '../kafka/producer/newClientStatus'

class ClientsController {
	public async index(req: Request, res: Response) {
		const s = req.query.s as StatusEnum
		const d = req.query.d as string

		const clientRepository = getCustomRepository(ClientRepository)

		const where = {} as FindConditions<Client>

		if (s && d) {
			where.status = s
			where.status_updated_at = Between(
				new Date(!d ? 0 : d).toISOString(),
				'NOW()'
			)
		}

		if (s && !d) {
			where.status = s
		}

		if (!s && d) {
			where.status_updated_at = Between(
				new Date(!d ? 0 : d).toISOString(),
				'NOW()'
			)
		}

		const clients = await clientRepository.find({
			where,
		})

		return res.json(clients)
	}

	public async store(newClient: NewClient) {
		const clientRepository = getCustomRepository(ClientRepository)

		const clientExists = await clientRepository.findOne({ cpf: newClient.cpf })

		if (clientExists) {
			await newClientEmail(
				newClient.name,
				newClient.email,
				StatusEnum[clientExists.status]
			)
			return
		}

		const createdClient = clientRepository.create({
			name: newClient.name,
			adress: newClient.adress,
			email: newClient.email,
			password: newClient.password,
			cpf: newClient.cpf,
			income: newClient.income,
		})

		await clientRepository.save(createdClient)
		await newClientEmail(
			createdClient.name,
			createdClient.email,
			StatusEnum.pending
		)

		const clientEvaluation = new ClientEvaluation(createdClient)
		const newStatus = await clientEvaluation.getEvaluation()
		const newBalance = newStatus === StatusEnum.approved ? 200 : 0

		await clientRepository.update(
			{ id: createdClient.id },
			{
				status: newStatus,
				balance: newBalance,
			}
		)

		await newClientEmail(newClient.name, newClient.email, createdClient.status)
	}
}

export default ClientsController
