import { EntityRepository, Repository } from 'typeorm'
import Operation from '../models/Operation.entity'

@EntityRepository(Operation)
class OperationRepository extends Repository<Operation> {}

export default OperationRepository
