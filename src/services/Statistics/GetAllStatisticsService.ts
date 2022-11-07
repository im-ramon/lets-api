import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'

class GetAllStatisticsService {
    async execute(user: string, password: string) {

        const userTokens = await prismaClient.appConstants.findFirst({
            select: {
                rootAccess: true,
                users: true
            }
        })
        const passwordMatch = await compare(password, userTokens.rootAccess)
        const userMatch = userTokens.users === user

        if (passwordMatch && userMatch) {
            try {
                const totalUsers = await prismaClient.user.count({})

                const totalRelapses = await prismaClient.userData.findMany({
                    select: {
                        total_relapse: true
                    }
                }).then(response => {
                    return response.reduce((prev, curr) => {
                        return prev + curr.total_relapse
                    }, 0)
                })

                const listReasons = await prismaClient.relapseReasons.findMany({
                    select: {
                        reason: true,
                        created_at: true
                    }
                })

                return {
                    totalUsers,
                    totalRelapses,
                    totalReasons: listReasons.length,
                    listReasons,
                }
            } catch (e) {
                throw new Error('GetAllStatisticsService: ' + e)
            }
        } else {
            throw new Error('Usuário/ senha incorreto(s)')
        }
    }
}

export { GetAllStatisticsService };