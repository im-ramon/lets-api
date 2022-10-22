import { Request, Response } from 'express'

import { GetUserDataService } from '../../services/User/GetUserDataService'

class GetUserDataController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const getUserDataService = new GetUserDataService()

        const userData = await getUserDataService.execute(user_id)

        return res.json(userData)
    }
}

export { GetUserDataController }