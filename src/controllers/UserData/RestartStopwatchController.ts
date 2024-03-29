import { Request, Response } from 'express'

import { RestartStopwatchService } from '../../services/UserData/RestartStopwatchService'

class RestartStopwatchController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { last_consumption, relapse_reasons, record_no_consumption_formated } = req.body

        const restartStopwatchService = new RestartStopwatchService()

        const userData = await restartStopwatchService.execute({
            user_id,
            last_consumption,
            relapse_reasons,
            record_no_consumption_formated
        })

        return res.json(userData)
    }
}

export { RestartStopwatchController }