import { Router } from 'express'
import ForgotPasswordsController from '../controllers/ForgotPasswordsController'

const routes = Router()

const forgotPasswordsController = new ForgotPasswordsController()

routes.post('/', forgotPasswordsController.store)
routes.put('/', forgotPasswordsController.update)

export default routes
