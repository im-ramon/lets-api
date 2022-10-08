import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    id: string;
    password: string;
}

class AuthUserService {
    async execute({ id, password }: AuthRequest) {

        // Verifica se id existe no banco de dados
        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        })
        if (!user) {
            throw new Error('Usuário e/ou senha incorreto')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Usuário e/ou senha incorreto')
        }

        // Gerando token
        const token = sign(
            {
                name: user.name,
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            })

        return { id: user.id, token: token, name: user.name }
    }
}

export { AuthUserService };