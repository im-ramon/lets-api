import { Request, Response } from 'express'

import { SendPushNotificationService } from '../../services/PushTokens/SendPushNotificationService'

class SendPushNotificationController {
    async handle(req: Request, res: Response) {
        const { user, password, title, body, data } = req.body

        const sendPushNotificationService = new SendPushNotificationService()

        const response = await sendPushNotificationService.execute(user, password, title, body, data,)

        return res.json(response)
    }
}

export { SendPushNotificationController }