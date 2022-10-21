import { Request, Response } from 'express'

import { AlterScoreService } from '../../services/UserData/AlterScoreService'

class AlterScoreController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { handleType } = req.body

        const alterScoreService = new AlterScoreService()

        const userData = await alterScoreService.execute({
            user_id,
            handleType
        })

        return res.json(userData)
    }
}

export { AlterScoreController }