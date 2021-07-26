import { EntityRepository, Repository } from 'typeorm'
import Client from '../models/Client.entity'

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {}

export default ClientRepository
