import prismaClient from '../../prisma'


class DatailsUserService {
    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select:
            {
                id: true,
                name: true,
            }
        })

        return user;
    }
}

export { DatailsUserService };