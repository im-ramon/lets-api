import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        // Verifica se email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
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
                email: user.email,
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            })

        return { id: user.id, email: user.email, token: token }
    }
}

export { AuthUserService };