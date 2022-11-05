import { Request, Response } from 'express'

import { SetPushTokenService } from '../../services/PushTokens/SetPushTokenService'

class SetPushTokenController {
    async handle(req: Request, res: Response) {
        const { exponent_push_token } = req.body

        const setPushTokenService = new SetPushTokenService()

        const data = await setPushTokenService.execute(exponent_push_token)

        return res.json(data)
    }
}

export { SetPushTokenController }