import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import AppError from '../utils/AppError'
import ClientRepository from '../database/repositories/Client'

const secret = process.env.SECRET

class SessionController {
	public async store(req: Request, res: Response) {
		const { email, password } = req.body

		if (!email || !password) {
			throw new AppError('missing email or password')
		}

		const clientRepository = getCustomRepository(ClientRepository)

		const client = await clientRepository.findOneOrFail({
			where: { email },
			select: ['id', 'password'],
		})

		const isPasswordValid = await bcrypt.compare(password, client.password)

		if (!isPasswordValid) {
			throw new AppError('wrong password')
		}

		if (!secret) {
			throw new AppError('YOU NEED TO PROVIDE AN SECRET IN .ENV')
		}

		const token = JWT.sign({ id: client.id }, secret, {
			expiresIn: '4h',
		})

		return res.json({ token, expiresIn: '4h' })
	}
}

export default SessionController
