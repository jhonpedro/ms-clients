import { Request, Response } from 'express'
import { getCustomRepository, getManager } from 'typeorm'
import ClientRepository from '../database/repositories/Client'
import OperationRepository from '../database/repositories/Operation'
import AppError from '../utils/AppError'

class OperationsController {
	public async index(req: Request, res: Response) {
		const d = req.query.d as string

		const operationsRepository = getCustomRepository(OperationRepository)

		const query = operationsRepository.createQueryBuilder('op')

		query.innerJoinAndSelect('op.client_from', 'from_client')
		query.innerJoinAndSelect('op.client_to', 'to_client')

		if (d) {
			query.where(
				`op.created_at BETWEEN '${new Date(d).toISOString()}' AND NOW()`
			)
		}

		const operations = await query.getMany()

		return res.json(operations)
	}

	public async store(req: Request, res: Response) {
		const { cash: cashStr, to } = req.body

		const cash = parseFloat(cashStr)
		await getManager().transaction(async (trxEntityManager) => {
			const clientRepository =
				trxEntityManager.getCustomRepository(ClientRepository)
			const operationRepository =
				trxEntityManager.getCustomRepository(OperationRepository)

			const clientFrom = await clientRepository.findOneOrFail(req.client.id)
			const clientTo = await clientRepository.getByEmailOrCPFOrFail(to)

			if (clientFrom.id === clientTo.id) {
				throw new AppError('you cant send money to yourself')
			}

			clientFrom.balance -= cash
			clientTo.balance += cash

			const newOperation = operationRepository.create({
				client_id: clientFrom.id,
				to_client: clientTo.id,
				cost: cash,
				current_balance: clientFrom.balance,
				previous_balance: clientFrom.balance + cash,
			})

			if (clientFrom.balance < 0) {
				throw new AppError('no founds', 404)
			}

			await trxEntityManager.save(clientFrom)
			await trxEntityManager.save(clientTo)
			await trxEntityManager.save(newOperation)
		})

		return res.sendStatus(200)
	}
}

export default OperationsController
