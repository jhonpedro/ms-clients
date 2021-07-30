import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'

import AppError from '../utils/AppError'

export default function adminMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	const admPassword = process.env.ADM_PASS_HASH as string
	const reqAdmPassword = req.headers.authorization?.split(' ')[1]

	if (!reqAdmPassword) {
		throw new AppError('this route is only for administration')
	}

	const isPasswordCorrect = bcrypt.compareSync(reqAdmPassword, admPassword)

	if (!isPasswordCorrect) {
		throw new AppError(
			'you administration password is incorrect, try again later'
		)
	}

	next()
}
