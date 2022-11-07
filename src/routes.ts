import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController'
import { DatailsUserController } from './controllers/User/DatailsUserController'
import { GetUserDataController } from './controllers/User/GetUserDataController'
import { SetUserDataController } from './controllers/User/SetUserDataController'
import { AlterUserNameController } from './controllers/User/AlterUserNameController'
import { AlterScoreController } from './controllers/UserData/AlterScoreController'
import { RestartStopwatchController } from './controllers/UserData/RestartStopwatchController'
import { GetUserRelapseReasonsController } from './controllers/RelapseReasons/GetUserRelapseReasonsController'
import { SetPushTokenController } from './controllers/PushTokens/SetPushTokenController'
import { SendPushNotificationController } from './controllers/PushTokens/SendPushNotificationController'
import { GetAllStatisticsController } from './controllers/Statistics/GetAllStatisticsController'
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
router.patch('/alter_score', isAuth, new AlterScoreController().handle)
router.post('/restart_stopwatch', isAuth, new RestartStopwatchController().handle)

// Rotas relapse_reasons
router.get('/relapse_reasons', isAuth, new GetUserRelapseReasonsController().handle)

// Rotas push_tokens
router.post('/push_tokens', isAuth, new SetPushTokenController().handle)
router.post('/send_push_notification', new SendPushNotificationController().handle)

// Rotas statistics
router.post('/statistics', new GetAllStatisticsController().handle)