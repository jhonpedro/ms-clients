import { Router } from 'express'
import OperationsController from '../controllers/OperationsController'
import adminMiddleware from '../middleware/Admin'
import authMiddleware from '../middleware/Auth'

const routes = Router()

const operationsController = new OperationsController()

routes.get('/', adminMiddleware, operationsController.index)
routes.post('/', authMiddleware, operationsController.store)

export default routes
