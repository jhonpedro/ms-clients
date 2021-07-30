import Express from 'express'
import 'express-async-errors'

import './database/connection'
import runConsumers from './kafka/consumers'
import errorMiddleware from './middleware/Error'
import ClientRoutes from './routes/clients'
import ForgotPasswordRoutes from './routes/forgotPasswords'
import SessionRoutes from './routes/session'
import OperationRoutes from './routes/operations'

class App {
	public app = Express()

	constructor() {
		this.middleware()
		this.routes()
		this.kafka()
		this.errorMiddlewares()
	}

	middleware() {
		this.app.use(Express.json())
	}

	routes() {
		this.app.use('/clients', ClientRoutes)
		this.app.use('/forgot-passwords', ForgotPasswordRoutes)
		this.app.use('/session', SessionRoutes)
		this.app.use('/operations', OperationRoutes)
	}

	errorMiddlewares() {
		this.app.use(errorMiddleware)
	}

	kafka() {
		runConsumers()
	}
}

export default new App().app
