import { Request, Response } from 'express'

import { GetAllStatisticsService } from '../../services/Statistics/GetAllStatisticsService'

class GetAllStatisticsController {
    async handle(req: Request, res: Response) {
        const { user, password } = req.body

        const getAllStatisticsService = new GetAllStatisticsService()

        const data = await getAllStatisticsService.execute(user, password)

        return res.json(data)
    }
}

export { GetAllStatisticsController }