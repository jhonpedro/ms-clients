import { config } from 'dotenv'
config()

import bcrypt from 'bcrypt'

const run = (password: string) => {
	const hashPassword = bcrypt.hashSync(password, 4)
	return hashPassword
}

if (process.env.ADM_PASS) {
	console.log(run(process.env.ADM_PASS))

	process.exit(0)
}
process.exit(1)
