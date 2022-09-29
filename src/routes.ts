import { Router, Request, Response } from 'express'

export const router = Router()

router.get('/teste', (req: Request, res: Response) => {
    // throw new Error('')
    return res.json({ response: 'Tudo ok no /teste' })
})

