import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;

}

export function isAuth(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(' ')

    try {
        // Valida o token
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

        // Recupara Id Token e coloca em uma variável no request
        req.user_id = sub;

        return next()
    } catch {
        return res.status(401).end()
    }


    // console.log(token)


}