import { StatusEnum } from '../@types'
import Client from '../database/models/Client.entity'

class ClientEvaluation {
	private client: Client

	constructor(client: Client) {
		this.client = client
	}

	private async evaluate(): Promise<StatusEnum> {
		await new Promise((resolve) => {
			setTimeout(resolve, 15000)
		})

		if (this.client.income <= 500) {
			return StatusEnum.denied
		}

		return StatusEnum.approved
	}

	public async getEvaluation() {
		return this.evaluate()
	}
}

export default ClientEvaluation
