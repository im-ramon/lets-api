import { Request, Response } from 'express'

import { GetAllStatisticsService } from '../../services/Statistics/GetAllStatisticsService'

class GetAllStatisticsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const getAllStatisticsService = new GetAllStatisticsService()

        const data = await getAllStatisticsService.execute(user_id)

        return res.json(data)
    }
}

export { GetAllStatisticsController }