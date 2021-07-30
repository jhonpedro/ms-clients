import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'
import adminMiddleware from '../middleware/Admin'

const ClientRoutes = Router()

const clientsController = new ClientsController()

ClientRoutes.get('/', adminMiddleware, clientsController.index)

export default ClientRoutes
