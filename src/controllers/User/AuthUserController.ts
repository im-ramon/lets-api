import { Request, Response } from 'express'
import { AuthUserService } from '../../services/users/AuthUserService'

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { id, password } = req.body

        const authUserController = new AuthUserService();

        const auth = await authUserController.execute({ id, password })

        return res.json(auth)
    }
}

export { AuthUserController }