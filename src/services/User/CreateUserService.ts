import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import ShortUniqueId from 'short-unique-id'

interface UserRequest {
    name: string
    password: string
}

class CreateUserService {
    async execute({ name, password }: UserRequest) {

        const uid = new ShortUniqueId({ length: 8 });

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                id: uid(),
                name: name,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
            }
        })

        return user
    }
}

export { CreateUserService }