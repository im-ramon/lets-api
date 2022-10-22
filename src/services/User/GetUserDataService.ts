import prismaClient from '../../prisma'


class GetUserDataService {
    async execute(user_id: string) {

        const userData = await prismaClient.userData.findFirst({
            where: {
                user_id
            }
        })

        return userData;
    }
}

export { GetUserDataService };