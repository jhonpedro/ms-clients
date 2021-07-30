import { EntityRepository, Repository } from 'typeorm'
import Client from '../models/Client.entity'

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
	getByEmailOrCPFOrFail(emailOrCPF: string) {
		if (emailOrCPF.includes('@')) {
			return this.findOneOrFail({ where: { email: emailOrCPF } })
		}

		return this.findOneOrFail({ where: { cpf: emailOrCPF } })
	}
}

export default ClientRepository
