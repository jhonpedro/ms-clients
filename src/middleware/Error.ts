import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { EntityNotFoundError } from 'typeorm'
import AppError from '../utils/AppError'

export default function errorMiddleware(
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	if (error instanceof AppError) {
		return res.status(error.status).json({
			error: 'AppError',
			message: error.message,
		})
	}

	if (error instanceof EntityNotFoundError) {
		return res.status(400).json({
			error: 'not found',
			message: 'could not found your data, maybe it not exists',
		})
	}

	if (error instanceof JsonWebTokenError) {
		return res.status(403).json({
			error: 'token error',
			message: 'try to login again',
		})
	}

	if (process.env.ENV === 'development') {
		console.error(error)
		return res.status(500).json(error)
	}

	return res.sendStatus(500)
}
