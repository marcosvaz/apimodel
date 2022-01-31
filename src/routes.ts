import { Router } from 'express'

import AuthToken from './utils/jwt'

import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

const routes = Router()

// Auth
routes.post('/auth', AuthController.authenticate)

// Users
routes.post('/users', UserController.create)
routes.get('/users', AuthToken.verify, UserController.list)
routes.put('/users', AuthToken.verify, UserController.update)

export default routes
