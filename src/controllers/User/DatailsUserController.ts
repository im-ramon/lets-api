import { Request, Response } from 'express'

import { DatailsUserService } from '../../services/users/DatailsUserService'

class DatailsUserController {
    async handle(req: Request, res: Response) {
        const { name, password } = req.body

        const user_id = req.user_id;

        const datailsUserService = new DatailsUserService()

        const user = await datailsUserService.execute(user_id)

        return res.json(user)
    }
}

export { DatailsUserController }