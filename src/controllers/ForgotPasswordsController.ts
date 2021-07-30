import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { randomUUID } from 'crypto'

import ClientRepository from '../database/repositories/Client'
import AppError from '../utils/AppError'
import newMessage from '../kafka/producer'

class ForgotPasswordsController {
	public async store(req: Request, res: Response) {
		const { email, redirectURL } = req.body

		if (!email) {
			throw new AppError('email required', 403)
		}
		if (!redirectURL) {
			throw new AppError('redirectURL required', 403)
		}

		const clientRepository = getCustomRepository(ClientRepository)

		const client = await clientRepository.findOneOrFail({ where: { email } })

		const token = randomUUID()

		client.forgot_password_token = token

		await clientRepository.save(client)

		const formatedURL =
			redirectURL.slice(redirectURL.length - 1) === '/'
				? redirectURL.slice(0, redirectURL.length - 1)
				: redirectURL

		await newMessage(
			'new-forgot-password',
			JSON.stringify({ email: client.email, url: `${formatedURL}/${token}` })
		)

		res.sendStatus(204)
	}

	public async update(req: Request, res: Response) {
		const { password, password_confirmation, token } = req.body

		if (password !== password_confirmation) {
			throw new AppError('password mismatch')
		}

		const clientRepository = getCustomRepository(ClientRepository)

		const client = await clientRepository.findOneOrFail({
			where: { forgot_password_token: token },
		})

		client.password = password
		client.forgot_password_token = ''

		await clientRepository.save(client)

		return res.sendStatus(200)
	}
}

export default ForgotPasswordsController
