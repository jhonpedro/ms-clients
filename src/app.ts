import Express from 'express'
import './database/connection'

class App {
	public app = Express()

	constructor() {
		this.middleware()
	}

	middleware() {
		this.app.use(Express.json())
	}
}

export default new App().app
