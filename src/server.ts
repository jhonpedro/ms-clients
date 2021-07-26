import { config } from 'dotenv'
config()

import App from './app'

App.listen(3000, () => {
	console.log('running on http://localhost:3000')
})
