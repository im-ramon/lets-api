import prismaClient from '../../prisma'


class GetUserRelapseReasonsService {
    async execute(user_id: string) {

        const userData = await prismaClient.relapseReasons.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                reason: true,
                created_at: true
            }
        })

        return [...userData];
    }
}

export { GetUserRelapseReasonsService };