import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors' /* Manter sempre como 2º import */
import cors from 'cors'

import { router } from './routes'

const app = express()
app.use(express.json())

app.options('*', cors())
// TESTAR ^
app.use(cors())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    // Se for uma instacia do tipo error
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    // Se for outro tipo
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(process.env.PORT, () => console.log("Servidor Let's! rodando na porta: " + process.env.PORT))