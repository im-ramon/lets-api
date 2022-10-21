import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController'
import { DatailsUserController } from './controllers/User/DatailsUserController'
import { GetUserDataController } from './controllers/User/GetUserDataController'
import { SetUserDataController } from './controllers/User/SetUserDataController'
import { AlterUserNameController } from './controllers/User/AlterUserNameController'
import { AlterScoreController } from './controllers/UserData/AlterScoreController'
import { isAuth } from './middlewares/isAuth'

export const router = Router()

router.post('/create_user', new CreateUserController().handle)
router.post('/auth_user', new AuthUserController().handle)
router.get('/user_data', isAuth, new GetUserDataController().handle)
router.post('/user_data', isAuth, new SetUserDataController().handle)
router.patch('/alter_user_name', isAuth, new AlterUserNameController().handle)
router.patch('/alter_score', isAuth, new AlterScoreController().handle)
router.get('/me', isAuth, new DatailsUserController().handle)