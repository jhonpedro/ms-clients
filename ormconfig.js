require('dotenv').config()

module.exports = {
	type: 'postgres',
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	username: process.env.PG_USER,
	password: process.env.PG_PASS,
	database: process.env.PG_DATABASE,
	loggin: true,
	entities: ['src/database/models/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	cli: {
		migrationsDir: 'src/database/migrations',
	},
}
