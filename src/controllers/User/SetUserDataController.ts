import { Request, Response } from 'express'

import { SetUserDataService } from '../../services/users/SetUserDataService'

class SetUserDataController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { last_consumption } = req.body

        const setUserDataService = new SetUserDataService()

        const userData = await setUserDataService.execute({
            user_id,
            last_consumption,
        })

        return res.json(userData)
    }
}

export { SetUserDataController }