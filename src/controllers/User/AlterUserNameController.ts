import { Request, Response } from 'express'

import { AlterUserNameService } from '../../services/users/AlterUserNameService'

class AlterUserNameController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { new_name } = req.body

        const alterUserNameService = new AlterUserNameService()

        const userData = await alterUserNameService.execute({
            user_id,
            new_name
        })

        return res.json(userData)
    }
}

export { AlterUserNameController }