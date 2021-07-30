require('dotenv').config()
const { Client } = require('pg')

const run = async () => {
	for (let i = 0; i <= 10; i++) {
		try {
			const client = new Client({
				user: 'postgres',
				host: process.env.PG_HOST,
				port: process.env.PG_PORT,
				password: process.env.PG_PASSWORD,
			})

			await client.connect()

			process.exit(0)
		} catch (error) {
			console.log(`Error in ${i} try to connect.`)
			await new Promise((resolve) => {
				setTimeout(resolve, 2000)
			})
		}
	}
	console.log('Could not connect to database')
	process.exit(1)
}

run()
