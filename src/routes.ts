import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController'
import { DatailsUserController } from './controllers/User/DatailsUserController'
import { GetUserDataController } from './controllers/User/GetUserDataController'
import { SetUserDataController } from './controllers/User/SetUserDataController'
import { AlterUserNameController } from './controllers/User/AlterUserNameController'
import { RestartStopwatchController } from './controllers/UserData/RestartStopwatchController'
import { isAuth } from './middlewares/isAuth'

export const router = Router()

// Rotas 'user'
router.post('/create_user', new CreateUserController().handle)
router.post('/auth_user', new AuthUserController().handle)
router.get('/user_data', isAuth, new GetUserDataController().handle)
router.post('/user_data', isAuth, new SetUserDataController().handle)
router.patch('/alter_user_name', isAuth, new AlterUserNameController().handle)
router.get('/me', isAuth, new DatailsUserController().handle)

// Rotas 'user_data'
router.patch('/alter_score', isAuth, new RestartStopwatchController().handle)
router.post('/restart_stopwatch', isAuth, new RestartStopwatchController().handle)