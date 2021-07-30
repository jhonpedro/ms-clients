import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import { JWTAuthToken } from '../@types'

import AppError from '../utils/AppError'

const secret = process.env.SECRET

export default function authMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	const authorization = req.headers.authorization

	if (!authorization) {
		throw new AppError('auth required', 401)
	}

	const token = authorization.split(' ')[1]

	if (!secret) {
		console.log('provide an SECRET variable in .env please')
		throw new AppError('YOU SHOUL PROVIDE AN SECRET IN .ENV')
	}

	const tokenPayload = JWT.verify(token, secret) as JWTAuthToken

	req.client.id = tokenPayload.id

	next()
}
