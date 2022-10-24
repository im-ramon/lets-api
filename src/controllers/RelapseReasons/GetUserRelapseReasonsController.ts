import { Request, Response } from 'express'

import { GetUserRelapseReasonsService } from '../../services/RelapseReasons/GetUserRelapseReasonsService'

class GetUserRelapseReasonsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const getUserRelapseReasonsService = new GetUserRelapseReasonsService()

        const userData = await getUserRelapseReasonsService.execute(user_id)

        return res.json(userData)
    }
}

export { GetUserRelapseReasonsController }