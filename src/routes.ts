import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController'

export const router = Router()

router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
