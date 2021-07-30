import { config } from 'dotenv'
config()

import App from './app'

App.listen(3001, () => {
	console.log('running on http://localhost:3001')
})
